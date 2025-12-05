"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Menu, Loader2, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { RideRequestSheet } from "@/components/ride/RideRequestSheet";
import { DriverTrustCard } from "@/components/driver/DriverTrustCard";
import { ActiveRideOverlay } from "@/components/ride/ActiveRideOverlay";
import { RideRatingScreen } from "@/components/ride/RideRatingScreen";
import { SafetyToolkit } from "@/components/ride/SafetyToolkit";
import { Button } from "@/components/ui/button";

// Dynamic import with SSR disabled to avoid "window is not defined" error from Leaflet
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#0C0C0C] text-white">
            <Loader2 className="w-8 h-8 animate-spin text-[#F0B90B]" />
        </div>
    ),
});

type Step = 'IDLE' | 'SELECTING' | 'SEARCHING' | 'RIDE_ACTIVE' | 'RIDE_COMPLETED';

export default function MapPage() {
    const [step, setStep] = useState<Step>('IDLE');
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [distance, setDistance] = useState<number>(0);

    // Mock Ride Data (calculated based on distance for realism)
    const rideTime = Math.ceil(distance * 2) + " min";
    const rideDistance = distance.toFixed(1) + " km";
    const arrivalTime = new Date(Date.now() + Math.ceil(distance * 2) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Calculate price for rating screen
    const estimatedPrice = (2000 + (500 * distance)).toLocaleString() + " FC";

    const handleDestinationChange = (dest: [number, number] | null, dist: number) => {
        setDestination(dest);
        setDistance(dist);
        if (dest && step === 'IDLE') {
            setStep('SELECTING');
        }
    };

    const handleOrder = () => {
        setStep('SEARCHING');
        // Simulate finding a driver
        setTimeout(() => {
            setStep('RIDE_ACTIVE');
        }, 2500);
    };

    // Simulate ride completion for demo purposes
    useEffect(() => {
        if (step === 'RIDE_ACTIVE') {
            const timer = setTimeout(() => {
                setStep('RIDE_COMPLETED');
            }, 8000); // Ride finishes after 8 seconds for demo
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleRatingComplete = () => {
        setStep('IDLE');
        setDestination(null);
        setDistance(0);
    };

    return (
        <main className="relative w-full h-full overflow-hidden bg-black">
            {/* Map Background (z-0) - Covers EVERYTHING */}
            <div className="absolute inset-0 z-0">
                <MapComponent onDestinationChange={handleDestinationChange} />
            </div>

            {/* Floating Header (App Shell) */}
            <header className="absolute top-0 left-0 right-0 z-40 p-4 pt-safe flex items-center justify-between pointer-events-none">
                {/* Left: Menu/Back */}
                <div className="pointer-events-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-[#0C0C0C] text-white rounded-full h-10 w-10 shadow-lg border border-[#1A1A1A]"
                        onClick={() => window.location.href = '/'} // Or open menu
                    >
                        {step === 'IDLE' ? <Menu className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    </Button>
                </div>

                {/* Center: Title */}
                <h1 className="font-heading font-bold text-lg text-white drop-shadow-md tracking-wide pointer-events-auto">
                    {step === 'IDLE' ? 'KENDA' : 'Ride'}
                </h1>

                {/* Right: Notifications/SOS */}
                <div className="pointer-events-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-[#0C0C0C] text-white rounded-full h-10 w-10 shadow-lg border border-[#1A1A1A]"
                        onClick={() => {
                            if (step !== 'RIDE_ACTIVE') {
                                window.location.href = '/notifications';
                            }
                        }}
                    >
                        {step === 'RIDE_ACTIVE' ? (
                            <SafetyToolkit />
                        ) : (
                            <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white" /> // Notification dot placeholder or Bell icon
                        )}
                    </Button>
                </div>
            </header>

            {/* UI Overlays */}
            <div className="relative z-10 pointer-events-none h-full flex flex-col justify-end pb-[calc(4rem+env(safe-area-inset-bottom))]">
                {/* pb-safe + nav height (approx 4rem) */}

                {/* IDLE State: Floating Action Button */}
                <AnimatePresence>
                    {step === 'IDLE' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="p-4 pointer-events-auto"
                        >
                            <Button
                                onClick={() => setStep('SELECTING')}
                                className="w-full h-14 bg-[#F0B90B] text-black font-bold text-lg rounded-xl shadow-lg hover:bg-[#F0B90B]/90"
                            >
                                Where to?
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SELECTING State: Bottom Sheet */}
                {/* We place this outside the padded container if we want it to cover the nav bar, 
                    but user said "pb-24... pour que le contenu ne soit pas caché". 
                    However, drawers usually cover nav bars. 
                    I'll keep it here but ensure it has high z-index if needed. 
                    Actually, RideRequestSheet is likely a drawer. 
                */}
                <div className="pointer-events-auto">
                    <RideRequestSheet
                        isOpen={step === 'SELECTING'}
                        onClose={() => setStep('IDLE')}
                        destination={destination}
                        distance={distance}
                        onOrder={handleOrder}
                    />
                </div>

                {/* SEARCHING State: Loader Overlay */}
                <AnimatePresence>
                    {step === 'SEARCHING' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 pointer-events-auto"
                        >
                            <div className="bg-[#0C0C0C] p-8 rounded-2xl border border-[#1A1A1A] flex flex-col items-center shadow-2xl">
                                <Loader2 className="w-12 h-12 text-[#F0B90B] animate-spin mb-4" />
                                <h3 className="text-white font-heading font-bold text-xl mb-2">Searching...</h3>
                                <p className="text-[#9A9A9A] text-sm">Contacting drivers</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* RIDE_ACTIVE State: Driver Card & Info */}
                <AnimatePresence>
                    {step === 'RIDE_ACTIVE' && (
                        <div className="pointer-events-auto w-full flex flex-col gap-4 p-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <DriverTrustCard
                                    driverName="Jean-Pierre M."
                                    driverImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60"
                                    vehicleModel="Toyota Corolla"
                                    plateNumber="KV 1234 BB"
                                    isVerified={true}
                                    rating={4.9}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <ActiveRideOverlay
                                    remainingTime={rideTime}
                                    remainingDistance={rideDistance}
                                    arrivalTime={arrivalTime}
                                    className="static"
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIDE_COMPLETED State: Rating Screen (Full Screen Overlay) */}
            <AnimatePresence>
                {step === 'RIDE_COMPLETED' && (
                    <div className="absolute inset-0 z-[60] bg-black">
                        <RideRatingScreen
                            price={estimatedPrice}
                            onComplete={handleRatingComplete}
                        />
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
