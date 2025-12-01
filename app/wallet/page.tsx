"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Copy, ExternalLink } from "lucide-react";

export default function WalletPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-h1 font-heading text-foreground mb-2">
                            Wallet
                        </h1>
                        <p className="text-body text-foreground-secondary">
                            Manage your Cardano wallet and KENDA tokens
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Wallet Connection */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Connect Your Wallet</CardTitle>
                                    <CardDescription>
                                        Connect your Cardano wallet to start using KENDA
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <Wallet className="w-20 h-20 text-accent mb-6" />
                                        <p className="text-body text-foreground-secondary mb-6 text-center max-w-md">
                                            Connect your Cardano wallet to view your balance, transaction history,
                                            and start earning KENDA tokens.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button size="lg">
                                                Connect Wallet
                                            </Button>
                                            <Button size="lg" variant="secondary">
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Transaction History */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Transactions</CardTitle>
                                    <CardDescription>
                                        Your latest wallet activity
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <p className="text-body text-foreground-secondary">
                                            Connect your wallet to view transactions
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Balance</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-background rounded-lg border border-border">
                                        <p className="text-body-sm text-foreground-secondary mb-1">
                                            ADA Balance
                                        </p>
                                        <p className="text-h2 font-heading text-foreground">
                                            -- ADA
                                        </p>
                                    </div>
                                    <div className="p-4 bg-background rounded-lg border border-border">
                                        <p className="text-body-sm text-foreground-secondary mb-1">
                                            KENDA Tokens
                                        </p>
                                        <p className="text-h2 font-heading text-accent">
                                            -- KENDA
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Supported Wallets</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {["Nami", "Eternl", "Flint", "Yoroi"].map((wallet) => (
                                        <div
                                            key={wallet}
                                            className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
                                        >
                                            <span className="text-body text-foreground">{wallet}</span>
                                            <ExternalLink className="w-4 h-4 text-foreground-secondary" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
