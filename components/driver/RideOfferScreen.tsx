import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, DollarSign, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Ride } from "@/types"; // Assurez-vous que Ride est exporté depuis types

interface RideOfferProps {
    ride: any; // Utiliser 'any' temporairement si le type Ride pose problème, sinon Ride
    onAccept: () => void;
    onDecline: () => void;
    autoDecline?: boolean;
}

export default function RideOfferScreen({ ride, onAccept, onDecline, autoDecline = true }: RideOfferProps) {
    const [progress, setProgress] = useState(100);

    // Countdown timer (e.g. 15 seconds)
    useEffect(() => {
        if (!autoDecline) return;

        const duration = 15000; // 15s
        const step = 100;
        const interval = setInterval(() => {
            setProgress(prev => {
                const newVal = prev - (step / duration) * 100;
                if (newVal <= 0) {
                    clearInterval(interval);
                    onDecline(); // Auto decline
                    return 0;
                }
                return newVal;
            });
        }, step);

        return () => clearInterval(interval);
    }, [onDecline, autoDecline]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute inset-x-0 bottom-0 z-50 bg-[#0A0A0A] rounded-t-3xl border-t border-white/10 shadow-2xl p-6 pb-safe"
            >
                {/* Header: New Ride Alert */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-1">Nouvelle Course !</h2>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-500/20 text-green-500 text-xs font-bold px-2 py-1 rounded-full">
                                {ride.distance_km ? `${ride.distance_km} KM` : '-- KM'}
                            </span>
                            <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-full">
                                ~{ride.duration_minutes || '--'} MIN
                            </span>
                        </div>
                    </div>
                    {/* Price - Large */}
                    <div className="text-right">
                        <p className="text-3xl font-heading font-extrabold text-[#F0B90B]">
                            {ride.price?.toLocaleString()} <span className="text-lg text-white/60">FC</span>
                        </p>
                        <p className="text-xs text-[#9A9A9A] uppercase tracking-wider">Prix Estimé</p>
                    </div>
                </div>

                {/* Route Details */}
                <div className="space-y-6 mb-8 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[19px] top-3 bottom-8 w-0.5 bg-gradient-to-b from-white/50 to-[#F0B90B]/50" />

                    {/* Pickup */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 z-10 shrink-0">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-xs text-[#9A9A9A] uppercase font-bold tracking-wider mb-1">Point de Départ</p>
                            <p className="text-lg font-bold text-white leading-tight">
                                {ride.pickup_address || "Position actuelle"}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-[#666]">
                                <Navigation className="w-3 h-3" />
                                <span>1.2km de votre position</span>
                            </div>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F0B90B]/20 flex items-center justify-center border border-[#F0B90B] z-10 shrink-0">
                            <Navigation className="w-5 h-5 text-[#F0B90B]" />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-xs text-[#9A9A9A] uppercase font-bold tracking-wider mb-1">Destination</p>
                            <p className="text-lg font-bold text-white leading-tight">
                                {ride.dest_address || ride.destination_address || "Destination"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-6">
                    <motion.div
                        className="h-full bg-[#F0B90B]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        onClick={onDecline}
                        className="h-16 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white font-bold text-lg"
                    >
                        <X className="w-6 h-6 mr-2" />
                        Refuser
                    </Button>
                    <Button
                        onClick={onAccept}
                        className="h-16 rounded-2xl bg-[#F0B90B] text-black hover:bg-[#D4A50A] font-bold text-lg shadow-[0_4px_20px_rgba(240,185,11,0.3)]"
                    >
                        Accepter la Course
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
