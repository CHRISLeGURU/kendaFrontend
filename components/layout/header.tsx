"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-h2 font-heading text-accent">KENDA</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/map"
                        className="text-body text-foreground-secondary hover:text-foreground transition-colors"
                    >
                        Map
                    </Link>
                    <Link
                        href="/rides"
                        className="text-body text-foreground-secondary hover:text-foreground transition-colors"
                    >
                        My Rides
                    </Link>
                    <Link
                        href="/wallet"
                        className="text-body text-foreground-secondary hover:text-foreground transition-colors"
                    >
                        Wallet
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                        Sign In
                    </Button>
                    <Button size="sm">Connect Wallet</Button>
                </div>
            </div>
        </header>
    );
}
