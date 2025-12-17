export async function getAdaExchangeRate() {
  try {
    // Étape 1 : Récupérer le prix du Cardano en USD (CoinGecko)
    const cryptoResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd"
    );
    const cryptoData = await cryptoResponse.json();
    const adaPriceInUsd = cryptoData.cardano.usd;

    // Étape 2 : Récupérer le taux de change USD -> CDF (Open Exchange Rate)
    const fiatResponse = await fetch("https://open.er-api.com/v6/latest/USD");
    const fiatData = await fiatResponse.json();
    const oneUsdInCdf = fiatData.rates.CDF; // Taux environ 2800 FC pour 1$

    // Étape 3 : Calcul final
    // Si 1 ADA = 0.5$ et 1$ = 2800 FC, alors 1 ADA = 0.5 * 2800 = 1400 FC
    const adaPriceInCdf = adaPriceInUsd * oneUsdInCdf;

    return {
      priceInUsd: adaPriceInUsd,
      priceInCdf: adaPriceInCdf,
      exchangeRateUsdToCdf: oneUsdInCdf
    };

  } catch (error) {
    console.error("Erreur de conversion :", error);
    return null;
  }
}

export function convertFcToAda(amountInFc, priceOfOneAdaInFc) {
  if (!priceOfOneAdaInFc || priceOfOneAdaInFc === 0) return 0;
  return amountInFc / priceOfOneAdaInFc;
}