"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/context";

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

const PIPELINE_COLORS = [
  "bg-primary-container", "bg-primary-container",
  "bg-secondary-container", "bg-secondary-container",
  "bg-primary-container", "bg-on-tertiary-container",
];
const SECURITY_ICONS = ["lock", "casino", "shield", "verified"];
const SECURITY_COLORS = [
  { icon: "text-primary-container", border: "border-primary-container/20" },
  { icon: "text-secondary-container", border: "border-secondary-container/20" },
  { icon: "text-primary-container", border: "border-primary-container/20" },
  { icon: "text-secondary-container", border: "border-secondary-container/20" },
];
const FEATURE_COLORS = [
  "bg-primary-container", "bg-secondary-container", "bg-on-tertiary-container",
  "bg-primary-container", "bg-secondary-container",
];
const ARCH_COLORS = ["primary-container", "secondary-container", "primary-container"];

export default function DocsPage() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <>
      {/* ── Minimal nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-full">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-primary-container tracking-widest font-headline uppercase">
              GASWARS
            </a>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">// TECHNICAL_DOCS</span>
          </div>
          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="font-mono text-[10px] tracking-widest text-white/40 hover:text-primary-container transition-colors px-2 py-1 border border-outline-variant/20 hover:border-primary-container/30"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* ══════ EXECUTION PIPELINE ══════ */}
          <section className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          {/* ══════ SECURITY ══════ */}
          <section className="py-16 border-t border-outline-variant/15">
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
          </section>

          {/* ══════ FEATURES ══════ */}
          <section className="py-16 border-t border-outline-variant/15">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          <section className="py-16 border-t border-outline-variant/15">
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
          </section>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-8 border-t border-outline-variant/15 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-primary-container font-bold font-headline tracking-widest">0xGASWARS</span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">{t.footer.copyright}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="font-mono text-[9px] text-primary-container/50 uppercase tracking-widest">{t.footer.systemsOperational}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
