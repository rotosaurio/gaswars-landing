"use client";

import { useLanguage } from "@/i18n/context";
import { useState } from "react";

export function LanguageModal() {
  const { showModal, setLocale, dismissModal } = useLanguage();
  const [exiting, setExiting] = useState(false);

  if (!showModal) return null;

  const handleSelect = (lang: "en" | "es") => {
    setExiting(true);
    setTimeout(() => {
      setLocale(lang);
      dismissModal();
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-250 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-surface-container-lowest border border-outline-variant/15 p-8 max-w-sm w-full mx-4 shadow-[0_0_60px_rgba(0,255,65,0.08)] transition-all duration-250 ${
          exiting ? "scale-95 opacity-0" : "modal-enter"
        }`}
      >
        {/* Decorative top line */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-1 bg-primary-container" />
          <div className="h-[1px] flex-grow bg-outline-variant/20" />
          <div className="w-1 h-1 bg-secondary-container" />
        </div>

        <div className="font-mono text-[10px] text-primary-container tracking-[0.3em] mb-2">
          SELECT_LANGUAGE
        </div>
        <h2 className="font-headline text-xl font-bold text-white uppercase tracking-tight mb-1">
          CHOOSE YOUR INTERFACE
        </h2>
        <p className="font-mono text-[10px] text-white/30 mb-8">
          // SELECCIONA TU IDIOMA
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSelect("en")}
            className="group p-5 border border-outline-variant/20 hover:border-primary-container/60 hover:bg-primary-container/5 transition-all duration-150 text-left"
          >
            <div className="font-headline text-2xl font-black text-white/80 group-hover:text-primary-container transition-colors">
              EN
            </div>
            <div className="font-mono text-[10px] text-white/30 mt-1 tracking-widest">ENGLISH</div>
          </button>
          <button
            onClick={() => handleSelect("es")}
            className="group p-5 border border-outline-variant/20 hover:border-secondary-container/60 hover:bg-secondary-container/5 transition-all duration-150 text-left"
          >
            <div className="font-headline text-2xl font-black text-white/80 group-hover:text-secondary-container transition-colors">
              ES
            </div>
            <div className="font-mono text-[10px] text-white/30 mt-1 tracking-widest">ESPANOL</div>
          </button>
        </div>

        {/* Decorative bottom line */}
        <div className="flex items-center gap-2 mt-6">
          <div className="h-[1px] flex-grow bg-outline-variant/20" />
          <div className="font-mono text-[8px] text-white/15 tracking-widest">0xGASWARS</div>
          <div className="h-[1px] flex-grow bg-outline-variant/20" />
        </div>
      </div>
    </div>
  );
}
