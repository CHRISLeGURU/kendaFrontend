"use client";

import { X, Wallet } from "lucide-react";
import { BrowserWallet, Transaction } from "@meshsdk/core";
import { useState } from "react";
import { convertToLovelace } from "@/lib/utils";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string; // "10 USD"
    recipientAddress: string;
    metadata?: any;
    onSuccess: (txHash: string) => Promise<void>;
    title?: string;
    description?: string;
    isAda?: boolean;
}

export function PaymentModal({
    isOpen,
    onClose,
    amount,
    recipientAddress,
    metadata,
    onSuccess,
    title = "Paiement",
    description = "Transaction Cardano",
    isAda = false
}: PaymentModalProps) {
    const [isPaying, setIsPaying] = useState(false);

    const handlePayment = async () => {
        setIsPaying(true);

        try {
            // 1. Détecter les wallets
            const wallets = await BrowserWallet.getAvailableWallets();
            if (wallets.length === 0) {
                alert("Aucun wallet Cardano détecté (Nami, Eternal, etc).");
                setIsPaying(false);
                return;
            }

            const walletName = wallets[0].id;
            const wallet = await BrowserWallet.enable(walletName);

            // 2. Conversion Montant
            let amountInLovelace = "0";
            if (isAda) {
                // Direct ADA -> Lovelace
                const clean = amount.replace(/[^0-9.]/g, '');
                amountInLovelace = Math.floor(parseFloat(clean) * 1000000).toString();
            } else {
                // USD -> Lovelace
                amountInLovelace = await convertToLovelace(amount);
            }

            console.log(`Paying ${amountInLovelace} Lovelace to ${recipientAddress}`);

            // 3. Préparer TX
            const tx = new Transaction({ initiator: wallet });
            tx.sendLovelace(recipientAddress, amountInLovelace);

            // Ajouter Metadata si présent (ex: Ref amende)
            if (metadata) {
                // 674 is generic label used in project
                tx.setMetadata(674, metadata);
            }

            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);

            console.log("TX Hash:", txHash);

            // 4. Succès
            await onSuccess(txHash);
            alert("Paiement réussi !");
            onClose();

        } catch (error: any) {
            console.error("Payment Error:", error);
            alert("Erreur de paiement: " + error.message);
        } finally {
            setIsPaying(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-[#F0B90B]/10 rounded-full flex items-center justify-center mb-4">
                        <Wallet className="w-6 h-6 text-[#F0B90B]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{description}</p>
                </div>

                <div className="bg-[#151515] rounded-xl p-4 mb-6 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Montant à payer</span>
                        <span className="text-[#F0B90B] font-bold text-lg">{amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Destinataire</span>
                        <span className="font-mono" title={recipientAddress}>
                            {recipientAddress.slice(0, 8)}...{recipientAddress.slice(-8)}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={isPaying}
                    className="w-full bg-[#F0B90B] text-black font-bold py-3.5 rounded-xl hover:bg-[#e0b010] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isPaying ? "Traitement en cours..." : "Confirmer le paiement avec Cardano"}
                </button>
            </div>
        </div>
    );
}
