export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-h2 font-heading text-accent mb-4">KENDA</h3>
                        <p className="text-body-sm text-foreground-secondary max-w-md">
                            Decentralized urban mobility platform powered by Cardano blockchain.
                            Ride, earn, and contribute to a sustainable future.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading text-foreground mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/map" className="text-body-sm text-foreground-secondary hover:text-accent transition-colors">
                                    Find Rides
                                </a>
                            </li>
                            <li>
                                <a href="/rides" className="text-body-sm text-foreground-secondary hover:text-accent transition-colors">
                                    My Rides
                                </a>
                            </li>
                            <li>
                                <a href="/wallet" className="text-body-sm text-foreground-secondary hover:text-accent transition-colors">
                                    Wallet
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-foreground mb-4">Community</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-body-sm text-foreground-secondary hover:text-accent transition-colors">
                                    Discord
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-body-sm text-foreground-secondary hover:text-accent transition-colors">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-body-sm text-foreground-secondary hover:text-accent transition-colors">
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-body-sm text-foreground-secondary text-center">
                        © 2024 KENDA. Built on Cardano. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
