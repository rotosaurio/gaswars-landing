export type Locale = "en" | "es";

export interface StatItem {
  label: string;
  value: string;
  sub: string;
}

export interface ArenaCard {
  title: string;
  desc: string;
  statLabel: string;
  statValue: string;
}

export interface SecurityCard {
  title: string;
  desc: string;
}

export interface Phase {
  phase: string;
  desc: string;
}

export interface ContractCard {
  name: string;
  role: string;
  lines: string;
  desc: string;
  functions: string[];
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  status: string;
  items: string[];
}

export interface EcosystemItem {
  name: string;
  lang: string;
  status: string;
  statusColor: "green" | "purple" | "dim";
  desc: string;
}

export interface GameMode {
  tag: string;
  title: string;
  desc: string;
  details: string[];
  tier: "free" | "stake" | "bounty" | "max";
}

export interface Dictionary {
  nav: {
    protocol: string;
    arena: string;
    security: string;
    roadmap: string;
    connectWallet: string;
  };
  gameModes: {
    label: string;
    title: string;
    titleAccent: string;
    titleEnd: string;
    desc: string;
    modes: GameMode[];
  };
  hero: {
    title: string;
    titleAccent: string;
    titleEnd: string;
    subtitle: string;
    operatorsRegistered: string;
    emailPlaceholder: string;
    initiateEntry: string;
    processing: string;
    alreadyRegistered: string;
    entryConfirmed: string;
    systemError: string;
    networkFailure: string;
  };
  systemLines: string[];
  stats: StatItem[];
  arena: {
    cards: ArenaCard[];
  };
  sidebar: string;
  pipeline: {
    title: string;
    titleAccent: string;
    titleEnd: string;
    desc: string;
    phases: Phase[];
    terminalFile: string;
  };
  security: {
    label: string;
    title: string;
    titleAccent: string;
    cards: SecurityCard[];
  };
  features: {
    title: string;
    titleAccent: string;
    titleEnd: string;
    items: string[];
    badge1: string;
    badge2: string;
    coverageLabel: string;
  };
  architecture: {
    label: string;
    title: string;
    titleAccent: string;
    titleEnd: string;
    contracts: ContractCard[];
  };
  roadmap: {
    label: string;
    title: string;
    titleAccent: string;
    phases: RoadmapPhase[];
  };
  ecosystems: {
    label: string;
    title: string;
    titleAccent: string;
    titleEnd: string;
    desc: string;
    items: EcosystemItem[];
  };
  cta: {
    title: string;
    titleAccent: string;
    subtitle: string;
    button: string;
  };
  footer: {
    copyright: string;
    techLine: string;
    systemsOperational: string;
    links: string[];
  };
  langModal: {
    label: string;
    title: string;
    subtitle: string;
  };
}
