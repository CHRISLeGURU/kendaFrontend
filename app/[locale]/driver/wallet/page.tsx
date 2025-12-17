"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { Wallet, ArrowDownRight, ArrowUpRight, CreditCard, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

interface Transaction {
    id: string;
    description: string;
    amount: string;
    date: string;
}

export default function DriverWalletPage() {
    const { user } = useAuth();
    const supabase = createClient();

    // State
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            setIsLoading(true);
            // Fetch Completed Rides for History
            const { data: rides } = await supabase
                .from('rides')
                .select('*')
                .eq('driver_id', user.id)
                .eq('status', 'COMPLETED')
                .order('created_at', { ascending: false })
                .limit(10);

            if (rides) {
                // Map to History
                const txList: Transaction[] = rides.map((r: any) => ({
                    id: r.id,
                    description: `Course vers ${r.dest_address || 'Destination inconnue'}`,
                    amount: `+${(r.price || 0).toLocaleString()} FC`,
                    date: new Date(r.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
                }));
                setTransactions(txList);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [user, supabase]);

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F0B90B]/10 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-[#F0B90B]" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold">Mon Portefeuille Cardano</h1>
                </div>
                <p className="text-[#9A9A9A] text-sm">Connectez votre wallet pour gérer vos gains en ADA</p>
            </div>

            {/* Real Wallet Connect */}
            <div className="mb-8">
                <CardanoWalletConnect />
            </div>

            {/* Quick Actions (Future) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <Button
                    className="h-14 bg-[#1A1A1A] border border-[#333] text-white hover:bg-[#252525] font-bold"
                    onClick={() => alert("Retrait vers Mobile Money bientôt disponible.")}
                >
                    <ArrowUpRight className="w-5 h-5 mr-2" />
                    Retirer (FC)
                </Button>
                <Button
                    variant="outline"
                    className="h-14 border-[#333333] text-white hover:bg-[#1A1A1A]"
                    onClick={() => alert("Échange ADA -> FC bientôt disponible.")}
                >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Échanger
                </Button>
            </div>

            {/* Ride History */}
            <div>
                <h2 className="text-lg font-bold mb-4">Historique des Courses (FC)</h2>
                <div className="space-y-3">
                    {transactions.length === 0 && !isLoading && (
                        <p className="text-[#666] text-sm">Aucune course récente effectuée.</p>
                    )}
                    {transactions.map((tx) => (
                        <Card key={tx.id} className="bg-[#0C0C0C] border-[#1A1A1A]">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/10">
                                        <ArrowDownRight className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{tx.description}</p>
                                        <p className="text-xs text-[#666]">{tx.date}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-green-500">
                                    {tx.amount}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
