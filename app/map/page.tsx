"use client";

import { useState, useEffect } from "react";
import { Menu, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MapComponent from "@/components/map/MapComponent";
import { RideRequestSheet } from "@/components/ride/RideRequestSheet";
import { DriverTrustCard } from "@/components/driver/DriverTrustCard";
import { ActiveRideOverlay } from "@/components/ride/ActiveRideOverlay";
import { Button } from "@/components/ui/button";

type Step = 'IDLE' | 'SELECTING' | 'SEARCHING' | 'RIDE_ACTIVE';

export default function MapPage() {
    const [step, setStep] = useState<Step>('IDLE');
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [distance, setDistance] = useState<number>(0);

    // Mock Ride Data (calculated based on distance for realism)
    const rideTime = Math.ceil(distance * 2) + " min";
    const rideDistance = distance.toFixed(1) + " km";
    const arrivalTime = new Date(Date.now() + Math.ceil(distance * 2) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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

    return (
        <main className="relative h-screen w-full overflow-hidden bg-black">
            {/* Map Background (z-0) */}
            <div className="absolute inset-0 z-0">
                <MapComponent onDestinationChange={handleDestinationChange} />
            </div>

            {/* Header Overlay (Always visible) */}
            <header className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <Button
                    variant="ghost"
                    size="sm"
                    className="pointer-events-auto text-white bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 h-10 w-10 p-0"
                >
                    <Menu className="w-6 h-6" />
                </Button>
                <h1 className="font-heading font-bold text-xl text-white drop-shadow-md tracking-wide">
                    KENDA
                </h1>
                <div className="w-10" /> {/* Spacer for centering */}
            </header>

            {/* UI Overlays based on Step */}
            <div className="relative z-10 pointer-events-none h-full flex flex-col">

                {/* IDLE State: Floating Action Button */}
                <AnimatePresence>
                    {step === 'IDLE' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-4 right-4 pointer-events-auto"
                        >
                            <Button
                                onClick={() => setStep('SELECTING')}
                                className="w-full h-14 bg-[#F0B90B] text-black font-bold text-lg rounded-xl shadow-lg hover:bg-[#F0B90B]/90"
                            >
                                Où allez-vous ?
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SELECTING State: Bottom Sheet */}
                <RideRequestSheet
                    isOpen={step === 'SELECTING'}
                    onClose={() => setStep('IDLE')}
                    destination={destination}
                    distance={distance}
                    onOrder={handleOrder}
                />

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
                                <h3 className="text-white font-heading font-bold text-xl mb-2">Recherche d'un chauffeur...</h3>
                                <p className="text-[#9A9A9A] text-sm">Nous contactons les chauffeurs à proximité</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* RIDE_ACTIVE State: Driver Card & Info Overlay */}
                <AnimatePresence>
                    {step === 'RIDE_ACTIVE' && (
                        <>
                            {/* Top: Driver Card */}
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-20 left-4 right-4 pointer-events-auto"
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

                            {/* Bottom: Ride Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-0 left-0 right-0 pointer-events-auto"
                            >
                                <ActiveRideOverlay
                                    remainingTime={rideTime}
                                    remainingDistance={rideDistance}
                                    arrivalTime={arrivalTime}
                                    className="relative bottom-8"
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </div>
        </main>
    );
}
