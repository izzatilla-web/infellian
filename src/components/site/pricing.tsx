/* eslint-disable prettier/prettier */
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { PillButton, SectionLabel } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  copy: string;
  price: string;
  period: string;
  cta: string;
  featured?: boolean;
  features: { label: string; included: boolean }[];
};

export function Pricing() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const plans: Plan[] = [
    {
      name: t.pricing.plans[0]!.name,
      copy: t.pricing.plans[0]!.copy,
      price: "$19",
      period: t.pricing.plans[0]!.period,
      cta: t.pricing.plans[0]!.cta,
      features: [
        { label: t.pricing.plans[0]!.features[0]!, included: true },
        { label: t.pricing.plans[0]!.features[1]!, included: true },
        { label: t.pricing.plans[0]!.features[2]!, included: true },
        { label: t.pricing.plans[0]!.features[3]!, included: false },
        { label: t.pricing.plans[0]!.features[4]!, included: true },
      ],
    },
    {
      name: t.pricing.plans[1]!.name,
      copy: t.pricing.plans[1]!.copy,
      price: "$59",
      period: t.pricing.plans[1]!.period,
      cta: t.pricing.plans[1]!.cta,
      featured: true,
      features: [
        { label: t.pricing.plans[1]!.features[0]!, included: true },
        { label: t.pricing.plans[1]!.features[1]!, included: true },
        { label: t.pricing.plans[1]!.features[2]!, included: true },
        { label: t.pricing.plans[1]!.features[3]!, included: true },
        { label: t.pricing.plans[1]!.features[4]!, included: true },
      ],
    },
    {
      name: t.pricing.plans[2]!.name,
      copy: t.pricing.plans[2]!.copy,
      price: "$99",
      period: t.pricing.plans[2]!.period,
      cta: t.pricing.plans[2]!.cta,
      features: [
        { label: t.pricing.plans[2]!.features[0]!, included: true },
        { label: t.pricing.plans[2]!.features[1]!, included: true },
        { label: t.pricing.plans[2]!.features[2]!, included: true },
        { label: t.pricing.plans[2]!.features[3]!, included: true },
        { label: t.pricing.plans[2]!.features[4]!, included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="shell scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex gap-4">
          <SectionLabel>{t.pricing.label}</SectionLabel>
          <h2
            className={cn(
              "display",
              ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
            )}
          >
            {t.pricing.titleLine1}
            <br />
            {t.pricing.titleLine2}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:ml-auto">
          {t.pricing.intro}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col overflow-hidden rounded-2xl border",
              plan.featured
                ? "border-brand bg-brand text-brand-foreground lg:-mt-4"
                : "border-border bg-surface",
            )}
          >
            <div className="p-6">
              <p className="font-medium">{plan.name}</p>
              <p
                className={cn(
                  "mt-2 text-xs leading-relaxed",
                  plan.featured ? "text-brand-foreground/85" : "text-muted-foreground",
                )}
              >
                {plan.copy}
              </p>
              <p className="mt-6 flex items-end gap-1">
                <span className="display text-5xl">{plan.price}</span>
                <span
                  className={cn(
                    "pb-1 text-xs",
                    plan.featured ? "text-brand-foreground/85" : "text-muted-foreground",
                  )}
                >
                  {plan.period}
                </span>
              </p>

              <div className="mt-6">
                {plan.featured ? (
                  <PillButton
                    tone="light"
                    className="w-full justify-between"
                    onClick={() => toast.success(`${plan.name} — ${t.contact.success}`)}
                  >
                    {plan.cta}
                  </PillButton>
                ) : (
                  <button
                    onClick={() => toast.success(`${plan.name} — ${t.contact.success}`)}
                    className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>

            <div
              className={cn(
                "mt-auto p-6",
                plan.featured ? "bg-brand-foreground/10" : "bg-surface-2/50",
              )}
            >
              <p className="text-sm font-medium">{t.pricing.features}</p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f.label}
                    className={cn(
                      "flex items-center justify-between gap-4 border-b pb-3 text-xs last:border-0 last:pb-0",
                      plan.featured ? "border-brand-foreground/20" : "border-border",
                    )}
                  >
                    <span
                      className={
                        plan.featured ? "text-brand-foreground/90" : "text-muted-foreground"
                      }
                    >
                      {f.label}
                    </span>
                    {f.included ? (
                      <Check
                        className={cn(
                          "size-3.5 shrink-0",
                          plan.featured ? "text-brand-foreground" : "text-brand",
                        )}
                      />
                    ) : (
                      <X className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
