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

const docs = {
  en: {
    whatIs: {
      label: "WHAT_IS_GASWARS",
      title: "Think competitive programming,",
      titleAccent: "but you get paid.",
      paragraphs: [
        "GasWars is a platform where developers compete to write the most efficient code possible. You enter an arena, solve a challenge, and if your solution performs better than everyone else's — you win real money.",
        "It works like this: multiple developers enter the same challenge. Everyone writes their own solution to the same problem. The platform runs all solutions under identical conditions and measures which one performs best. The winner takes the prize pool.",
        "No judges. No subjectivity. The code speaks for itself.",
      ],
    },
    howItWorks: {
      label: "HOW_IT_WORKS",
      title: "Step by step.",
      titleAccent: "No surprises.",
      steps: [
        { num: "01", title: "A challenge is created", desc: "Someone creates an arena with a specific coding challenge. They set the rules: how many players can join, how much it costs to enter (or if it's free), and the time limit." },
        { num: "02", title: "Developers join", desc: "You join the arena and pay the entry fee (if there is one). Your entry fee goes into the prize pool. The more players, the bigger the pool." },
        { num: "03", title: "Everyone submits their solution", desc: "You write your solution and submit it. Here's the key: nobody can see anyone else's solution until everyone has submitted. This prevents copying." },
        { num: "04", title: "Solutions are revealed", desc: "Once everyone has submitted, all solutions are revealed at the same time. No one had an advantage." },
        { num: "05", title: "The platform measures performance", desc: "Every solution is executed under the exact same conditions. The platform measures how efficient each one is — same input, same environment, no variables." },
        { num: "06", title: "Winner takes the pool", desc: "The developer with the most efficient solution wins 95% of the prize pool. The remaining 5% is a platform fee. Payouts are automatic — no waiting, no disputes." },
      ],
    },
    modes: {
      label: "GAME_MODES",
      title: "Four ways to",
      titleAccent: "compete.",
      items: [
        {
          title: "TRAINING",
          tier: "FREE",
          desc: "Practice without risk. Same challenges as the real arenas, but no money involved and no ranking impact. Perfect for learning, testing strategies, or just having fun.",
          highlights: ["No entry fee", "No ranking impact", "Same real challenges", "Unlimited attempts"],
        },
        {
          title: "DUEL",
          tier: "RANKED",
          desc: "The classic mode. Everyone pays the same entry fee, which goes into a shared prize pool. Write the most efficient solution and take 95% of the pool. Pure skill, real money.",
          highlights: ["Equal entry fee for all", "Winner takes 95%", "2 to 1,000 players per arena", "Global leaderboard ranking"],
        },
        {
          title: "BOUNTY",
          tier: "RANKED",
          desc: "A company or sponsor posts a reward for solving an optimization problem. Developers compete for free — no entry fee required. The best solution wins the bounty. Great for companies that want their code optimized by hundreds of devs competing at once.",
          highlights: ["Sponsor funds the prize", "Free entry for developers", "Real-world optimization problems", "Global leaderboard ranking"],
        },
        {
          title: "BOUNTY WAR",
          tier: "RANKED // MAX",
          desc: "The ultimate mode. A sponsor posts a guaranteed bounty, AND players add their own entry fees on top. Think of it like a poker tournament with a guaranteed prize pool — the floor is set by the sponsor, but the total pot keeps growing as more players join. Maximum stakes, maximum reward.",
          highlights: ["Guaranteed bounty + player entry fees", "Largest possible prize pools", "Sponsor sets minimum prize floor", "Elite competition"],
        },
      ],
    },
    fairness: {
      label: "WHY_ITS_FAIR",
      title: "No cheating.",
      titleAccent: "By design.",
      desc: "GasWars is built so that cheating is mathematically impossible, not just against the rules. Here's how:",
      items: [
        {
          title: "Hidden submissions",
          desc: "When you submit your solution, it's encrypted. Nobody — not even the platform — can see what you wrote until everyone has submitted. This is done through a technique called commit-reveal: you first submit a locked version, then reveal it after the deadline.",
        },
        {
          title: "Unpredictable test inputs",
          desc: "The inputs used to test your code are generated AFTER everyone has submitted. They come from a future event that nobody can predict. This means you can't tailor your solution to specific test cases — it has to be genuinely efficient.",
        },
        {
          title: "Isolated execution",
          desc: "Every solution runs in a completely isolated environment. Your code can't access the internet, other solutions, or any external data. It's just your code, the input, and the clock. No exploits possible.",
        },
        {
          title: "Automatic payouts",
          desc: "Winners are determined by the code, and payouts happen automatically. No human decides who wins. No disputes. No delays. The most efficient code wins, period.",
        },
      ],
    },
    forCompanies: {
      label: "FOR_COMPANIES",
      title: "Get your code optimized",
      titleAccent: "at scale.",
      desc: "Instead of hiring one optimization expert, post a bounty and let hundreds of developers compete to optimize your code. You only pay for the best result.",
      useCases: [
        { title: "Smart contract optimization", desc: "Reduce gas costs for your users. A 20% gas reduction on a high-traffic contract can save thousands of dollars per day." },
        { title: "Algorithm challenges", desc: "Post a computational problem and let the community find the most efficient solution. Coming soon for Rust, Go, SQL, and more." },
        { title: "Code auditing through competition", desc: "Hundreds of eyes on your code, all trying to find the most efficient approach. It's like a crowdsourced audit focused on performance." },
      ],
      how: [
        "Set your bounty amount",
        "Define the optimization challenge",
        "Developers compete to solve it",
        "Review the winning solution",
        "Winner gets paid automatically",
      ],
    },
    technical: {
      label: "TECHNICAL_DETAILS",
      title: "Under the hood.",
      titleAccent: "For the curious.",
      desc: "GasWars runs on the BNB Smart Chain (BSC). The entire competition lifecycle — from joining to payouts — is managed by smart contracts. No backend can interfere with results.",
      specs: [
        { label: "Network", value: "BNB Smart Chain (BSC)" },
        { label: "Language", value: "Solidity 0.8.19" },
        { label: "Anti-cheat", value: "Commit-reveal with keccak256 hashing" },
        { label: "Randomness", value: "Future blockhash (unpredictable at commit time)" },
        { label: "Execution", value: "Sandboxed via staticcall (read-only, no exploits)" },
        { label: "Max players per arena", value: "1,000" },
        { label: "Protocol fee", value: "5% of prize pool" },
        { label: "Contract pattern", value: "EIP-1167 minimal proxy clones (gas-efficient)" },
        { label: "Payout model", value: "Pull-based claims (funds never get stuck)" },
        { label: "Smart contracts", value: "GasWarFactory, GasWarDuel, Sandbox" },
        { label: "Test suite", value: "119 tests passing (V2)" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Common",
      titleAccent: "questions.",
      items: [
        { q: "Do I need to know blockchain to participate?", a: "For the current Solidity arena, yes — you need to know Solidity. But we're expanding to Rust, Move, Go, SQL, and general-purpose algorithm optimization. Those won't require any blockchain knowledge." },
        { q: "Is it free to try?", a: "Yes. Training mode is completely free. You can practice on real challenges without risking any money or affecting your ranking." },
        { q: "How do I get paid?", a: "Winnings are deposited to your wallet automatically through the smart contract. You claim them with one transaction — no middleman, no delays." },
        { q: "Can the platform steal my money?", a: "No. The smart contracts are non-custodial. The platform never holds your funds — they go directly into the prize pool contract. Payouts are automatic and verifiable on-chain." },
        { q: "What prevents someone from copying the best solution?", a: "The commit-reveal system. You submit an encrypted version of your solution first. Nobody can see it until all submissions are in. By then, it's too late to copy." },
        { q: "What languages will be supported?", a: "Starting with Solidity (live now). Rust (Solana), Move (Sui), Go, and SQL are on the roadmap. Eventually, general-purpose algorithm optimization too." },
        { q: "How is 'efficiency' measured?", a: "For Solidity, it's gas consumption — the less gas your code uses, the better. For future languages, it will be execution time, memory usage, or compute units depending on the runtime." },
      ],
    },
  },
  es: {
    whatIs: {
      label: "QUE_ES_GASWARS",
      title: "Piensa en programacion competitiva,",
      titleAccent: "pero te pagan.",
      paragraphs: [
        "GasWars es una plataforma donde desarrolladores compiten por escribir el codigo mas eficiente posible. Entras a una arena, resuelves un reto, y si tu solucion rinde mejor que la de todos los demas — ganas dinero real.",
        "Funciona asi: varios desarrolladores entran al mismo reto. Todos escriben su propia solucion al mismo problema. La plataforma ejecuta todas las soluciones bajo condiciones identicas y mide cual rinde mejor. El ganador se lleva el pozo de premios.",
        "Sin jueces. Sin subjetividad. El codigo habla por si solo.",
      ],
    },
    howItWorks: {
      label: "COMO_FUNCIONA",
      title: "Paso a paso.",
      titleAccent: "Sin sorpresas.",
      steps: [
        { num: "01", title: "Se crea un reto", desc: "Alguien crea una arena con un reto de programacion especifico. Define las reglas: cuantos jugadores pueden entrar, cuanto cuesta participar (o si es gratis), y el tiempo limite." },
        { num: "02", title: "Los desarrolladores se unen", desc: "Te unes a la arena y pagas la cuota de entrada (si la hay). Tu cuota va al pozo de premios. Mas jugadores, mas grande el pozo." },
        { num: "03", title: "Todos envian su solucion", desc: "Escribes tu solucion y la envias. Lo clave: nadie puede ver la solucion de nadie hasta que todos hayan enviado. Esto previene que copien." },
        { num: "04", title: "Se revelan las soluciones", desc: "Una vez que todos enviaron, todas las soluciones se revelan al mismo tiempo. Nadie tuvo ventaja." },
        { num: "05", title: "La plataforma mide el rendimiento", desc: "Cada solucion se ejecuta bajo las mismas condiciones exactas. La plataforma mide que tan eficiente es cada una — mismo input, mismo entorno, sin variables." },
        { num: "06", title: "El ganador se lleva el pozo", desc: "El desarrollador con la solucion mas eficiente gana el 95% del pozo de premios. El 5% restante es comision de plataforma. Los pagos son automaticos — sin esperas, sin disputas." },
      ],
    },
    modes: {
      label: "MODOS_DE_JUEGO",
      title: "Cuatro formas de",
      titleAccent: "competir.",
      items: [
        {
          title: "TRAINING",
          tier: "GRATIS",
          desc: "Practica sin riesgo. Los mismos retos que las arenas reales, pero sin dinero y sin impacto en tu ranking. Perfecto para aprender, probar estrategias, o simplemente divertirte.",
          highlights: ["Sin cuota de entrada", "Sin impacto en ranking", "Mismos retos reales", "Intentos ilimitados"],
        },
        {
          title: "DUELO",
          tier: "RANKED",
          desc: "El modo clasico. Todos pagan la misma cuota de entrada, que va a un pozo compartido. Escribe la solucion mas eficiente y llevate el 95% del pozo. Pura habilidad, dinero real.",
          highlights: ["Cuota de entrada igual para todos", "Ganador se lleva 95%", "2 a 1,000 jugadores por arena", "Ranking en leaderboard global"],
        },
        {
          title: "BOUNTY",
          tier: "RANKED",
          desc: "Una empresa o sponsor publica una recompensa por resolver un problema de optimizacion. Los desarrolladores compiten gratis — sin cuota de entrada. La mejor solucion gana el bounty. Ideal para empresas que quieren su codigo optimizado por cientos de devs compitiendo a la vez.",
          highlights: ["El sponsor financia el premio", "Entrada gratis para devs", "Problemas de optimizacion reales", "Ranking en leaderboard global"],
        },
        {
          title: "BOUNTY WAR",
          tier: "RANKED // MAX",
          desc: "El modo definitivo. Un sponsor pone un bounty garantizado, Y los jugadores agregan sus propias cuotas de entrada encima. Piensa en un torneo de poker con premio garantizado — el piso lo pone el sponsor, pero el pozo total crece mientras mas jugadores se unan. Maximo riesgo, maxima recompensa.",
          highlights: ["Bounty garantizado + cuotas de jugadores", "Los pozos de premios mas grandes", "El sponsor define el premio minimo", "Competencia elite"],
        },
      ],
    },
    fairness: {
      label: "POR_QUE_ES_JUSTO",
      title: "Sin trampas.",
      titleAccent: "Por diseno.",
      desc: "GasWars esta construido para que hacer trampa sea matematicamente imposible, no solo contra las reglas. Asi es como:",
      items: [
        {
          title: "Soluciones ocultas",
          desc: "Cuando envias tu solucion, esta encriptada. Nadie — ni siquiera la plataforma — puede ver lo que escribiste hasta que todos hayan enviado. Esto se hace con una tecnica llamada commit-reveal: primero envias una version bloqueada, luego la revelas despues de la fecha limite.",
        },
        {
          title: "Inputs de prueba impredecibles",
          desc: "Los inputs que se usan para probar tu codigo se generan DESPUES de que todos hayan enviado. Vienen de un evento futuro que nadie puede predecir. Esto significa que no puedes adaptar tu solucion a casos de prueba especificos — tiene que ser genuinamente eficiente.",
        },
        {
          title: "Ejecucion aislada",
          desc: "Cada solucion corre en un entorno completamente aislado. Tu codigo no puede acceder a internet, otras soluciones, ni datos externos. Es solo tu codigo, el input, y el reloj. Sin exploits posibles.",
        },
        {
          title: "Pagos automaticos",
          desc: "Los ganadores se determinan por el codigo, y los pagos ocurren automaticamente. Ningun humano decide quien gana. Sin disputas. Sin demoras. El codigo mas eficiente gana, punto.",
        },
      ],
    },
    forCompanies: {
      label: "PARA_EMPRESAS",
      title: "Optimiza tu codigo",
      titleAccent: "a escala.",
      desc: "En vez de contratar un experto en optimizacion, publica un bounty y deja que cientos de desarrolladores compitan por optimizar tu codigo. Solo pagas por el mejor resultado.",
      useCases: [
        { title: "Optimizacion de smart contracts", desc: "Reduce los costos de gas para tus usuarios. Una reduccion de 20% en gas en un contrato de alto trafico puede ahorrar miles de dolares por dia." },
        { title: "Retos de algoritmos", desc: "Publica un problema computacional y deja que la comunidad encuentre la solucion mas eficiente. Proximamente para Rust, Go, SQL, y mas." },
        { title: "Auditoria a traves de competencia", desc: "Cientos de ojos en tu codigo, todos tratando de encontrar el enfoque mas eficiente. Es como una auditoria crowdsourced enfocada en rendimiento." },
      ],
      how: [
        "Define el monto de tu bounty",
        "Define el reto de optimizacion",
        "Los desarrolladores compiten por resolverlo",
        "Revisa la solucion ganadora",
        "El ganador cobra automaticamente",
      ],
    },
    technical: {
      label: "DETALLES_TECNICOS",
      title: "Por dentro.",
      titleAccent: "Para los curiosos.",
      desc: "GasWars corre sobre BNB Smart Chain (BSC). Todo el ciclo de vida de la competencia — desde unirte hasta los pagos — esta manejado por smart contracts. Ningun backend puede interferir con los resultados.",
      specs: [
        { label: "Red", value: "BNB Smart Chain (BSC)" },
        { label: "Lenguaje", value: "Solidity 0.8.19" },
        { label: "Anti-trampa", value: "Commit-reveal con hashing keccak256" },
        { label: "Aleatoriedad", value: "Blockhash futuro (impredecible al momento del commit)" },
        { label: "Ejecucion", value: "Sandboxed via staticcall (solo lectura, sin exploits)" },
        { label: "Max jugadores por arena", value: "1,000" },
        { label: "Comision de plataforma", value: "5% del pozo de premios" },
        { label: "Patron de contratos", value: "EIP-1167 minimal proxy clones (eficiente en gas)" },
        { label: "Modelo de pago", value: "Cobro tipo pull (los fondos nunca se atascan)" },
        { label: "Smart contracts", value: "GasWarFactory, GasWarDuel, Sandbox" },
        { label: "Suite de tests", value: "119 tests pasando (V2)" },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Preguntas",
      titleAccent: "frecuentes.",
      items: [
        { q: "Necesito saber blockchain para participar?", a: "Para la arena actual de Solidity, si — necesitas saber Solidity. Pero estamos expandiendo a Rust, Move, Go, SQL, y optimizacion de algoritmos en general. Esos no van a requerir conocimiento de blockchain." },
        { q: "Es gratis probarlo?", a: "Si. El modo Training es completamente gratis. Puedes practicar en retos reales sin arriesgar dinero ni afectar tu ranking." },
        { q: "Como me pagan?", a: "Las ganancias se depositan a tu wallet automaticamente a traves del smart contract. Las reclamas con una transaccion — sin intermediarios, sin demoras." },
        { q: "Puede la plataforma robar mi dinero?", a: "No. Los smart contracts son no-custodiales. La plataforma nunca tiene tus fondos — van directamente al contrato del pozo de premios. Los pagos son automaticos y verificables on-chain." },
        { q: "Que previene que alguien copie la mejor solucion?", a: "El sistema de commit-reveal. Envias una version encriptada de tu solucion primero. Nadie puede verla hasta que todos hayan enviado. Para ese punto, ya es muy tarde para copiar." },
        { q: "Que lenguajes van a soportar?", a: "Empezando con Solidity (activo ahora). Rust (Solana), Move (Sui), Go, y SQL estan en el roadmap. Eventualmente, optimizacion de algoritmos de proposito general tambien." },
        { q: "Como se mide la 'eficiencia'?", a: "Para Solidity, es consumo de gas — mientras menos gas use tu codigo, mejor. Para futuros lenguajes, sera tiempo de ejecucion, uso de memoria, o compute units dependiendo del runtime." },
      ],
    },
  },
};

const TIER_STYLES: Record<string, { accent: string; border: string; tag: string }> = {
  "FREE": { accent: "text-white/50", border: "border-white/10", tag: "bg-white/5 text-white/40" },
  "GRATIS": { accent: "text-white/50", border: "border-white/10", tag: "bg-white/5 text-white/40" },
  "RANKED": { accent: "text-primary-container", border: "border-primary-container/20", tag: "bg-primary-container/10 text-primary-container" },
  "RANKED // MAX": { accent: "text-on-tertiary-container", border: "border-on-tertiary-container/20", tag: "bg-on-tertiary-container/10 text-on-tertiary-container" },
};

export default function DocsPage() {
  const { locale, setLocale } = useLanguage();
  const t = docs[locale];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-full">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-primary-container tracking-widest font-headline uppercase">
              GASWARS
            </a>
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">// DOCS</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
              className="font-mono text-[10px] tracking-widest text-white/40 hover:text-primary-container transition-colors px-2 py-1 border border-outline-variant/20 hover:border-primary-container/30"
            >
              {locale === "en" ? "ES" : "EN"}
            </button>
            <a href="/" className="font-mono text-[10px] tracking-widest text-white/40 hover:text-primary-container transition-colors px-2 py-1 border border-outline-variant/20 hover:border-primary-container/30">
              {locale === "en" ? "BACK" : "VOLVER"}
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">

          {/* ── WHAT IS GASWARS ── */}
          <section className="pb-16">
            <FadeUp>
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.whatIs.label}</span>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter leading-tight mb-8">
                {t.whatIs.title}<br />
                <span className="text-primary-container">{t.whatIs.titleAccent}</span>
              </h1>
              <div className="space-y-4">
                {t.whatIs.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/50 text-base leading-relaxed font-body">{p}</p>
                ))}
              </div>
            </FadeUp>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.howItWorks.label}</span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-12">
                {t.howItWorks.title} <span className="text-primary-container">{t.howItWorks.titleAccent}</span>
              </h2>
            </FadeUp>
            <div className="space-y-0">
              {t.howItWorks.steps.map((step, i) => (
                <FadeUp key={step.num}>
                  <div className={`flex gap-6 p-6 ${i < t.howItWorks.steps.length - 1 ? "border-b border-outline-variant/10" : ""}`}>
                    <div className="flex flex-col items-center">
                      <span className="font-headline text-3xl font-black text-primary-container/20">{step.num}</span>
                      {i < t.howItWorks.steps.length - 1 && <div className="w-px flex-1 bg-outline-variant/15 mt-2" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-headline text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed font-body">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ── GAME MODES ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.modes.label}</span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-12">
                {t.modes.title} <span className="text-secondary-container">{t.modes.titleAccent}</span>
              </h2>
            </FadeUp>
            <div className="space-y-6">
              {t.modes.items.map((mode) => {
                const style = TIER_STYLES[mode.tier] || TIER_STYLES["RANKED"];
                return (
                  <FadeUp key={mode.title}>
                    <div className={`bg-surface-container-low p-8 border-l-2 ${style.border} hover:bg-surface-container transition-colors`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest ${style.tag}`}>{mode.tier}</span>
                        <h3 className={`font-headline text-xl font-bold ${style.accent}`}>{mode.title}</h3>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed font-body mb-6">{mode.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {mode.highlights.map((h, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <span className={`font-mono text-[10px] mt-0.5 ${style.accent}`}>&gt;</span>
                            <span className="font-mono text-[10px] text-white/50">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </section>

          {/* ── WHY IT'S FAIR ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.fairness.label}</span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-4">
                {t.fairness.title} <span className="text-secondary-container">{t.fairness.titleAccent}</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed font-body mb-12 max-w-2xl">{t.fairness.desc}</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.fairness.items.map((item) => (
                <FadeUp key={item.title}>
                  <div className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors h-full">
                    <h4 className="font-headline text-sm font-bold text-white uppercase tracking-widest mb-4">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed font-body">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ── FOR COMPANIES ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <span className="font-mono text-[10px] text-secondary-container tracking-[0.3em] uppercase block mb-4">{t.forCompanies.label}</span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-4">
                {t.forCompanies.title} <span className="text-secondary-container">{t.forCompanies.titleAccent}</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed font-body mb-12 max-w-2xl">{t.forCompanies.desc}</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {t.forCompanies.useCases.map((uc) => (
                <FadeUp key={uc.title}>
                  <div className="bg-surface-container-low p-8 border-t-2 border-secondary-container/20 hover:bg-surface-container transition-colors h-full">
                    <h4 className="font-headline text-sm font-bold text-white mb-4">{uc.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed font-body">{uc.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp>
              <div className="bg-surface-container-low p-8">
                <h4 className="font-headline text-sm font-bold text-secondary-container uppercase tracking-widest mb-6">
                  {locale === "en" ? "How bounties work" : "Como funcionan los bounties"}
                </h4>
                <div className="space-y-3">
                  {t.forCompanies.how.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="font-headline text-lg font-black text-secondary-container/30 w-8">{String(i + 1).padStart(2, "0")}</span>
                      <div className="w-8 h-px bg-secondary-container/20" />
                      <span className="font-mono text-xs text-white/60">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </section>

          {/* ── TECHNICAL DETAILS ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.technical.label}</span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-4">
                {t.technical.title} <span className="text-primary-container">{t.technical.titleAccent}</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed font-body mb-12 max-w-2xl">{t.technical.desc}</p>
            </FadeUp>

            <FadeUp>
              <div className="bg-surface-container-lowest border border-outline-variant/15 overflow-hidden">
                <div className="px-4 py-3 bg-surface-container border-b border-outline-variant/15">
                  <span className="font-mono text-[10px] text-white/30 uppercase">SYSTEM_SPECS</span>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  {t.technical.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between items-center px-6 py-4">
                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{spec.label}</span>
                      <span className="font-mono text-xs text-primary-container">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </section>

          {/* ── FAQ ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase block mb-4">{t.faq.label}</span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-12">
                {t.faq.title} <span className="text-primary-container">{t.faq.titleAccent}</span>
              </h2>
            </FadeUp>
            <div className="space-y-0">
              {t.faq.items.map((item, i) => (
                <FadeUp key={i}>
                  <div className={`py-6 ${i < t.faq.items.length - 1 ? "border-b border-outline-variant/10" : ""}`}>
                    <h4 className="font-headline text-base font-bold text-white mb-3">{item.q}</h4>
                    <p className="text-white/40 text-sm leading-relaxed font-body">{item.a}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-16 border-t border-outline-variant/15">
            <FadeUp>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter mb-6">
                  {locale === "en" ? "Ready to" : "Listo para"} <span className="text-primary-container">{locale === "en" ? "compete" : "competir"}</span>?
                </h2>
                <a
                  href="/"
                  className="inline-block bg-primary-container text-on-primary font-headline font-bold py-4 px-12 uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-[0.98] text-sm"
                >
                  {locale === "en" ? "JOIN_WAITLIST" : "UNETE_A_LA_LISTA"}
                </a>
              </div>
            </FadeUp>
          </section>

        </div>
      </main>

      <footer className="w-full py-8 border-t border-outline-variant/15 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-primary-container font-bold font-headline tracking-widest">0xGASWARS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="font-mono text-[9px] text-primary-container/50 uppercase tracking-widest">
              {locale === "en" ? "ALL_SYSTEMS_OPERATIONAL" : "TODOS_LOS_SISTEMAS_OPERATIVOS"}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
