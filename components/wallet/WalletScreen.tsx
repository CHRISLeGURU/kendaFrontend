"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Wallet, Smartphone, AlertCircle, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// Types pour les opérateurs
type Operator = 'AIRTEL' | 'ORANGE' | 'MPESA';

const OPERATORS: { id: Operator; name: string; color: string; logo: string }[] = [
    { id: 'AIRTEL', name: 'Airtel Money', color: '#E60000', logo: 'A' },
    { id: 'ORANGE', name: 'Orange Money', color: '#FF7900', logo: 'O' },
    { id: 'MPESA', name: 'M-Pesa', color: '#E60000', logo: 'M' }, // Vodacom Red
];

export function WalletScreen() {
    const t = useTranslations('Wallet'); // On garde les clés existantes ou on en crée de nouvelles si besoin

    // États du formulaire
    const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amountFC, setAmountFC] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [exchangeRate, setExchangeRate] = useState<number>(1500); // Default fallback

    // Calcul de la conversion
    const estimatedADA = amountFC ? (parseInt(amountFC) / exchangeRate).toFixed(2) : "0.00";

    // Fetch exchange rate on mount
    useEffect(() => {
        const fetchRate = async () => {
            const { data } = await import('@/services/walletService').then(m => m.getExchangeRate());
            if (data) {
                setExchangeRate(data.ada_to_fc);
            }
        };
        fetchRate();
    }, []);

    return (
        <div className="h-full overflow-y-auto bg-black text-white pb-24 pt-safe relative">

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#F0B90B]/10 to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-6 py-6 border-b border-[#1A1A1A]">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-white">
                            Recharger ADA
                        </h1>
                        <p className="text-sm text-[#9A9A9A]">Via Mobile Money</p>
                    </div>
                    <div className="px-3 py-1 bg-[#F0B90B]/10 border border-[#F0B90B]/30 rounded-full">
                        <span className="text-xs font-bold text-[#F0B90B] flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#F0B90B] animate-pulse" />
                            COMING SOON
                        </span>
                    </div>
                </div>
            </header>

            <div className="px-6 py-8 space-y-8 relative z-0">

                {/* 1. Opérateur */}
                <section>
                    <h2 className="text-sm font-bold text-[#9A9A9A] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs border border-[#333]">1</span>
                        Choisissez votre opérateur
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                        {OPERATORS.map((op) => (
                            <button
                                key={op.id}
                                onClick={() => setSelectedOperator(op.id)}
                                className={cn(
                                    "relative h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-200",
                                    selectedOperator === op.id
                                        ? "bg-[#1A1A1A] border-white shadow-xl scale-105"
                                        : "bg-[#0C0C0C] border-[#1A1A1A] hover:border-[#333] opacity-70 hover:opacity-100"
                                )}
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg"
                                    style={{ backgroundColor: op.color }}
                                >
                                    {op.logo}
                                </div>
                                <span className="text-[10px] font-medium text-white">{op.name}</span>

                                {selectedOperator === op.id && (
                                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <div className="w-2 h-2 bg-black rounded-full" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 2. Montant & Numéro */}
                <section className="space-y-4">
                    <h2 className="text-sm font-bold text-[#9A9A9A] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs border border-[#333]">2</span>
                        Détails du paiement
                    </h2>

                    <div className="space-y-4">
                        {/* Numéro de téléphone */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <Input
                                type="tel"
                                placeholder="Numéro Mobile Money (ex: +243...)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="h-14 pl-12 bg-[#151515] border-[#2A2A2A] text-white rounded-xl focus:ring-[#F0B90B] focus:border-[#F0B90B] text-lg"
                            />
                        </div>

                        {/* Montant FC */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] font-bold text-sm">
                                FC
                            </div>
                            <Input
                                type="number"
                                placeholder="Montant en Francs Congolais"
                                value={amountFC}
                                onChange={(e) => setAmountFC(e.target.value)}
                                className="h-14 pl-12 bg-[#151515] border-[#2A2A2A] text-white rounded-xl focus:ring-[#F0B90B] focus:border-[#F0B90B] text-lg font-mono"
                            />
                        </div>
                    </div>
                </section>

                {/* Conversion Card */}
                <AnimatePresence>
                    {amountFC && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="bg-gradient-to-r from-[#1A1A1A] to-[#0C0C0C] p-4 rounded-xl border border-[#F0B90B]/30 flex items-center justify-between"
                        >
                            <div className="flex flex-col">
                                <span className="text-xs text-[#9A9A9A] mb-1">Vous recevrez environ</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-[#F0B90B] font-mono">{estimatedADA}</span>
                                    <span className="text-sm font-bold text-white">ADA</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-[#555] block">Taux actuel</span>
                                <span className="text-xs text-[#777]">1 ADA ≈ {exchangeRate} FC</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3. Wallet Reception */}
                <section>
                    <h2 className="text-sm font-bold text-[#9A9A9A] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs border border-[#333]">3</span>
                        Adresse de réception
                    </h2>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <Input
                            placeholder="Votre adresse Cardano (addr1...)"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="h-14 pl-12 bg-[#151515] border-[#2A2A2A] text-white rounded-xl focus:ring-[#F0B90B] focus:border-[#F0B90B] font-mono text-xs"
                        />
                    </div>
                    <p className="text-[10px] text-[#555] mt-2 ml-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Assurez-vous que l'adresse est correcte. Les transactions crypto sont irréversibles.
                    </p>
                </section>

                {/* Action Button */}
                <div className="pt-4">
                    <Button
                        disabled={true} // Toujours désactivé pour "Coming Soon"
                        className="w-full h-16 bg-[#F0B90B] text-black font-bold text-lg rounded-xl shadow-lg shadow-[#F0B90B]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="flex items-center gap-2">
                            Recharger ADA
                            <ArrowRight className="w-5 h-5" />
                        </span>
                    </Button>
                    <p className="text-center text-xs text-[#555] mt-4">
                        Service bientôt disponible à Goma.
                    </p>
                </div>

            </div>
        </div>
    );
}
