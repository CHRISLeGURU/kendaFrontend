"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
    return (
        <div className="h-full bg-black text-white overflow-y-auto">
            {/* Landing Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#1A1A1A]">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-heading font-bold text-white tracking-tight">KENDA</span>
                        <span className="text-[10px] text-[#9A9A9A] uppercase tracking-widest">Mobilité Sûre</span>
                    </div>
                    <Link href="/login">
                        <Button variant="outline" className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B] hover:text-black font-bold rounded-full px-6">
                            Se connecter
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F0B90B] opacity-10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#333] rounded-full px-4 py-1.5 mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#F0B90B] animate-pulse" />
                            <span className="text-xs font-medium text-[#F0B90B] uppercase tracking-wide">Disponible à Goma</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                            La mobilité urbaine <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0B90B] to-[#F0B90B]/60">
                                Réinventée.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#9A9A9A] mb-10 max-w-2xl leading-relaxed">
                            Déplacez-vous en toute sécurité à Goma avec KENDA.
                            Traçabilité blockchain, paiements simplifiés et chauffeurs vérifiés.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button className="w-full h-14 px-8 bg-[#F0B90B] text-black font-bold text-lg rounded-full hover:bg-[#F0B90B]/90 shadow-lg shadow-[#F0B90B]/20 transition-transform hover:scale-105">
                                    Commencer maintenant
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 bg-[#0C0C0C] border-t border-[#1A1A1A]">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Shield className="w-8 h-8 text-[#F0B90B]" />}
                                title="Sécurité Maximale"
                                description="Tous nos chauffeurs sont rigoureusement vérifiés. Partagez votre trajet en temps réel avec vos proches."
                            />
                            <FeatureCard
                                icon={<Wallet className="w-8 h-8 text-[#F0B90B]" />}
                                title="Paiements Flexibles"
                                description="Payez en Francs Congolais, Mobile Money ou Crypto (ADA/KENDA). Transparence totale garantie."
                            />
                            <FeatureCard
                                icon={<MapPin className="w-8 h-8 text-[#F0B90B]" />}
                                title="Traçabilité Totale"
                                description="Chaque course est enregistrée sur la blockchain pour une sécurité et un historique inaltérables."
                            />
                        </div>
                    </div>
                </section>

                {/* Trust Section */}
                <section className="py-24 bg-black border-t border-[#1A1A1A]">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-heading font-bold text-white mb-12">
                            Pourquoi choisir KENDA ?
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-12">
                            <TrustItem text="Chauffeurs Certifiés" />
                            <TrustItem text="Support 24/7" />
                            <TrustItem text="Prix Fixes" />
                            <TrustItem text="Assurance Incluse" />
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="py-8 bg-[#0C0C0C] border-t border-[#1A1A1A] text-center">
                <p className="text-[#666] text-sm">
                    © 2025 KENDA. Fièrement développé à Goma.
                </p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-3xl bg-black border border-[#1A1A1A] hover:border-[#F0B90B]/30 transition-colors group">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-[#F0B90B]/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-[#9A9A9A] leading-relaxed">
                {description}
            </p>
        </div>
    );
}

function TrustItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] border border-[#333]">
            <CheckCircle2 className="w-5 h-5 text-[#F0B90B]" />
            <span className="font-medium text-white">{text}</span>
        </div>
    );
}
