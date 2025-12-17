"use client";

import { useWallet, useLovelace } from '@meshsdk/react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet as WalletIcon, LogOut, ChevronRight, Loader2, QrCode, Copy, X } from "lucide-react";
import QRCode from "react-qr-code";
import { getAdaExchangeRate } from "@/lib/converter";

export function CardanoWalletConnect() {
    const { connected, wallet, connect, disconnect, name, connecting } = useWallet();
    const lovelace = useLovelace();
    const [balance, setBalance] = useState<string>("0");
    const [prices, setPrices] = useState<{ usd: number, cdf: number } | null>(null);
    const [availableWallets, setAvailableWallets] = useState<Array<{ name: string; icon: string; version: string }>>([]);

    // Receive Modal State
    const [myAddress, setMyAddress] = useState<string>("");
    const [showReceive, setShowReceive] = useState(false);

    useEffect(() => {
        if (connected && wallet) {
            wallet.getUsedAddresses().then((addrs) => {
                if (addrs.length > 0) setMyAddress(addrs[0]);
                else wallet.getUnusedAddresses().then(unused => {
                    if (unused.length > 0) setMyAddress(unused[0]);
                });
            }).catch(console.error);
        }
    }, [connected, wallet]);

    // Fetch available wallets on mount
    useEffect(() => {
        const getWallets = () => {
            // @ts-ignore - cardano injection
            if (typeof window !== 'undefined' && window.cardano) {
                const wallets = [];
                // @ts-ignore
                for (const key in window.cardano) {
                    // @ts-ignore
                    const w = window.cardano[key];
                    if (w && typeof w.enable === 'function') {
                        wallets.push({
                            name: w.name || key,
                            icon: w.icon,
                            version: w.apiVersion
                        });
                    }
                }
                setAvailableWallets(wallets);
            }
        };
        getWallets();
    }, []);

    useEffect(() => {
        const fetchPrice = async () => {
            // Utilisation du converter réel
            const rates = await getAdaExchangeRate();
            if (rates) {
                setPrices({
                    usd: rates.priceInUsd,
                    cdf: rates.priceInCdf
                });
            } else {
                // Fallback si erreur API
                setPrices({ usd: 0.45, cdf: 1260 });
            }
        };
        fetchPrice();

        if (connected && lovelace) {
            const ada = (parseInt(lovelace) / 1000000).toFixed(2);
            setBalance(ada);
        } else {
            setBalance("0");
        }
    }, [connected, lovelace]);

    const estimatedUsd = prices ? (parseFloat(balance) * prices.usd).toFixed(2) : "---";
    const estimatedCdf = prices ? (parseFloat(balance) * prices.cdf).toFixed(0) : "---";

    return (
        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F] w-full shadow-xl">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#F0B90B]/10 flex items-center justify-center">
                        <WalletIcon className="w-4 h-4 text-[#F0B90B]" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading">Ma Connexion Cardano</h3>
                </div>
                {connected && prices && (
                    <div className="text-xs text-neutral-500 font-mono text-right hidden sm:block">
                        <div>1 ADA ≈ ${prices.usd}</div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4 w-full">
                {!connected ? (
                    <div className="space-y-3">
                        <p className="text-sm text-neutral-400 mb-2">Sélectionnez un wallet détecté :</p>
                        {availableWallets.length === 0 ? (
                            <div className="p-4 bg-[#151515] rounded-xl text-center text-sm text-neutral-500 border border-dashed border-[#333]">
                                Aucun wallet détecté. Veuillez installer <a href="https://namiwallet.io/" target="_blank" className="text-[#F0B90B] underline">Nami</a> ou <a href="https://eternl.io/" target="_blank" className="text-[#F0B90B] underline">Eternl</a>.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-2">
                                {availableWallets.map((w) => (
                                    <button
                                        key={w.name}
                                        onClick={() => connect(w.name)}
                                        disabled={connecting}
                                        className="flex items-center justify-between p-3 rounded-xl bg-[#151515] hover:bg-[#202020] border border-[#252525] hover:border-[#F0B90B]/50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            {w.icon && (
                                                <img src={w.icon} alt={w.name} className="w-8 h-8 rounded-lg" />
                                            )}
                                            <span className="font-bold text-white capitalize">{w.name}</span>
                                        </div>
                                        {connecting ? (
                                            <Loader2 className="w-5 h-5 text-[#F0B90B] animate-spin" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-[#444] group-hover:text-[#F0B90B]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Connected State */}
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-black rounded-xl border border-[#252525] p-6 relative overflow-hidden group">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0B90B]/5 rounded-full blur-3xl -z-0 pointer-events-none group-hover:bg-[#F0B90B]/10 transition-all"></div>

                            <div className="relative z-10">
                                <p className="text-xs text-neutral-500 mb-1 font-bold uppercase tracking-wider flex justify-between items-center">
                                    <span>Solde Disponible</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowReceive(true)}
                                            className="text-[#F0B90B] hover:bg-[#F0B90B]/10 p-1 rounded transition-colors"
                                            title="Recevoir (QR Code)"
                                        >
                                            <QrCode size={16} />
                                        </button>
                                        <span className="text-[#F0B90B] capitalize bg-[#F0B90B]/10 px-2 rounded text-[10px] py-0.5">{name} Wallet</span>
                                    </div>
                                </p>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl font-heading font-black text-white tracking-tight">{balance}</span>
                                    <span className="text-xl font-bold text-[#F0B90B]">ADA</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium text-neutral-400 border-t border-white/5 pt-3">
                                    <div className="bg-[#111] px-2 py-1 rounded text-xs border border-[#222]">
                                        ≈ ${estimatedUsd} USD
                                    </div>
                                    <div className="bg-[#111] px-2 py-1 rounded text-xs border border-[#222]">
                                        ≈ {parseInt(estimatedCdf).toLocaleString()} FC
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={() => disconnect()}
                            className="w-full mt-4 bg-[#151515] hover:bg-red-950/30 text-neutral-400 hover:text-red-500 border border-[#252525] hover:border-red-900/50 h-12"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Déconnecter le wallet
                        </Button>
                    </div>
                )}
            </div>

            {/* Modal Recevoir */}
            {showReceive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="bg-[#101010] border border-[#252525] rounded-2xl p-6 w-full max-w-sm relative animate-in zoom-in-95">
                        <button
                            onClick={() => setShowReceive(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-lg font-bold text-white mb-6 text-center">Recevoir des fonds</h3>

                        <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-6">
                            <QRCode value={myAddress || "addr_test..."} size={200} />
                        </div>

                        <div className="bg-[#1A1A1A] p-3 rounded-lg flex items-center gap-2 border border-[#333]">
                            <p className="text-xs text-gray-400 font-mono break-all flex-1">
                                {myAddress}
                            </p>
                            <button
                                onClick={() => { navigator.clipboard.writeText(myAddress); alert("Adresse copiée !"); }}
                                className="p-2 hover:bg-[#252525] rounded text-[#F0B90B]"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
