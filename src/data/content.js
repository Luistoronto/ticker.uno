// ─────────────────────────────────────────────────────────────
// content.js  — toda la data del mapa cripto en ES e EN
// Para agregar un concepto: copiás un objeto y completás los campos.
// Para agregar una sección: agregás una entrada nueva al array.
// ─────────────────────────────────────────────────────────────

export const sections = [
  // ── FUNDAMENTOS ──────────────────────────────────────────
  {
    id: "fundamentos",
    color: "#8b5cf6",        // color del acento visual
    icon: "book",            // nombre del ícono (Tabler Icons)
    sponsor: null,           // { name, url, logo } cuando haya sponsor
    es: {
      title: "Fundamentos",
      tagline: "Los cimientos del ecosistema cripto.",
      description:
        "Historia, criptografía y los conceptos base que hacen posible Bitcoin y todo lo que vino después.",
    },
    en: {
      title: "Fundamentals",
      tagline: "The foundations of the crypto ecosystem.",
      description:
        "History, cryptography and the core concepts that made Bitcoin — and everything after — possible.",
    },
    subcategories: [
      {
        id: "historia",
        es: { title: "Historia" },
        en: { title: "History" },
        items: [
          {
            id: "bitcoin-origen",
            es: {
              name: "Bitcoin",
              subtitle: "Satoshi Nakamoto · 2009",
              description:
                "Primer activo digital descentralizado. Satoshi publicó el whitepaper el 31 oct 2008 y minó el bloque génesis el 3 ene 2009.",
            },
            en: {
              name: "Bitcoin",
              subtitle: "Satoshi Nakamoto · 2009",
              description:
                "The first decentralized digital asset. Satoshi published the whitepaper on Oct 31 2008 and mined the genesis block on Jan 3 2009.",
            },
            tags: ["L1", "PoW"],
            link: "https://bitcoin.org",
          },
          {
            id: "whitepaper",
            es: {
              name: "Whitepaper",
              subtitle: "Oct 2008",
              description:
                "Documento de 9 páginas que describe Bitcoin: \"A Peer-to-Peer Electronic Cash System\". Base de todo el ecosistema cripto.",
            },
            en: {
              name: "Whitepaper",
              subtitle: "Oct 2008",
              description:
                "A 9-page paper describing Bitcoin: \"A Peer-to-Peer Electronic Cash System\". The foundation of the entire crypto ecosystem.",
            },
            tags: ["Historia"],
            link: "https://bitcoin.org/bitcoin.pdf",
          },
          {
            id: "genesis-block",
            es: {
              name: "Genesis Block",
              subtitle: "3 enero 2009",
              description:
                "Primer bloque minado de Bitcoin. Contiene el mensaje: \"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks\".",
            },
            en: {
              name: "Genesis Block",
              subtitle: "January 3, 2009",
              description:
                "The first Bitcoin block ever mined. It contains the message: \"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks\".",
            },
            tags: ["Historia"],
            link: null,
          },
          {
            id: "pizza-day",
            es: {
              name: "Pizza Day",
              subtitle: "22 mayo 2010",
              description:
                "Primera transacción comercial con BTC: Laszlo Hanyecz pagó 10.000 BTC por dos pizzas. Hoy se celebra cada 22 de mayo.",
            },
            en: {
              name: "Pizza Day",
              subtitle: "May 22, 2010",
              description:
                "The first commercial BTC transaction: Laszlo Hanyecz paid 10,000 BTC for two pizzas. Now celebrated every May 22nd.",
            },
            tags: ["Historia"],
            link: null,
          },
        ],
      },
      {
        id: "conceptos-base",
        es: { title: "Conceptos base" },
        en: { title: "Core concepts" },
        items: [
          {
            id: "blockchain",
            es: {
              name: "Blockchain",
              subtitle: "Cadena de bloques",
              description:
                "Base de datos distribuida formada por bloques encadenados criptográficamente. Inmutable: una vez escrito, no se puede cambiar.",
            },
            en: {
              name: "Blockchain",
              subtitle: "Chain of blocks",
              description:
                "A distributed database made of cryptographically chained blocks. Immutable: once written, it cannot be changed.",
            },
            tags: ["Concepto"],
            link: null,
          },
          {
            id: "descentralizacion",
            es: {
              name: "Descentralización",
              subtitle: "Sin autoridad central",
              description:
                "Ninguna entidad única controla la red. Las decisiones las toma el consenso de miles de nodos distribuidos globalmente.",
            },
            en: {
              name: "Decentralization",
              subtitle: "No central authority",
              description:
                "No single entity controls the network. Decisions are made by consensus among thousands of globally distributed nodes.",
            },
            tags: ["Concepto"],
            link: null,
          },
          {
            id: "consenso",
            es: {
              name: "Consenso",
              subtitle: "PoW · PoS · DPoS",
              description:
                "Mecanismo por el que todos los nodos acuerdan cuál es el estado verdadero de la blockchain sin necesidad de un árbitro central.",
            },
            en: {
              name: "Consensus",
              subtitle: "PoW · PoS · DPoS",
              description:
                "The mechanism by which all nodes agree on the true state of the blockchain without needing a central arbiter.",
            },
            tags: ["Concepto"],
            link: null,
          },
          {
            id: "smart-contract",
            es: {
              name: "Smart contract",
              subtitle: "Código autoejecutado",
              description:
                "Programa que se ejecuta automáticamente en la blockchain cuando se cumplen ciertas condiciones. Sin intermediarios.",
            },
            en: {
              name: "Smart contract",
              subtitle: "Self-executing code",
              description:
                "A program that runs automatically on the blockchain when certain conditions are met. No intermediaries needed.",
            },
            tags: ["Concepto"],
            link: null,
          },
          {
            id: "trilema",
            es: {
              name: "Trilema blockchain",
              subtitle: "Seguridad · Escala · Descentralización",
              description:
                "Es imposible optimizar los tres a la vez. Bitcoin elige seguridad y descentralización. Solana elige escala y seguridad.",
            },
            en: {
              name: "Blockchain trilemma",
              subtitle: "Security · Scale · Decentralization",
              description:
                "You can't fully optimize all three at once. Bitcoin chooses security and decentralization. Solana chooses scale and security.",
            },
            tags: ["Concepto"],
            link: null,
          },
        ],
      },
      {
        id: "criptografia",
        es: { title: "Criptografía" },
        en: { title: "Cryptography" },
        items: [
          {
            id: "clave-privada",
            es: {
              name: "Clave privada",
              subtitle: "Nunca compartir",
              description:
                "Número secreto de 256 bits que prueba que sos el dueño de tus fondos. Quien tenga tu clave privada, tiene tus crypto.",
            },
            en: {
              name: "Private key",
              subtitle: "Never share",
              description:
                "A secret 256-bit number that proves you own your funds. Whoever has your private key, owns your crypto.",
            },
            tags: ["Seguridad"],
            link: null,
          },
          {
            id: "seed-phrase",
            es: {
              name: "Seed phrase",
              subtitle: "12-24 palabras",
              description:
                "Respaldo legible de tu clave privada. 12 o 24 palabras en inglés que recuperan toda tu wallet. Guardar offline, nunca digital.",
            },
            en: {
              name: "Seed phrase",
              subtitle: "12-24 words",
              description:
                "A human-readable backup of your private key. 12 or 24 English words that restore your entire wallet. Store offline, never digital.",
            },
            tags: ["Seguridad"],
            link: null,
          },
        ],
      },
    ],
  },

  // ── DEFI ─────────────────────────────────────────────────
  {
    id: "defi",
    color: "#10b981",
    icon: "building-bank",
    sponsor: null,
    es: {
      title: "DeFi",
      tagline: "Finanzas sin intermediarios, 24/7.",
      description:
        "Protocolos financieros descentralizados: préstamos, trading, staking y derivados operando sobre blockchain sin bancos ni exchanges centralizados.",
    },
    en: {
      title: "DeFi",
      tagline: "Finance without intermediaries, 24/7.",
      description:
        "Decentralized financial protocols: lending, trading, staking and derivatives running on blockchain without banks or centralized exchanges.",
    },
    subcategories: [
      {
        id: "dex",
        es: { title: "DEX — Exchanges descentralizados" },
        en: { title: "DEX — Decentralized exchanges" },
        items: [
          {
            id: "uniswap",
            es: {
              name: "Uniswap",
              subtitle: "AMM líder · ETH y L2s",
              description:
                "El exchange descentralizado más usado del mundo. Inventó el modelo AMM (Automated Market Maker): los precios los define una fórmula matemática, no un libro de órdenes.",
            },
            en: {
              name: "Uniswap",
              subtitle: "Leading AMM · ETH and L2s",
              description:
                "The most used decentralized exchange in the world. It invented the AMM (Automated Market Maker) model: prices are set by a mathematical formula, not an order book.",
            },
            tags: ["AMM", "DEX"],
            link: "https://uniswap.org",
          },
          {
            id: "curve",
            es: {
              name: "Curve Finance",
              subtitle: "DEX stablecoins · Multi-chain",
              description:
                "DEX optimizado para intercambiar stablecoins y activos correlacionados con mínimo slippage. Esencial para la liquidez de DAI, USDC, USDT.",
            },
            en: {
              name: "Curve Finance",
              subtitle: "Stablecoin DEX · Multi-chain",
              description:
                "DEX optimized for swapping stablecoins and correlated assets with minimal slippage. Essential for DAI, USDC, USDT liquidity.",
            },
            tags: ["AMM", "Stables"],
            link: "https://curve.fi",
          },
          {
            id: "jupiter",
            es: {
              name: "Jupiter",
              subtitle: "Agregador #1 · Solana",
              description:
                "Agrega liquidez de todos los DEX de Solana y encuentra el mejor precio automáticamente. El router de swaps más usado en Solana.",
            },
            en: {
              name: "Jupiter",
              subtitle: "Aggregator #1 · Solana",
              description:
                "Aggregates liquidity from all Solana DEXs and automatically finds the best price. The most used swap router on Solana.",
            },
            tags: ["Agregador", "Solana"],
            link: "https://jup.ag",
          },
          {
            id: "dydx",
            es: {
              name: "dYdX",
              subtitle: "Perps descentralizados · Cosmos",
              description:
                "Exchange de derivados perpetuos completamente on-chain. Migró de Ethereum a su propia blockchain en Cosmos para mayor velocidad.",
            },
            en: {
              name: "dYdX",
              subtitle: "Decentralized perps · Cosmos",
              description:
                "Fully on-chain perpetual derivatives exchange. Migrated from Ethereum to its own Cosmos blockchain for higher speed.",
            },
            tags: ["Perps", "DEX"],
            link: "https://dydx.exchange",
          },
          {
            id: "hyperliquid",
            es: {
              name: "Hyperliquid",
              subtitle: "Perps on-chain · HyperEVM",
              description:
                "DEX de perpetuos de altísima velocidad en su propia L1. En 2024 se convirtió en el DEX de perps con mayor volumen.",
            },
            en: {
              name: "Hyperliquid",
              subtitle: "On-chain perps · HyperEVM",
              description:
                "Ultra-high-speed perpetuals DEX on its own L1. In 2024 it became the highest-volume perps DEX.",
            },
            tags: ["Perps", "DEX"],
            link: "https://hyperliquid.xyz",
          },
        ],
      },
      {
        id: "lending",
        es: { title: "Lending & borrowing" },
        en: { title: "Lending & borrowing" },
        items: [
          {
            id: "aave",
            es: {
              name: "Aave",
              subtitle: "Mayor protocolo lending · Multi-chain",
              description:
                "Depositás cripto y ganás interés, o la usás como colateral para pedir un préstamo. Sin banco, sin papeleo. También inventó los flash loans.",
            },
            en: {
              name: "Aave",
              subtitle: "Largest lending protocol · Multi-chain",
              description:
                "Deposit crypto and earn interest, or use it as collateral to borrow. No bank, no paperwork. Also invented flash loans.",
            },
            tags: ["Lending"],
            link: "https://aave.com",
          },
          {
            id: "makerdao",
            es: {
              name: "MakerDAO",
              subtitle: "CDP · DAI · Ethereum",
              description:
                "Podés bloquear ETH como colateral y mintear DAI, una stablecoin descentralizada que mantiene el valor de 1 USD.",
            },
            en: {
              name: "MakerDAO",
              subtitle: "CDP · DAI · Ethereum",
              description:
                "Lock ETH as collateral and mint DAI, a decentralized stablecoin that maintains a 1 USD peg.",
            },
            tags: ["CDP", "Stablecoin"],
            link: "https://makerdao.com",
          },
          {
            id: "morpho",
            es: {
              name: "Morpho",
              subtitle: "Lending optimizer · Multi-chain",
              description:
                "Mejora las tasas de Aave y Compound conectando prestamistas y prestatarios directamente cuando hay match, con el protocolo original como fallback.",
            },
            en: {
              name: "Morpho",
              subtitle: "Lending optimizer · Multi-chain",
              description:
                "Improves Aave and Compound rates by directly matching lenders and borrowers when possible, using the original protocol as a fallback.",
            },
            tags: ["Lending"],
            link: "https://morpho.org",
          },
        ],
      },
      {
        id: "staking",
        es: { title: "Liquid staking" },
        en: { title: "Liquid staking" },
        items: [
          {
            id: "lido",
            es: {
              name: "Lido",
              subtitle: "Mayor liquid staking · ETH y SOL",
              description:
                "Stakeás ETH y recibís stETH: un token que vale lo mismo que ETH pero además acumula recompensas de staking. Podés usarlo en DeFi mientras ganás yield.",
            },
            en: {
              name: "Lido",
              subtitle: "Largest liquid staking · ETH & SOL",
              description:
                "Stake ETH and receive stETH: a token worth the same as ETH that also accumulates staking rewards. Use it in DeFi while earning yield.",
            },
            tags: ["Staking", "LST"],
            link: "https://lido.fi",
          },
          {
            id: "eigenlayer",
            es: {
              name: "EigenLayer",
              subtitle: "Restaking · Ethereum",
              description:
                "Permite usar el ETH ya stakeado para asegurar otros protocolos y ganar recompensas adicionales. Concepto clave de 2024.",
            },
            en: {
              name: "EigenLayer",
              subtitle: "Restaking · Ethereum",
              description:
                "Allows already-staked ETH to secure other protocols and earn additional rewards. A key concept of 2024.",
            },
            tags: ["Restaking"],
            link: "https://eigenlayer.xyz",
          },
        ],
      },
    ],
  },

  // ── LAYER 1 ───────────────────────────────────────────────
  {
    id: "layer-1",
    color: "#f59e0b",
    icon: "database",
    sponsor: null,
    es: {
      title: "Layer 1",
      tagline: "Las blockchains base del ecosistema.",
      description:
        "Las redes blockchain principales donde viven los smart contracts, los tokens y toda la actividad on-chain.",
    },
    en: {
      title: "Layer 1",
      tagline: "The base blockchains of the ecosystem.",
      description:
        "The main blockchain networks where smart contracts, tokens and all on-chain activity live.",
    },
    subcategories: [
      {
        id: "l1-principales",
        es: { title: "Principales" },
        en: { title: "Main chains" },
        items: [
          {
            id: "bitcoin-l1",
            es: {
              name: "Bitcoin",
              subtitle: "Digital gold · PoW",
              description:
                "La blockchain original. Diseñada para ser dinero digital seguro e incensurable. No tiene smart contracts complejos: la simplicidad es una feature, no un bug.",
            },
            en: {
              name: "Bitcoin",
              subtitle: "Digital gold · PoW",
              description:
                "The original blockchain. Designed to be secure, uncensorable digital money. No complex smart contracts: simplicity is a feature, not a bug.",
            },
            tags: ["L1", "PoW", "Store of value"],
            link: "https://bitcoin.org",
          },
          {
            id: "ethereum",
            es: {
              name: "Ethereum",
              subtitle: "Smart contracts · PoS",
              description:
                "La blockchain de smart contracts más grande. Hogar de DeFi, NFTs y la mayoría de los protocolos importantes. Migró de PoW a PoS en 2022 (The Merge).",
            },
            en: {
              name: "Ethereum",
              subtitle: "Smart contracts · PoS",
              description:
                "The largest smart contract blockchain. Home of DeFi, NFTs and most major protocols. Migrated from PoW to PoS in 2022 (The Merge).",
            },
            tags: ["L1", "PoS", "EVM"],
            link: "https://ethereum.org",
          },
          {
            id: "solana",
            es: {
              name: "Solana",
              subtitle: "Alta velocidad · PoH + PoS",
              description:
                "65.000 transacciones por segundo con costos de fracciones de centavo. Ecosistema fuerte en trading, gaming y NFTs. El rival más serio de Ethereum.",
            },
            en: {
              name: "Solana",
              subtitle: "High speed · PoH + PoS",
              description:
                "65,000 transactions per second at fractions of a cent. Strong ecosystem in trading, gaming and NFTs. Ethereum's most serious rival.",
            },
            tags: ["L1", "PoS", "Alta velocidad"],
            link: "https://solana.com",
          },
          {
            id: "avalanche",
            es: {
              name: "Avalanche",
              subtitle: "Subnets · EVM compatible",
              description:
                "Permite crear subredes (subnets) blockchain personalizadas con su propia lógica. Compatible con herramientas de Ethereum.",
            },
            en: {
              name: "Avalanche",
              subtitle: "Subnets · EVM compatible",
              description:
                "Allows creating custom blockchain subnets with their own logic. Compatible with Ethereum tooling.",
            },
            tags: ["L1", "EVM", "Subnets"],
            link: "https://avax.network",
          },
        ],
      },
    ],
  },

  // ── LAYER 2 ───────────────────────────────────────────────
  {
    id: "layer-2",
    color: "#6366f1",
    icon: "stack-2",
    sponsor: null,
    es: {
      title: "Layer 2",
      tagline: "Ethereum más rápido y barato.",
      description:
        "Redes construidas encima de Ethereum que heredan su seguridad pero procesan transacciones más rápido y con comisiones mucho menores.",
    },
    en: {
      title: "Layer 2",
      tagline: "Ethereum, faster and cheaper.",
      description:
        "Networks built on top of Ethereum that inherit its security but process transactions faster and with much lower fees.",
    },
    subcategories: [
      {
        id: "optimistic-rollups",
        es: { title: "Optimistic rollups" },
        en: { title: "Optimistic rollups" },
        items: [
          {
            id: "arbitrum",
            es: {
              name: "Arbitrum",
              subtitle: "L2 líder por TVL · Optimistic",
              description:
                "El L2 con más valor bloqueado. Agrupa transacciones fuera de Ethereum, las comprime y las envía en batch. Asume que son válidas a menos que alguien las dispute.",
            },
            en: {
              name: "Arbitrum",
              subtitle: "Leading L2 by TVL · Optimistic",
              description:
                "The L2 with the most locked value. Batches transactions off Ethereum, compresses them and sends them in bulk. Assumes they're valid unless someone disputes.",
            },
            tags: ["L2", "Optimistic"],
            link: "https://arbitrum.io",
          },
          {
            id: "optimism",
            es: {
              name: "Optimism",
              subtitle: "OP Stack · Superchain",
              description:
                "L2 que además creó el OP Stack: un kit de herramientas open source para que cualquiera pueda crear su propio L2. Base y decenas de cadenas lo usan.",
            },
            en: {
              name: "Optimism",
              subtitle: "OP Stack · Superchain",
              description:
                "L2 that also created the OP Stack: an open source toolkit for anyone to create their own L2. Base and dozens of chains use it.",
            },
            tags: ["L2", "Optimistic"],
            link: "https://optimism.io",
          },
          {
            id: "base",
            es: {
              name: "Base",
              subtitle: "L2 de Coinbase · OP Stack",
              description:
                "Layer 2 lanzado por Coinbase en 2023 sobre el OP Stack. Crecimiento explosivo gracias al respaldo institucional y los productos de Coinbase.",
            },
            en: {
              name: "Base",
              subtitle: "Coinbase L2 · OP Stack",
              description:
                "Layer 2 launched by Coinbase in 2023 on the OP Stack. Explosive growth backed by institutional support and Coinbase products.",
            },
            tags: ["L2", "Optimistic"],
            link: "https://base.org",
          },
        ],
      },
      {
        id: "zk-rollups",
        es: { title: "ZK rollups" },
        en: { title: "ZK rollups" },
        items: [
          {
            id: "zksync",
            es: {
              name: "zkSync",
              subtitle: "ZK rollup · Matter Labs",
              description:
                "Usa pruebas de conocimiento cero (ZK proofs) para verificar transacciones matemáticamente. Más seguro que optimistic pero más complejo de construir.",
            },
            en: {
              name: "zkSync",
              subtitle: "ZK rollup · Matter Labs",
              description:
                "Uses zero-knowledge proofs to mathematically verify transactions. More secure than optimistic but more complex to build.",
            },
            tags: ["L2", "ZK"],
            link: "https://zksync.io",
          },
          {
            id: "starknet",
            es: {
              name: "StarkNet",
              subtitle: "ZK rollup · StarkWare",
              description:
                "ZK rollup de StarkWare con su propio lenguaje Cairo. Alta capacidad de procesamiento. Fuerte en gaming y aplicaciones que necesitan escala extrema.",
            },
            en: {
              name: "StarkNet",
              subtitle: "ZK rollup · StarkWare",
              description:
                "StarkWare's ZK rollup with its own Cairo language. High processing capacity. Strong in gaming and applications needing extreme scale.",
            },
            tags: ["L2", "ZK"],
            link: "https://starknet.io",
          },
        ],
      },
    ],
  },

  // ── WALLETS ───────────────────────────────────────────────
  {
    id: "wallets",
    color: "#ef4444",
    icon: "wallet",
    sponsor: null,
    es: {
      title: "Wallets",
      tagline: "Tu acceso al ecosistema cripto.",
      description:
        "Las billeteras digitales son la puerta de entrada a crypto. Guardan tus claves privadas y te permiten interactuar con cualquier blockchain.",
    },
    en: {
      title: "Wallets",
      tagline: "Your gateway to the crypto ecosystem.",
      description:
        "Digital wallets are the entry point to crypto. They store your private keys and let you interact with any blockchain.",
    },
    subcategories: [
      {
        id: "hot-wallets",
        es: { title: "Hot wallets (conectadas a internet)" },
        en: { title: "Hot wallets (connected to internet)" },
        items: [
          {
            id: "metamask",
            es: {
              name: "MetaMask",
              subtitle: "EVM · Chrome / Mobile",
              description:
                "La wallet más usada del mundo para DeFi y NFTs en redes EVM (Ethereum, Arbitrum, Polygon, etc.). Extensión de Chrome o app móvil.",
            },
            en: {
              name: "MetaMask",
              subtitle: "EVM · Chrome / Mobile",
              description:
                "The most used wallet in the world for DeFi and NFTs on EVM networks (Ethereum, Arbitrum, Polygon, etc.). Chrome extension or mobile app.",
            },
            tags: ["Hot", "EVM"],
            link: "https://metamask.io",
          },
          {
            id: "phantom",
            es: {
              name: "Phantom",
              subtitle: "Solana + EVM · Mobile / Chrome",
              description:
                "La wallet líder en Solana. Soporte para NFTs, staking y DeFi en Solana. También compatible con Ethereum y redes EVM.",
            },
            en: {
              name: "Phantom",
              subtitle: "Solana + EVM · Mobile / Chrome",
              description:
                "The leading wallet on Solana. Support for NFTs, staking and DeFi on Solana. Also compatible with Ethereum and EVM networks.",
            },
            tags: ["Hot", "Solana"],
            link: "https://phantom.app",
          },
        ],
      },
      {
        id: "cold-wallets",
        es: { title: "Cold wallets (hardware)" },
        en: { title: "Cold wallets (hardware)" },
        items: [
          {
            id: "ledger",
            es: {
              name: "Ledger",
              subtitle: "Hardware wallet · Multi-chain",
              description:
                "La hardware wallet más popular. Las claves privadas nunca salen del dispositivo físico. Fundamental para guardar cantidades importantes.",
            },
            en: {
              name: "Ledger",
              subtitle: "Hardware wallet · Multi-chain",
              description:
                "The most popular hardware wallet. Private keys never leave the physical device. Essential for storing significant amounts.",
            },
            tags: ["Cold", "Hardware"],
            link: "https://ledger.com",
          },
          {
            id: "trezor",
            es: {
              name: "Trezor",
              subtitle: "Hardware wallet · Open source",
              description:
                "La primera hardware wallet del mercado. Completamente open source: cualquiera puede auditar su código. Alternativa a Ledger con fuerte foco en privacidad.",
            },
            en: {
              name: "Trezor",
              subtitle: "Hardware wallet · Open source",
              description:
                "The first hardware wallet on the market. Fully open source: anyone can audit its code. Alternative to Ledger with a strong privacy focus.",
            },
            tags: ["Cold", "Hardware"],
            link: "https://trezor.io",
          },
        ],
      },
    ],
  },

  // ── EXCHANGES ─────────────────────────────────────────────
  {
    id: "exchanges",
    color: "#3b82f6",
    icon: "arrows-exchange",
    sponsor: null,
    es: {
      title: "Exchanges",
      tagline: "Dónde comprar, vender y tradear cripto.",
      description:
        "Plataformas centralizadas (CEX) y descentralizadas (DEX) para intercambiar activos digitales. Los CEX son la puerta de entrada para la mayoría de los usuarios.",
    },
    en: {
      title: "Exchanges",
      tagline: "Where to buy, sell and trade crypto.",
      description:
        "Centralized (CEX) and decentralized (DEX) platforms for exchanging digital assets. CEXs are the entry point for most users.",
    },
    subcategories: [
      {
        id: "cex-global",
        es: { title: "CEX globales" },
        en: { title: "Global CEXs" },
        items: [
          {
            id: "binance",
            es: {
              name: "Binance",
              subtitle: "Mayor volumen global · CZ",
              description:
                "El exchange con mayor volumen del mundo. Fundado por Changpeng Zhao (CZ) en 2017. Tiene su propia blockchain (BNB Chain) y ecosistema completo.",
            },
            en: {
              name: "Binance",
              subtitle: "Largest global volume · CZ",
              description:
                "The world's highest-volume exchange. Founded by Changpeng Zhao (CZ) in 2017. Has its own blockchain (BNB Chain) and full ecosystem.",
            },
            tags: ["CEX", "Global"],
            link: "https://binance.com",
          },
          {
            id: "coinbase",
            es: {
              name: "Coinbase",
              subtitle: "NASDAQ · Regulado EEUU",
              description:
                "El único exchange crypto cotizado en bolsa (NASDAQ: COIN). Muy regulado en EEUU. Referente institucional y creador del L2 Base.",
            },
            en: {
              name: "Coinbase",
              subtitle: "NASDAQ · US Regulated",
              description:
                "The only publicly traded crypto exchange (NASDAQ: COIN). Heavily regulated in the US. Institutional reference and creator of Base L2.",
            },
            tags: ["CEX", "Regulado"],
            link: "https://coinbase.com",
          },
          {
            id: "kraken",
            es: {
              name: "Kraken",
              subtitle: "Europa y EEUU · Muy regulado",
              description:
                "Exchange con foco en seguridad y cumplimiento regulatorio. Favorito en Europa. Uno de los pocos exchanges grandes que nunca fue hackeado.",
            },
            en: {
              name: "Kraken",
              subtitle: "Europe & US · Highly regulated",
              description:
                "Exchange focused on security and regulatory compliance. European favorite. One of the few major exchanges never hacked.",
            },
            tags: ["CEX", "Regulado"],
            link: "https://kraken.com",
          },
        ],
      },
      {
        id: "cex-latam",
        es: { title: "CEX Latinoamérica" },
        en: { title: "LatAm CEXs" },
        items: [
          {
            id: "lemon",
            es: {
              name: "Lemon Cash",
              subtitle: "Argentina · Tarjeta cashback",
              description:
                "App crypto argentina con tarjeta Visa que devuelve Bitcoin en cada compra. Una de las plataformas con más usuarios en Argentina.",
            },
            en: {
              name: "Lemon Cash",
              subtitle: "Argentina · Cashback card",
              description:
                "Argentine crypto app with a Visa card that returns Bitcoin on every purchase. One of the most-used platforms in Argentina.",
            },
            tags: ["CEX", "LatAm", "Argentina"],
            link: "https://lemoncash.app",
          },
          {
            id: "belo",
            es: {
              name: "Belo",
              subtitle: "Argentina · Wallet + tarjeta",
              description:
                "Billetera cripto argentina con tarjeta Mastercard. Permite pagar con crypto en cualquier comercio y hacer transferencias internacionales.",
            },
            en: {
              name: "Belo",
              subtitle: "Argentina · Wallet + card",
              description:
                "Argentine crypto wallet with Mastercard. Allows paying with crypto at any store and making international transfers.",
            },
            tags: ["CEX", "LatAm", "Argentina"],
            link: "https://belo.app",
          },
          {
            id: "bitso",
            es: {
              name: "Bitso",
              subtitle: "México · LatAm líder",
              description:
                "El exchange líder en México. Fuerte en Brasil y Argentina también. Más de 8 millones de usuarios en LatAm.",
            },
            en: {
              name: "Bitso",
              subtitle: "Mexico · LatAm leader",
              description:
                "The leading exchange in Mexico. Strong in Brazil and Argentina too. Over 8 million users in LatAm.",
            },
            tags: ["CEX", "LatAm", "México"],
            link: "https://bitso.com",
          },
          {
            id: "ripio",
            es: {
              name: "Ripio",
              subtitle: "Argentina · Brasil · Exchange pionero",
              description:
                "Uno de los primeros exchanges de Argentina, fundado en 2013. Expandido a Brasil. Foco en educación y acceso cripto en LatAm.",
            },
            en: {
              name: "Ripio",
              subtitle: "Argentina · Brazil · Pioneer exchange",
              description:
                "One of Argentina's first exchanges, founded in 2013. Expanded to Brazil. Focus on crypto education and access in LatAm.",
            },
            tags: ["CEX", "LatAm", "Argentina"],
            link: "https://ripio.com",
          },
        ],
      },
    ],
  },

  // ── STABLECOINS ───────────────────────────────────────────
  {
    id: "stablecoins",
    color: "#14b8a6",
    icon: "coin",
    sponsor: null,
    es: {
      title: "Stablecoins",
      tagline: "Cripto sin la volatilidad.",
      description:
        "Tokens diseñados para mantener un valor estable, generalmente 1 USD. La columna vertebral de DeFi y los pagos cripto.",
    },
    en: {
      title: "Stablecoins",
      tagline: "Crypto without the volatility.",
      description:
        "Tokens designed to maintain a stable value, usually 1 USD. The backbone of DeFi and crypto payments.",
    },
    subcategories: [
      {
        id: "fiat-backed",
        es: { title: "Respaldadas por fiat" },
        en: { title: "Fiat-backed" },
        items: [
          {
            id: "usdt",
            es: {
              name: "USDT",
              subtitle: "Tether · Mayor market cap",
              description:
                "La stablecoin con mayor capitalización de mercado. Emitida por Tether Limited. Respaldada por reservas en USD y bonos del tesoro.",
            },
            en: {
              name: "USDT",
              subtitle: "Tether · Largest market cap",
              description:
                "The stablecoin with the largest market cap. Issued by Tether Limited. Backed by USD reserves and treasury bonds.",
            },
            tags: ["Stable", "Fiat"],
            link: "https://tether.io",
          },
          {
            id: "usdc",
            es: {
              name: "USDC",
              subtitle: "Circle · Más regulada",
              description:
                "Stablecoin de Circle. La más regulada y transparente: publica reportes de reservas mensuales. Favorita en aplicaciones institucionales y DeFi.",
            },
            en: {
              name: "USDC",
              subtitle: "Circle · Most regulated",
              description:
                "Circle's stablecoin. The most regulated and transparent: publishes monthly reserve reports. Favorite in institutional applications and DeFi.",
            },
            tags: ["Stable", "Fiat"],
            link: "https://circle.com",
          },
        ],
      },
      {
        id: "decentralized-stable",
        es: { title: "Descentralizadas" },
        en: { title: "Decentralized" },
        items: [
          {
            id: "dai",
            es: {
              name: "DAI",
              subtitle: "MakerDAO · Cripto-colateralizada",
              description:
                "Stablecoin descentralizada respaldada por cripto sobre-colateralizada. Ninguna empresa la controla. La más antigua y probada en DeFi.",
            },
            en: {
              name: "DAI",
              subtitle: "MakerDAO · Crypto-collateralized",
              description:
                "Decentralized stablecoin backed by over-collateralized crypto. No company controls it. The oldest and most battle-tested in DeFi.",
            },
            tags: ["Stable", "Descentralizada"],
            link: "https://makerdao.com",
          },
        ],
      },
    ],
  },

  // ── REGULACIÓN ────────────────────────────────────────────
  {
    id: "regulacion",
    color: "#64748b",
    icon: "scale",
    sponsor: null,
    es: {
      title: "Regulación",
      tagline: "El marco legal del ecosistema.",
      description:
        "Cómo regulan los gobiernos el ecosistema cripto: marcos normativos, KYC, impuestos y el contexto específico de Latinoamérica.",
    },
    en: {
      title: "Regulation",
      tagline: "The legal framework of the ecosystem.",
      description:
        "How governments regulate the crypto ecosystem: regulatory frameworks, KYC, taxes and the specific context of Latin America.",
    },
    subcategories: [
      {
        id: "marcos-globales",
        es: { title: "Marcos globales" },
        en: { title: "Global frameworks" },
        items: [
          {
            id: "mica",
            es: {
              name: "MiCA",
              subtitle: "Unión Europea · 2024",
              description:
                "Markets in Crypto Assets: el marco regulatorio más completo del mundo. Vigente en toda la UE desde 2024. Requiere licencia para emitir stablecoins o operar como exchange.",
            },
            en: {
              name: "MiCA",
              subtitle: "European Union · 2024",
              description:
                "Markets in Crypto Assets: the world's most comprehensive regulatory framework. Effective across the EU since 2024. Requires a license to issue stablecoins or operate as an exchange.",
            },
            tags: ["Regulación", "EU"],
            link: null,
          },
          {
            id: "kyc-aml",
            es: {
              name: "KYC / AML",
              subtitle: "Know Your Customer · Anti lavado",
              description:
                "Todos los exchanges regulados deben verificar la identidad de sus usuarios (KYC) y reportar operaciones sospechosas (AML). Requerimiento global del GAFI.",
            },
            en: {
              name: "KYC / AML",
              subtitle: "Know Your Customer · Anti-money laundering",
              description:
                "All regulated exchanges must verify user identity (KYC) and report suspicious operations (AML). Global FATF requirement.",
            },
            tags: ["Compliance"],
            link: null,
          },
        ],
      },
      {
        id: "latam-regulacion",
        es: { title: "LatAm" },
        en: { title: "LatAm" },
        items: [
          {
            id: "argentina-reg",
            es: {
              name: "Argentina",
              subtitle: "CNV · AFIP · En evolución",
              description:
                "Sin regulación específica para cripto. Los exchanges reportan a la UIF. Las ganancias de cripto tributan como renta de segunda categoría en AFIP.",
            },
            en: {
              name: "Argentina",
              subtitle: "CNV · AFIP · Evolving",
              description:
                "No specific crypto regulation. Exchanges report to the UIF. Crypto gains are taxed as second-category income by AFIP.",
            },
            tags: ["LatAm", "Argentina"],
            link: null,
          },
          {
            id: "el-salvador",
            es: {
              name: "El Salvador",
              subtitle: "BTC moneda legal · 2021",
              description:
                "Primer país en adoptar Bitcoin como moneda de curso legal (2021). Caso único en el mundo. Creó la wallet Chivo y compra BTC con reservas del estado.",
            },
            en: {
              name: "El Salvador",
              subtitle: "BTC legal tender · 2021",
              description:
                "First country to adopt Bitcoin as legal tender (2021). A unique case worldwide. Created the Chivo wallet and buys BTC with state reserves.",
            },
            tags: ["LatAm", "Legal tender"],
            link: null,
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers — funciones para buscar en la data
// ─────────────────────────────────────────────────────────────

export function getSectionById(id) {
  return sections.find((s) => s.id === id) || null;
}

export function getItemById(sectionId, itemId) {
  const section = getSectionById(sectionId);
  if (!section) return null;
  for (const sub of section.subcategories) {
    const item = sub.items.find((i) => i.id === itemId);
    if (item) return { item, subcategory: sub, section };
  }
  return null;
}

export function getAllItems() {
  return sections.flatMap((s) =>
    s.subcategories.flatMap((sub) =>
      sub.items.map((item) => ({ ...item, sectionId: s.id, subcategoryId: sub.id }))
    )
  );
}
