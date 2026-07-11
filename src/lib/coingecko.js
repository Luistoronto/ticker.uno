// src/lib/coingecko.js
// ─────────────────────────────────────────────────────────────
// Única fuente de verdad para precios de CoinGecko en todo el sitio.
// Tanto WhaleMovements (server component) como el endpoint que
// consume PriceTicker (client component) pasan por acá, así:
//   - no duplicamos llamadas directas a la API pública de CoinGecko
//   - si el día de mañana sumamos una API key o cambiamos de
//     proveedor, se cambia en un solo lugar
// ─────────────────────────────────────────────────────────────

const COINGECKO_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  USDC: "usd-coin",
  DOGE: "dogecoin",
  BNB: "binancecoin",
  XRP: "ripple",
  ADA: "cardano",
};

// Trae precio + variación 24h para una lista de símbolos (ej: ["BTC","ETH"])
// Cachea 60s en el servidor (Next.js fetch cache) para no pasarnos
// del rate limit gratuito de CoinGecko.
export async function fetchPrices(symbols) {
  const ids = symbols
    .map((s) => COINGECKO_IDS[s.toUpperCase()])
    .filter(Boolean)
    .join(",");

  if (!ids) return {};

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  const data = await res.json();

  const result = {};
  for (const symbol of symbols) {
    const id = COINGECKO_IDS[symbol.toUpperCase()];
    if (id && data[id]) {
      result[symbol.toUpperCase()] = {
        priceUSD: data[id].usd,
        change24h: data[id].usd_24h_change,
      };
    }
  }
  return result;
}

// Atajo usado por WhaleMovements para convertir BTC a USD
export async function fetchBTCPriceUSD() {
  try {
    const prices = await fetchPrices(["BTC"]);
    return prices.BTC?.priceUSD || null;
  } catch (err) {
    console.error("Error trayendo precio de BTC:", err.message);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// fetchMarkets — usado por MarketPulse (Pulso del mercado).
// Wrapper de /coins/markets: trae precio, variación 24h, market cap,
// volumen y sparkline de 7 días. Se puede filtrar por lista de ids
// puntuales (ej. majors) o por category (taxonomía real de
// CoinGecko: "stablecoins", "layer-1", "ethereum-ecosystem", etc.
// — ver /coins/categories/list para la lista completa).
// ─────────────────────────────────────────────────────────────
export async function fetchMarkets({ ids, category, perPage = 12, order = "market_cap_desc" } = {}) {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order,
    per_page: String(perPage),
    page: "1",
    sparkline: "true",
    price_change_percentage: "24h",
  });
  if (ids && ids.length) params.set("ids", ids.join(","));
  if (category) params.set("category", category);

  const url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`CoinGecko markets error: ${res.status}`);
  return res.json();
}
