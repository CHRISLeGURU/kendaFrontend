"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { MapPin, Navigation, Clock, X, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { type DriverLocation } from "@/types";

interface RideRequestSheetProps {
    isOpen?: boolean;
    onClose?: () => void;
    destination?: [number, number] | null;
    distance?: number;
    onOrder?: () => void;
    selectedDriver?: DriverLocation | null;
    onDriverClear?: () => void;
}

export const RideRequestSheet = ({
    isOpen = true,
    onClose,
    destination: externalDestination,
    distance: externalDistance = 0,
    onOrder,
    selectedDriver,
    onDriverClear
}: RideRequestSheetProps) => {
    const t = useTranslations('Ride');
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);

    // Fetch exchange rate on mount
    useEffect(() => {
        const fetchRate = async () => {
            const { data } = await import('@/services/walletService').then(m => m.getExchangeRate());
            if (data) {
                setExchangeRate(data.ada_to_fc);
            }
        };
        fetchRate();
    }, []);

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
                    "rounded-t-[24px] p-6 pb-[calc(6rem+env(safe-area-inset-bottom))]",
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
                    {t('orderRide')}
                </h2>

                {/* Selected Driver Banner */}
                {selectedDriver && (
                    <div className="mb-6 bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden border border-yellow-500">
                                {/* Ideally use Image component here or Avatar */}
                                <span className="text-yellow-500 font-bold">{selectedDriver.driver_name?.[0]}</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Demande directe à :</p>
                                <p className="text-yellow-500 font-heading text-lg leading-none">{selectedDriver.driver_name}</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onDriverClear}
                            className="text-neutral-400 hover:text-white h-8 w-8 p-0"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                )}

                {/* Inputs Section */}
                <div className="space-y-4 mb-8">
                    {/* Departure Input */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F0B90B] z-10">
                            <Navigation className="w-5 h-5 fill-current" />
                        </div>
                        <Input
                            defaultValue={t('currentPosition')}
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
                                    {t('destinationSelected', { distance: externalDistance.toFixed(2) })}
                                </span>
                            ) : (
                                <span className="text-[#9A9A9A] text-sm">
                                    {t('selectDestination')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Estimation Section */}
                {estimatedPrice && estimatedTime ? (
                    <div className="flex items-center justify-between mb-8 px-1">
                        <div className="flex flex-col">
                            <span className="text-[#9A9A9A] text-sm font-medium mb-1">{t('estimatedPrice')}</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white font-heading">
                                    {estimatedPrice.toLocaleString()} FC
                                </span>
                                {exchangeRate && (
                                    <span className="text-sm text-[#F0B90B] font-medium">
                                        (~{(estimatedPrice / exchangeRate).toFixed(2)} ₳)
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#2A2A2A]">
                            <Clock className="w-4 h-4 text-[#F0B90B]" />
                            <span className="text-[#9A9A9A] text-sm font-medium">~{estimatedTime} min</span>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 px-1 py-4 text-center">
                        <span className="text-[#9A9A9A] text-sm">
                            {t('enterDestination')}
                        </span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* Schedule Button */}
                    <button
                        disabled={!externalDestination || !estimatedPrice}
                        onClick={() => {
                            // TODO: Open DatePicker modal
                            alert(t('scheduleRide'));
                        }}
                        className={cn(
                            "flex items-center justify-center h-14 w-14 rounded-xl border transition-all",
                            "bg-[#1A1A1A] border-[#333333] text-white hover:bg-[#252525]",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        title={t('scheduleRide')}
                    >
                        <CalendarClock className="w-6 h-6" />
                    </button>

                    {/* Order Button */}
                    <Button
                        disabled={!externalDestination || !estimatedPrice}
                        onClick={onOrder}
                        className="flex-1 h-14 text-lg font-bold bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('orderTaxi')}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
