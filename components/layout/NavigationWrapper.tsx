"use client";

import { usePathname } from "next/navigation";
import { MobileNavBar } from "@/components/layout/MobileNavBar";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import dynamic from 'next/dynamic';

const MeshProvider = dynamic(() => import("@meshsdk/react").then(mod => mod.MeshProvider), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-black flex items-center justify-center text-white">Chargement Blockchain...</div>,
});

// Routes where navigation should be hidden completely
const HIDDEN_NAV_ROUTES = [
    "/", // Landing Page
    "/login",
    "/driver-application",
    "/driver-pending"
];

// Routes that use driver navigation (handled by driver layout)
const DRIVER_NAV_ROUTES = [
    "/driver"
];

interface NavigationWrapperProps {
    children: React.ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
    const pathname = usePathname();

    // Helper to remove locale from path (e.g. /fr/login -> /login, /fr -> /)
    const normalizePath = (path: string | null) => {
        if (!path) return "/";
        const segments = path.split('/');
        // If segment[1] is a locale (fr, en, sw), remove it
        if (segments.length > 1 && ['fr', 'en', 'sw'].includes(segments[1])) {
            segments.splice(1, 1);
            const newPath = segments.join('/');
            return newPath === '' ? '/' : newPath;
        }
        return path;
    };

    const currentPath = normalizePath(pathname);

    // Check if current route should hide navigation completely
    const shouldHideNav = HIDDEN_NAV_ROUTES.some(route => {
        if (route === '/') return currentPath === '/';
        return currentPath.startsWith(route);
    });

    // Check if current route uses driver navigation (driver layout handles its own nav)
    const isDriverRoute = DRIVER_NAV_ROUTES.some(route =>
        currentPath.startsWith(route)
    );

    const renderContent = () => {
        // If navigation should be hidden, render children without nav
        if (shouldHideNav) {
            return (
                <div className="h-full w-full overflow-y-auto">
                    {children}
                </div>
            );
        }

        // If it's a driver route, the driver layout handles its own navigation
        // So we just render children without passenger navigation
        if (isDriverRoute) {
            return (
                <div className="h-full w-full overflow-y-auto">
                    {children}
                </div>
            );
        }

        // Normal layout with passenger navigation
        return (
            <>
                <DesktopSidebar />
                <div className="flex-1 h-full w-full md:pl-64 transition-all duration-300 relative overflow-y-auto">
                    {children}
                </div>
                <MobileNavBar />
            </>
        );
    };

    return (
        <MeshProvider>
            {renderContent()}
        </MeshProvider>
    );
}
