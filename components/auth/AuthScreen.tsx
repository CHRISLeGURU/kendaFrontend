"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Phone, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AuthScreenProps {
    onAuthenticated?: () => void;
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (onAuthenticated) {
                onAuthenticated();
            } else {
                // Default behavior if no callback (e.g. redirect)
                window.location.href = '/map';
            }
        }, 1500);
    };

    return (

        <div className="min-h-[100dvh] w-full bg-black text-white flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-md bg-black md:bg-[#0C0C0C] md:border md:border-[#1A1A1A] md:rounded-3xl md:p-8 md:shadow-2xl flex flex-col h-full md:h-auto min-h-[500px]">
                {/* Logo Section */}
                <div className="flex flex-col items-center mt-6 md:mt-0 mb-10">
                    <h1 className="font-heading font-bold text-4xl text-white tracking-tight mb-2">
                        KENDA
                    </h1>
                    <p className="text-[#9A9A9A] text-sm font-medium tracking-wide uppercase">
                        Mobilité Sûre
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex w-full mb-8 border-b border-[#1A1A1A]">
                    <button
                        onClick={() => setMode('LOGIN')}
                        className={cn(
                            "flex-1 pb-3 text-sm font-bold transition-all relative",
                            mode === 'LOGIN' ? "text-white" : "text-[#9A9A9A]"
                        )}
                    >
                        Connexion
                        {mode === 'LOGIN' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0B90B]"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setMode('SIGNUP')}
                        className={cn(
                            "flex-1 pb-3 text-sm font-bold transition-all relative",
                            mode === 'SIGNUP' ? "text-white" : "text-[#9A9A9A]"
                        )}
                    >
                        Inscription
                        {mode === 'SIGNUP' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F0B90B]"
                            />
                        )}
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, x: mode === 'LOGIN' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: mode === 'LOGIN' ? 20 : -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4 w-full"
                        >
                            {mode === 'SIGNUP' && (
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <Input
                                        placeholder="Nom complet"
                                        className="h-14 pl-12 bg-[#0C0C0C] md:bg-black border-[#1A1A1A] text-white placeholder:text-[#666] focus-visible:ring-[#F0B90B]/50 rounded-xl"
                                        required
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Email ou Téléphone"
                                    className="h-14 pl-12 bg-[#0C0C0C] md:bg-black border-[#1A1A1A] text-white placeholder:text-[#666] focus-visible:ring-[#F0B90B]/50 rounded-xl"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    className="h-14 pl-12 pr-12 bg-[#0C0C0C] md:bg-black border-[#1A1A1A] text-white placeholder:text-[#666] focus-visible:ring-[#F0B90B]/50 rounded-xl"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {mode === 'SIGNUP' && (
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="Confirmer mot de passe"
                                        className="h-14 pl-12 bg-[#0C0C0C] md:bg-black border-[#1A1A1A] text-white placeholder:text-[#666] focus-visible:ring-[#F0B90B]/50 rounded-xl"
                                        required
                                    />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-auto pt-8 mb-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-[#F0B90B] text-black font-bold text-lg rounded-xl hover:bg-[#F0B90B]/90 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                mode === 'LOGIN' ? "Se connecter" : "Créer mon compte"
                            )}
                        </Button>

                        {mode === 'LOGIN' && (
                            <button
                                type="button"
                                className="w-full mt-4 text-sm text-[#9A9A9A] hover:text-white underline decoration-[#9A9A9A] underline-offset-4"
                            >
                                Mot de passe oublié ?
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
