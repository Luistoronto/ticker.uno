// src/components/WhaleMovements.jsx
// ─────────────────────────────────────────────────────────────
// Server Component: busca los movimientos en el servidor
// (con caché de 5 min vía mempool.js) y le pasa la data lista
// al client component, que se encarga del filtro por moneda
// y del popup tipo nube al hacer hover.
// ─────────────────────────────────────────────────────────────

import { whaleWallets, getWalletTag } from "@/data/whaleWallets";
import {
  fetchAddressInfo,
  fetchAddressTxs,
  computeNetForAddress,
  findCounterpartAddress,
  getTxFeeBTC,
} from "@/lib/mempool";
import { fetchBTCPriceUSD } from "@/lib/coingecko";
import WhaleMovementsClient from "./WhaleMovementsClient";

// Umbral mínimo en BTC para mostrar un movimiento (evita ruido)
const MIN_BTC_THRESHOLD = 1;

// Precio de respaldo por si falla el fetch a CoinGecko (poco probable,
// ya cachea 60s), para que el componente nunca se rompa por esto.
const BTC_PRICE_USD_FALLBACK = 67000;

function timeAgo(timestamp) {
  const diffMs = Date.now() - timestamp * 1000;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins} min`;
  const hs = Math.floor(mins / 60);
  if (hs < 24) return `${hs} h`;
  return `${Math.floor(hs / 24)} d`;
}

async function getMovements() {
  const results = [];
  const btcPriceUSD = (await fetchBTCPriceUSD()) || BTC_PRICE_USD_FALLBACK;

  for (const wallet of whaleWallets) {
    // Salteamos wallets sin dirección real cargada todavía
    if (wallet.address.startsWith("REEMPLAZAR_")) continue;

    // Por ahora solo BTC está conectado a una API real (mempool.space).
    // Las wallets ETH se saltean acá hasta sumar Etherscan API.
    if (wallet.currency !== "BTC") continue;

    try {
      const [info, txs] = await Promise.all([
        fetchAddressInfo(wallet.address),
        fetchAddressTxs(wallet.address, 3),
      ]);

      for (const tx of txs) {
        const { netBTC, direction } = computeNetForAddress(tx, wallet.address);
        if (Math.abs(netBTC) < MIN_BTC_THRESHOLD) continue;

        const counterpart = findCounterpartAddress(tx, wallet.address);
        const counterpartTag = counterpart ? getWalletTag(counterpart) : null;
        const feeBTC = getTxFeeBTC(tx);
        const amountBTC = Math.abs(netBTC);
        const amountUSD = amountBTC * btcPriceUSD;
        const feeUSD = feeBTC * btcPriceUSD;

        results.push({
          id: `${tx.txid}-${wallet.address}`,
          txid: tx.txid,
          currency: "BTC",
          side: direction === "in" ? "compra" : "venta",
          institutionLabel: wallet.label,
          institutionInitial: wallet.initial,
          institutionColor: wallet.color,
          institutionTextColor: wallet.textColor,
          address: counterpart || wallet.address,
          amountNative: amountBTC,
          amountUSD,
          feeNative: feeBTC,
          feeUSD,
          feePct: amountBTC > 0 ? (feeBTC / amountBTC) * 100 : 0,
          confirmed: !!tx.status?.block_height,
          timeAgoLabel: timeAgo(
            tx.status?.block_time || Math.floor(Date.now() / 1000)
          ),
        });
      }
    } catch (err) {
      // Si una wallet falla (rate limit, dirección inválida, etc.)
      // no rompemos toda la lista, solo la salteamos.
      console.error(`Error consultando ${wallet.label}:`, err.message);
    }
  }

  return results.sort((a, b) => b.timeAgoLabel - a.timeAgoLabel).slice(0, 15);
}

export default async function WhaleMovements() {
  const movements = await getMovements();

  if (movements.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
        Todavía no hay wallets configuradas o no se detectaron movimientos
        recientes por encima de {MIN_BTC_THRESHOLD} BTC.
      </div>
    );
  }

  return <WhaleMovementsClient movements={movements} />;
}

