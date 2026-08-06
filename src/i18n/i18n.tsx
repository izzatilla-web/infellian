import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Translation } from "./en";
import { ru } from "./ru";
import { uz } from "./uz";
import { cn } from "@/lib/utils";

export type Language = "en" | "ru" | "uz";

const translations: Record<Language, Translation> = { en, ru, uz };

const languageNames: Record<Language, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "infellian-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "ru" || saved === "uz") return saved;
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start with "en" on both server and client to avoid hydration mismatch.
  const [language, setLanguageState] = useState<Language>("en");

  // After mount, restore the user's saved preference if any.
  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // localStorage unavailable — ignore
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

/** Language selector shown in the navbar, matching the site's pill-button style. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useI18n();
  const languages: Language[] = ["en", "ru", "uz"];

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-background/60 p-0.5 backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={lang.toUpperCase()}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            language === lang
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {languageNames[lang]}
        </button>
      ))}
    </div>
  );
}
