import type { Dictionary } from "../types";

export const en: Dictionary = {
  nav: {
    protocol: "PROTOCOL",
    arena: "ARENA",
    security: "SECURITY",
    roadmap: "ROADMAP",
    connectWallet: "CONNECT_WALLET",
  },
  hero: {
    title: "OPTIMIZE",
    titleAccent: "OR",
    titleEnd: "PERISH",
    subtitle: "// HIGH-STAKES COMPETITIVE SOLIDITY ENGINEERING ON BSC",
    operatorsRegistered: "OPERATORS_REGISTERED",
    emailPlaceholder: "ENTER_OPERATOR_EMAIL...",
    initiateEntry: "INITIATE_ENTRY",
    processing: "PROCESSING...",
    alreadyRegistered: "OPERATOR_ALREADY_REGISTERED",
    entryConfirmed: "ENTRY_CONFIRMED",
    systemError: "SYSTEM_ERROR",
    networkFailure: "NETWORK_FAILURE",
  },
  systemLines: [
    "[SYSTEM]: KERNEL_LOAD_OK",
    "[NETWORK]: BSC_MAINNET_CONNECTED",
    "[CONTRACTS]: 3_DEPLOYED",
    "[STATUS]: WAR_READY",
  ],
  stats: [
    { label: "MAX_PLAYERS", value: "1,000", sub: "Per Arena" },
    { label: "PROTOCOL_FEE", value: "5%", sub: "Of Prize Pool" },
    { label: "SETTLEMENT", value: "ATOMIC", sub: "Instant Payout" },
    { label: "NETWORK", value: "BSC", sub: "Binance Smart Chain" },
  ],
  arena: {
    cards: [
      {
        title: "STAKE_BNB",
        desc: "Lock BNB to enter the arena. The creator sets the stake per player — all participants commit equal amounts. Your stake feeds the prize pool that winners drain.",
        statLabel: "CAPACITY",
        statValue: "2 — 1,000 PLAYERS",
      },
      {
        title: "SOL_OPTIMIZATION",
        desc: "Write the most gas-efficient Solidity solution. Your bytecode is deployed on-chain via CREATE, then executed with staticcall against deterministic test inputs. Every opcode counts.",
        statLabel: "GAS_LIMIT",
        statValue: "1,000,000 PER CALL",
      },
      {
        title: "DRAIN_THE_POOL",
        desc: "Lowest total gas wins. The contract resolves winners automatically — 95% of the staked pool goes to the victor(s). Pull-based claims, no stuck funds. Ever.",
        statLabel: "PAYOUT",
        statValue: "95% TO WINNERS",
      },
    ],
  },
  sidebar: "PROTOCOL_STATUS_ACTIVE",
  pipeline: {
    title: "6-PHASE",
    titleAccent: "EXECUTION",
    titleEnd: "PIPELINE.",
    desc: "Each duel follows a trustless, deterministic pipeline — from open enrollment through commit-reveal to on-chain gas measurement and atomic settlement.",
    phases: [
      { phase: "OPEN", desc: "Players join & stake BNB" },
      { phase: "COMMIT", desc: "Submit keccak256(bytecode + salt)" },
      { phase: "REVEAL", desc: "Reveal bytecode & salt on-chain" },
      { phase: "EXECUTE", desc: "Sandbox measures gas via staticcall" },
      { phase: "RESOLVED", desc: "Winners claim prize pool" },
      { phase: "CANCELLED", desc: "Emergency refund if needed" },
    ],
    terminalFile: "gas_measurement.sol",
  },
  security: {
    label: "ANTI_CHEAT_PROTOCOL",
    title: "TRUSTLESS BY",
    titleAccent: "DESIGN",
    cards: [
      {
        title: "COMMIT_REVEAL",
        desc: "Players submit keccak256(bytecode + salt) first. Solutions stay hidden until all operators have committed. No peeking.",
      },
      {
        title: "FUTURE_BLOCKHASH",
        desc: "Test inputs are seeded from a future block hash — unknowable at commit time. Prevents simulate-and-revert attacks.",
      },
      {
        title: "STATICCALL_ONLY",
        desc: "All bytecode is executed via staticcall. No SSTORE, no SELFDESTRUCT, no gas refund exploitation. Pure computation.",
      },
      {
        title: "EIP-170_COMPLIANT",
        desc: "Max bytecode size: 24,576 bytes per EIP-170. Factory pattern via EIP-1167 minimal proxy clones for gas efficiency.",
      },
    ],
  },
  features: {
    title: "ENGINEERED FOR",
    titleAccent: "MAXIMAL EXTRACTABLE",
    titleEnd: "PERFORMANCE.",
    items: [
      "EIP-1167 Minimal Proxy Clones",
      "Deterministic Test Generation",
      "Batched Execution For 1000 Players",
      "Pull-Based Prize Claims",
      "Emergency Cancel + Refund Safety",
    ],
    badge1: "SYSTEM_STABLE",
    badge2: "SOL_0.8.19",
    coverageLabel: "CONTRACT_COVERAGE: GasWarDuel.sol // GasWarFactory.sol // Sandbox.sol",
  },
  architecture: {
    label: "SYSTEM_ARCHITECTURE",
    title: "THREE CONTRACTS.",
    titleAccent: "ZERO",
    contracts: [
      {
        name: "GasWarFactory",
        role: "COMMAND_CENTER",
        lines: "260",
        desc: "Deploys EIP-1167 minimal proxy clones per duel. Controls global fees, stake minimums, and oracle permissions. Accumulates platform fees.",
        functions: ["createDuel()", "setMinStake()", "withdrawFees()"],
      },
      {
        name: "GasWarDuel",
        role: "BATTLE_INSTANCE",
        lines: "640",
        desc: "Each duel is an independent clone with its own state. Manages the 6-phase lifecycle from OPEN to RESOLVED. Handles commits, reveals, execution, and prize distribution.",
        functions: ["commit()", "reveal()", "executeBatch()", "claimPrize()"],
      },
      {
        name: "Sandbox",
        role: "GAS_ORACLE",
        lines: "105",
        desc: "Stateless, reusable contract. Deploys player bytecode via CREATE, executes test inputs with staticcall, and measures exact gas consumption. Shared across all duels.",
        functions: ["deployAndMeasure()", "generateInput()", "verifyOutput()"],
      },
    ],
  },
  roadmap: {
    label: "DEPLOYMENT_SCHEDULE",
    title: "THE",
    titleAccent: "ROADMAP",
    phases: [
      {
        phase: "PHASE_01",
        title: "BSC TESTNET LAUNCH",
        status: "COMPLETE",
        items: [
          "V2 smart contracts deployed & verified on-chain",
          "Commit-reveal with future blockhash PRNG",
          "Batched execution for up to 1,000 players",
          "EIP-1167 factory pattern live",
        ],
      },
      {
        phase: "PHASE_02",
        title: "FRONTEND & BACKEND",
        status: "IN_PROGRESS",
        items: [
          "Real-time duel lobby with live player count",
          "In-browser Solidity editor with gas estimation",
          "Backend API for duel indexing & events",
          "Wallet integration (MetaMask, WalletConnect)",
        ],
      },
      {
        phase: "PHASE_03",
        title: "MAINNET & COMPETITION",
        status: "PENDING",
        items: [
          "BSC mainnet deployment & verification",
          "Ranked leaderboard system",
          "Tournament brackets with elimination rounds",
          "Challenge library with curated problems",
        ],
      },
      {
        phase: "PHASE_04",
        title: "PROTOCOL EXPANSION",
        status: "PLANNED",
        items: [
          "Multi-chain deployment (Ethereum, Arbitrum)",
          "DAO governance for fee parameters",
          "Advanced challenge types (Yul, Huff, raw bytecode)",
          "SDK for third-party arena creation",
        ],
      },
    ],
  },
  cta: {
    title: "READY TO",
    titleAccent: "COMPETE",
    subtitle: "// JOIN THE WAITLIST. GET EARLY ACCESS. DOMINATE THE ARENA.",
    button: "INITIATE_ENTRY",
  },
  footer: {
    copyright: "\u00a9 2025 // OPTIMIZE_OR_DIE",
    techLine: "Solidity 0.8.19 // EIP-1167 // EIP-170 // BSC Chain ID: 56",
    systemsOperational: "ALL_SYSTEMS_OPERATIONAL",
    links: ["TWITTER", "DISCORD", "GITHUB", "DOCS"],
  },
  langModal: {
    label: "SELECT_LANGUAGE",
    title: "CHOOSE YOUR INTERFACE",
    subtitle: "// SELECCIONA TU IDIOMA",
  },
};
