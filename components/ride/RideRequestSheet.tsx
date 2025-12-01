"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RideRequestSheetProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const RideRequestSheet = ({ isOpen = true, onClose }: RideRequestSheetProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            {/* Backdrop (Optional - uncomment if needed) */}
            {/* <div className="absolute inset-0 bg-black/50 pointer-events-auto" onClick={onClose} /> */}

            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn(
                    "w-full max-w-md pointer-events-auto",
                    "bg-[#0C0C0C] border-t border-[#1A1A1A]",
                    "rounded-t-[24px] p-6 pb-8",
                    "shadow-2xl"
                )}
            >
                {/* Handle */}
                <div className="w-12 h-1.5 bg-[#2A2A2A] rounded-full mx-auto mb-8" />

                {/* Title */}
                <h2 className="text-2xl font-heading font-bold text-white mb-6">
                    Order a ride
                </h2>

                {/* Inputs Section */}
                <div className="space-y-4 mb-8">
                    {/* Departure Input */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F0B90B]">
                            <Navigation className="w-5 h-5 fill-current" />
                        </div>
                        <Input
                            defaultValue="My current location"
                            className="pl-12 bg-[#151515] border-[#1A1A1A] text-white placeholder:text-[#9A9A9A] focus-visible:ring-[#F0B90B]/50"
                        />
                    </div>

                    {/* Destination Input */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <Input
                            placeholder="Where are you going?"
                            className="pl-12 bg-[#151515] border-[#1A1A1A] text-white placeholder:text-[#9A9A9A] focus-visible:ring-[#F0B90B]/50"
                        />
                    </div>
                </div>

                {/* Estimation Section */}
                <div className="flex items-center justify-between mb-8 px-1">
                    <div className="flex flex-col">
                        <span className="text-[#9A9A9A] text-sm font-medium mb-1">Estimated price</span>
                        <span className="text-3xl font-bold text-white font-heading">5000 FC</span>
                    </div>

                    <div className="flex items-center gap-3 bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#2A2A2A]">
                        <Clock className="w-4 h-4 text-[#F0B90B]" />
                        <span className="text-[#9A9A9A] text-sm font-medium">~3 min</span>
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full h-14 text-lg font-bold bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 rounded-xl"
                >
                    Order Taxi
                </Button>

            </motion.div>
        </div>
    );
};
