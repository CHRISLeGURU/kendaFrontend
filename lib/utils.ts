import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Récupère le prix de l'ADA en USD via CoinGecko
 */
async function getAdaPriceInUsd(): Promise<number> {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd"
        );
        const data = await response.json();
        return data.cardano.usd;
    } catch (error) {
        console.error("Erreur récupération prix ADA:", error);
        return 1; // Fallback
    }
}

/**
 * Convertit un montant USD (ex: "80 USD") en Lovelace (string)
 */
export async function convertToLovelace(amountStr: string): Promise<string> {
    const cleanAmount = amountStr.toString().replace(/[^0-9.]/g, '');
    const amountInUsd = parseFloat(cleanAmount);

    if (isNaN(amountInUsd)) return "0";

    const adaPrice = await getAdaPriceInUsd();
    const amountInAda = amountInUsd / adaPrice;

    console.log(`💱 Conversion: ${amountInUsd}$ @ ${adaPrice}$/ADA = ${amountInAda} ADA`);

    return Math.floor(amountInAda * 1000000).toString();
}
