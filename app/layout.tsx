import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

export const metadata: Metadata = {
    title: "KENDA - Urban Mobility on Cardano",
    description: "Decentralized urban mobility platform powered by Cardano blockchain",
};

import { MobileNavBar } from "@/components/layout/MobileNavBar";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${manrope.variable} antialiased h-dvh w-screen overflow-hidden bg-black text-white flex`}>
                <DesktopSidebar />
                <div className="flex-1 h-full w-full md:pl-64 transition-all duration-300 relative">
                    {children}
                </div>
                <MobileNavBar />
            </body>
        </html>
    );
}
