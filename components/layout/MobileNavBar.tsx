"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNavBar() {
    const pathname = usePathname();

    // Don't show on landing page or login
    if (pathname === "/" || pathname === "/login") {
        return null;
    }

    const navItems = [
        {
            label: "Accueil",
            href: "/map",
            icon: Home,
        },
        {
            label: "Activités",
            href: "/rides",
            icon: Clock,
        },
        {
            label: "Portefeuille",
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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#000000] border-t border-[#1A1A1A] pb-safe">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center w-full h-full space-y-1"
                        >
                            <Icon
                                className={cn(
                                    "w-6 h-6 transition-colors duration-200",
                                    isActive ? "text-[#F0B90B]" : "text-[#9A9A9A]"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-[10px] font-medium transition-colors duration-200",
                                    isActive ? "text-[#F0B90B]" : "text-[#9A9A9A]"
                                )}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
