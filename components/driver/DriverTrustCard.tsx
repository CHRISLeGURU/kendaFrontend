import React from "react";
import { BadgeCheck, Star, ShieldCheck, Lock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DriverTrustCardProps {
    driverName: string;
    driverImage: string;
    vehicleModel: string;
    plateNumber: string;
    isVerified: boolean;
    rating: number;
    className?: string;
}

export const DriverTrustCard = ({
    driverName,
    driverImage,
    vehicleModel,
    plateNumber,
    isVerified,
    rating,
    className,
}: DriverTrustCardProps) => {
    return (
        <div
            className={cn(
                "bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-6 shadow-sm",
                "flex flex-col gap-4",
                className
            )}
        >
            <div className="flex items-center gap-4">
                {/* Avatar Section */}
                <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1A1A1A] relative">
                        <Image
                            src={driverImage}
                            alt={driverName}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Verified Badge Overlay on Avatar (Optional, but adds trust) */}
                    {isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-[#0C0C0C] rounded-full p-0.5">
                            <ShieldCheck className="w-5 h-5 text-[#F0B90B] fill-current" />
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-lg text-white truncate">
                            {driverName}
                        </h3>
                        {isVerified && (
                            <div className="flex items-center gap-1 bg-[#F0B90B]/10 px-2 py-0.5 rounded-full border border-[#F0B90B]/20">
                                <BadgeCheck className="w-3 h-3 text-[#F0B90B]" />
                                <span className="text-[10px] font-bold text-[#F0B90B] uppercase tracking-wide">
                                    Vérifié
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <p className="font-sans font-medium text-sm text-[#9A9A9A]">
                            {vehicleModel}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="bg-[#1A1A1A] px-2 py-0.5 rounded text-xs font-mono text-[#9A9A9A] border border-[#2A2A2A]">
                                {plateNumber}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex flex-col items-end gap-1 self-start">
                    <div className="flex items-center gap-1 bg-[#1A1A1A] px-2 py-1 rounded-lg border border-[#2A2A2A]">
                        <Star className="w-3.5 h-3.5 text-[#F0B90B] fill-[#F0B90B]" />
                        <span className="font-heading font-bold text-sm text-white">
                            {rating.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Secured by Cardano Footer */}
            <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#1A1A1A]/50">
                <Lock className="w-3 h-3 text-[#0033AD]" />
                <span className="text-[10px] font-medium text-[#9A9A9A]">
                    Sécurisé par <span className="text-[#0033AD] font-bold">Cardano</span>
                </span>
            </div>
        </div>
    );
};
