"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, Wallet, User, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DesktopSidebar() {
    const pathname = usePathname();

    // Don't show on landing page or login
    if (pathname === "/" || pathname === "/login") {
        return null;
    }

    const navItems = [
        {
            label: "Home",
            href: "/map",
            icon: Home,
        },
        {
            label: "Activités",
            href: "/rides",
            icon: Clock,
        },
        {
            label: "Wallet",
            href: "/wallet",
            icon: Wallet,
        },
        {
            label: "Compte",
            href: "/account",
            icon: User,
        },
    ];

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#0C0C0C] border-r border-[#1A1A1A] flex-col z-50">
            {/* Logo Section */}
            <div className="p-8 border-b border-[#1A1A1A]">
                <h1 className="font-heading font-bold text-3xl text-white tracking-tight">
                    KENDA
                </h1>
                <p className="text-[#9A9A9A] text-xs font-medium tracking-wide uppercase mt-1">
                    Mobilité Sûre
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
                <div className="bg-[#151515] rounded-xl p-4 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#F0B90B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Alexandre K.</p>
                        <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-[#F0B90B]" />
                            <span className="text-[10px] text-[#9A9A9A]">Vérifié</span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 h-12"
                >
                    <LogOut className="w-4 h-4 mr-3" />
                    Déconnexion
                </Button>
            </div>
        </aside>
    );
}
