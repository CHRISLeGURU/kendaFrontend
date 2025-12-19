"use client";

import React from "react";
import { Link } from "@/lib/navigation";
import {
    User as UserIcon,
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
    CreditCard,
    Car,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { User, UserStats, Ride } from "@/types";

interface UserProfileScreenProps {
    /** User data - will come from Supabase */
    user?: User | null;
    /** User statistics - will come from Supabase */
    stats?: UserStats | null;
    /** Recent rides - will come from Supabase */
    recentRides?: Ride[];
    /** Loading state */
    isLoading?: boolean;
}

export function UserProfileScreen({
    user,
    stats,
    recentRides = [],
    isLoading = false
}: UserProfileScreenProps) {
    const t = useTranslations('Profile');
    const tCommon = useTranslations('Common');

    return (
        <div className="h-full overflow-y-auto bg-background text-foreground pb-24">
            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            )}

            {/* Header Section */}
            <div className="relative pt-safe bg-gradient-to-b from-background-secondary to-background border-b border-border">
                <div className="absolute top-4 right-4 z-10">
                    <LanguageSwitcher />
                </div>
                <div className="flex flex-col items-center pt-8 pb-8 px-4">
                    {/* Avatar & Badge */}
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-background-secondary border-2 border-border flex items-center justify-center overflow-hidden shadow-xl">
                            {user?.avatar_url ? (
                                <Image
                                    src={user.avatar_url}
                                    alt={user.full_name || 'Avatar'}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <UserIcon className="w-10 h-10 text-foreground-secondary" />
                            )}
                        </div>
                        {user?.is_verified && (
                            <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground rounded-full p-1.5 border-4 border-background">
                                <Shield className="w-3.5 h-3.5 fill-current" />
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <h1 className="text-2xl font-heading font-bold text-foreground mb-1 text-center">
                        {user?.full_name || t('guestUser')}
                    </h1>
                    {user?.is_verified && (
                        <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1 rounded-full border border-accent/20 mb-6">
                            <Shield className="w-3 h-3 text-accent fill-current" />
                            <span className="text-[10px] font-bold text-accent uppercase tracking-wide">
                                {t('verifiedPassenger')}
                            </span>
                        </div>
                    )}

                    {/* Stats Grid */}
                    {/* TODO: Connect to Supabase - stats will come from userService.getUserStats() */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                        <StatBlock
                            label={t('statsRides')}
                            value={stats?.total_rides?.toString() || "0"}
                        />
                        <StatBlock
                            label={t('statsRating')}
                            value={stats?.average_rating?.toFixed(1) || "5.0"}
                            icon={<Star className="w-3 h-3 text-accent fill-current ml-1" />}
                        />
                        <StatBlock
                            label={t('statsTotalKm')}
                            value={stats?.total_km?.toString() || "0"}
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
                                <span>{t('walletTitle')}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 text-accent hover:text-accent hover:bg-accent/10 px-2 -mr-2" onClick={() => alert("Fonctionnalité à venir")}>
                                {t('history')} <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <div className="px-4 pb-4">
                            <div className="text-3xl font-heading font-bold text-foreground mb-4">
                                12.500 <span className="text-lg text-foreground-secondary font-sans font-medium">FC</span>
                            </div>
                            <Button className="w-full h-12 font-bold shadow-lg shadow-accent/20" onClick={() => alert("Fonctionnalité à venir")}>
                                <CreditCard className="w-4 h-4 mr-2" />
                                {t('recharge')}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Settings & Support Menu */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-foreground-secondary uppercase tracking-wider px-1">
                        {t('menuTitle')}
                    </h3>
                    <div className="bg-background-secondary rounded-xl border border-border overflow-hidden divide-y divide-border/50">
                        <MenuItem
                            icon={<UserIcon className="w-5 h-5" />}
                            label={t('personalInfo')}
                            onClick={() => alert("Fonctionnalité à venir")}
                        />
                        <MenuItem
                            icon={<Settings className="w-5 h-5" />}
                            label={t('appPrefs')}
                            onClick={() => alert("Fonctionnalité à venir")}
                        />
                        <MenuItem
                            icon={<Shield className="w-5 h-5" />}
                            label={t('privacySecurity')}
                            onClick={() => alert("Fonctionnalité à venir")}
                        />
                        <MenuItem
                            icon={<HelpCircle className="w-5 h-5" />}
                            label={t('helpSupport')}
                            onClick={() => alert("Fonctionnalité à venir")}
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                {/* TODO: Connect to Supabase - rides will come from rideService.getRideHistory() */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-bold text-foreground-secondary uppercase tracking-wider">
                            {t('recentRidesTitle')}
                        </h3>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-accent hover:bg-transparent" onClick={() => alert("Fonctionnalité à venir")}>
                            {t('seeAll')}
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {recentRides.length === 0 ? (
                            <div className="text-center py-8 text-foreground-secondary">
                                <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p className="text-sm">{t('noRidesYet')}</p>
                            </div>
                        ) : (
                            recentRides.map((ride) => {
                                // Format date from ride data
                                const rideDate = ride.completed_at ? new Date(ride.completed_at) : new Date(ride.created_at);
                                const today = new Date();
                                const yesterday = new Date(today);
                                yesterday.setDate(yesterday.getDate() - 1);

                                let dateLabel: string;
                                if (rideDate.toDateString() === today.toDateString()) {
                                    dateLabel = tCommon('today');
                                } else if (rideDate.toDateString() === yesterday.toDateString()) {
                                    dateLabel = tCommon('yesterday');
                                } else {
                                    dateLabel = rideDate.toLocaleDateString();
                                }

                                const timeString = rideDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                const dateString = `${dateLabel}, ${timeString}`;

                                return (
                                    <RideCard
                                        key={ride.id}
                                        ride={{
                                            id: ride.id,
                                            from: ride.pickup_address || 'Point de départ',
                                            to: ride.dest_address || 'Destination',
                                            price: `${ride.final_price || ride.price} ${ride.currency}`,
                                            status: ride.status,
                                            distance: ride.distance_km ? `${ride.distance_km} km` : '--'
                                        }}
                                        t={t}
                                        dateString={dateString}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Become a Driver CTA */}
                <Card className="bg-gradient-to-br from-[#0C0C0C] via-[#1A1A1A] to-[#0C0C0C] border-[#333333] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                                <Car className="w-6 h-6 text-accent" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                                    {t('driverCtaTitle')}
                                </h3>
                                <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">
                                    {t('driverCtaDesc')}
                                </p>
                                <Link href="/driver-application">
                                    <Button
                                        variant="outline"
                                        className="w-full border-accent text-accent hover:bg-accent/10 h-11 font-bold"
                                    >
                                        <Car className="w-4 h-4 mr-2" />
                                        {t('driverCtaButton')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Logout Button */}
                <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive h-12 mt-4" onClick={() => alert("Fonctionnalité à venir")}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                </Button>

                <div className="text-center pb-safe">
                    <p className="text-[10px] text-foreground-secondary/50">
                        {t('version')} 1.0.2 • KENDA App
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


function RideCard({ ride, t, dateString }: { ride: any, t: any, dateString: string }) {
    const isCompleted = ride.status === "COMPLETED";

    return (
        <div className="group flex flex-col bg-background-secondary rounded-xl border border-border p-4 active:scale-[0.99] transition-all duration-200 hover:border-border/80">
            {/* Top Row: Date & Status */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-foreground-secondary font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{dateString}</span>
                </div>
                {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{t('statusCompleted')}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                        <XCircle className="w-3 h-3" />
                        <span>{t('statusCancelled')}</span>
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
                        <p className="text-xs text-foreground-secondary mb-0.5">{t('from')}</p>
                        <p className="text-sm font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{ride.from}</p>
                    </div>
                    <div>
                        <p className="text-xs text-foreground-secondary mb-0.5">{t('to')}</p>
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
