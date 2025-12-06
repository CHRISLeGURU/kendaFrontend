"use client";

import { usePathname } from "next/navigation";
import { MobileNavBar } from "@/components/layout/MobileNavBar";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";

// Routes where navigation should be hidden
const HIDDEN_NAV_ROUTES = [
    "/login",
    "/driver-application",
    "/driver-pending"
];

interface NavigationWrapperProps {
    children: React.ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
    const pathname = usePathname();

    // Check if current route should hide navigation
    const shouldHideNav = HIDDEN_NAV_ROUTES.some(route =>
        pathname?.startsWith(route)
    );

    // If navigation should be hidden, render children without nav
    if (shouldHideNav) {
        return (
            <div className="h-full w-full overflow-y-auto">
                {children}
            </div>
        );
    }

    // Normal layout with navigation
    return (
        <>
            <DesktopSidebar />
            <div className="flex-1 h-full w-full md:pl-64 transition-all duration-300 relative overflow-y-auto">
                {children}
            </div>
            <MobileNavBar />
        </>
    );
}
