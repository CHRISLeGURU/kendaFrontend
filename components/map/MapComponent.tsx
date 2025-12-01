"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet markers in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

// Route Path Options (Yellow, Solid, Thick)
const ROUTE_OPTIONS = {
    color: "#F0B90B",
    weight: 5,
    opacity: 1,
    lineCap: "round" as const,
    lineJoin: "round" as const,
    dashArray: undefined, // Solid line
};

// Custom User Icon (Yellow with Pulse)
const createUserIcon = () => {
    return L.divIcon({
        className: "custom-user-icon",
        html: `
      <div class="relative flex items-center justify-center w-6 h-6">
        <div class="absolute w-full h-full bg-[#F0B90B] rounded-full opacity-75 animate-ping"></div>
        <div class="relative w-4 h-4 bg-[#F0B90B] border-2 border-white rounded-full shadow-lg"></div>
      </div>
    `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

// Custom Destination Icon (Red Pin)
const createDestinationIcon = () => {
    return L.divIcon({
        className: "custom-destination-icon",
        html: `
      <div class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FF4747" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3" fill="white"></circle>
        </svg>
      </div>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
};

// Custom Taxi Icon (White/Gray Car)
const createTaxiIcon = () => {
    return L.divIcon({
        className: "custom-taxi-icon",
        html: `
      <div class="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow-md border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
      </div>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

// Component to recenter map when position changes
const RecenterMap = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(position, 15);
    }, [position, map]);
    return null;
};

// Component to handle map clicks
const MapClickHandler = ({
    onDestinationSelect
}: {
    onDestinationSelect: (lat: number, lng: number) => void
}) => {
    useMapEvents({
        click: (e) => {
            onDestinationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

interface MapComponentProps {
    onDestinationChange?: (destination: [number, number] | null, distance: number) => void;
}

const MapComponent = ({ onDestinationChange }: MapComponentProps) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [taxis, setTaxis] = useState<[number, number][]>([]);

    useEffect(() => {
        // Get User Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const userPos: [number, number] = [latitude, longitude];
                    setPosition(userPos);

                    // Generate Mock Taxis around user
                    const mockTaxis: [number, number][] = [
                        [latitude + 0.002, longitude + 0.002],
                        [latitude - 0.003, longitude + 0.001],
                        [latitude + 0.001, longitude - 0.003],
                        [latitude - 0.001, longitude - 0.002],
                    ];
                    setTaxis(mockTaxis);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    // Default fallback (e.g., Kinshasa)
                    setPosition([-4.4419, 15.2663]);
                }
            );
        } else {
            // Fallback if geolocation not supported
            setPosition([-4.4419, 15.2663]);
        }
    }, []);

    // Calculate distance between two points (Haversine formula)
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };

    const handleDestinationSelect = (lat: number, lng: number) => {
        const newDestination: [number, number] = [lat, lng];
        setDestination(newDestination);

        if (position) {
            const distance = calculateDistance(position[0], position[1], lat, lng);
            onDestinationChange?.(newDestination, distance);
        }
    };

    // Calculate route path (simple straight line for now, but using Polyline)
    const routePath = position && destination ? [position, destination] : [];

    if (!position) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#0C0C0C] text-white">
                <p>Locating...</p>
            </div>
        );
    }

    return (
        <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
            zoomControl={false} // Hide default zoom controls for cleaner UI
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <RecenterMap position={position} />
            <MapClickHandler onDestinationSelect={handleDestinationSelect} />

            {/* Route Polyline */}
            {routePath.length > 0 && (
                <Polyline
                    positions={routePath as L.LatLngExpression[]}
                    pathOptions={ROUTE_OPTIONS}
                />
            )}

            {/* User Marker */}
            <Marker position={position} icon={createUserIcon()}>
                <Popup className="custom-popup">You are here</Popup>
            </Marker>

            {/* Destination Marker */}
            {destination && (
                <Marker position={destination} icon={createDestinationIcon()}>
                    <Popup>Your destination</Popup>
                </Marker>
            )}

            {/* Taxi Markers */}
            {taxis.map((taxiPos, index) => (
                <Marker key={index} position={taxiPos} icon={createTaxiIcon()}>
                    <Popup>Taxi #{index + 1} (Available)</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
