import { SectionLabel } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

const partnerLogos = [
  { name: "Robivox", src: "/robivox.png" },
  { name: "Samur", src: "/samur.png" },
  { name: "SEO Logo", src: "/seo_logo.svg" },
  { name: "Aobig", src: "/aobig.svg" },
  { name: "FamilyNest", src: "/familynest.png" },
];

export function Partners() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  // Duplicate array for smooth seamless infinite scrolling
  const carouselItems = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2
              className={cn(
                "display tracking-wide",
                ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
              )}
            >
              {t.partners.titleLine1}
              <br />
              {t.partners.titleLine2}
            </h2>
          </div>
          <p className="flex max-w-sm items-center text-sm leading-relaxed text-muted-foreground lg:ml-auto">
            {t.partners.copy}
          </p>
        </div>
      </div>

      {/* Infinite Marquee Carousel with Fog Overlays */}
      <div className="group relative mt-12 overflow-hidden py-4">
        {/* Left Fog/Mist Fade Overlay */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background via-background/80 to-transparent md:w-48" />

        {/* Right Fog/Mist Fade Overlay */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background via-background/80 to-transparent md:w-48" />

        <div className="flex w-max">
          <div className="animate-marquee flex w-max items-center gap-12 md:gap-16 group-hover:[animation-play-state:paused]">
            {carouselItems.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.name}
                width={200}
                height={60}
                loading="lazy"
                className="h-14 w-auto max-w-[200px] shrink-0 object-contain grayscale opacity-60 brightness-150 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:brightness-100 hover:grayscale-0 md:h-16 md:max-w-[240px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
