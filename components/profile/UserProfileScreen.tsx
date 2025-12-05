"use client";

import React from "react";
import {
    User,
    Shield,
    Star,
    Clock,
    Calendar,
    CheckCircle2,
    XCircle,
    Wallet,
    Settings,
    HelpCircle,
    LogOut,
    ChevronRight,
    CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock Data for Ride History
const MOCK_RIDES = [
    {
        id: "1",
        date: "Aujourd'hui, 08:30",
        from: "Majengo",
        to: "Centre-ville",
        price: "2500 FC",
        status: "COMPLETED",
        distance: "4.2 km"
    },
    {
        id: "2",
        date: "Hier, 18:15",
        from: "Himbi",
        to: "Aéroport Intl. Goma",
        price: "5000 FC",
        status: "COMPLETED",
        distance: "8.5 km"
    },
    {
        id: "3",
        date: "02 Dec, 14:00",
        from: "Université de Goma",
        to: "Katindo",
        price: "1500 FC",
        status: "CANCELLED",
        distance: "2.1 km"
    }
];

export function UserProfileScreen() {
    return (
        <div className="h-full overflow-y-auto bg-background text-foreground pb-24">
            {/* Header Section */}
            <div className="relative pt-safe bg-gradient-to-b from-background-secondary to-background border-b border-border">
                <div className="flex flex-col items-center pt-8 pb-8 px-4">
                    {/* Avatar & Badge */}
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-background-secondary border-2 border-border flex items-center justify-center overflow-hidden shadow-xl">
                            <User className="w-10 h-10 text-foreground-secondary" />
                            {/* In a real app, use <img src={user.avatar} /> */}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground rounded-full p-1.5 border-4 border-background">
                            <Shield className="w-3.5 h-3.5 fill-current" />
                        </div>
                    </div>

                    {/* User Info */}
                    <h1 className="text-2xl font-heading font-bold text-foreground mb-1 text-center">
                        Alexandre K.
                    </h1>
                    <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1 rounded-full border border-accent/20 mb-6">
                        <Shield className="w-3 h-3 text-accent fill-current" />
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wide">
                            Passager Vérifié
                        </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                        <StatBlock
                            label="Courses"
                            value="42"
                        />
                        <StatBlock
                            label="Note"
                            value="4.9"
                            icon={<Star className="w-3 h-3 text-accent fill-current ml-1" />}
                        />
                        <StatBlock
                            label="Km Total"
                            value="128"
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Wallet Section */}
                <Card className="bg-background-secondary/50 border-border overflow-hidden">
                    <div className="p-0">
                        <div className="flex items-center justify-between p-4 pb-2">
                            <div className="flex items-center gap-2 text-foreground-secondary font-medium text-sm">
                                <Wallet className="w-4 h-4 text-accent" />
                                <span>Solde Portefeuille</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 text-accent hover:text-accent hover:bg-accent/10 px-2 -mr-2">
                                historique <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <div className="px-4 pb-4">
                            <div className="text-3xl font-heading font-bold text-foreground mb-4">
                                12.500 <span className="text-lg text-foreground-secondary font-sans font-medium">FC</span>
                            </div>
                            <Button className="w-full h-12 font-bold shadow-lg shadow-accent/20">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Recharger mon compte
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Settings & Support Menu */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-foreground-secondary uppercase tracking-wider px-1">
                        Compte & Paramètres
                    </h3>
                    <div className="bg-background-secondary rounded-xl border border-border overflow-hidden divide-y divide-border/50">
                        <MenuItem
                            icon={<User className="w-5 h-5" />}
                            label="Informations personnelles"
                        />
                        <MenuItem
                            icon={<Settings className="w-5 h-5" />}
                            label="Préférences de l'application"
                        />
                        <MenuItem
                            icon={<Shield className="w-5 h-5" />}
                            label="Confidentialité et sécurité"
                        />
                        <MenuItem
                            icon={<HelpCircle className="w-5 h-5" />}
                            label="Aide & Support"
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-bold text-foreground-secondary uppercase tracking-wider">
                            Derniers Trajets
                        </h3>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-accent hover:bg-transparent">
                            Tout voir
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {MOCK_RIDES.map((ride) => (
                            <RideCard key={ride.id} ride={ride} />
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive h-12 mt-4">
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                </Button>

                <div className="text-center pb-safe">
                    <p className="text-[10px] text-foreground-secondary/50">
                        Version 1.0.2 • KENDA App
                    </p>
                </div>
            </div>
        </div>
    );
}

// --- Sub-components ---

function StatBlock({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center p-3 bg-background-secondary/80 rounded-xl border border-border backdrop-blur-sm">
            <div className="flex items-center text-lg font-bold text-foreground mb-0.5">
                {value}
                {icon}
            </div>
            <span className="text-[10px] text-foreground-secondary uppercase tracking-wider font-semibold">
                {label}
            </span>
        </div>
    );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 active:bg-white/10 transition-colors"
        >
            <div className="flex items-center gap-3 text-foreground">
                <span className="text-foreground-secondary">{icon}</span>
                <span className="font-medium text-sm">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-foreground-secondary/50" />
        </button>
    );
}

function RideCard({ ride }: { ride: typeof MOCK_RIDES[0] }) {
    const isCompleted = ride.status === "COMPLETED";

    return (
        <div className="group flex flex-col bg-background-secondary rounded-xl border border-border p-4 active:scale-[0.99] transition-all duration-200 hover:border-border/80">
            {/* Top Row: Date & Status */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-foreground-secondary font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ride.date}</span>
                </div>
                {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>TERMINÉ</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                        <XCircle className="w-3 h-3" />
                        <span>ANNULÉ</span>
                    </div>
                )}
            </div>

            {/* Middle Row: Route */}
            <div className="flex items-center gap-3 mb-3">
                <div className="flex flex-col items-center gap-0.5 pt-1">
                    <div className="w-2 h-2 rounded-full ring-2 ring-foreground-secondary/30 bg-background" />
                    <div className="w-0.5 h-8 bg-border my-0.5" />
                    <div className="w-2 h-2 rounded-full ring-2 ring-accent/50 bg-accent" />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                    <div>
                        <p className="text-xs text-foreground-secondary mb-0.5">De</p>
                        <p className="text-sm font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{ride.from}</p>
                    </div>
                    <div>
                        <p className="text-xs text-foreground-secondary mb-0.5">À</p>
                        <p className="text-sm font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{ride.to}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Price & Distance */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
                <div className="flex items-center gap-1 text-xs text-foreground-secondary font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ride.distance}</span>
                </div>
                <span className="text-base font-heading font-extrabold text-foreground tracking-tight">
                    {ride.price}
                </span>
            </div>
        </div>
    );
}
