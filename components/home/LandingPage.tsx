"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Wallet, Scale, ArrowRight, CheckCircle2, MapPin, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export function LandingPage() {
    return (
        <div className="h-full bg-black text-white overflow-y-auto overflow-x-hidden selection:bg-[#F0B90B] selection:text-black">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* A. Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-heading font-bold text-white tracking-tight">KENDA</span>
                        <span className="text-[10px] text-[#9A9A9A] uppercase tracking-widest font-medium">Mobilité Sûre</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="outline" className="hidden sm:flex border-white/20 text-white hover:bg-white hover:text-black rounded-full px-6 transition-all">
                                S&apos;inscrire
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90 font-bold rounded-full px-6 shadow-[0_0_20px_rgba(240,185,11,0.3)] transition-all hover:shadow-[0_0_30px_rgba(240,185,11,0.5)]">
                                Se connecter
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="relative z-10">
                {/* B. Hero Section */}
                <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#F0B90B] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F0B90B] animate-pulse" />
                                <span className="text-xs font-medium text-[#9A9A9A] tracking-wide">Powered by Cardano</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6">
                                Goma mérite une mobilité <br />
                                <span className="text-[#F0B90B]">Sûre</span> et <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Transparente.</span>
                            </h1>

                            <p className="text-lg text-[#9A9A9A] mb-10 leading-relaxed max-w-lg">
                                La première plateforme de VTC et de gestion de contraventions sécurisée par la Blockchain.
                                Fini les disputes, fini l&apos;insécurité.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/login">
                                    <Button className="w-full sm:w-auto h-14 px-8 bg-[#F0B90B] text-black font-bold text-lg rounded-full hover:bg-[#F0B90B]/90 shadow-lg shadow-[#F0B90B]/20 transition-transform hover:scale-105">
                                        Commander un trajet
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="w-full sm:w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10 rounded-full text-lg font-medium">
                                        Je suis Chauffeur
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Visual (Mockup Placeholder) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 w-[320px] mx-auto bg-[#0C0C0C] border-[8px] border-[#1A1A1A] rounded-[3rem] h-[640px] shadow-2xl overflow-hidden">
                                {/* Mockup Screen Content */}
                                <div className="absolute inset-0 bg-[#0C0C0C] flex flex-col">
                                    {/* Mock Header */}
                                    <div className="h-24 bg-gradient-to-b from-black/80 to-transparent p-6 flex justify-between items-end">
                                        <div className="w-8 h-8 rounded-full bg-white/10" />
                                        <div className="w-24 h-4 rounded-full bg-white/10" />
                                    </div>
                                    {/* Mock Map */}
                                    <div className="flex-1 bg-[#151515] relative opacity-50">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-16 h-16 bg-[#F0B90B]/20 rounded-full flex items-center justify-center animate-ping" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F0B90B] rounded-full border-2 border-black" />
                                        </div>
                                    </div>
                                    {/* Mock Bottom Sheet */}
                                    <div className="h-48 bg-[#1A1A1A] rounded-t-3xl p-6 space-y-4">
                                        <div className="w-12 h-1 rounded-full bg-white/10 mx-auto" />
                                        <div className="h-12 bg-[#F0B90B] rounded-xl w-full" />
                                        <div className="h-4 bg-white/5 rounded w-2/3" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute top-1/4 -left-12 bg-[#1A1A1A] border border-white/10 p-4 rounded-2xl shadow-xl backdrop-blur-md animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#9A9A9A]">Statut</p>
                                        <p className="text-sm font-bold text-white">Vérifié</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* C. Features Section */}
                <section className="py-32 bg-[#050505] relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                                La technologie au service de la <span className="text-[#F0B90B]">confiance.</span>
                            </h2>
                            <p className="text-[#9A9A9A] text-lg">
                                Nous utilisons la blockchain pour garantir que chaque interaction est sécurisée, transparente et équitable pour tous.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<ShieldCheck className="w-8 h-8 text-[#F0B90B]" />}
                                title="Sécurité Maximale"
                                description="Chaque chauffeur est vérifié. Votre trajet est suivi en temps réel et partagé avec vos proches."
                            />
                            <FeatureCard
                                icon={<Wallet className="w-8 h-8 text-[#F0B90B]" />}
                                title="Paiement Transparent"
                                description="Payez via Mobile Money ou Crypto. Plus de problèmes de monnaie ou de surfacturation."
                            />
                            <FeatureCard
                                icon={<Scale className="w-8 h-8 text-[#F0B90B]" />}
                                title="Justice pour tous"
                                description="Gestion automatisée des contraventions. Payez vos amendes légitimes instantanément, sans corruption."
                            />
                        </div>
                    </div>
                </section>

                {/* D. Social Proof */}
                <section className="py-20 border-y border-[#1A1A1A] bg-black">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]">
                            <StatItem value="100%" label="Chauffeurs Vérifiés" />
                            <StatItem value="0" label="Corruption Tolérée" />
                            <StatItem value="24/7" label="Support Client" />
                        </div>
                    </div>
                </section>

                {/* E. Footer */}
                <footer className="py-12 bg-[#0C0C0C]">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-xl font-heading font-bold text-white">KENDA</span>
                            <p className="text-sm text-[#666] mt-2">Développé pour le Hackathon Ada Prisma</p>
                        </div>
                        <div className="flex gap-8 text-sm text-[#9A9A9A]">
                            <Link href="#" className="hover:text-white transition-colors" onClick={() => alert("Fonctionnalité à venir")}>À propos</Link>
                            <Link href="#" className="hover:text-white transition-colors" onClick={() => alert("Fonctionnalité à venir")}>Confidentialité</Link>
                            <Link href="#" className="hover:text-white transition-colors" onClick={() => alert("Fonctionnalité à venir")}>Contact</Link>
                        </div>
                        <p className="text-sm text-[#666]">
                            © 2025 KENDA Inc.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#F0B90B]/30 transition-colors group"
        >
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-[#F0B90B]/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-[#9A9A9A] leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <span className="text-5xl font-heading font-bold text-white mb-2 tracking-tight">{value}</span>
            <span className="text-[#F0B90B] font-medium uppercase tracking-widest text-sm">{label}</span>
        </div>
    );
}
