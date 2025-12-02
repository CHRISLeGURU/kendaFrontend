import React from "react";
import { Share2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActiveRideOverlayProps {
    remainingTime: string; // e.g., "12 min"
    remainingDistance: string; // e.g., "4.5 km"
    arrivalTime: string; // e.g., "14:35"
    className?: string;
}

export const ActiveRideOverlay = ({
    remainingTime,
    remainingDistance,
    arrivalTime,
    className,
}: ActiveRideOverlayProps) => {
    return (
        <div
            className={cn(
                "absolute top-4 left-4 right-4 z-[1000]",
                "flex flex-col gap-4",
                className
            )}
        >
            {/* Main Info Card */}
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-6 shadow-2xl backdrop-blur-sm bg-opacity-95">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#9A9A9A] text-sm font-medium font-sans mb-1">
                            Estimated Arrival
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white font-heading">
                                {remainingTime}
                            </span>
                            <span className="text-lg font-medium text-[#9A9A9A]">
                                ({remainingDistance})
                            </span>
                        </div>
                        <span className="text-[#F0B90B] text-sm font-medium mt-1">
                            Arrival at {arrivalTime}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="bg-[#1A1A1A] hover:bg-[#2A2A2A] border-[#2A2A2A] text-white h-10 w-10 p-0 rounded-full"
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            className="bg-[#FF4747]/10 hover:bg-[#FF4747]/20 border border-[#FF4747]/20 text-[#FF4747] h-10 w-10 p-0 rounded-full"
                        >
                            <ShieldAlert className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Progress Bar (Visual indicator) */}
                <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full mt-6 overflow-hidden">
                    <div
                        className="h-full bg-[#F0B90B] rounded-full animate-pulse"
                        style={{ width: "65%" }}
                    />
                </div>
            </div>
        </div>
    );
};
