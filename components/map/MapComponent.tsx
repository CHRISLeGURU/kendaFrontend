"use client";

import { useEffect, useState, useCallback } from "react";
import type { DriverLocation, Ride } from '@/types';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import { createClient } from '@/lib/supabase/client';

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
// Custom Taxi Icon (Yellow Car on Black)
const createTaxiIcon = () => {
    return L.divIcon({
        className: "custom-taxi-icon",
        html: `
      <div class="relative flex items-center justify-center w-10 h-10 bg-black rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-2 border-[#F0B90B] transform transition-all hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0B90B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
          <circle cx="6.5" cy="16.5" r="2.5"/>
          <circle cx="16.5" cy="16.5" r="2.5"/>
        </svg>
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
};

// Custom Highlight Icon (Blinking for new requests)
const createHighlightIcon = () => {
    return L.divIcon({
        className: "custom-highlight-icon",
        html: `
      <div class="relative flex items-center justify-center w-12 h-12">
        <div class="absolute w-full h-full bg-[#F0B90B] rounded-full opacity-75 animate-ping"></div>
        <div class="absolute w-1/2 h-1/2 bg-[#F0B90B] rounded-full opacity-50 animate-pulse"></div>
        <div class="relative w-4 h-4 bg-white border-4 border-[#F0B90B] rounded-full shadow-xl"></div>
      </div>
    `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    });
};

const createClientMarkerIcon = () => {
    return L.divIcon({
        className: "custom-client-marker",
        html: `
            <div class="relative w-8 h-8 flex items-center justify-center">
                <div class="absolute w-full h-full bg-[#F0B90B] rounded-full opacity-40 animate-ping"></div>
                <div class="w-4 h-4 bg-[#F0B90B] rounded-full border-2 border-white shadow-lg"></div>
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
    /** Nearby drivers to display on map - provided by parent component */
    nearbyDrivers?: DriverLocation[];
    onDriverSelect?: (driver: DriverLocation) => void;
    userLocation?: [number, number] | null;
    routeStart?: [number, number] | null;
    routeEnd?: [number, number] | null;
    trackedDriverId?: string | null;
    highlightLocation?: [number, number] | null;
    availableRides?: Ride[];
    onRideSelect?: (ride: Ride) => void;
}

const MapComponent = (props: MapComponentProps) => {
    const {
        onDestinationChange,
        nearbyDrivers = [],
        onDriverSelect,
        userLocation,
        trackedDriverId,
        highlightLocation,
        availableRides = [],
        onRideSelect
    } = props;
    const t = useTranslations('Ride');
    const [internalPosition, setInternalPosition] = useState<[number, number] | null>(null);

    // Use prop if available, otherwise internal state
    const position = userLocation ?? internalPosition;

    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [drivers, setDrivers] = useState<DriverLocation[]>(nearbyDrivers);
    const supabase = createClient();

    // Sync props to state initially (only if drivers empty to avoid overwrite)
    useEffect(() => {
        if (nearbyDrivers.length > 0) {
            setDrivers(nearbyDrivers);
        }
    }, [nearbyDrivers]);

    // ... (Driver Updates useEffect remains same) ...

    useEffect(() => {
        const channel = supabase
            .channel('driver_updates')
            .on('postgres_changes', {
                event: '*', // Listen to INSERT, UPDATE, DELETE
                schema: 'public',
                table: 'driver_profiles'
            }, (payload: any) => {
                const newData = payload.new;
                const oldData = payload.old;
                const eventType = payload.eventType; // 'INSERT', 'UPDATE', 'DELETE'

                setDrivers(currentDrivers => {
                    // HANDLE DELETE or Offline
                    // Note: We use user_id as driver_id for consistency with rideService
                    if (eventType === 'DELETE' || (eventType === 'UPDATE' && newData.is_online === false)) {
                        const targetUserId = oldData.user_id || newData.user_id;
                        return currentDrivers.filter(d => d.driver_id !== targetUserId);
                    }

                    // HANDLE UPDATE or INSERT
                    if (newData && newData.is_online === true && newData.current_lat && newData.current_lng) {
                        const targetUserId = newData.user_id;
                        const exists = currentDrivers.find(d => d.driver_id === targetUserId);

                        if (exists) {
                            // Update existing
                            return currentDrivers.map(d =>
                                d.driver_id === targetUserId
                                    ? {
                                        ...d,
                                        latitude: newData.current_lat,
                                        longitude: newData.current_lng,
                                        heading: newData.heading // if available
                                    }
                                    : d
                            );
                        } else {
                            // Add new
                            return [...currentDrivers, {
                                driver_id: newData.user_id, // Use User ID
                                profile_id: newData.id,
                                latitude: newData.current_lat,
                                longitude: newData.current_lng,
                                driver_name: newData.full_name || 'Chauffeur', // Note: full_name might not be in profile table directly, often joined query needed.
                                rating: newData.rating || 5.0,
                                vehicle_type: newData.vehicle_type
                            } as DriverLocation];
                        }
                    }

                    return currentDrivers;
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        // If userLocation is provided by parent, do not fetch internally unless it's null and we want to try anyway?
        // Actually, if parent provides it, rely on parent.
        if (userLocation !== undefined) return;

        // Get User Location Internal Fallback
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const userPos: [number, number] = [latitude, longitude];
                    setInternalPosition(userPos);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    // Default fallback (Goma, RDC)
                    setInternalPosition([-1.6777, 29.2285]);
                }
            );
        } else {
            // Fallback if geolocation not supported (Goma, RDC)
            setInternalPosition([-1.6777, 29.2285]);
        }
    }, [userLocation]);

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
        // Note: onDestinationChange is now called in the useEffect after route calculation
    };

    // Calculate route path using OSRM API
    const [routePath, setRoutePath] = useState<[number, number][]>([]);

    // Tracked Driver Logic
    const trackedDriver = drivers.find(d => d.driver_id === trackedDriverId);

    // Calculate Route Points
    // Default: Props override -> User Position -> Null
    let startPoint = props.routeStart || position;
    // Default: Props override -> User Destination -> Null
    let endPoint = props.routeEnd || destination;

    // SCENARIO: Tracking Driver Approach (e.g. Passenger waiting)
    // If we have a tracked driver ID, and we found them on map, and we know our own position:
    // Route from Driver -> User
    if (trackedDriverId && trackedDriver && position && !props.routeStart) {
        startPoint = [trackedDriver.latitude, trackedDriver.longitude];
        endPoint = position;
    }

    useEffect(() => {
        if (startPoint && endPoint) {
            const fetchRoute = async () => {
                try {
                    // OSRM requires coordinates in [lon, lat] format
                    const start = `${startPoint[1]},${startPoint[0]}`;
                    const end = `${endPoint[1]},${endPoint[0]}`;

                    const response = await fetch(
                        `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
                    );

                    const data = await response.json();

                    if (data.routes && data.routes.length > 0) {
                        // OSRM returns [lon, lat], Leaflet needs [lat, lon]
                        const coordinates = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
                        setRoutePath(coordinates);

                        // Update distance based on actual route
                        // Only report distance change if we are using the main destination, not a custom override
                        if (!props.routeEnd) {
                            const routeDistanceKm = data.routes[0].distance / 1000;
                            onDestinationChange?.(endPoint, routeDistanceKm);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching route:", error);
                    // Fallback to straight line if API fails
                    setRoutePath([startPoint, endPoint]);
                }
            };

            fetchRoute();
        } else {
            setRoutePath([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startPoint, endPoint]);

    if (!position) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#0C0C0C] text-white">
                <p>{t('locating')}</p>
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
                <Popup className="custom-popup">{t('youAreHere')}</Popup>
            </Marker>

            {/* Destination Marker */}
            {destination && (
                <Marker position={destination} icon={createDestinationIcon()}>
                    <Popup>{t('yourDestination')}</Popup>
                </Marker>
            )}

            {/* Highlighted Location (e.g. for new ride offers) */}
            {highlightLocation && highlightLocation[0] !== undefined && highlightLocation[1] !== undefined && (
                <>
                    <RecenterMap position={highlightLocation} />
                    <Marker position={highlightLocation} icon={createHighlightIcon()} />
                </>
            )}

            {/* Available Rides (Radar Mode) */}
            {availableRides.filter(r => r.pickup_lat !== undefined && r.pickup_lng !== undefined).map((ride) => (
                <Marker
                    key={ride.id}
                    position={[ride.pickup_lat, ride.pickup_lng]}
                    icon={createClientMarkerIcon()}
                    eventHandlers={{
                        click: () => onRideSelect?.(ride)
                    }}
                >
                    <Popup className="custom-popup">
                        <div className="p-2">
                            <p className="font-bold text-sm mb-1">Passager en attente</p>
                            <p className="text-xs text-[#9A9A9A] mb-2">{ride.distance_km} km • {ride.price} FC</p>
                            <button
                                onClick={() => onRideSelect?.(ride)}
                                className="w-full bg-[#F0B90B] text-black text-[10px] py-1 rounded font-bold"
                            >
                                VOIR L&apos;OFFRE
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Drivers Markers (Realtime) */}
            {drivers.filter(d => d.latitude !== undefined && d.longitude !== undefined).map((driver) => (
                <Marker
                    key={driver.driver_id}
                    position={[driver.latitude, driver.longitude]}
                    icon={createTaxiIcon()}
                    eventHandlers={{
                        click: () => onDriverSelect?.(driver)
                    }}
                >
                    <Popup>
                        {driver.driver_name || t('taxiAvailable', { id: driver.driver_id.slice(0, 4) })}
                        {driver.rating && ` ⭐ ${driver.rating}`}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
