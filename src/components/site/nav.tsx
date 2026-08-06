import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./primitives";
import { LanguageSwitcher, useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

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

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent",
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
          <LanguageSwitcher className="hidden sm:flex" />
          <button
            onClick={() => go("#contact")}
            className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 sm:block"
          >
            {t.nav.contact}
          </button>
          <button
            className="rounded-full border border-border p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <div className="shell flex flex-col py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="border-b border-border/60 py-3 text-sm last:border-0"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => go("#contact")}
              className="mt-3 rounded-full bg-brand py-2.5 text-sm font-medium text-brand-foreground"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
