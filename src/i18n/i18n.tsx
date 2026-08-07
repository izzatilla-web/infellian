import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Languages } from "lucide-react";
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

/**
 * Compact language selector for mobile: a globe button that opens a dropdown
 * menu with the available languages. Shown only below the lg breakpoint —
 * desktop keeps the segmented pill `LanguageSwitcher`.
 */
export function MobileLanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useI18n();
  const languages: Language[] = ["en", "ru", "uz"];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex size-9 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:text-brand"
      >
        <Languages className="size-4" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Language"
          className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-border bg-background/95 p-1.5 shadow-xl backdrop-blur"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              role="menuitemradio"
              aria-checked={language === lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                language === lang
                  ? "bg-foreground text-background"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {languageNames[lang]}
              {language === lang ? <Check className="size-4" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
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
