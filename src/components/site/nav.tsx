/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./primitives";
import { LanguageSwitcher, MobileLanguageSwitcher, useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

const MENU_COVER_MS = 500; // background fade duration
const MENU_STAGGER_MS = 90; // stagger between links when opening
const MENU_TEXT_EXIT_MS = 300; // texts finish exiting before the background fades

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t.nav.links.home, href: "#home" },
    { label: t.nav.links.about, href: "#about" },
    { label: t.nav.links.company, href: "#services" },
    { label: t.nav.links.services, href: "#numbers" },
    { label: t.nav.links.project, href: "#work" },
    // { label: "Pages", href: "#pricing" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = links.find((l) => {
        const el = document.querySelector(l.href);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });
      if (current) setActive(current.href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        open ? "bg-transparent" : scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("#home");
          }}
        >
          <Logo />
        </a>

        <nav className="hidden items-center lg:flex">
          {links.map((l, i) => (
            <div key={l.href} className="flex items-center">
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className={cn(
                  "px-4 text-sm transition-colors hover:text-brand",
                  active === l.href ? "text-brand" : "text-foreground/80",
                )}
              >
                {l.label}
              </a>
              {i > 1 && i < links.length - 1 ? (
                <span className="h-3 w-px bg-border" aria-hidden />
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden lg:flex" />
          <div className="lg:hidden">
            <MobileLanguageSwitcher />
          </div>
          <button
            onClick={() => go("#contact")}
            className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 sm:block"
          >
            {t.nav.contact}
          </button>
          <button
            className={cn(
              "rounded-full p-2 transition-colors duration-300 lg:hidden",
              open
                ? "border border-border bg-background/60 backdrop-blur"
                : "border border-border bg-background/60 backdrop-blur",
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-opacity duration-500 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transitionDelay: open ? "0ms" : `${MENU_TEXT_EXIT_MS}ms` }}
        aria-hidden={!open}
      >
        {/* Close button inside the menu itself */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.nav.menu}
          className={cn(
            "group absolute top-5 right-5 z-10 flex size-11 items-center justify-center rounded-full bg-background text-foreground/80 transition-all duration-500 ease-out will-change-transform sm:top-6 sm:right-6",
            open ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
          )}
          style={{
            transitionDelay: open ? `${MENU_COVER_MS}ms` : "0ms",
            transitionDuration: open ? "500ms" : "250ms",
          }}
        >
          <X className="size-11 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        <nav className="flex h-full flex-col justify-center px-8 sm:px-12">
          {links.map((l, i) => {
            const isActive = active === l.href;
            const enterDelay = `${MENU_COVER_MS + i * MENU_STAGGER_MS}ms`;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className={cn(
                  "group relative w-fit py-2.5 transition-all ease-out will-change-transform",
                  open ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0",
                )}
                style={{
                  transitionDelay: open ? enterDelay : "0ms",
                  transitionDuration: open ? "500ms" : "250ms",
                }}
              >
                <span
                  className={cn(
                    "display text-4xl transition-colors duration-300 sm:text-5xl",
                    isActive ? "text-brand" : "text-foreground",
                  )}
                >
                  {l.label}
                </span>
                {/* Active-tab underline in brand color */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-brand transition-transform ease-out",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                  style={{
                    transitionDelay: isActive ? enterDelay : "0ms",
                    transitionDuration: open ? "500ms" : "250ms",
                  }}
                />
              </a>
            );
          })}

          {/* Contact CTA styled like the menu links */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go("#contact");
            }}
            className={cn(
              "group relative mt-12 w-fit transition-all ease-out will-change-transform",
              open ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0",
            )}
            style={{
              transitionDelay: open ? `${MENU_COVER_MS + links.length * MENU_STAGGER_MS}ms` : "0ms",
              transitionDuration: open ? "500ms" : "250ms",
            }}
          >
            <span className="display text-4xl text-brand sm:text-5xl">{t.nav.contact}</span>
            <span
              aria-hidden
              className="absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-100 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-50"
            />
          </a>
        </nav>
      </div>
    </header>
  );
}
