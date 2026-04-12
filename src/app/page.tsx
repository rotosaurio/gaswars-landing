"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
function AnimatedCount({ value }: { value: number | null }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === null) return;
    const duration = 1200;
    const start = performance.now();
    const from = 0;
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(from + (value! - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);
  if (value === null) return <span className="cursor-blink">_</span>;
  return <>{display.toLocaleString()}</>;
}

/* ═══════════════════════════════════════════════ */
export default function Landing() {
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
        setMessage(data.message === "Already registered" ? "OPERATOR_ALREADY_REGISTERED" : "ENTRY_CONFIRMED");
        setEmail("");
        if (data.count) setCount(data.count);
        else setCount((c) => (c !== null ? c + 1 : 1));
      } else {
        setStatus("error");
        setMessage(data.error || "SYSTEM_ERROR");
      }
    } catch {
      setStatus("error");
      setMessage("NETWORK_FAILURE");
    }
  }, [email]);

  const navLinks = [
    { label: "PROTOCOL", href: "#protocol", active: true },
    { label: "ARENA", href: "#arena" },
    { label: "SECURITY", href: "#security" },
    { label: "ROADMAP", href: "#roadmap" },
  ];

  return (
    <>
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
            <button className="hidden md:block bg-primary-container text-on-primary font-headline font-bold px-4 py-2 text-xs tracking-widest hover:shadow-[0_0_12px_rgba(0,230,57,0.3)] transition-all duration-150 active:scale-95">
              CONNECT_WALLET
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
        {/* Mobile menu dropdown */}
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
              CONNECT_WALLET
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
              <div className="absolute top-2 right-2 font-mono text-[10px] text-primary-container/60">
                MEM_SLOT_V4
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter leading-none mb-4 text-white">
            OPTIMIZE <span className="text-primary-container italic">OR</span> PERISH
          </h1>

          <p className="font-mono text-sm md:text-base text-white/40 tracking-[0.2em] mb-12">
            // HIGH-STAKES COMPETITIVE SOLIDITY ENGINEERING ON BSC
          </p>

          {/* ── WAITLIST BOX ── */}
          <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/15 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] text-primary-container">OPERATORS_REGISTERED</span>
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                <AnimatedCount value={count} />
              </span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                className="bg-surface-container-high border-none text-white font-mono text-sm p-4 focus:ring-1 focus:ring-primary-container outline-none transition-all placeholder:text-white/20"
                placeholder="ENTER_OPERATOR_EMAIL..."
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary-container text-on-primary font-headline font-bold py-4 uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {status === "loading" ? "PROCESSING..." : "INITIATE_ENTRY"}
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

        {/* Decorative system lines */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="font-mono text-[10px] text-white/20 space-y-1">
            <div>[SYSTEM]: KERNEL_LOAD_OK</div>
            <div>[NETWORK]: BSC_MAINNET_CONNECTED</div>
            <div>[CONTRACTS]: 3_DEPLOYED</div>
            <div>[STATUS]: WAR_READY</div>
          </div>
        </div>
      </main>

      {/* ══════ PROTOCOL STATS ══════ */}
      <section className="bg-surface-container-lowest border-y border-outline-variant/15 py-6 px-6">
        <FadeUp>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { label: "MAX_PLAYERS", value: "1,000", sub: "Per Arena" },
              { label: "PROTOCOL_FEE", value: "5%", sub: "Of Prize Pool" },
              { label: "SETTLEMENT", value: "ATOMIC", sub: "Instant Payout" },
              { label: "NETWORK", value: "BSC", sub: "Binance Smart Chain" },
            ].map((s, i) => (
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
              {/* 01 STAKE_BNB */}
              <div className="p-10 border-b md:border-b-0 md:border-r border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <span className="font-headline text-5xl font-black text-white/10 group-hover:text-primary-container/20 transition-colors">01</span>
                  <span className="material-symbols-outlined text-primary-container">account_balance_wallet</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight uppercase text-white">STAKE_BNB</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 font-body">
                  Lock BNB to enter the arena. The creator sets the stake per player — all participants
                  commit equal amounts. Your stake feeds the prize pool that winners drain.
                </p>
                <div className="space-y-2">
                  <div className="h-[1px] w-full bg-outline-variant/20" />
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-white/30">CAPACITY</span>
                    <span className="text-primary-container">2 — 1,000 PLAYERS</span>
                  </div>
                </div>
              </div>

              {/* 02 SOL_OPTIMIZATION */}
              <div className="p-10 border-b md:border-b-0 md:border-r border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <span className="font-headline text-5xl font-black text-white/10 group-hover:text-secondary-container/20 transition-colors">02</span>
                  <span className="material-symbols-outlined text-secondary-container">terminal</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight uppercase text-white">SOL_OPTIMIZATION</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 font-body">
                  Write the most gas-efficient Solidity solution. Your bytecode is deployed on-chain via CREATE,
                  then executed with staticcall against deterministic test inputs. Every opcode counts.
                </p>
                <div className="space-y-2">
                  <div className="h-[1px] w-full bg-outline-variant/20" />
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-white/30">GAS_LIMIT</span>
                    <span className="text-secondary-container">1,000,000 PER CALL</span>
                  </div>
                </div>
              </div>

              {/* 03 LIQUID_SETTLEMENT */}
              <div className="p-10 hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start mb-12">
                  <span className="font-headline text-5xl font-black text-white/10 group-hover:text-on-tertiary-container/20 transition-colors">03</span>
                  <span className="material-symbols-outlined text-on-tertiary-container">data_exploration</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 tracking-tight uppercase text-white">DRAIN_THE_POOL</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 font-body">
                  Lowest total gas wins. The contract resolves winners automatically — 95% of the
                  staked pool goes to the victor(s). Pull-based claims, no stuck funds. Ever.
                </p>
                <div className="space-y-2">
                  <div className="h-[1px] w-full bg-outline-variant/20" />
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-white/30">PAYOUT</span>
                    <span className="text-on-tertiary-container">95% TO WINNERS</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════ SIDE BAR INDICATOR ══════ */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 h-96 w-1 bg-primary-container/20 flex-col justify-between py-4 items-center hidden xl:flex">
        <span className="material-symbols-outlined text-[10px] text-primary-container">north</span>
        <div className="rotate-90 origin-center whitespace-nowrap font-mono text-[8px] tracking-[0.5em] text-white/20 uppercase">
          PROTOCOL_STATUS_ACTIVE
        </div>
        <span className="material-symbols-outlined text-[10px] text-primary-container">south</span>
      </aside>

      {/* ══════ EXECUTION PIPELINE — TERMINAL ══════ */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                6-PHASE<br />
                <span className="text-primary-container">EXECUTION</span> PIPELINE.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed font-body max-w-md">
                Each duel follows a trustless, deterministic pipeline — from open enrollment through
                commit-reveal to on-chain gas measurement and atomic settlement.
              </p>
              <div className="space-y-3">
                {[
                  { phase: "OPEN", desc: "Players join & stake BNB", color: "bg-primary-container" },
                  { phase: "COMMIT", desc: "Submit keccak256(bytecode + salt)", color: "bg-primary-container" },
                  { phase: "REVEAL", desc: "Reveal bytecode & salt on-chain", color: "bg-secondary-container" },
                  { phase: "EXECUTE", desc: "Sandbox measures gas via staticcall", color: "bg-secondary-container" },
                  { phase: "RESOLVED", desc: "Winners claim prize pool", color: "bg-primary-container" },
                  { phase: "CANCELLED", desc: "Emergency refund if needed", color: "bg-on-tertiary-container" },
                ].map((p) => (
                  <div key={p.phase} className="flex items-center gap-4">
                    <div className={`w-10 h-[1px] ${p.color}`} />
                    <span className="font-mono text-[10px] text-white/40 w-20">{p.phase}</span>
                    <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Terminal code block */}
          <FadeUp>
            <div className="relative bg-surface-container-lowest border border-outline-variant/15 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface-container border-b border-outline-variant/15">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-container/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-container/60" />
                </div>
                <span className="font-mono text-[10px] text-white/30 uppercase">gas_measurement.sol</span>
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
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">ANTI_CHEAT_PROTOCOL</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                TRUSTLESS BY <span className="text-secondary-container">DESIGN</span>.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "lock",
                title: "COMMIT_REVEAL",
                desc: "Players submit keccak256(bytecode + salt) first. Solutions stay hidden until all operators have committed. No peeking.",
                color: "text-primary-container",
                border: "border-primary-container/20",
              },
              {
                icon: "casino",
                title: "FUTURE_BLOCKHASH",
                desc: "Test inputs are seeded from a future block hash — unknowable at commit time. Prevents simulate-and-revert attacks.",
                color: "text-secondary-container",
                border: "border-secondary-container/20",
              },
              {
                icon: "shield",
                title: "STATICCALL_ONLY",
                desc: "All bytecode is executed via staticcall. No SSTORE, no SELFDESTRUCT, no gas refund exploitation. Pure computation.",
                color: "text-primary-container",
                border: "border-primary-container/20",
              },
              {
                icon: "verified",
                title: "EIP-170_COMPLIANT",
                desc: "Max bytecode size: 24,576 bytes per EIP-170. Factory pattern via EIP-1167 minimal proxy clones for gas efficiency.",
                color: "text-secondary-container",
                border: "border-secondary-container/20",
              },
            ].map((card) => (
              <FadeUp key={card.title}>
                <div className={`bg-surface-container-low p-8 border-l-2 ${card.border} hover:bg-surface-container transition-colors h-full`}>
                  <span className={`material-symbols-outlined ${card.color} mb-6 block`}>{card.icon}</span>
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
                ENGINEERED FOR <br />
                <span className="text-secondary-container">MAXIMAL EXTRACTABLE</span> PERFORMANCE.
              </h2>
              <div className="space-y-4">
                {[
                  { color: "bg-primary-container", text: "EIP-1167 Minimal Proxy Clones" },
                  { color: "bg-secondary-container", text: "Deterministic Test Generation" },
                  { color: "bg-on-tertiary-container", text: "Batched Execution For 1000 Players" },
                  { color: "bg-primary-container", text: "Pull-Based Prize Claims" },
                  { color: "bg-secondary-container", text: "Emergency Cancel + Refund Safety" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-4">
                    <div className={`w-12 h-[1px] ${f.color}`} />
                    <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Visual block */}
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
                <span className="px-2 py-1 bg-primary-container text-on-primary font-mono text-[8px] font-bold">
                  SYSTEM_STABLE
                </span>
                <span className="px-2 py-1 bg-surface-container-highest text-white font-mono text-[8px] font-bold">
                  SOL_0.8.19
                </span>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-mono text-[10px] text-primary-container/80 mb-2">
                  CONTRACT_COVERAGE: GasWarDuel.sol // GasWarFactory.sol // Sandbox.sol
                </div>
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
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">SYSTEM_ARCHITECTURE</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                THREE CONTRACTS. <span className="text-primary-container">ZERO</span> TRUST.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "GasWarFactory",
                role: "COMMAND_CENTER",
                lines: "260",
                desc: "Deploys EIP-1167 minimal proxy clones per duel. Controls global fees, stake minimums, and oracle permissions. Accumulates platform fees.",
                functions: ["createDuel()", "setMinStake()", "withdrawFees()"],
                color: "primary-container",
              },
              {
                name: "GasWarDuel",
                role: "BATTLE_INSTANCE",
                lines: "640",
                desc: "Each duel is an independent clone with its own state. Manages the 6-phase lifecycle from OPEN to RESOLVED. Handles commits, reveals, execution, and prize distribution.",
                functions: ["commit()", "reveal()", "executeBatch()", "claimPrize()"],
                color: "secondary-container",
              },
              {
                name: "Sandbox",
                role: "GAS_ORACLE",
                lines: "105",
                desc: "Stateless, reusable contract. Deploys player bytecode via CREATE, executes test inputs with staticcall, and measures exact gas consumption. Shared across all duels.",
                functions: ["deployAndMeasure()", "generateInput()", "verifyOutput()"],
                color: "primary-container",
              },
            ].map((c) => (
              <FadeUp key={c.name}>
                <div className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className={`font-mono text-[10px] text-${c.color} mb-1`}>{c.role}</div>
                      <h4 className="font-headline text-xl font-bold text-white">{c.name}.sol</h4>
                    </div>
                    <span className="font-mono text-[10px] text-white/20">{c.lines} LOC</span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-body mb-6 flex-grow">{c.desc}</p>
                  <div className="space-y-1">
                    {c.functions.map((fn) => (
                      <div key={fn} className={`font-mono text-[10px] text-${c.color}/60`}>
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
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">DEPLOYMENT_SCHEDULE</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                THE <span className="text-primary-container">ROADMAP</span>.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                phase: "PHASE_01",
                title: "BSC TESTNET LAUNCH",
                status: "COMPLETE",
                statusColor: "text-primary-container",
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
                statusColor: "text-secondary-container",
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
                statusColor: "text-white/30",
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
                statusColor: "text-white/30",
                items: [
                  "Multi-chain deployment (Ethereum, Arbitrum)",
                  "DAO governance for fee parameters",
                  "Advanced challenge types (Yul, Huff, raw bytecode)",
                  "SDK for third-party arena creation",
                ],
              },
            ].map((r) => (
              <FadeUp key={r.phase}>
                <div className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-mono text-[10px] text-white/30 mb-1">{r.phase}</div>
                      <h4 className="font-headline text-lg font-bold text-white uppercase">{r.title}</h4>
                    </div>
                    <span className={`font-mono text-[10px] ${r.statusColor} uppercase`}>{r.status}</span>
                  </div>
                  <div className="space-y-3">
                    {r.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-primary-container font-mono text-[10px] mt-0.5">
                          {r.status === "COMPLETE" ? "+" : ">"}
                        </span>
                        <span className="text-white/50 text-sm font-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="py-24 px-6 bg-surface-container-lowest border-t border-outline-variant/15">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter uppercase leading-none mb-6">
              READY TO <span className="text-primary-container">COMPETE</span>?
            </h2>
            <p className="font-mono text-sm text-white/40 tracking-[0.15em] mb-10">
              // JOIN THE WAITLIST. GET EARLY ACCESS. DOMINATE THE ARENA.
            </p>
            <a
              href="#protocol"
              className="inline-block bg-primary-container text-on-primary font-headline font-bold py-4 px-12 uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-[0.98] text-sm"
            >
              INITIATE_ENTRY
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="w-full py-8 border-t border-outline-variant/15 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-primary-container font-bold font-headline tracking-widest">0xGASWARS</span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
              &copy; 2025 // OPTIMIZE_OR_DIE
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {["TWITTER", "DISCORD", "GITHUB", "DOCS"].map((link) => (
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
          <div className="font-mono text-[9px] text-white/15 uppercase tracking-widest">
            Solidity 0.8.19 // EIP-1167 // EIP-170 // BSC Chain ID: 56
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="font-mono text-[9px] text-primary-container/50 uppercase tracking-widest">
              ALL_SYSTEMS_OPERATIONAL
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
