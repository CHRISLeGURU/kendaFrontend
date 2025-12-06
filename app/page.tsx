import { Metadata } from "next";
import { LandingPage } from "@/components/home/LandingPage";

// Page-specific SEO metadata
export const metadata: Metadata = {
    title: "KENDA - Taxi & VTC Sécurisé à Goma, RDC | Commander en 2 Clics",
    description: "KENDA est l'application #1 de taxi et VTC à Goma, République Démocratique du Congo. Chauffeurs vérifiés par blockchain, paiement Mobile Money (M-Pesa, Airtel Money), suivi GPS en temps réel. Téléchargez gratuitement !",
    keywords: [
        "taxi Goma",
        "VTC Goma",
        "moto taxi Goma",
        "taxi RDC",
        "application taxi Congo",
        "KENDA",
        "transport Goma",
        "taxi aéroport Goma",
        "taxi sécurisé",
        "M-Pesa taxi",
        "Airtel Money taxi",
        "chauffeur Goma",
        "réserver taxi Goma"
    ],
    openGraph: {
        title: "KENDA - Taxi & VTC Sécurisé à Goma 🚖",
        description: "Commander un taxi sécurisé à Goma en 2 clics. Chauffeurs vérifiés, paiement Mobile Money, 100% fiable.",
        url: "https://kenda-appp.vercel.app",
        type: "website",
        images: [
            {
                url: "/og-home.png",
                width: 1200,
                height: 630,
                alt: "KENDA - Application de taxi à Goma",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "KENDA - Le Taxi Sécurisé à Goma 🚖",
        description: "La première app de taxi blockchain au Congo. Réservez maintenant !",
        images: ["/twitter-home.png"],
    },
    alternates: {
        canonical: "https://kenda-appp.vercel.app",
    },
};

export default function Home() {
    return (
        <>
            {/* SEO: Hidden H1 for screen readers and SEO */}
            <h1 className="sr-only">
                KENDA - Application de Taxi et VTC Sécurisé à Goma, RDC
            </h1>
            <LandingPage />
        </>
    );
}
