"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CryptoInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CryptoInfoModal = ({ isOpen, onClose }: CryptoInfoModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = () => {
        onClose();
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm bg-[#1A1A1A] border border-[#333] rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F0B90B]/10 rounded-full blur-3xl" />

                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-[#9A9A9A] hover:text-white transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-16 h-16 bg-[#F0B90B]/10 rounded-full flex items-center justify-center border border-[#F0B90B]/20">
                                <ShieldCheck className="w-8 h-8 text-[#F0B90B]" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-heading font-bold text-white">
                                    Paiement Sécurisé par Smart Contract
                                </h3>
                                <p className="text-[#9A9A9A] text-sm leading-relaxed">
                                    Profitez de transactions instantanées à frais réduits.
                                </p>
                                <p className="text-white text-sm leading-relaxed border-l-2 border-[#F0B90B] pl-4 text-left bg-[#0C0C0C] p-3 rounded-r-lg mt-4">
                                    Votre argent ne va pas directement au chauffeur : il est <span className="text-[#F0B90B] font-bold">verrouillé dans un contrat intelligent</span> sur la blockchain Cardano. Les fonds ne sont libérés qu'une fois la course terminée et validée par vous.
                                </p>
                            </div>

                            <Button
                                type="button"
                                onClick={handleClose}
                                className="w-full h-12 bg-[#F0B90B] text-black font-bold rounded-xl hover:bg-[#F0B90B]/90"
                            >
                                J'ai compris
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    // Use portal to render outside the RideRequestSheet hierarchy
    if (!mounted) return null;

    return createPortal(modalContent, document.body);
};
