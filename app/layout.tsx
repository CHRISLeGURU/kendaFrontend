import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";

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

// SEO Optimized Metadata
export const metadata: Metadata = {
    // Primary Meta Tags
    title: {
        default: "KENDA - VTC & Taxi Sécurisé à Goma | Mobilité Blockchain Cardano",
        template: "%s | KENDA - Mobilité Sûre"
    },
    description: "KENDA est la première plateforme de VTC et taxi à Goma, RDC. Transport sécurisé par blockchain Cardano, paiement Mobile Money, chauffeurs vérifiés. Téléchargez l'app maintenant !",
    keywords: [
        "taxi Goma",
        "VTC Goma",
        "taxi RDC",
        "transport Goma",
        "moto taxi Goma",
        "taxi sécurisé Congo",
        "KENDA taxi",
        "application taxi Goma",
        "chauffeur Goma",
        "transport Bukavu",
        "taxi Kinshasa",
        "blockchain taxi",
        "Cardano transport",
        "mobile money taxi",
        "taxi aéroport Goma"
    ],
    authors: [{ name: "KENDA Team" }],
    creator: "KENDA Inc.",
    publisher: "KENDA Inc.",

    // Robots & Indexing
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // Canonical URL
    metadataBase: new URL("https://kenda-appp.vercel.app"),
    alternates: {
        canonical: "/",
        languages: {
            "fr-CD": "/",
            "fr": "/",
            "en": "/en",
        },
    },

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
        type: "website",
        locale: "fr_CD",
        url: "https://kenda-appp.vercel.app",
        siteName: "KENDA",
        title: "KENDA - VTC & Taxi Sécurisé à Goma | La Première App de Mobilité Blockchain",
        description: "Réservez un taxi ou moto-taxi sécurisé à Goma en 2 clics. Chauffeurs vérifiés, paiement Mobile Money & Crypto, suivi GPS en temps réel. 100% Sûr.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "KENDA - Application de Taxi et VTC à Goma",
            },
        ],
    },

    // Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "KENDA - Taxi & VTC Sécurisé à Goma 🚖",
        description: "La première app de mobilité blockchain au Congo. Chauffeurs vérifiés, paiement Mobile Money, 100% Sûr.",
        images: ["/twitter-image.png"],
        creator: "@KendaApp",
        site: "@KendaApp",
    },

    // Verification
    verification: {
        google: "votre-code-google-search-console",
        // yandex: "votre-code-yandex",
        // bing: "votre-code-bing",
    },

    // App Links
    appLinks: {
        ios: {
            url: "https://kenda.app/ios",
            app_store_id: "123456789",
        },
        android: {
            package: "app.kenda.android",
            app_name: "KENDA",
        },
        web: {
            url: "https://kenda-appp.vercel.app/",
            should_fallback: true,
        },
    },

    // Category
    category: "transportation",

    // Other
    manifest: "/manifest.json",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" dir="ltr">
            <head>
                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "KENDA",
                            "alternateName": "KENDA Taxi",
                            "url": "https://kenda-appp.vercel.app",
                            "logo": "https://kenda-appp.vercel.app/logo.png",
                            "description": "Plateforme de VTC et taxi sécurisé par blockchain Cardano à Goma, RDC",
                            "foundingDate": "2024",
                            "founders": [
                                {
                                    "@type": "Person",
                                    "name": "KENDA Team"
                                }
                            ],
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Goma",
                                "addressRegion": "Nord-Kivu",
                                "addressCountry": "CD"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+243-XXX-XXX-XXX",
                                "contactType": "customer service",
                                "availableLanguage": ["French", "Swahili"]
                            },
                            "sameAs": [
                                "https://twitter.com/KendaApp",
                                "https://facebook.com/KendaApp",
                                "https://linkedin.com/company/kenda-app"
                            ]
                        })
                    }}
                />

                {/* Structured Data - Mobile Application */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "MobileApplication",
                            "name": "KENDA",
                            "operatingSystem": "Android, iOS",
                            "applicationCategory": "TravelApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "ratingCount": "1250"
                            },
                            "description": "Application de taxi et VTC sécurisé à Goma. Réservez en 2 clics, payez par Mobile Money."
                        })
                    }}
                />

                {/* Structured Data - Local Business */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "KENDA Taxi Goma",
                            "@id": "https://kenda-appp.vercel.app",
                            "url": "https://kenda-appp.vercel.app",
                            "telephone": "+243-XXX-XXX-XXX",
                            "priceRange": "$$",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Avenue du Lac",
                                "addressLocality": "Goma",
                                "addressRegion": "Nord-Kivu",
                                "postalCode": "",
                                "addressCountry": "CD"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": -1.6792,
                                "longitude": 29.2232
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday", "Tuesday", "Wednesday",
                                    "Thursday", "Friday", "Saturday", "Sunday"
                                ],
                                "opens": "00:00",
                                "closes": "23:59"
                            },
                            "areaServed": [
                                {
                                    "@type": "City",
                                    "name": "Goma"
                                },
                                {
                                    "@type": "City",
                                    "name": "Bukavu"
                                }
                            ]
                        })
                    }}
                />

                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Theme Color */}
                <meta name="theme-color" content="#F0B90B" />
                <meta name="msapplication-TileColor" content="#000000" />

                {/* Geo Tags for Local SEO */}
                <meta name="geo.region" content="CD-NK" />
                <meta name="geo.placename" content="Goma" />
                <meta name="geo.position" content="-1.6792;29.2232" />
                <meta name="ICBM" content="-1.6792, 29.2232" />
            </head>
            <body className={`${inter.variable} ${manrope.variable} antialiased h-dvh w-screen overflow-hidden bg-black text-white flex`}>
                <NavigationWrapper>
                    {children}
                </NavigationWrapper>
            </body>
        </html>
    );
}
