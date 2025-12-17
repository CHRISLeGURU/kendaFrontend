"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { FineRow } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { PaymentModal } from "@/components/wallet/PaymentModal";

// Utilitaire de formatage date simple sans date-fns
const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(dateString));
};

export default function MyFinesPage() {
    const { user } = useAuth();
    const supabase = createClient();
    const router = useRouter();
    const [fines, setFines] = useState<FineRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [paymentProcessing, setPaymentProcessing] = useState<string | null>(null);

    // Payment Modal State
    const [selectedFine, setSelectedFine] = useState<FineRow | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchFines = async () => {
            try {
                const { data, error } = await supabase
                    .from('fines')
                    .select('*')
                    .eq('offender_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setFines(data || []);
            } catch (err) {
                console.error("Error fetching fines:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFines();
    }, [user, supabase]);

    const handleOpenPayment = (fine: FineRow) => {
        setSelectedFine(fine);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSuccess = async (txHash: string) => {
        if (!selectedFine) return;

        try {
            const { error } = await supabase
                .from('fines')
                // @ts-ignore
                .update({
                    status: 'PAID',
                    paid_at: new Date().toISOString()
                })
                .eq('id', selectedFine.id);

            if (error) throw error;

            setFines(prev => prev.map(f => f.id === selectedFine.id ? { ...f, status: 'PAID', paid_at: new Date().toISOString() } : f));
            // alert handled by modal
        } catch (err) {
            console.error("Error updating fine status:", err);
            alert("Paiement effectué sur la blockchain mais erreur de mise à jour DB. Contactez le support.");
        }
    };

    if (!user) return <div className="p-4 text-white">Veuillez vous connecter.</div>;
    if (loading) return <div className="p-4 text-white">Chargement des contraventions...</div>;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => router.back()} className="p-2 bg-neutral-900 rounded-full border border-neutral-800">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Mes Contraventions</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 text-xs uppercase font-bold">À Payer</p>
                    <p className="text-2xl font-bold text-red-500">
                        {fines.filter(f => f.status === 'UNPAID').length}
                    </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <p className="text-green-400 text-xs uppercase font-bold">Payées</p>
                    <p className="text-2xl font-bold text-green-500">
                        {fines.filter(f => f.status === 'PAID').length}
                    </p>
                </div>
            </div>

            {/* Liste */}
            <div className="space-y-4">
                {fines.length === 0 ? (
                    <div className="text-center text-neutral-500 py-10">
                        <CheckCircle size={48} className="mx-auto mb-2 opacity-20" />
                        <p>Aucune contravention. Bravo ! 👏</p>
                    </div>
                ) : (
                    fines.map(fine => (
                        <div key={fine.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-white">{fine.reason}</h3>
                                    <p className="text-xs text-neutral-400">
                                        {formatDate(fine.created_at)}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">Ref: {fine.infraction_code || fine.id.slice(0, 8)}</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold ${fine.status === 'PAID' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                    }`}>
                                    {fine.status === 'PAID' ? 'PAYÉE' : 'IMPAYÉE'}
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg">
                                <span className="text-neutral-400 text-sm">Montant à régler</span>
                                <span className="text-xl font-bold text-white">{fine.amount} {fine.currency}</span>
                            </div>

                            {fine.status === 'UNPAID' && (
                                <Button
                                    onClick={() => handleOpenPayment(fine)}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                                >
                                    <CreditCard size={18} className="mr-2" />
                                    Payer avec Cardano
                                </Button>
                            )}

                            {fine.status === 'PAID' && (
                                <div className="text-center text-green-500 text-sm font-medium flex items-center justify-center gap-2">
                                    <CheckCircle size={16} /> Payée le {fine.paid_at && formatDate(fine.paid_at)}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>


            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                amount={`${selectedFine?.amount || 0} ${selectedFine?.currency || 'USD'}`}
                recipientAddress="addr_test1qp8kuc9tt05vmsclklzp2l8el7ry36v34ryty5357d0d8sslz9je4qjgjy7zk0thdwwpp5eqedruf7g3yc08xy4gh4hseg0x47"
                metadata={{ type: 'fine', id: selectedFine?.id }}
                onSuccess={handlePaymentSuccess}
                title="Payer l'amende"
                description={`Règlement de l'infraction #${selectedFine?.infraction_code || selectedFine?.id.slice(0, 8)}`}
            />
        </div >
    );
}
