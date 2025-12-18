"use client";

import React, { useState, useEffect } from "react";
import MapWrapper from "@/components/map/MapWrapper";
import { RideRequestSheet } from "@/components/ride/RideRequestSheet";
import { DriverPickerSheet } from "@/components/ride/DriverPickerSheet";
import { SafetyToolkit } from "@/components/ride/SafetyToolkit";
import { ActiveRideOverlay } from "@/components/ride/ActiveRideOverlay";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { type DriverLocation } from "@/types";
import { fetchNearbyDrivers, createRide, subscribeToRide, getRideStatus } from "@/services/rideService";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MapPage() {
    const t = useTranslations('Ride');
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [distance, setDistance] = useState(0);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isDriverPickerOpen, setIsDriverPickerOpen] = useState(false);
    const [selectedRideType, setSelectedRideType] = useState<string>('kenda_go');
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [selectedDriver, setSelectedDriver] = useState<DriverLocation | null>(null);
    const [rideStatus, setRideStatus] = useState<'IDLE' | 'PICKING_DRIVER' | 'WAITING_CONFIRMATION' | 'ACTIVE'>('IDLE');
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [nearbyDrivers, setNearbyDrivers] = useState<DriverLocation[]>([]);
    const [activeRideId, setActiveRideId] = useState<string | null>(null);
    const [activeRide, setActiveRide] = useState<any>(null);

    useEffect(() => {
        // Initial location setup
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                setUserLocation(loc);

                // Fetch drivers near user
                fetchNearbyDrivers(loc[0], loc[1]).then(setNearbyDrivers);
            });
        }
    }, []);

    // Also listen for driver updates to keep nearbyDrivers state fresh for the sheet
    useEffect(() => {
        const supabase = createClient();
        const channel = supabase
            .channel('driver_status_map')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'driver_profiles'
            }, (payload: any) => {
                // Simplification: Re-fetch or update local state
                // For performance, we could update local state, but re-fetching ensures distance/sanity
                if (userLocation) {
                    fetchNearbyDrivers(userLocation[0], userLocation[1]).then(setNearbyDrivers);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userLocation]);

    // Listen for ride status changes
    useEffect(() => {
        if (!activeRideId) return;

        console.log("Passenger: Tracking ride:", activeRideId);

        // Function to sync ride status
        const syncRideStatus = async () => {
            const res = await getRideStatus(activeRideId);
            if (res.success && res.data) {
                console.log("Passenger: Synced status ->", res.data.status);
                setActiveRide(res.data);

                if (['ACCEPTED', 'DRIVER_ASSIGNED', 'DRIVER_ARRIVED', 'IN_PROGRESS'].includes(res.data.status)) {
                    setRideStatus('ACTIVE');
                } else if (res.data.status === 'COMPLETED') {
                    alert("🎉 Course terminée ! Merci d'avoir choisi Kenda.");
                    setRideStatus('IDLE');
                    setActiveRideId(null);
                    setActiveRide(null);
                    setSelectedDriver(null);
                    setDestination(null);
                } else if (res.data.status === 'CANCELLED') {
                    setRideStatus('IDLE');
                    setActiveRideId(null);
                    setActiveRide(null);
                    alert("La course a été annulée.");
                }
            }
        };

        // Initial sync
        syncRideStatus();

        // Polling fallback every 3 seconds
        const pollInterval = setInterval(syncRideStatus, 3000);

        // Real-time subscription
        const unsubscribe = subscribeToRide(activeRideId, async (ride) => {
            console.log("Passenger: WebSocket update ->", ride.status);

            const statusOrder = ['SEARCHING', 'ACCEPTED', 'DRIVER_ASSIGNED', 'DRIVER_ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

            setActiveRide((prev: any) => {
                if (prev && statusOrder.indexOf(ride.status) < statusOrder.indexOf(prev.status)) return prev;
                return { ...prev, ...ride };
            });

            if (['ACCEPTED', 'DRIVER_ASSIGNED', 'DRIVER_ARRIVED'].includes(ride.status)) {
                setRideStatus('ACTIVE');
                setIsDriverPickerOpen(false);
                if (window.navigator?.vibrate) window.navigator.vibrate(200);
            }

            if (ride.status === 'DRIVER_ARRIVED') {
                alert("Votre chauffeur est arrivé !");
            } else if (ride.status === 'IN_PROGRESS') {
                if (window.navigator?.vibrate) window.navigator.vibrate(100);
            } else if (ride.status === 'COMPLETED') {
                alert("🎉 Course terminée ! Merci d'avoir choisi Kenda.");
                setRideStatus('IDLE');
                setActiveRideId(null);
                setActiveRide(null);
                setSelectedDriver(null);
                setDestination(null);
            } else if (ride.status === 'CANCELLED') {
                setRideStatus('IDLE');
                setActiveRideId(null);
                setActiveRide(null);
                alert("La course a été annulée.");
            }
        });

        return () => {
            clearInterval(pollInterval);
            unsubscribe();
        };
    }, [activeRideId]);

    const handleDestinationChange = (dest: [number, number] | null, dist: number) => {
        setDestination(dest);
        setDistance(dist);
        if (dest) {
            setIsSheetOpen(true);
        }
    };

    const handleDriverSelect = (driver: DriverLocation) => {
        setSelectedDriver(driver);
        // If we select a driver, we usually want to order a ride to their location or with them
        setIsSheetOpen(true);
    };

    const handleOrderRide = (rideTypeId: string, price: number) => {
        setSelectedRideType(rideTypeId);
        setEstimatedPrice(price);

        if (selectedDriver) {
            handleConfirmFinalOrder(selectedDriver, rideTypeId, price);
        } else {
            setIsSheetOpen(false);
            setIsDriverPickerOpen(true);
        }
    };

    const handleConfirmFinalOrder = async (driver: DriverLocation, rideTypeId?: string, price?: number) => {
        if (!destination || !userLocation) return;

        const finalRideType = rideTypeId || selectedRideType;
        const finalPrice = price !== undefined ? price : estimatedPrice;

        setRideStatus('WAITING_CONFIRMATION');
        setSelectedDriver(driver);
        setIsDriverPickerOpen(false);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("Veuillez vous connecter pour commander");
                setRideStatus('IDLE');
                return;
            }

            // Map UI ride types to database enum values
            const vehicleTypeMap: Record<string, 'TAXI' | 'MOTO'> = {
                'kenda_go': 'TAXI',
                'kenda_comfort': 'TAXI',
                'kenda_moto': 'MOTO'
            };

            const dbVehicleType = vehicleTypeMap[finalRideType] || 'TAXI';
            console.log("Creating ride with type:", dbVehicleType, "(UI type was:", finalRideType, ")");

            const res = await createRide({
                passenger_id: user.id,
                pickup_lat: userLocation[0],
                pickup_lng: userLocation[1],
                dest_lat: destination[0],
                dest_lng: destination[1],
                price: finalPrice,
                distance: distance,
                duration: Math.ceil(distance * 3),
                specificDriverId: driver.driver_id,
                payment_method: 'CASH',
                vehicle_type: dbVehicleType
            });

            if (res.success && res.data) {
                console.log("Passenger: Ride created successfully:", res.data.id);
                setActiveRideId(res.data.id);
                setActiveRide(res.data); // Start with the basic data
            } else {
                alert("Erreur lors de la création: " + res.error);
                setRideStatus('IDLE');
            }
        } catch (error) {
            console.error(error);
            alert("Une erreur technique s'est produite lors de la commande.");
            setRideStatus('IDLE');
        }
    };

    return (
        <main className="relative h-full w-full overflow-hidden bg-black">
            {/* Map Background */}
            <div className="absolute inset-0 z-0">
                <MapWrapper
                    userLocation={userLocation}
                    onDestinationChange={handleDestinationChange}
                    onDriverSelect={handleDriverSelect}
                    nearbyDrivers={nearbyDrivers}
                />
            </div>

            {/* Top Navigation / Status Overlays */}
            <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none z-10">
                <div className="max-w-md mx-auto">
                    {rideStatus === 'ACTIVE' && (
                        <ActiveRideOverlay
                            remainingTime="8 min"
                            remainingDistance="2.4 km"
                            arrivalTime="12:45"
                        />
                    )}
                </div>
            </div>

            {/* Safety Toolkit - Always reachable when active */}
            {rideStatus !== 'IDLE' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                    <SafetyToolkit />
                </div>
            )}

            {/* Bottom Sheet for Ride Selection */}
            <RideRequestSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                destination={destination}
                distance={distance}
                onOrder={handleOrderRide}
                selectedDriver={selectedDriver}
                onDriverClear={() => setSelectedDriver(null)}
            />

            {/* Driver Picker List */}
            <DriverPickerSheet
                isOpen={isDriverPickerOpen}
                onClose={() => setIsDriverPickerOpen(false)}
                drivers={nearbyDrivers}
                selectedRideType={selectedRideType}
                estimatedPrice={estimatedPrice}
                onSelect={handleConfirmFinalOrder}
            />

            {/* Floating Action Button (Search Bar Mockup) */}
            {!isSheetOpen && rideStatus === 'IDLE' && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20 pointer-events-auto">
                    <button
                        onClick={() => setIsSheetOpen(true)}
                        className="w-full h-14 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl shadow-2xl flex items-center px-6 gap-4 animate-in fade-in slide-in-from-top-4 duration-500"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#F0B90B]" />
                        <span className="text-[#9A9A9A] font-medium">{t('whereTo')}</span>
                    </button>

                    {/* Shortcuts */}
                    <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-2">
                        {['🏠 Maison', '💼 Bureau', '⚡ Aéroport'].map((place) => (
                            <button key={place} className="shrink-0 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/5 rounded-full text-xs text-white/80 hover:bg-white/10">
                                {place}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Waiting for Confirmation / Driver Accepted / Driver Arrived Overlay */}
            {(rideStatus === 'WAITING_CONFIRMATION' || (activeRide && ['ACCEPTED', 'DRIVER_ASSIGNED', 'DRIVER_ARRIVED'].includes(activeRide.status))) && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center transition-all duration-700">
                    <div className="w-40 h-40 relative mb-10">
                        {(!activeRide || activeRide.status === 'SEARCHING') ? (
                            <>
                                <div className="absolute inset-0 border-4 border-[#F0B90B]/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-[#F0B90B] rounded-full border-t-transparent animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-[#F0B90B] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(240,185,11,0.4)]">
                                        <span className="text-black font-black text-3xl">KENDA</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-500">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                                        <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-[#F0B90B] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 border-black">Confirmé</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {!activeRide || activeRide.status === 'SEARCHING' ? (
                        <>
                            <h2 className="text-2xl font-black text-white mb-3">
                                {selectedDriver ? "Confirmation en cours..." : "Recherche de chauffeur..."}
                            </h2>
                            <p className="text-[#9A9A9A] max-w-[250px] leading-relaxed">
                                {selectedDriver
                                    ? `Demande envoyée à ${selectedDriver.driver_name}. Veuillez patienter.`
                                    : `Nous envoyons votre demande aux chauffeurs ${selectedRideType === 'kenda_moto' ? 'Motos' : 'Taxis'} les plus proches.`}
                            </p>
                        </>
                    ) : (
                        <div className="animate-in slide-in-from-bottom-4 duration-700 w-full max-w-sm">
                            <h2 className="text-3xl font-black text-white mb-2">
                                {activeRide.status === 'DRIVER_ARRIVED' ? "Votre chauffeur est là !" : "Chauffeur en route !"}
                            </h2>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-6 flex flex-col items-center gap-4">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                                        {activeRide.driver?.avatar_url ? (
                                            <img src={activeRide.driver.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl">👤</span>
                                        )}
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-[#9A9A9A] text-[10px] font-bold uppercase tracking-widest mb-1">Votre Chauffeur</p>
                                        <p className="text-xl font-black text-white">{activeRide.driver?.full_name || "Chauffeur Kenda"}</p>
                                        <div className="flex items-center gap-1 text-[#F0B90B] text-xs font-bold leading-none mt-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>4.9 • {activeRide.vehicle_type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/5" />

                                <div className="flex justify-between w-full text-left">
                                    <div>
                                        <p className="text-[#9A9A9A] text-[10px] font-bold uppercase tracking-widest mb-0.5">Véhicule</p>
                                        <p className="text-sm font-bold text-white">Toyota Belta</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#9A9A9A] text-[10px] font-bold uppercase tracking-widest mb-0.5">Plaque</p>
                                        <p className="text-sm font-bold text-[#F0B90B] bg-[#F0B90B]/10 px-2 py-0.5 rounded border border-[#F0B90B]/20">2384AB/19</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={() => {
                                    if (activeRide.status === 'DRIVER_ARRIVED') {
                                        // Visual confirmation for arrival
                                    }
                                    setRideStatus('ACTIVE');
                                }}
                                className={cn(
                                    "mt-10 h-14 px-10 font-black rounded-2xl transition-all shadow-2xl",
                                    activeRide.status === 'DRIVER_ARRIVED'
                                        ? "bg-green-500 text-white hover:bg-green-600 animate-pulse"
                                        : "bg-white text-black hover:bg-[#F0B90B]"
                                )}
                            >
                                {activeRide.status === 'DRIVER_ARRIVED' ? "MONTER DANS LE VÉHICULE" : "VOIR SUR LA CARTE"}
                            </Button>
                        </div>
                    )}

                    {!activeRide || activeRide.status === 'SEARCHING' ? (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                // Logic to cancel ride would go here
                                setRideStatus('IDLE');
                                setActiveRideId(null);
                            }}
                            className="mt-12 text-[#FF4747] hover:bg-[#FF4747]/10 font-bold"
                        >
                        </Button>
                    ) : null}
                </div>
            )}
        </main>
    );
}
