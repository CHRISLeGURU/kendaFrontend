import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-24 md:py-32">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-h1 md:text-5xl lg:text-6xl font-heading text-foreground mb-6 max-w-4xl">
                            Urban Mobility on{" "}
                            <span className="text-accent">Cardano Blockchain</span>
                        </h1>
                        <p className="text-body md:text-lg text-foreground-secondary max-w-2xl mb-8">
                            Decentralized ride-sharing platform powered by blockchain technology.
                            Earn rewards, reduce costs, and contribute to sustainable transportation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg">Connect Wallet</Button>
                            <Button size="lg" variant="secondary">
                                Explore Map
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-h2 md:text-4xl font-heading text-foreground text-center mb-12">
                        Why Choose KENDA?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Blockchain Powered</CardTitle>
                                <CardDescription>
                                    Built on Cardano for secure, transparent, and decentralized transactions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-body-sm text-foreground-secondary">
                                    Every ride is recorded on the blockchain, ensuring transparency and trust
                                    between riders and drivers.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Earn Rewards</CardTitle>
                                <CardDescription>
                                    Get rewarded in KENDA tokens for every ride you take or provide
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-body-sm text-foreground-secondary">
                                    Our tokenomics model ensures fair distribution of rewards to all
                                    participants in the ecosystem.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Lower Fees</CardTitle>
                                <CardDescription>
                                    No middleman means more money in your pocket
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-body-sm text-foreground-secondary">
                                    Decentralization eliminates platform fees, making rides more affordable
                                    for everyone.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-24">
                    <Card className="bg-gradient-to-r from-background-secondary to-background border-accent/20">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-h2 md:text-4xl font-heading text-foreground mb-4">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-body text-foreground-secondary mb-8 max-w-2xl mx-auto">
                                Connect your Cardano wallet and experience the future of urban mobility today.
                            </p>
                            <Button size="lg">Get Started Now</Button>
                        </CardContent>
                    </Card>
                </section>
            </main>
            <Footer />
        </>
    );
}
