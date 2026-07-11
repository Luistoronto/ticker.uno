// src/data/whaleWallets.js
// ─────────────────────────────────────────────────────────────
// Direcciones tageadas (dueño conocido) que el componente
// WhaleMovements va a monitorear.
//
// IMPORTANTE: las direcciones de abajo son EJEMPLOS/PLACEHOLDER.
// Reemplazalas por direcciones reales que hayas verificado antes
// de publicar — ver instrucciones de verificación al final de este
// archivo. Publicar una dirección mal tageada daña la credibilidad
// del sitio, así que no copies datos sin confirmar la fuente.
//
// NOTA sobre ETH: por ahora solo BTC está conectado a una API real
// (mempool.space, ver src/lib/mempool.js). Las wallets con
// currency: "ETH" quedan cargadas acá para que el filtro de moneda
// ya funcione en la UI, pero no van a traer movimientos reales
// hasta que conectemos Etherscan API (lib/etherscan.js, pendiente).
// ─────────────────────────────────────────────────────────────

export const whaleWallets = [
  {
    address: "REEMPLAZAR_CON_DIRECCION_REAL_1",
    label: "Binance",
    subtitle: "cold wallet",
    category: "exchange",
    currency: "BTC",
    color: "#F0B90B",
    textColor: "#1E1E1E",
    initial: "B",
  },
  {
    address: "REEMPLAZAR_CON_DIRECCION_REAL_2",
    label: "Coinbase",
    subtitle: "custody",
    category: "exchange",
    currency: "BTC",
    color: "#0052FF",
    textColor: "#ffffff",
    initial: "C",
  },
  {
    address: "REEMPLAZAR_CON_DIRECCION_REAL_3",
    label: "Kraken",
    subtitle: "hot wallet",
    category: "exchange",
    currency: "BTC",
    color: "#5841D8",
    textColor: "#ffffff",
    initial: "K",
  },
  // Ejemplo de wallet ETH — sin conexión real todavía, ver nota arriba.
  {
    address: "REEMPLAZAR_CON_DIRECCION_REAL_ETH_1",
    label: "Coinbase Prime",
    subtitle: "custody",
    category: "exchange",
    currency: "ETH",
    color: "#0052FF",
    textColor: "#ffffff",
    initial: "C",
  },
  // Agregá más wallets acá con la misma estructura.
  // category puede ser: "exchange" | "institution" | "other"
  // currency puede ser: "BTC" | "ETH" (agregá más a medida que sumes redes)
];

// ─────────────────────────────────────────────────────────────
// Cómo conseguir direcciones verificadas (gratis):
//
// 1. mempool.space (BTC) / etherscan.io (ETH) — buscá el nombre del
//    exchange en su buscador; algunas direcciones grandes aparecen
//    etiquetadas por la comunidad. No es 100% oficial, pero es un
//    buen punto de partida.
//
// 2. bitinfocharts.com/top-100-richest-bitcoin-addresses.html —
//    lista las wallets más grandes, muchas con tag público
//    (ej. "Bitfinex-coldwallet", "Binance-coldwallet").
//
// 3. Confirmá cruzando al menos 2 fuentes antes de publicar un tag.
//    Si no estás seguro, es mejor dejar la wallet sin tag (aparece
//    como "Sin identificar" en la tabla) que tagearla mal.
// ─────────────────────────────────────────────────────────────

export function getWalletTag(address) {
  return whaleWallets.find((w) => w.address === address) || null;
}

export function explorerAddressUrl(address, currency) {
  if (currency === "ETH") return `https://etherscan.io/address/${address}`;
  return `https://mempool.space/address/${address}`;
}

export function explorerTxUrl(txid, currency) {
  if (currency === "ETH") return `https://etherscan.io/tx/${txid}`;
  return `https://mempool.space/tx/${txid}`;
}
