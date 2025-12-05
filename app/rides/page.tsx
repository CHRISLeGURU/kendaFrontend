"use client";

import React from "react";
import { Clock, MapPin, Calendar, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const RIDES = [
    {
        id: "1",
        date: "Aujourd'hui, 14:30",
        from: "Entrée Président",
        to: "Marché Birere",
        price: "3000 FC",
        status: "COMPLETED",
    },
    {
        id: "2",
        date: "Hier, 09:15",
        from: "Port de Goma",
        to: "Rond-point Signers",
        price: "2500 FC",
        status: "COMPLETED",
    },
    {
        id: "3",
        date: "03 Dec, 18:00",
        from: "Hôtel Serena",
        to: "Aéroport International",
        price: "5000 FC",
        status: "COMPLETED",
    },
    {
        id: "4",
        date: "01 Dec, 12:45",
        from: "ULPGL",
        to: "Centre-ville",
        price: "1500 FC",
        status: "CANCELLED",
    },
    {
        id: "5",
        date: "28 Nov, 08:30",
        from: "Ndosho",
        to: "Hôpital Général",
        price: "2000 FC",
        status: "COMPLETED",
    }
];

export default function RidesPage() {
    return (
        <main className="h-full overflow-y-auto bg-black text-white pt-safe pb-32 px-4">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 mb-6 border-b border-[#1A1A1A]">
                <h1 className="text-xl font-heading font-bold text-white">
                    Vos Activités
                </h1>
            </header>

            {/* Content */}
            <div className="space-y-4">
                {RIDES.length > 0 ? (
                    RIDES.map((ride) => (
                        <RideCard key={ride.id} ride={ride} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-[#9A9A9A]">
                        <Clock className="w-12 h-12 mb-4 opacity-50" />
                        <p>Aucune course pour le moment</p>
                    </div>
                )}
            </div>
        </main>
    );
}

function RideCard({ ride }: { ride: typeof RIDES[0] }) {
    const isCompleted = ride.status === "COMPLETED";

    return (
        <div className="bg-[#0C0C0C] rounded-2xl border border-[#1A1A1A] p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform">
            {/* Header: Date & Status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#9A9A9A]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ride.date}</span>
                </div>
                <div className={cn(
                    "flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full border",
                    isCompleted
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                )}>
                    {isCompleted ? "TERMINÉ" : "ANNULÉ"}
                </div>
            </div>

            {/* Route */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1 h-full py-1">
                    <div className="w-2 h-2 rounded-full bg-[#9A9A9A]" />
                    <div className="w-0.5 h-6 bg-[#1A1A1A]" />
                    <div className="w-2 h-2 rounded-full bg-[#F0B90B]" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div>
                        <p className="text-xs text-[#9A9A9A] mb-0.5">De</p>
                        <p className="text-sm font-bold text-white leading-tight">{ride.from}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#9A9A9A] mb-0.5">À</p>
                        <p className="text-sm font-bold text-white leading-tight">{ride.to}</p>
                    </div>
                </div>
            </div>

            {/* Footer: Price */}
            <div className="mt-1 pt-3 border-t border-[#1A1A1A] flex justify-end">
                <span className="text-lg font-heading font-bold text-[#F0B90B]">
                    {ride.price}
                </span>
            </div>
        </div>
    );
}
