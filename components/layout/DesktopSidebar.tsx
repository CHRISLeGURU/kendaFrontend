"use client";

import { Link, usePathname } from "@/lib/navigation";
import { Home, Clock, Wallet, User, LogOut, Shield, Loader2, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export function DesktopSidebar() {
    const pathname = usePathname();
    const t = useTranslations('Nav');
    const tCommon = useTranslations('Common');
    const { user, signOut } = useAuth();

    // Don't show on landing page or login
    if (pathname === "/" || pathname === "/login" || pathname.endsWith("/login")) {
        return null;
    }

    const navItems = [
        {
            label: t('home'),
            href: "/map",
            icon: Home,
        },
        {
            label: t('activities'),
            href: "/rides",
            icon: Clock,
        },
        {
            label: t('wallet'),
            href: "/wallet",
            icon: Droplets,
        },
        {
            label: t('account'),
            href: "/account",
            icon: User,
        },
    ];

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#0C0C0C] border-r border-[#1A1A1A] flex-col z-50">
            {/* Logo Section */}
            <div className="p-8 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-4">
                    <Image
                        src="/logo.jpg"
                        alt="KENDA Logo"
                        width={56}
                        height={56}
                        className="rounded-xl"
                    />
                    <h1 className="font-heading font-bold text-2xl text-white tracking-tight">
                        KENDA
                    </h1>
                </div>
                <p className="text-[#9A9A9A] text-xs font-medium tracking-wide uppercase mt-2">
                    {tCommon('safeMobility')}
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-[#1A1A1A] text-[#F0B90B]"
                                    : "text-[#9A9A9A] hover:text-white hover:bg-[#151515]"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F0B90B]" />
                            )}
                            <Icon className={cn("w-5 h-5", isActive ? "text-[#F0B90B]" : "text-current")} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-[#1A1A1A]">
                {user ? (
                    <div className="bg-[#151515] rounded-xl p-4 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center overflow-hidden">
                            {user.user_metadata.avatar_url ? (
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    alt="Avatar"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-5 h-5 text-[#F0B90B]" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                                {user.user_metadata.full_name || user.email?.split('@')[0] || t('guestUser')}
                            </p>
                            <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3 text-[#F0B90B]" />
                                <span className="text-[10px] text-[#9A9A9A]">{t('verified')}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#151515] rounded-xl p-4 mb-4 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-[#F0B90B]" />
                    </div>
                )}

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 h-12"
                    onClick={async () => {
                        await signOut();
                        window.location.href = '/login';
                    }}
                >
                    <LogOut className="w-4 h-4 mr-3" />
                    {t('logout')}
                </Button>
            </div>
        </aside>
    );
}
