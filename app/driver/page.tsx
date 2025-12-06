import { Metadata } from "next";
import Link from "next/link";
import {
    Car,
    Shield,
    Wallet,
    Clock,
    Users,
    CheckCircle2,
    ArrowRight,
    Smartphone,
    MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Devenir Chauffeur KENDA à Goma | Gagnez jusqu'à 500.000 FC/mois",
    description: "Rejoignez KENDA et devenez chauffeur partenaire à Goma. Inscription gratuite, revenus attractifs jusqu'à 500.000 FC/mois, flexibilité totale. Inscrivez-vous maintenant !",
    keywords: [
        "devenir chauffeur Goma",
        "emploi chauffeur RDC",
        "travail taxi Goma",
        "chauffeur KENDA",
        "gagner argent Goma",
        "emploi transport Congo",
        "inscription chauffeur taxi",
        "moto taxi emploi",
        "revenus chauffeur",
        "travail flexible Goma"
    ],
    openGraph: {
        title: "Devenir Chauffeur KENDA - Gagnez jusqu'à 500.000 FC/mois 💰",
        description: "Inscription gratuite, revenus attractifs, vous êtes votre propre patron. Rejoignez la révolution du transport à Goma !",
        url: "https://kenda-appp.vercel.app/driver",
        type: "website",
        images: [
            {
                url: "/og-driver.png",
                width: 1200,
                height: 630,
                alt: "Devenir chauffeur KENDA",
            }
        ],
    },
    alternates: {
        canonical: "https://kenda-appp.vercel.app/driver",
    },
};

const benefits = [
    {
        icon: <Wallet className="w-8 h-8" />,
        title: "Revenus Attractifs",
        description: "Gagnez jusqu'à 500.000 FC par mois. Vous gardez 85% de chaque course."
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: "Horaires Flexibles",
        description: "Travaillez quand vous voulez. Pas de patron, vous êtes libre."
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: "Paiements Sécurisés",
        description: "Recevez vos gains chaque semaine via Mobile Money (M-Pesa, Airtel Money)."
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Application Simple",
        description: "Interface facile à utiliser. Recevez les courses en un clic."
    },
];

const requirements = [
    "Permis de conduire valide",
    "Véhicule en bon état (Moto ou Voiture)",
    "Carte Rose (preuve de propriété)",
    "Smartphone Android ou iPhone",
    "Être âgé de 21 ans minimum"
];

const stats = [
    { value: "500+", label: "Chauffeurs Actifs" },
    { value: "24h", label: "Délai de Vérification" },
    { value: "85%", label: "Commission Chauffeur" },
    { value: "24/7", label: "Support Disponible" },
];

export default function DriverPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0B90B] opacity-10 blur-[150px] rounded-full" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0B90B]/10 border border-[#F0B90B]/30 mb-8">
                        <Car className="w-4 h-4 text-[#F0B90B]" />
                        <span className="text-sm font-bold text-[#F0B90B]">Recrutement Ouvert</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                        Devenez Chauffeur <span className="text-[#F0B90B]">KENDA</span>
                        <br />et Gagnez Plus
                    </h1>

                    <p className="text-xl text-[#9A9A9A] mb-10 max-w-2xl mx-auto leading-relaxed">
                        Rejoignez la première plateforme de transport sécurisé à Goma.
                        Inscription gratuite, revenus attractifs, liberté totale.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login?role=driver">
                            <Button className="h-14 px-8 bg-[#F0B90B] text-black font-bold text-lg rounded-full hover:bg-[#F0B90B]/90 shadow-lg shadow-[#F0B90B]/20">
                                S&apos;inscrire Maintenant
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Button variant="outline" className="h-14 px-8 border-white/20 text-white rounded-full">
                            En savoir plus
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-[#1A1A1A] bg-[#0C0C0C]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-4xl font-heading font-bold text-[#F0B90B] mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-[#9A9A9A]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Pourquoi Rouler avec <span className="text-[#F0B90B]">KENDA</span> ?
                        </h2>
                        <p className="text-[#9A9A9A] max-w-2xl mx-auto">
                            Des avantages concrets pour maximiser vos revenus et simplifier votre quotidien.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="bg-[#0C0C0C] border-[#1A1A1A] hover:border-[#F0B90B]/30 transition-colors group">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-4 text-[#F0B90B] group-hover:bg-[#F0B90B]/10 transition-colors">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-[#9A9A9A] leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements Section */}
            <section className="py-20 px-6 bg-[#0C0C0C]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold mb-4">
                            Conditions Requises
                        </h2>
                        <p className="text-[#9A9A9A]">
                            Pour devenir chauffeur partenaire KENDA, vous devez remplir ces critères simples.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {requirements.map((req, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-black rounded-xl border border-[#1A1A1A]">
                                <CheckCircle2 className="w-5 h-5 text-[#F0B90B] flex-shrink-0" />
                                <span className="text-white">{req}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-[#F0B90B]/20 to-transparent border border-[#F0B90B]/30 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Prêt à Commencer ?
                        </h2>
                        <p className="text-[#9A9A9A] mb-8 max-w-xl mx-auto">
                            L&apos;inscription prend moins de 5 minutes. Nos équipes vérifieront votre dossier sous 24h.
                        </p>
                        <Link href="/login?role=driver">
                            <Button className="h-16 px-12 bg-[#F0B90B] text-black font-bold text-xl rounded-full hover:bg-[#F0B90B]/90 shadow-xl shadow-[#F0B90B]/30">
                                Devenir Chauffeur KENDA
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Combien peut-on gagner comme chauffeur KENDA ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Les chauffeurs KENDA peuvent gagner jusqu'à 500.000 FC par mois, en gardant 85% du montant de chaque course."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Quels documents faut-il pour devenir chauffeur ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Vous avez besoin d'un permis de conduire valide, d'une carte rose (preuve de propriété du véhicule), et d'un smartphone."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Combien de temps prend la vérification ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "La vérification des documents prend généralement 24 à 48 heures."
                                }
                            }
                        ]
                    })
                }}
            />
        </main>
    );
}
