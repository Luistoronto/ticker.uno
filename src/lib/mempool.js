// src/lib/mempool.js
// ─────────────────────────────────────────────────────────────
// Funciones para consultar la API pública y gratuita de
// mempool.space. No requiere API key.
// ─────────────────────────────────────────────────────────────

const BASE_URL = "https://mempool.space/api";

// Info general de una address (balance actual, etc.)
export async function fetchAddressInfo(address) {
  const res = await fetch(`${BASE_URL}/address/${address}`, {
    next: { revalidate: 300 }, // cache 5 min
  });
  if (!res.ok) throw new Error(`mempool.space error: ${res.status}`);
  const data = await res.json();

  const funded = data.chain_stats.funded_txo_sum + data.mempool_stats.funded_txo_sum;
  const spent = data.chain_stats.spent_txo_sum + data.mempool_stats.spent_txo_sum;

  return {
    balanceBTC: (funded - spent) / 1e8,
  };
}

// Últimas N transacciones de una address
export async function fetchAddressTxs(address, limit = 5) {
  const res = await fetch(`${BASE_URL}/address/${address}/txs`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`mempool.space error: ${res.status}`);
  const data = await res.json();
  return data.slice(0, limit);
}

// Calcula el movimiento neto (entrada o salida) de una wallet
// dentro de una transacción específica
export function computeNetForAddress(tx, ownAddress) {
  const inputSum = tx.vin
    .filter((v) => v.prevout?.scriptpubkey_address === ownAddress)
    .reduce((sum, v) => sum + (v.prevout?.value || 0), 0);

  const outputSum = tx.vout
    .filter((v) => v.scriptpubkey_address === ownAddress)
    .reduce((sum, v) => sum + (v.value || 0), 0);

  const netSats = outputSum - inputSum;
  const netBTC = netSats / 1e8;

  return {
    netBTC,
    direction: netBTC >= 0 ? "in" : "out",
  };
}

// Busca la contraparte principal de la transacción: el output externo
// más grande que no sea la propia wallet (para saber "a dónde fue" o
// "de dónde vino" el grueso del monto)
export function findCounterpartAddress(tx, ownAddress) {
  const candidates = tx.vout.filter(
    (v) => v.scriptpubkey_address && v.scriptpubkey_address !== ownAddress
  );
  if (candidates.length === 0) return null;
  const biggest = candidates.reduce((a, b) => (a.value > b.value ? a : b));
  return biggest.scriptpubkey_address;
}

// Fee de la transacción, ya calculado por mempool.space (en sats)
export function getTxFeeBTC(tx) {
  return (tx.fee || 0) / 1e8;
}

export function satsToUSDApprox(sats, btcPriceUSD) {
  return (sats / 1e8) * btcPriceUSD;
}
