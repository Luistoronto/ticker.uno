// src/components/MarketPulse.jsx
// ─────────────────────────────────────────────────────────────
// Server Component: trae los datos de mercado agrupados por tipo
// (majors / stablecoins / altcoins) más los sets de red (Ethereum,
// Solana, BNB Chain) que usa el filtro de red en el cliente.
// Todo pasa por fetchMarkets() en src/lib/coingecko.js.
// ─────────────────────────────────────────────────────────────

import { fetchMarkets } from "@/lib/coingecko";
import MarketPulseClient from "./MarketPulseClient";

// Majors: lista curada a mano — son las monedas "ancla", no cambian
// seguido. Agregá o sacá ids acá si querés ajustar el grupo.
const MAJOR_IDS = ["bitcoin", "ethereum", "binancecoin"];

// Categorías reales de CoinGecko usadas para el filtro de red.
// Solo aplican a "Altcoins" — BTC/ETH/SOL no son tokens de otra red,
// son L1s en sí mismas, así que no tiene sentido filtrarlas por red.
const NETWORK_CATEGORIES = {
  ethereum: "ethereum-ecosystem",
  solana: "solana-ecosystem",
  "bnb-chain": "binance-smart-chain",
};

export default async function MarketPulse() {
  const [majors, stablecoins, topCoins, ethTokens, solTokens, bnbTokens] =
    await Promise.all([
      fetchMarkets({ ids: MAJOR_IDS, perPage: MAJOR_IDS.length }).catch(() => []),
      fetchMarkets({ category: "stablecoins", perPage: 6 }).catch(() => []),
      fetchMarkets({ perPage: 40 }).catch(() => []), // top 40 por market cap, para armar "altcoins"
      fetchMarkets({ category: NETWORK_CATEGORIES.ethereum, perPage: 50 }).catch(() => []),
      fetchMarkets({ category: NETWORK_CATEGORIES.solana, perPage: 50 }).catch(() => []),
      fetchMarkets({ category: NETWORK_CATEGORIES["bnb-chain"], perPage: 50 }).catch(() => []),
    ]);

  // "Altcoins" = top coins por market cap, excluyendo majors y stablecoins
  const excludeIds = new Set([
    ...MAJOR_IDS,
    ...stablecoins.map((c) => c.id),
  ]);
  const altcoins = topCoins.filter((c) => !excludeIds.has(c.id)).slice(0, 12);

  // Sets de ids por red — el cliente los usa para filtrar altcoins
  const networkIds = {
    ethereum: ethTokens.map((c) => c.id),
    solana: solTokens.map((c) => c.id),
    "bnb-chain": bnbTokens.map((c) => c.id),
  };

  return (
    <MarketPulseClient
      majors={majors}
      stablecoins={stablecoins}
      altcoins={altcoins}
      networkIds={networkIds}
    />
  );
}

