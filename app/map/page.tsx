"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock } from "lucide-react";

export default function MapPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-h1 font-heading text-foreground mb-2">
                            Find a Ride
                        </h1>
                        <p className="text-body text-foreground-secondary">
                            Discover available rides near you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Map Container */}
                        <div className="lg:col-span-2">
                            <Card className="h-[600px] overflow-hidden">
                                <div className="w-full h-full bg-background-secondary flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                                        <p className="text-body text-foreground-secondary">
                                            Map integration coming soon
                                        </p>
                                        <p className="text-body-sm text-foreground-secondary mt-2">
                                            Leaflet map will be displayed here
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Available Rides</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[1, 2, 3].map((ride) => (
                                        <div
                                            key={ride}
                                            className="p-4 bg-background rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="text-body font-medium text-foreground">
                                                        Downtown → Airport
                                                    </p>
                                                    <p className="text-body-sm text-foreground-secondary">
                                                        2.5 km away
                                                    </p>
                                                </div>
                                                <span className="text-body font-heading text-accent">
                                                    ₳ 15
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-body-sm text-foreground-secondary">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    5 min
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Navigation className="w-4 h-4" />
                                                    12 km
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Request a Ride</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-body-sm text-foreground-secondary mb-2 block">
                                            Pickup Location
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter pickup location"
                                            className="w-full h-11 px-4 bg-background-secondary text-foreground rounded-button border border-border focus:border-accent focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-body-sm text-foreground-secondary mb-2 block">
                                            Destination
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter destination"
                                            className="w-full h-11 px-4 bg-background-secondary text-foreground rounded-button border border-border focus:border-accent focus:outline-none"
                                        />
                                    </div>
                                    <Button className="w-full">Request Ride</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
