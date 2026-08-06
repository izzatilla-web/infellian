import heroImg from "@/assets/hero2.jpg";
import { PillButton, Seal } from "./primitives";
import { useI18n } from "@/i18n/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      {/* soft smoke wash behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[36rem] w-[120%] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 30% 40%, oklch(0.30 0 0) 0%, transparent 70%), radial-gradient(50% 45% at 78% 55%, oklch(0.27 0 0) 0%, transparent 72%)",
        }}
      />

      <div className="shell relative">
        <div className="grid items-end gap-8">
          <div className="lg:col-span-8">
            {/* <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                {[t1, t2, t3].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Infellian client"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="size-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                  <span className="ml-1 text-xs text-foreground">5.0</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  From 4,000+ reviews
                </p>
              </div>
            </div> */}

            <h1 className="display text-[13vw] leading-[1.16] tracking-wide sm:text-[9vw] lg:text-[4.6rem] lg:whitespace-nowrap">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <PillButton
              className="mt-6"
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t.hero.cta}
            </PillButton>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={heroImg}
              alt={t.hero.imageAlt}
              width={1600}
              height={1008}
              className="aspect-[16/10] w-full object-cover"
            />
            <svg
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 w-full px-2 sm:px-4 opacity-60"
              viewBox="0 0 1000 210"
            >
              <text
                x="50%"
                y="90%"
                textAnchor="middle"
                className="display fill-foreground/20 text-[220px] font-normal uppercase"
                textLength="98%"
                lengthAdjust="spacingAndGlyphs"
              >
                Infellian
              </text>
            </svg>
          </div>
          <Seal className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 md:-top-10" />
        </div>
      </div>
    </section>
  );
}
