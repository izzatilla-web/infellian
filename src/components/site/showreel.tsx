import { useState } from "react";
import { Play, X } from "lucide-react";
import cover from "@/assets/video-cover.svg";
import { Logo } from "./primitives";
import { useI18n } from "@/i18n/i18n";

export function Showreel() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <section className="shell py-10 md:py-16">
      <div className="flex items-center justify-between gap-6">
        <p className="hidden text-4xl font-semibold md:block">© 2026</p>

        <div className="relative w-full overflow-hidden rounded-2xl md:max-w-2xl">
          <img
            src={cover}
            alt={t.showreel.imageAlt}
            width={1200}
            height={700}
            loading="lazy"
            className="aspect-[12/7] w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Logo />
          </div>
          <button
            onClick={() => setOpen(true)}
            aria-label={t.showreel.play}
            className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
          >
            <Play className="size-5 fill-current" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-foreground py-1.5 pr-1.5 pl-4 text-xs font-medium text-background"
          >
            {t.showreel.label}
            <span className="grid size-7 place-items-center rounded-full bg-brand">
              <Play className="size-3 fill-current text-brand-foreground" />
            </span>
          </button>
        </div>

        <p className="hidden text-4xl font-semibold md:block">Infellian</p>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={t.showreel.close}
              className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-background/80 text-foreground"
            >
              <X className="size-4" />
            </button>
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
              title={t.showreel.frameTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
