import { useState } from "react";
import { Check } from "lucide-react";
import serviceAi from "@/assets/service-ai.svg";
import serviceCrm from "@/assets/service-crm.svg";
import serviceWeb from "@/assets/service-web.svg";
import serviceMobile from "@/assets/service-mobile.svg";
import { PillButton, SectionLabel, Seal } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

const serviceImages = [serviceAi, serviceCrm, serviceWeb, serviceMobile];

export function Services() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const [open, setOpen] = useState(0);
  const services = t.services.items;

  return (
    <section id="services" className="scroll-mt-24 pt-8 md:pt-12">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionLabel>{t.services.label}</SectionLabel>
            <h2
              className={cn(
                "display tracking-wide",
                ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
              )}
            >
              {t.services.titleLine1}
              <br />
              {t.services.titleLine2}
            </h2>
          </div>
          <div className="lg:pt-4 flex flex-col justify-end">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:ml-auto">
              {t.services.intro}
            </p>
            <div className="mt-6 lg:flex lg:justify-end">
              <PillButton tone="light">{t.services.cta}</PillButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <div
              key={s.title}
              className={cn(
                "border-b border-border transition-colors",
                isOpen ? "bg-surface" : "bg-background hover:bg-surface/60",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="shell grid w-full grid-cols-1 items-start gap-4 py-8 text-left md:grid-cols-12 md:py-10"
              >
                <span
                  className={cn(
                    "display md:col-span-3",
                    ru ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-brand">.</span>
                </span>
                <span
                  className={cn(
                    "text-xl transition-colors md:col-span-4 md:pt-2",
                    isOpen ? "text-foreground" : "text-foreground/90",
                  )}
                >
                  {s.title}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground md:col-span-5 md:pt-2">
                  {s.copy}
                </span>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-500",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="shell grid items-start gap-8 pb-12 md:grid-cols-12">
                    <div className="relative md:col-span-5 md:col-start-4">
                      <img
                        src={serviceImages[i] || serviceAi}
                        alt={`${s.title} preview`}
                        width={1600}
                        height={1000}
                        loading="lazy"
                        className="aspect-[16/10] w-full -rotate-2 rounded-xl object-cover shadow-2xl"
                      />
                      <Seal className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 md:size-20" />
                    </div>
                    <div className="md:col-span-3 md:col-start-10">
                      <p className="font-medium">{t.services.included}</p>
                      <ul className="mt-4 space-y-2.5">
                        {s.included.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <Check className="mt-0.5 size-3.5 shrink-0 text-brand" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
