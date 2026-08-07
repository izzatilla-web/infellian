import { SectionLabel } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

export function Numbers() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const stats = [
    {
      value: "50",
      suffix: "+",
      label: t.numbers.stats[0]!.label,
      copy: t.numbers.stats[0]!.copy,
    },
    {
      value: "100",
      suffix: "%",
      label: t.numbers.stats[1]!.label,
      copy: t.numbers.stats[1]!.copy,
    },
    {
      value: "4",
      suffix: "+",
      label: t.numbers.stats[2]!.label,
      copy: t.numbers.stats[2]!.copy,
    },
    {
      value: "5",
      suffix: "+",
      label: t.numbers.stats[3]!.label,
      copy: t.numbers.stats[3]!.copy,
    },
  ];

  return (
    <section
      id="numbers"
      className="relative scroll-mt-24 overflow-hidden pb-20 pt-24 md:pt-32 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-full w-[80%] opacity-15"
        style={{
          background: "radial-gradient(45% 60% at 70% 30%, oklch(0.32 0 0) 0%, transparent 70%)",
        }}
      />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionLabel>{t.numbers.label}</SectionLabel>
            <h2
              className={cn(
                "display tracking-wide",
                ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
              )}
            >
              {t.numbers.titleLine1}
              <br />
              {t.numbers.titleLine2}
            </h2>
          </div>
          <p className="flex flex-col justify-center max-w-sm text-sm leading-relaxed text-muted-foreground lg:ml-auto">
            <span className="text-foreground">{t.numbers.introBold}</span> {t.numbers.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-border/60 pt-6">
              <p className="display text-5xl">
                {s.value}
                <span className="text-brand">{s.suffix}</span>
              </p>
              <p className="mt-3 font-medium text-foreground">{s.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
