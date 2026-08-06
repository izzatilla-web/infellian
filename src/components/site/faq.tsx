import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import faqImg from "@/assets/faq.svg";
import { SectionLabel } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="shell scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <h2 className="display tracking-wide text-5xl md:text-7xl">
            {t.faq.titleLine1}
            <br />
            {t.faq.titleLine2}
          </h2>
        </div>
        <p className="max-w-sm flex items-center text-sm leading-relaxed text-muted-foreground lg:ml-auto">
          {t.faq.intro}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[20rem_1fr]">
        <img
          src={faqImg}
          alt={t.faq.imageAlt}
          width={900}
          height={900}
          loading="lazy"
          className="aspect-square w-full rounded-2xl object-cover"
        />

        <div>
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full border transition-colors",
                      isOpen
                        ? "border-brand bg-brand/15 text-brand"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-400",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
