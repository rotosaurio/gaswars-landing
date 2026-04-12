"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Locale, Dictionary } from "./types";
import { en } from "./locales/en";
import { es } from "./locales/es";

const dictionaries: Record<Locale, Dictionary> = { en, es };
const STORAGE_KEY = "gaswar-lang";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
  showModal: boolean;
  dismissModal: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
  showModal: false,
  dismissModal: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "es") {
      setLocaleState(stored);
    } else {
      setShowModal(true);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const dismissModal = () => setShowModal(false);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale], showModal, dismissModal }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
