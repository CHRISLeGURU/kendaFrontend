"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, X, ChevronRight, Car, Bike, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type DriverLocation } from "@/types";

interface DriverPickerSheetProps {
    isOpen: boolean;
    onClose: () => void;
    drivers: DriverLocation[];
    selectedRideType: string;
    onSelect: (driver: DriverLocation) => void;
    estimatedPrice: number;
}

export const DriverPickerSheet = ({
    isOpen,
    onClose,
    drivers,
    selectedRideType,
    onSelect,
    estimatedPrice
}: DriverPickerSheetProps) => {
    // Filter drivers by vehicle type
    const vehicleTypeMapping: Record<string, string> = {
        'kenda_go': 'TAXI',
        'kenda_comfort': 'TAXI',
        'kenda_moto': 'MOTO'
    };

    const targetVehicleType = vehicleTypeMapping[selectedRideType];
    const filteredDrivers = drivers.filter(d => d.vehicle_type === targetVehicleType);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-lg bg-[#0F0F0F] rounded-t-[32px] overflow-hidden pointer-events-auto shadow-[0_-8px_30px_rgb(0,0,0,0.5)] border-t border-[#1F1F1F]"
            >
                {/* Header */}
                <div className="p-6 pb-2 border-b border-[#1A1A1A]">
                    <div className="w-10 h-1 bg-[#2F2F2F] rounded-full mx-auto mb-4" />
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Chauffeurs à proximité</h2>
                            <p className="text-xs text-[#9A9A9A] mt-1">
                                {filteredDrivers.length} chauffeurs disponibles pour {selectedRideType === 'kenda_moto' ? 'Moto' : 'Voiture'}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors">
                            <X className="w-6 h-6 text-[#9A9A9A]" />
                        </button>
                    </div>
                </div>

                {/* Scrolled List */}
                <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-4 space-y-3">
                    {filteredDrivers.length > 0 ? (
                        filteredDrivers.map((driver) => (
                            <motion.button
                                key={driver.driver_id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelect(driver)}
                                className="w-full group relative flex items-center gap-4 p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl hover:border-[#F0B90B] transition-all"
                            >
                                {/* Driver Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center border-2 border-[#3A3A3A] group-hover:border-[#F0B90B]/50 overflow-hidden">
                                        {/* Ideally an Image here */}
                                        <span className="text-[#F0B90B] font-bold text-xl uppercase">
                                            {driver.driver_name?.[0]}
                                        </span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F0B90B] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
                                        <Star className="w-3 h-3 text-black fill-current" />
                                    </div>
                                </div>

                                {/* Driver Info */}
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-bold">{driver.driver_name}</span>
                                        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                            <ShieldCheck className="w-3 h-3 text-green-500" />
                                            <span className="text-[10px] font-bold text-green-500 tracking-wider">VÉRIFIÉ</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-1 text-[#9A9A9A] text-xs">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-[#F0B90B] fill-current" />
                                            <span className="font-bold text-white">{driver.rating || '4.9'}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-[#3A3A3A]" />
                                        <span>4 min d&apos;attente</span>
                                    </div>
                                </div>

                                {/* Price / Action */}
                                <div className="text-right">
                                    <p className="text-[#F0B90B] font-bold text-lg">
                                        {estimatedPrice.toLocaleString()} FC
                                    </p>
                                    <div className="flex items-center justify-end text-[#9A9A9A] text-[10px] mt-1 group-hover:text-white transition-colors">
                                        <span>Choisir</span>
                                        <ChevronRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </motion.button>
                        ))
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                            <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4">
                                {targetVehicleType === 'MOTO' ? <Bike className="w-10 h-10" /> : <Car className="w-10 h-10" />}
                            </div>
                            <p className="text-white font-medium">Aucun chauffeur disponible</p>
                            <p className="text-[#9A9A9A] text-sm mt-1">Réessayez dans quelques instants</p>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-[#121212] border-t border-[#1F1F1F]">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full h-14 rounded-2xl border-[#333] text-white hover:bg-[#1A1A1A]"
                    >
                        Changer le trajet
                    </Button>
                </div>
                <div className="h-[env(safe-area-inset-bottom)]" />
            </motion.div>
        </div>
    );
};
