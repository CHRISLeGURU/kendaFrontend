import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // KENDA Design System Colors
                background: {
                    DEFAULT: "#000000", // Noir Profond
                    secondary: "#0C0C0C", // Background Secondaire
                },
                border: {
                    DEFAULT: "#1A1A1A", // Bordures & Séparateurs
                },
                accent: {
                    DEFAULT: "#F0B90B", // Jaune Kenda (Brand)
                    foreground: "#000000", // Texte sur fond jaune
                },
                foreground: {
                    DEFAULT: "#FFFFFF", // Texte Principal
                    secondary: "#9A9A9A", // Texte Secondaire
                },
                destructive: {
                    DEFAULT: "#FF4747", // Erreur / Infraction
                    foreground: "#FFFFFF",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "sans-serif"],
                heading: ["var(--font-manrope)", "Manrope", "sans-serif"],
            },
            fontSize: {
                h1: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
                h2: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
                body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
                "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
            },
            borderRadius: {
                DEFAULT: "12px",
                button: "10px",
            },
            spacing: {
                card: "24px",
            },
        },
    },
    plugins: [],
};

export default config;
