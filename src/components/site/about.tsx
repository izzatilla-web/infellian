import teamImg from "/logo.png";
import { PillButton, SectionLabel } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

export function About() {
  const { t, language } = useI18n();
  const ru = language === "ru";

  return (
    <section id="about" className="shell scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="flex flex-col gap-4">
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2
              className={cn(
                "display tracking-wide",
                ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
              )}
            >
              {t.about.titleLine1}
              <br />
              {t.about.titleLine2}
            </h2>
          </div>

          <div className="mt-10 flex gap-16">
            <div>
              <p className="display text-4xl">
                {t.about.stat1Value}
                <span className="text-brand">+</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.about.stat1LabelLine1}
                <br />
                {t.about.stat1LabelLine2}
              </p>
            </div>
            <div>
              <p className="display text-4xl">
                {t.about.stat2Value}
                <span className="text-brand">+</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.about.stat2LabelLine1}
                <br />
                {t.about.stat2LabelLine2}
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.about.copy}
          </p>

          <PillButton className="mt-8">{t.about.cta}</PillButton>
        </div>

        <div className="relative">
          <img
            src={teamImg}
            alt={t.about.imageAlt}
            width={1000}
            height={1000}
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover lg:aspect-auto lg:h-full lg:max-h-[30rem]"
          />
        </div>
      </div>
    </section>
  );
}
