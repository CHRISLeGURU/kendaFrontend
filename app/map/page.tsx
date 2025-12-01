"use client";

import MapWrapper from "@/components/map/MapWrapper";
import { RideRequestSheet } from "@/components/ride/RideRequestSheet";

export default function MapPage() {
    return (
        <main className="relative h-screen w-full overflow-hidden bg-black">
            {/* Map Background (z-0) */}
            <div className="absolute inset-0 z-0">
                <MapWrapper />
            </div>

            {/* UI Overlays (z-10+) */}
            <div className="relative z-10 pointer-events-none h-full flex flex-col">
                {/* Ride Request Sheet */}
                <div className="mt-auto">
                    <RideRequestSheet isOpen={true} />
                </div>
            </div>
        </main>
    );
}
