import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { SectionLabel } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const items = t.testimonials.items;
  const [page, setPage] = useState(0);

  // 5 partner items paired into 2-card slides
  const totalPages = Math.ceil(items.length / 2);
  const currentPair = [items[(page * 2) % items.length]!, items[(page * 2 + 1) % items.length]!];

  const move = (dir: 1 | -1) => {
    setPage((p) => (p + dir + totalPages) % totalPages);
  };

  return (
    <section id="testimonials" className="shell scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <SectionLabel>{t.testimonials.label}</SectionLabel>
          <h2
            className={cn(
              "display tracking-wide",
              ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
            )}
          >
            {t.testimonials.titleLine1}
            <br />
            {t.testimonials.titleLine2}
          </h2>
        </div>
        <div className="flex flex-col justify-between gap-6 lg:items-end">
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:ml-auto">
            {t.testimonials.intro}
          </p>

          {/* Swiper Navigation & Pagination Dots */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setPage(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    page === dotIdx ? "w-6 bg-brand" : "w-2 bg-border hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => move(-1)}
                aria-label={t.testimonials.prev}
                className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-all hover:border-brand hover:bg-surface-2"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                onClick={() => move(1)}
                aria-label={t.testimonials.next}
                className="grid size-11 place-items-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Card Grid Layout (5 Real Partner Testimonials) */}
      <div className="relative mt-12 overflow-hidden">
        <div
          key={page}
          className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-right-4 duration-300"
        >
          {currentPair.map((active, i) => (
            <div
              key={active.company + i}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface/70 p-6 md:p-8 backdrop-blur transition-all duration-300 hover:border-brand/40 hover:bg-surface hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold tracking-wide text-foreground">
                    {active.company}
                  </span>
                  <Quote className="size-6 text-brand/30 transition-colors group-hover:text-brand" />
                </div>
                <span className="my-5 block h-px w-full bg-border/60" />
                <blockquote className="text-sm leading-relaxed text-foreground/90 italic md:text-base">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={starIdx} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {active.company} loyihasi
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid divide-border sm:grid-cols-3 sm:divide-x">
        {t.testimonials.stats.map((s, i) => (
          <div key={s.label} className="px-6 py-4 text-center">
            <p className="display text-4xl">{["100%", "50+", "3X"][i]}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
