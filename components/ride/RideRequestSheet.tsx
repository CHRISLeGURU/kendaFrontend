"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { MapPin, Navigation, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RideRequestSheetProps {
    isOpen?: boolean;
    onClose?: () => void;
    destination?: [number, number] | null;
    distance?: number;
    onOrder?: () => void;
}

export const RideRequestSheet = ({
    isOpen = true,
    onClose,
    destination: externalDestination,
    distance: externalDistance = 0,
    onOrder
}: RideRequestSheetProps) => {
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

    // Calculate price based on distance from map
    useEffect(() => {
        if (externalDestination && externalDistance > 0) {
            const basePrice = 2000;
            const pricePerKm = 500;
            const calculatedPrice = basePrice + (pricePerKm * externalDistance);
            const calculatedTime = Math.ceil(externalDistance * 2); // ~2 min per km

            setEstimatedPrice(Math.round(calculatedPrice));
            setEstimatedTime(calculatedTime);
        } else {
            setEstimatedPrice(null);
            setEstimatedTime(null);
        }
    }, [externalDestination, externalDistance]);

    // Handle drag to close
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 150; // Minimum drag distance to close
        if (info.offset.y > threshold) {
            onClose?.();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? 0 : "100%" }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn(
                    "w-full max-w-md pointer-events-auto",
                    "bg-[#0C0C0C] border-t border-[#1A1A1A]",
                    "rounded-t-[24px] p-6 pb-[calc(2rem+env(safe-area-inset-bottom))]",
                    "shadow-2xl relative"
                )}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#9A9A9A] hover:text-white transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Drag Handle */}
                <div className="w-12 h-1.5 bg-[#2A2A2A] rounded-full mx-auto mb-8 cursor-grab active:cursor-grabbing" />

                {/* Title */}
                <h2 className="text-2xl font-heading font-bold text-white mb-6">
                    Commander une course
                </h2>

                {/* Inputs Section */}
                <div className="space-y-4 mb-8">
                    {/* Departure Input */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F0B90B] z-10">
                            <Navigation className="w-5 h-5 fill-current" />
                        </div>
                        <Input
                            defaultValue="Ma position actuelle"
                            className="pl-12 bg-[#151515] border-[#1A1A1A] text-white placeholder:text-[#9A9A9A] focus-visible:ring-[#F0B90B]/50"
                            readOnly
                        />
                    </div>

                    {/* Destination Display */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] z-10">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="pl-12 pr-4 h-11 bg-[#151515] border border-[#1A1A1A] text-white rounded-button flex items-center">
                            {externalDestination ? (
                                <span className="text-sm">
                                    Destination sélectionnée ({externalDistance.toFixed(2)} km)
                                </span>
                            ) : (
                                <span className="text-[#9A9A9A] text-sm">
                                    Cliquez sur la carte pour choisir la destination
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Estimation Section */}
                {estimatedPrice && estimatedTime ? (
                    <div className="flex items-center justify-between mb-8 px-1">
                        <div className="flex flex-col">
                            <span className="text-[#9A9A9A] text-sm font-medium mb-1">Prix estimé</span>
                            <span className="text-3xl font-bold text-white font-heading">
                                {estimatedPrice.toLocaleString()} FC
                            </span>
                        </div>

                        <div className="flex items-center gap-3 bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#2A2A2A]">
                            <Clock className="w-4 h-4 text-[#F0B90B]" />
                            <span className="text-[#9A9A9A] text-sm font-medium">~{estimatedTime} min</span>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 px-1 py-4 text-center">
                        <span className="text-[#9A9A9A] text-sm">
                            Entrez une destination pour voir l&apos;estimation du prix
                        </span>
                    </div>
                )}

                {/* Action Button */}
                <Button
                    disabled={!externalDestination || !estimatedPrice}
                    onClick={onOrder}
                    className="w-full h-14 text-lg font-bold bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Commander un Taxi
                </Button>
            </motion.div>
        </div>
    );
};
