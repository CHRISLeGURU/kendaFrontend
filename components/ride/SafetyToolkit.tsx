"use client";

import React, { useState } from "react";
import { ShieldAlert, Share2, PhoneCall, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const SafetyToolkit = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Mon trajet avec Kenda',
                    text: 'Suivez mon trajet en temps réel !',
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback
            alert("Lien copié dans le presse-papier !");
        }
        setIsOpen(false);
    };

    const handleEmergency = () => {
        // Simulate emergency alert
        const confirmed = window.confirm("Êtes-vous sûr de vouloir déclencher une ALERTE D'URGENCE ?");
        if (confirmed) {
            alert("ALERTE D'URGENCE ENVOYÉE ! Les autorités et vos contacts d'urgence ont été notifiés.");
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg p-0",
                    "bg-white hover:bg-gray-100 border-2 border-[#FF4747]/20",
                    "flex items-center justify-center transition-transform active:scale-95"
                )}
            >
                <ShieldAlert className="w-7 h-7 text-[#FF4747]" />
            </Button>

            {/* Safety Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0C0C0C] border-t border-[#1A1A1A] rounded-t-[24px] p-6 pb-8 md:max-w-md md:mx-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-[24px]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#FF4747]/10 flex items-center justify-center">
                                        <ShieldAlert className="w-6 h-6 text-[#FF4747]" />
                                    </div>
                                    <h2 className="text-xl font-heading font-bold text-white">
                                        Centre de Sécurité
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-[#9A9A9A] hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4">
                                {/* Share Ride */}
                                <Button
                                    onClick={handleShare}
                                    variant="outline"
                                    className="w-full h-14 justify-start gap-4 text-lg font-medium border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10 hover:text-[#F0B90B] bg-transparent"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Partager ma course
                                </Button>

                                {/* Emergency SOS */}
                                <Button
                                    onClick={handleEmergency}
                                    className="w-full h-16 justify-start gap-4 text-lg font-bold bg-[#FF4747] hover:bg-[#FF4747]/90 text-white shadow-[0_0_20px_rgba(255,71,71,0.3)] animate-pulse"
                                >
                                    <PhoneCall className="w-6 h-6" />
                                    SOS URGENCE
                                </Button>

                                <p className="text-center text-xs text-[#555] mt-4">
                                    N'utilisez le SOS qu'en cas de danger immédiat. Les fausses alertes peuvent entraîner la suspension du compte.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
