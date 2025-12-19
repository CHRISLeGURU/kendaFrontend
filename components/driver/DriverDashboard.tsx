"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import MapWrapper from "@/components/map/MapWrapper";
import RideOfferScreen from "@/components/driver/RideOfferScreen";
import DriverNavigationScreen from "@/components/driver/DriverNavigationScreen";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { type DriverLocation, type Ride, type DriverStats } from "@/types";
import { Button } from "@/components/ui/button";
import { Power, MapPin, Gauge, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDriverStats } from "@/services/driverService";

// Helper for distance calculation (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * Main dashboard for drivers to manage status, track rides, and view earnings.
 * All data is fetched in real-time from Supabase.
 */
export function DriverDashboard() {
    const t = useTranslations('Driver');
    const [isOnline, setIsOnline] = useState(false);
    const [currentRide, setCurrentRide] = useState<Ride | null>(null);
    const [pendingOffer, setPendingOffer] = useState<Ride | null>(null);
    const [allNearbyRides, setAllNearbyRides] = useState<Ride[]>([]);
    const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);
    const [driverProfile, setDriverProfile] = useState<any>(null);
    const [stats, setStats] = useState<DriverStats | null>(null);
    const supabase = createClient();

    // 1. Initial Setup: Get Profile & Stats
    useEffect(() => {
        const getInitialData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Get Profile
                const { data: profile } = await (supabase
                    .from('driver_profiles') as any)
                    .select('*, users(full_name, avatar_url)')
                    .eq('user_id', user.id)
                    .single();
                setDriverProfile(profile);
                setIsOnline(profile?.is_online || false);

                // Get Real Stats
                const statsRes = await getDriverStats(user.id);
                if (statsRes.success) {
                    setStats(statsRes.data);
                }
            }
        };
        getInitialData();
    }, []);

    // 2. Geolocation Tracking
    useEffect(() => {
        if (!isOnline) return;

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setDriverLocation([latitude, longitude]);

                // Update Supabase
                if (driverProfile) {
                    (supabase
                        .from('driver_profiles') as any)
                        .update({
                            current_lat: latitude,
                            current_lng: longitude,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', driverProfile.id)
                        .then();
                }
            },
            (err) => console.error("GPS Error:", err),
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [isOnline, driverProfile]);

    // 3. Radar & Realtime Ride Listeners
    useEffect(() => {
        if (!isOnline || !driverProfile) {
            setAllNearbyRides([]);
            return;
        }

        // Fetch existing searching rides (only from last 2 hours to avoid stale data)
        const fetchRides = async () => {
            const twoHoursAgo = new Date();
            twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

            const { data, error } = await (supabase
                .from('rides') as any)
                .select('*')
                .eq('status', 'SEARCHING')
                .gt('requested_at', twoHoursAgo.toISOString());

            if (error) {
                console.error("Driver Radar: Error fetching rides:", error);
            } else {
                console.log("Driver Radar: Found", data?.length || 0, "searching rides");
                setAllNearbyRides(data || []);
            }
        };

        // Initial fetch
        fetchRides();

        // Polling fallback every 5 seconds
        const pollInterval = setInterval(fetchRides, 5000);

        // Channel for new requests & radar sync
        const channel = supabase
            .channel('dispatch-room')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'rides',
                filter: `status=eq.SEARCHING`
            }, (payload) => {
                const ride = payload.new as Ride;
                console.log("Driver Radar: New ride request received:", ride.id);
                // Add to raw list
                setAllNearbyRides(prev => [...prev.filter(r => r.id !== ride.id), ride]);

                const isForMe = ride.driver_id === driverProfile.user_id;
                const isRadarMatch = !ride.driver_id && ride.vehicle_type === driverProfile.vehicle_type;

                if (isForMe || isRadarMatch) {
                    setPendingOffer(ride);
                    if (window.navigator?.vibrate) {
                        window.navigator.vibrate([200, 100, 200]);
                    }
                }
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'rides'
            }, (payload) => {
                const updatedRide = payload.new as Ride;
                console.log("Driver Radar: Ride update:", updatedRide.id, "->", updatedRide.status);

                // Remove from radar if no longer searching
                if (updatedRide.status !== 'SEARCHING') {
                    setAllNearbyRides(prev => prev.filter(r => r.id !== updatedRide.id));
                } else {
                    setAllNearbyRides(prev => prev.map(r => r.id === updatedRide.id ? updatedRide : r));
                }

                // Handle specifically assigned/taken rides
                if (updatedRide.driver_id === driverProfile.user_id) {
                    if (updatedRide.status === 'CANCELLED') {
                        setCurrentRide(null);
                        setPendingOffer(null);
                        alert("Le client a annulé la course.");
                    } else if (['ACCEPTED', 'DRIVER_ASSIGNED', 'DRIVER_ARRIVED', 'IN_PROGRESS'].includes(updatedRide.status)) {
                        setCurrentRide(updatedRide);
                    }
                }
            })
            .subscribe();

        return () => {
            clearInterval(pollInterval);
            supabase.removeChannel(channel);
        };
    }, [isOnline, driverProfile]);

    // 4. Client-side Radar Filtering (by Distance & Metadata)
    const filteredRides = useMemo(() => {
        if (!driverLocation) return allNearbyRides;
        return allNearbyRides.filter(ride => {
            const distance = calculateDistance(
                driverLocation[0],
                driverLocation[1],
                ride.pickup_lat,
                ride.pickup_lng
            );
            // Limit radar to 10km for relevance
            return distance <= 10;
        });
    }, [allNearbyRides, driverLocation]);

    const handleToggleOnline = async () => {
        const nextState = !isOnline;
        if (driverProfile) {
            const { error } = await (supabase
                .from('driver_profiles') as any)
                .update({ is_online: nextState })
                .eq('id', driverProfile.id);

            if (!error) setIsOnline(nextState);
        }
    };

    const handleAcceptRide = async () => {
        if (!pendingOffer || !driverProfile) return;

        const { data, error } = await (supabase
            .from('rides') as any)
            .update({
                status: 'ACCEPTED',
                driver_id: driverProfile.user_id,
                accepted_at: new Date().toISOString()
            })
            .eq('id', pendingOffer.id)
            .select()
            .single();

        if (data && !error) {
            setCurrentRide(data as Ride);
            setPendingOffer(null);
        } else {
            alert("Impossible d'accepter la course. Elle a peut-être été prise par un autre chauffeur.");
            setPendingOffer(null);
        }
    };

    const handleDeclineRide = () => {
        setPendingOffer(null);
    };

    const handleRideSelect = (ride: Ride) => {
        setPendingOffer(ride);
    };

    const handleStatusUpdate = async (newStatus: string) => {
        if (!currentRide) return;

        const { data, error } = await (supabase
            .from('rides') as any)
            .update({ status: newStatus })
            .eq('id', currentRide.id)
            .select()
            .single();

        if (data && !error) {
            if (newStatus === 'COMPLETED') {
                setCurrentRide(null);
                alert("Course terminée ! Bravo.");
            } else {
                setCurrentRide(data as Ride);
            }
        } else {
            console.error("Status update error:", error);
            alert("Erreur lors de la mise à jour du statut: " + (error?.message || "Erreur inconnue"));
        }
    };

    return (
        <div className="relative h-full w-full bg-black overflow-hidden">
            {/* Background Map */}
            <div className="absolute inset-0 z-0">
                <MapWrapper
                    userLocation={driverLocation}
                    routeStart={currentRide ? [currentRide.pickup_lat, currentRide.pickup_lng] : null}
                    routeEnd={currentRide ? [currentRide.dest_lat, currentRide.dest_lng] : null}
                    highlightLocation={pendingOffer ? [pendingOffer.pickup_lat, pendingOffer.pickup_lng] : null}
                    availableRides={filteredRides}
                    onRideSelect={handleRideSelect}
                />
            </div>

            {/* Top Stats Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 z-10 flex flex-col gap-2 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 pointer-events-auto flex gap-6 shadow-2xl">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#9A9A9A] font-bold uppercase tracking-widest mb-1">Aujourd&apos;hui</span>
                            <span className="text-xl font-heading font-black text-white">{stats?.today_earnings.toLocaleString() || '0'} <span className="text-xs text-[#F0B90B]">FC</span></span>
                        </div>
                        <div className="w-px h-8 bg-white/10 mt-2" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#9A9A9A] font-bold uppercase tracking-widest mb-1">Courses</span>
                            <span className="text-xl font-heading font-black text-white">{stats?.today_rides || '0'}</span>
                        </div>
                        <div className="w-px h-8 bg-white/10 mt-2" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#9A9A9A] font-bold uppercase tracking-widest mb-1">Note</span>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-[#F0B90B] fill-current" />
                                <span className="text-xl font-heading font-black text-white">{stats?.average_rating.toFixed(1) || '5.0'}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleToggleOnline}
                        className={cn(
                            "pointer-events-auto flex items-center gap-2 px-6 h-14 rounded-2xl font-bold transition-all shadow-2xl",
                            isOnline
                                ? "bg-green-600/10 border-2 border-green-600 text-green-500 hover:bg-green-600/20"
                                : "bg-red-600/10 border-2 border-red-600 text-red-500 hover:bg-red-600/20"
                        )}
                    >
                        <Power className="w-5 h-5" />
                        {isOnline ? "EN LIGNE" : "HORS LIGNE"}
                    </button>
                </div>

                {/* Radar Status Overlay */}
                {isOnline && !currentRide && !pendingOffer && (
                    <div className="mx-auto bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 flex items-center gap-3 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                        <span className="text-xs font-bold text-white/80 uppercase tracking-tighter">
                            {filteredRides.length > 0
                                ? `${filteredRides.length} passager(s) à proximité`
                                : "Radar actif - En attente de passagers"}
                        </span>
                    </div>
                )}
            </div>

            {/* Ride Selection / Navigation Overlays */}
            {pendingOffer && (
                <div className="absolute inset-0 z-30 pointer-events-none bg-black/20 flex flex-col items-center justify-end">
                    <div className="w-full pointer-events-auto">
                        <RideOfferScreen
                            ride={pendingOffer}
                            onAccept={handleAcceptRide}
                            onDecline={handleDeclineRide}
                        />
                    </div>
                </div>
            )}

            {currentRide && (
                <DriverNavigationScreen
                    ride={currentRide}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}

            {/* Offline Mode Overlay */}
            {!isOnline && !currentRide && (
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent p-10 pb-20 text-center">
                    <div className="max-w-xs mx-auto">
                        <div className="w-20 h-20 bg-[#1A1A1A] rounded-3xl mx-auto mb-6 flex items-center justify-center border border-white/5">
                            <Gauge className="w-10 h-10 text-[#666]" />
                        </div>
                        <h2 className="text-2xl font-heading font-black mb-4">Vous êtes déconnecté</h2>
                        <p className="text-[#9A9A9A] mb-8 leading-relaxed">Passez en ligne pour commencer à recevoir des demandes de courses à proximité.</p>
                        <Button
                            onClick={handleToggleOnline}
                            className="w-full h-16 bg-[#F0B90B] text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(240,185,11,0.2)]"
                        >
                            <Power className="w-6 h-6" />
                            COMMENCER L&apos;SERVICE
                        </Button>
                        {filteredRides.length > 0 && (
                            <div className="mt-8 flex items-center justify-center gap-2 text-[#F0B90B] text-xs font-bold uppercase tracking-widest">
                                <TrendingUp className="w-4 h-4" />
                                <span>{filteredRides.length} clients attendent en ce moment</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
