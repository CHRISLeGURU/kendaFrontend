"use client";

import React from "react";
import dynamic from "next/dynamic";
import { List, Plus, CreditCard, Send, QrCode, ArrowUpRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PaymentModal } from "./PaymentModal";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";

// Dynamic import with SSR disabled - required because @meshsdk uses WASM modules
const CardanoWalletConnect = dynamic(
    () => import("@/components/wallet/CardanoWalletConnect").then(mod => mod.CardanoWalletConnect),
    {
        ssr: false,
        loading: () => (
            <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] w-full shadow-xl animate-pulse">
                <div className="h-8 bg-[#1A1A1A] rounded w-3/4"></div>
                <div className="h-24 bg-[#1A1A1A] rounded"></div>
            </div>
        )
    }
);
import { X, Camera } from "lucide-react";

export function WalletScreen() {
    const t = useTranslations('Wallet');

    // Send State
    const [showSendForm, setShowSendForm] = useState(false);
    const [sendAddr, setSendAddr] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    // Payment Modal Logic
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    // QR Logic
    useEffect(() => {
        if (isScanning) {
            const scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: 250 },
                /* verbose= */ false
            );
            scanner.render((decodedText) => {
                setSendAddr(decodedText);
                setIsScanning(false);
                scanner.clear();
            }, (error) => {
                // console.warn(error);
            });

            return () => {
                scanner.clear().catch(err => console.error("Failed to clear scanner", err));
            };
        }
    }, [isScanning]);

    const handleSendSubmit = () => {
        if (!sendAddr || !sendAmount) return alert("Veuillez remplir tous les champs");
        setShowSendForm(false);
        setIsPayModalOpen(true);
    };

    return (
        <div className="h-full overflow-y-auto bg-black text-white pb-24 relative">
            {/* Background Ambient Glow */}
            <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-[#F0B90B]/10 to-transparent pointer-events-none z-0" />

            {/* Header / Greeting */}
            <header className="relative z-10 px-6 pt-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-heading font-black text-white mb-1">
                            Mon Portefeuille
                        </h1>
                        <p className="text-[#999] text-sm font-medium">
                            Gérez vos actifs crypto & fiat
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-[#F0B90B]" />
                    </div>
                </div>

                {/* Main Connect Component */}
                <div className="mb-8">
                    <CardanoWalletConnect />
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <ActionButton icon={Plus} label="Recharger" onClick={() => alert("Bientôt disponible")} />
                    <ActionButton icon={Send} label="Payer Chauffeur" onClick={() => setShowSendForm(true)} />
                    <ActionButton icon={ArrowUpRight} label="Retirer" onClick={() => alert("Bientôt disponible")} />
                </div>

                {/* Recent Activity Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Activité Récente</h3>
                        <Button variant="ghost" size="sm" className="text-[#F0B90B] hover:text-[#F0B90B] hover:bg-[#F0B90B]/10 text-xs h-8">
                            Tout voir
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {/* Empty State Friendly */}
                        <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-[#1F1F1F] text-center">
                            <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-3">
                                <History className="w-5 h-5 text-[#666]" />
                            </div>
                            <p className="text-white font-medium mb-1">C'est calme ici...</p>
                            <p className="text-[#666] text-xs leading-relaxed max-w-[200px] mx-auto">
                                Vos futures transactions apparaîtront ici une fois que vous aurez commencé à utiliser votre wallet.
                            </p>
                        </div>
                    </div>
                </div>
            </header>


            {/* Send Form Modal */}
            {
                showSendForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
                        <div className="bg-[#101010] border border-[#252525] rounded-2xl p-6 w-full max-w-sm animate-in zoom-in-95 relative">
                            <button onClick={() => setShowSendForm(false)} className="absolute top-4 right-4 text-gray-400">
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-bold mb-4">Envoyer ADA</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Adresse Portefeuille</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-[#F0B90B]"
                                            placeholder="addr1..."
                                            value={sendAddr}
                                            onChange={e => setSendAddr(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setIsScanning(true)}
                                            className="bg-[#222] hover:bg-[#333] p-2 rounded-lg text-[#F0B90B] border border-[#333]"
                                            title="Scanner QR"
                                        >
                                            <Camera size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Montant (ADA)</label>
                                    <input
                                        type="number"
                                        className="bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-[#F0B90B]"
                                        placeholder="ex: 50"
                                        value={sendAmount}
                                        onChange={e => setSendAmount(e.target.value)}
                                    />
                                </div>

                                <Button
                                    onClick={handleSendSubmit}
                                    className="w-full bg-[#F0B90B] hover:bg-[#e0b010] text-black font-bold mt-2"
                                >
                                    Continuer
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Scanner Overlay */}
            {
                isScanning && (
                    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-4">
                        <div className="w-full max-w-sm bg-white rounded-xl overflow-hidden relative">
                            <div id="reader" className="w-full"></div>
                            <button
                                onClick={() => setIsScanning(false)}
                                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-white mt-4 text-sm">Scannez le code QR du chauffeur</p>
                        <button onClick={() => setIsScanning(false)} className="mt-8 text-neutral-400">Annuler</button>
                    </div>
                )
            }

            <PaymentModal
                isOpen={isPayModalOpen}
                onClose={() => setIsPayModalOpen(false)}
                amount={`${sendAmount} ADA`}
                recipientAddress={sendAddr}
                isAda={true}
                onSuccess={async (txHash) => { alert("Envoyé ! HASH: " + txHash); }}
                title="Confirmer l'envoi"
                description={`Envoi de ${sendAmount} ADA`}
            />

        </div >
    );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-[#0F0F0F] border border-[#1F1F1F] hover:bg-[#1A1A1A] hover:border-[#F0B90B]/30 transition-all group"
        >
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] group-hover:bg-[#F0B90B]/20 flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5 text-white group-hover:text-[#F0B90B] transition-colors" />
            </div>
            <span className="text-xs font-bold text-[#999] group-hover:text-white transition-colors">{label}</span>
        </motion.button>
    );
}
