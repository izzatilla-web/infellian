import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import type { ComponentProps, ReactNode } from "react";

/** Pill button with a trailing circular arrow, as used across the site. */
export function PillButton({
  children,
  className,
  tone = "brand",
  ...props
}: ComponentProps<"button"> & { tone?: "brand" | "light" | "dark" }) {
  const tones = {
    brand: "bg-brand text-brand-foreground",
    light: "bg-foreground text-background",
    dark: "bg-surface-2 text-foreground border border-border",
  } as const;
  const dots = {
    brand: "bg-brand-foreground text-brand",
    light: "bg-brand text-brand-foreground",
    dark: "bg-brand text-brand-foreground",
  } as const;

  return (
    <button
      {...props}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
        tones[tone],
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          dots[tone],
        )}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.5} />
      </span>
    </button>
  );
}

/** Small uppercase section label with a leading rule. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow flex items-center gap-2 pt-2 whitespace-nowrap">
      <span className="h-px w-6 bg-brand" />
      {children}
    </span>
  );
}

/** The rotating "let's talk" seal badge that overlaps imagery. */
export function Seal({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div
      className={cn(
        "grid size-20 place-items-center rounded-full bg-background/90 p-1.5 backdrop-blur md:size-36",
        className,
      )}
    >
      <div className="relative size-full rounded-full border border-border/60">
        <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full">
          <defs>
            <path id="seal-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text className="fill-foreground text-[11px] tracking-[0.14em] uppercase">
            <textPath href="#seal-path" startOffset="0%">
              {t.seal.text}
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-[26%] grid place-items-center rounded-full bg-brand">
          <ArrowUpRight className="size-6 text-brand-foreground" strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}

/** Logo lockup used in the header and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className="flex items-center gap-2">
      <img src="/logo-small.png" alt="Infellian Logo" className={cn("aspect-auto w-[110px]", className)} />
    </span>
  );
}
