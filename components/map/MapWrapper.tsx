"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const MapWrapper = () => {
    const Map = useMemo(
        () =>
            dynamic(() => import("./MapComponent"), {
                loading: () => (
                    <div className="w-full h-full bg-[#0C0C0C] flex items-center justify-center text-[#9A9A9A]">
                        <p>Loading Map...</p>
                    </div>
                ),
                ssr: false,
            }),
        []
    );

    return <Map />;
};

export default MapWrapper;
