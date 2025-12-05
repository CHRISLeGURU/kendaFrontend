"use client";

import React, { useState } from "react";
import { Wallet, Plus, List, Copy, ExternalLink, RefreshCw, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function WalletScreen() {
    // Mock state for connection (toggleable for demo)
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState("450.00");
    const [address, setAddress] = useState("addr1...zx9");

    return (
        <div className="h-full overflow-y-auto bg-black text-white pb-24 pt-safe">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 mb-6 border-b border-[#1A1A1A]">
                <h1 className="text-xl font-heading font-bold text-white text-center">
                    Wallet
                </h1>
            </header>

            <div className="px-4 space-y-8">
                {/* Connection Toggle (For Demo Purposes) */}
                <div className="flex justify-center opacity-50 hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setIsConnected(!isConnected)}
                        className="text-xs text-[#9A9A9A] underline"
                    >
                        [DEV: Toggle Connection State]
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {isConnected ? (
                        <motion.div
                            key="connected"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* Cardano Card */}
                            <div className="relative w-full aspect-[1.586] bg-gradient-to-br from-[#1A1A1A] to-black rounded-2xl border border-[#F0B90B]/50 p-6 flex flex-col justify-between overflow-hidden shadow-2xl shadow-[#F0B90B]/10">
                                {/* Background Pattern/Watermark */}
                                <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                                    <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>

                                {/* Top Row */}
                                <div className="flex justify-between items-start z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#F0B90B]/20 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0B90B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-white tracking-wider">CARDANO</span>
                                    </div>
                                    <span className="text-[#F0B90B] font-mono text-xs bg-[#F0B90B]/10 px-2 py-1 rounded">
                                        MAINNET
                                    </span>
                                </div>

                                {/* Balance */}
                                <div className="z-10">
                                    <p className="text-[#9A9A9A] text-xs font-medium mb-1 uppercase tracking-wider">Solde Disponible</p>
                                    <div className="flex items-baseline gap-2">
                                        <h2 className="text-4xl font-heading font-bold text-white tracking-tight">
                                            {balance}
                                        </h2>
                                        <span className="text-xl font-medium text-[#F0B90B]">ADA</span>
                                    </div>
                                    <p className="text-[#9A9A9A] text-sm mt-1">≈ $180.00 USD</p>
                                </div>

                                {/* Address */}
                                <div className="flex items-center justify-between z-10">
                                    <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
                                        <span className="font-mono text-xs text-[#9A9A9A]">{address}</span>
                                        <Copy className="w-3 h-3 text-[#F0B90B] cursor-pointer hover:text-white" />
                                    </div>
                                    <div className="w-8 h-5 rounded bg-[#F0B90B]/20 flex items-center justify-center border border-[#F0B90B]/30">
                                        <div className="w-4 h-4 rounded-full bg-[#F0B90B]" />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    className="h-14 bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 border-0 font-bold text-base rounded-xl shadow-lg shadow-[#F0B90B]/10"
                                    onClick={() => alert("Fonctionnalité à venir")}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Recharger
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-14 bg-[#1A1A1A] text-white hover:bg-[#252525] border border-[#333] font-medium text-base rounded-xl"
                                    onClick={() => alert("Fonctionnalité à venir")}
                                >
                                    <List className="w-5 h-5 mr-2 text-[#9A9A9A]" />
                                    Historique
                                </Button>
                            </div>

                            {/* Recent Transactions Preview */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Dernières Transactions</h3>
                                <div className="space-y-3">
                                    <TransactionItem
                                        type="credit"
                                        label="Recharge Mobile Money"
                                        date="Aujourd'hui, 10:23"
                                        amount="+ 50 ADA"
                                    />
                                    <TransactionItem
                                        type="debit"
                                        label="Course Taxi - Majengo"
                                        date="Hier, 18:45"
                                        amount="- 12 ADA"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="disconnected"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center py-12 px-4 text-center"
                        >
                            <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-8 border-2 border-[#1A1A1A] shadow-2xl">
                                <Wallet className="w-10 h-10 text-[#F0B90B]" />
                            </div>

                            <h2 className="text-2xl font-heading font-bold text-white mb-3">
                                Connectez votre Wallet
                            </h2>
                            <p className="text-[#9A9A9A] mb-8 max-w-xs mx-auto leading-relaxed">
                                Connectez votre portefeuille Cardano pour payer vos courses et recevoir des récompenses KENDA.
                            </p>

                            <Button
                                onClick={() => setIsConnected(true)}
                                className="w-full max-w-xs h-14 bg-[#F0B90B] text-black font-bold text-lg rounded-xl shadow-lg hover:bg-[#F0B90B]/90"
                            >
                                Connecter Wallet
                            </Button>

                            <p className="mt-6 text-xs text-[#555]">
                                Supporte Nami, Eternl, Flint, Yoroi
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function TransactionItem({ type, label, date, amount }: { type: 'credit' | 'debit', label: string, date: string, amount: string }) {
    const isCredit = type === 'credit';

    return (
        <div className="flex items-center justify-between p-4 bg-[#0C0C0C] rounded-xl border border-[#1A1A1A]">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    isCredit ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                    {isCredit ? <Plus className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                </div>
                <div className="text-left">
                    <p className="font-bold text-white text-sm">{label}</p>
                    <p className="text-xs text-[#9A9A9A]">{date}</p>
                </div>
            </div>
            <span className={cn(
                "font-mono font-bold",
                isCredit ? "text-green-500" : "text-white"
            )}>
                {amount}
            </span>
        </div>
    );
}
