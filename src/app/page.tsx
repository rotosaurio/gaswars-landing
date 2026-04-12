"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/i18n/context";
import { LanguageModal } from "@/components/LanguageModal";

/* ─── Scroll fade-in hook ─── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeUp();
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>;
}

/* ─── Animated counter ─── */
function AnimatedCount({ value, locale }: { value: number | null; locale: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === null) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value! * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);
  if (value === null) return <span className="cursor-blink">_</span>;
  return <>{display.toLocaleString(locale)}</>;
}

/* ═══════════════════════════════════════════════ */
const ARENA_ICONS = ["account_balance_wallet", "terminal", "data_exploration"];
const ARENA_COLORS = [
  { num: "text-primary-container/20", icon: "text-primary-container", stat: "text-primary-container" },
  { num: "text-secondary-container/20", icon: "text-secondary-container", stat: "text-secondary-container" },
  { num: "text-on-tertiary-container/20", icon: "text-on-tertiary-container", stat: "text-on-tertiary-container" },
];
const SECURITY_ICONS = ["lock", "casino", "shield", "verified"];
const SECURITY_COLORS = [
  { icon: "text-primary-container", border: "border-primary-container/20" },
  { icon: "text-secondary-container", border: "border-secondary-container/20" },
  { icon: "text-primary-container", border: "border-primary-container/20" },
  { icon: "text-secondary-container", border: "border-secondary-container/20" },
];
const PIPELINE_COLORS = [
  "bg-primary-container", "bg-primary-container",
  "bg-secondary-container", "bg-secondary-container",
  "bg-primary-container", "bg-on-tertiary-container",
];
const FEATURE_COLORS = [
  "bg-primary-container", "bg-secondary-container", "bg-on-tertiary-container",
  "bg-primary-container", "bg-secondary-container",
];
const ARCH_COLORS = ["primary-container", "secondary-container", "primary-container"];

export default function Landing() {
  const { t, locale, setLocale } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message === "Already registered" ? t.hero.alreadyRegistered : t.hero.entryConfirmed);
        setEmail("");
        if (data.count) setCount(data.count);
        else setCount((c) => (c !== null ? c + 1 : 1));
      } else {
        setStatus("error");
        setMessage(data.error || t.hero.systemError);
      }
    } catch {
      setStatus("error");
      setMessage(t.hero.networkFailure);
    }
  }, [email, t]);

  const navLinks = [
    { label: t.nav.protocol, href: "#protocol", active: true },
    { label: t.nav.arena, href: "#arena" },
    { label: t.nav.security, href: "#security" },
    { label: t.nav.roadmap, href: "#roadmap" },
  ];

  return (
    <>
      <LanguageModal />

      {/* ══════ TOP NAVIGATION ══════ */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-full">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold text-primary-container tracking-widest font-headline uppercase">
              GASWARS
            </span>
            <div className="hidden md:flex gap-6 items-center">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className={`font-headline tracking-tighter uppercase text-sm transition-colors duration-150 ${
                    l.active
                      ? "text-primary-container border-b-2 border-primary-container pb-1"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
              className="font-mono text-[10px] tracking-widest text-white/40 hover:text-primary-container transition-colors px-2 py-1 border border-outline-variant/20 hover:border-primary-container/30"
            >
              {locale === "en" ? "ES" : "EN"}
            </button>
            <button className="hidden md:block bg-primary-container text-on-primary font-headline font-bold px-4 py-2 text-xs tracking-widest hover:shadow-[0_0_12px_rgba(0,230,57,0.3)] transition-all duration-150 active:scale-95">
              {t.nav.connectWallet}
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-primary-container transition-all duration-150 ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-primary-container transition-all duration-150 ${mobileMenu ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-primary-container transition-all duration-150 ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/15 px-6 py-4 space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenu(false)}
                className="block font-headline tracking-tighter uppercase text-sm text-white/60 hover:text-primary-container transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button className="w-full bg-primary-container text-on-primary font-headline font-bold px-4 py-3 text-xs tracking-widest mt-2">
              {t.nav.connectWallet}
            </button>
          </div>
        )}
      </nav>

      {/* ══════ HERO SECTION ══════ */}
      <main id="protocol" className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 dot-grid" />
        <div className="absolute inset-0 z-0 scanline pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* 0x Memory Slot Logo */}
          <div className="mb-12 relative">
            <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-primary-container/20 flex items-center justify-center relative overflow-hidden group glow-pulse">
              <div className="absolute inset-0 bg-primary-container/5 group-hover:bg-primary-container/10 transition-colors" />
              <span
                className="text-7xl md:text-9xl font-headline font-black tracking-tighter mix-blend-screen text-transparent"
                style={{ WebkitTextStroke: "1px rgb(0, 255, 65)", opacity: 0.4 }}
              >
                0x
              </span>
              <div className="absolute bottom-2 left-2 flex gap-1">
                <div className="w-1 h-4 bg-primary-container" />
                <div className="w-1 h-4 bg-primary-container/40" />
                <div className="w-1 h-4 bg-primary-container/20" />
              </div>
              <div className="absolute top-2 right-2 font-mono text-[10px] text-primary-container/60">MEM_SLOT_V4</div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter leading-none mb-4 text-white">
            {t.hero.title} <span className="text-primary-container italic">{t.hero.titleAccent}</span> {t.hero.titleEnd}
          </h1>

          <p className="font-mono text-sm md:text-base text-white/40 tracking-[0.2em] mb-12">
            {t.hero.subtitle}
          </p>

          {/* ── WAITLIST BOX ── */}
          <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/15 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] text-primary-container">{t.hero.operatorsRegistered}</span>
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                <AnimatedCount value={count} locale={locale} />
              </span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                className="bg-surface-container-high border-none text-white font-mono text-sm p-4 focus:ring-1 focus:ring-primary-container outline-none transition-all placeholder:text-white/20"
                placeholder={t.hero.emailPlaceholder}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary-container text-on-primary font-headline font-bold py-4 uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {status === "loading" ? t.hero.processing : t.hero.initiateEntry}
              </button>
            </form>
            {status === "success" && (
              <p className="font-mono text-[10px] text-primary-container tracking-widest uppercase text-center">{message}</p>
            )}
            {status === "error" && (
              <p className="font-mono text-[10px] text-on-tertiary-container tracking-widest uppercase text-center">{message}</p>
            )}
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="font-mono text-[10px] text-white/20 space-y-1">
            {t.systemLines.map((line, i) => <div key={i}>{line}</div>)}
          </div>
        </div>
      </main>

      {/* ══════ PROTOCOL STATS ══════ */}
      <section className="bg-surface-container-lowest border-y border-outline-variant/15 py-6 px-6">
        <FadeUp>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
            {t.stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-6 md:p-8 ${i < 3 ? "border-r border-outline-variant/15" : ""} ${i < 2 ? "border-b md:border-b-0 border-outline-variant/15" : ""}`}
              >
                <div className="font-mono text-[10px] text-primary-container mb-2">{s.label}</div>
                <div className="font-headline text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                <div className="font-mono text-[10px] text-white/30 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ══════ ARENA — HOW IT WORKS ══════ */}
      <section id="arena" className="bg-surface-container-lowest py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/15">
              {t.arena.cards.map((card, i) => (
                <div
                  key={card.title}
                  className={`p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-outline-variant/15" : ""} hover:bg-surface-container-low transition-colors group`}
                >
                  <div className="flex justify-between items-start mb-12">
                    <span className={`font-headline text-5xl font-black text-white/10 group-hover:${ARENA_COLORS[i].num} transition-colors`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`material-symbols-outlined ${ARENA_COLORS[i].icon}`}>{ARENA_ICONS[i]}</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight uppercase text-white">{card.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8 font-body">{card.desc}</p>
                  <div className="space-y-2">
                    <div className="h-[1px] w-full bg-outline-variant/20" />
                    <div className="flex justify-between font-mono text-[10px]">
                      <span className="text-white/30">{card.statLabel}</span>
                      <span className={ARENA_COLORS[i].stat}>{card.statValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════ SIDE BAR INDICATOR ══════ */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 h-96 w-1 bg-primary-container/20 flex-col justify-between py-4 items-center hidden xl:flex">
        <span className="material-symbols-outlined text-[10px] text-primary-container">north</span>
        <div className="rotate-90 origin-center whitespace-nowrap font-mono text-[8px] tracking-[0.5em] text-white/20 uppercase">
          {t.sidebar}
        </div>
        <span className="material-symbols-outlined text-[10px] text-primary-container">south</span>
      </aside>

      {/* ══════ EXECUTION PIPELINE — TERMINAL ══════ */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                {t.pipeline.title}<br />
                <span className="text-primary-container">{t.pipeline.titleAccent}</span> {t.pipeline.titleEnd}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed font-body max-w-md">{t.pipeline.desc}</p>
              <div className="space-y-3">
                {t.pipeline.phases.map((p, i) => (
                  <div key={p.phase} className="flex items-center gap-4">
                    <div className={`w-10 h-[1px] ${PIPELINE_COLORS[i]}`} />
                    <span className="font-mono text-[10px] text-white/40 w-24">{p.phase}</span>
                    <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="relative bg-surface-container-lowest border border-outline-variant/15 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between px-4 py-3 bg-surface-container border-b border-outline-variant/15">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-container/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-container/60" />
                </div>
                <span className="font-mono text-[10px] text-white/30 uppercase">{t.pipeline.terminalFile}</span>
              </div>
              <pre className="p-6 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <code>
{`  `}<span className="text-white/30">{"// Sandbox.sol — On-chain gas measurement"}</span>{`
  `}<span className="text-secondary">{"function"}</span>{` `}<span className="text-primary-container">{"measureGas"}</span>{`(
      `}<span className="text-on-surface-variant">{"address deployed,"}</span>{`
      `}<span className="text-on-surface-variant">{"bytes calldata input,"}</span>{`
      `}<span className="text-on-surface-variant">{"uint256 gasLimit"}</span>{`
  ) `}<span className="text-secondary">{"external"}</span>{` `}<span className="text-secondary">{"view"}</span>{` `}<span className="text-secondary">{"returns"}</span>{` (`}<span className="text-on-surface-variant">{"uint256"}</span>{`) {
      `}<span className="text-primary-container">{"uint256"}</span>{` gasBefore = `}<span className="text-primary-fixed-dim">{"gasleft"}</span>{`();

      `}<span className="text-white/30">{"// staticcall prevents SSTORE refund gaming"}</span>{`
      (`}<span className="text-primary-container">{"bool"}</span>{` ok, ) = deployed.`}<span className="text-primary-fixed-dim">{"staticcall"}</span>{`{
          gas: `}<span className="text-primary-container">{"1_000_000"}</span>{`
      }(input);

      `}<span className="text-secondary">{"require"}</span>{`(ok, `}<span className="text-on-tertiary-container">{'"EXEC_FAILED"'}</span>{`);
      `}<span className="text-secondary">{"return"}</span>{` gasBefore - `}<span className="text-primary-fixed-dim">{"gasleft"}</span>{`();
  }`}
                </code>
              </pre>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════ SECURITY — COMMIT REVEAL ══════ */}
      <section id="security" className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-16">
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.security.label}</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                {t.security.title} <span className="text-secondary-container">{t.security.titleAccent}</span>.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.security.cards.map((card, i) => (
              <FadeUp key={card.title}>
                <div className={`bg-surface-container-low p-8 border-l-2 ${SECURITY_COLORS[i].border} hover:bg-surface-container transition-colors h-full`}>
                  <span className={`material-symbols-outlined ${SECURITY_COLORS[i].icon} mb-6 block`}>{SECURITY_ICONS[i]}</span>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-widest mb-4">{card.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed font-body">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES — TACTICAL GRID ══════ */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                {t.features.title} <br />
                <span className="text-secondary-container">{t.features.titleAccent}</span> {t.features.titleEnd}
              </h2>
              <div className="space-y-4">
                {t.features.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className={`w-12 h-[1px] ${FEATURE_COLORS[i]}`} />
                    <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="relative aspect-square bg-surface-container-low overflow-hidden group border border-outline-variant/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <pre className="font-mono text-[10px] text-primary-container leading-relaxed p-8 overflow-hidden">
{`// GasWarFactory.sol — Architecture
contract GasWarFactory is Ownable {
    address public implementation;  // GasWarDuel
    address public sandbox;         // Stateless
    uint256 public platformFee;     // 500 = 5%
    uint256 public constant MAX_FEE = 1000;

    function createDuel(
        uint256 minPlayers,   // >= 2
        uint256 maxPlayers,   // <= 1000
        bytes calldata ref,   // Reference solution
        bytes4 selector,      // fn signature
        uint256 stake         // BNB per player
    ) external payable {
        address clone = Clones.clone(implementation);
        GasWarDuel(clone).initialize{value: stake}(
            msg.sender, sandbox, ...
        );
        emit DuelCreated(clone, msg.sender);
    }
}`}
                </pre>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-2 py-1 bg-primary-container text-on-primary font-mono text-[8px] font-bold">{t.features.badge1}</span>
                <span className="px-2 py-1 bg-surface-container-highest text-white font-mono text-[8px] font-bold">{t.features.badge2}</span>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-mono text-[10px] text-primary-container/80 mb-2">{t.features.coverageLabel}</div>
                <div className="h-1 w-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-primary-container w-full" />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════ CONTRACT ARCHITECTURE ══════ */}
      <section className="py-24 px-6 bg-surface-container-lowest border-y border-outline-variant/15">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-16">
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.architecture.label}</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                {t.architecture.title} <span className="text-primary-container">{t.architecture.titleAccent}</span> {t.architecture.titleEnd}
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.architecture.contracts.map((c, i) => (
              <FadeUp key={c.name}>
                <div className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className={`font-mono text-[10px] text-${ARCH_COLORS[i]} mb-1`}>{c.role}</div>
                      <h4 className="font-headline text-xl font-bold text-white">{c.name}.sol</h4>
                    </div>
                    <span className="font-mono text-[10px] text-white/20">{c.lines} LOC</span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-body mb-6 flex-grow">{c.desc}</p>
                  <div className="space-y-1">
                    {c.functions.map((fn) => (
                      <div key={fn} className={`font-mono text-[10px] text-${ARCH_COLORS[i]}/60`}>
                        <span className="text-white/20 mr-2">&gt;</span>{fn}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ROADMAP ══════ */}
      <section id="roadmap" className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-16">
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.roadmap.label}</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                {t.roadmap.title} <span className="text-primary-container">{t.roadmap.titleAccent}</span>.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.roadmap.phases.map((r) => {
              const statusColor =
                r.status === "COMPLETE" || r.status === "COMPLETA"
                  ? "text-primary-container"
                  : r.status === "IN_PROGRESS" || r.status === "EN_PROGRESO"
                  ? "text-secondary-container"
                  : "text-white/30";
              const isComplete = r.status === "COMPLETE" || r.status === "COMPLETA";
              return (
                <FadeUp key={r.phase}>
                  <div className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="font-mono text-[10px] text-white/30 mb-1">{r.phase}</div>
                        <h4 className="font-headline text-lg font-bold text-white uppercase">{r.title}</h4>
                      </div>
                      <span className={`font-mono text-[10px] ${statusColor} uppercase`}>{r.status}</span>
                    </div>
                    <div className="space-y-3">
                      {r.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-primary-container font-mono text-[10px] mt-0.5">
                            {isComplete ? "+" : ">"}
                          </span>
                          <span className="text-white/50 text-sm font-body">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="py-24 px-6 bg-surface-container-lowest border-t border-outline-variant/15">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter uppercase leading-none mb-6">
              {t.cta.title} <span className="text-primary-container">{t.cta.titleAccent}</span>?
            </h2>
            <p className="font-mono text-sm text-white/40 tracking-[0.15em] mb-10">{t.cta.subtitle}</p>
            <a
              href="#protocol"
              className="inline-block bg-primary-container text-on-primary font-headline font-bold py-4 px-12 uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-[0.98] text-sm"
            >
              {t.cta.button}
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="w-full py-8 border-t border-outline-variant/15 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-primary-container font-bold font-headline tracking-widest">0xGASWARS</span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">{t.footer.copyright}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {t.footer.links.map((link) => (
              <a
                key={link}
                className="font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-secondary-container transition-colors duration-200"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6 pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] text-white/15 uppercase tracking-widest">{t.footer.techLine}</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="font-mono text-[9px] text-primary-container/50 uppercase tracking-widest">{t.footer.systemsOperational}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
