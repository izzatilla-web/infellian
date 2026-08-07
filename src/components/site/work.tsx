/* eslint-disable prettier/prettier */
import { useState } from "react";
import { X } from "lucide-react";
import w1 from "@/assets/project-1.jpg";
import w2 from "@/assets/project-2.jpg";
import w3 from "@/assets/project-3.jpg";
import w4 from "@/assets/project-4.jpg";
import w5 from "@/assets/project-5.jpg";
import { PillButton, Seal } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Project = {
  img: string;
  title: string;
  tags: string[];
  ratio: string;
  seal?: boolean;
};

export function Work() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const tags = t.work.tags;
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      img: w1,
      title: "Robivox",
      tags: [tags.uiUxDesign, tags.branding, tags.webDevelopment],
      ratio: "aspect-[4/3]",
    },
    {
      img: w2,
      title: "SAMUR Group",
      tags: [tags.productDesign, tags.motion, tags.webDevelopment],
      ratio: "aspect-[4/3]",
    },
    {
      img: w3,
      title: "SEO Computer",
      tags: [tags.webDevelopment, tags.visualIdentity],
      ratio: "aspect-[16/9]",
      seal: true,
    },
    {
      img: w4,
      title: "Family West",
      tags: [tags.productDesign, tags.webDevelopment, tags.artDirection],
      ratio: "aspect-[4/3]",
    },
    {
      img: w5,
      title: "BIG Corporation INDUSTRY",
      tags: [tags.brandDevelopment, tags.webDevelopment, tags.webIdentity],
      ratio: "aspect-square",
    },
  ];

  function Card({ project, className }: { project: Project; className?: string }) {
    return (
      <article className={cn("group", className)}>
        <button
          type="button"
          onClick={() => setSelected(project)}
          className="relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left"
          aria-label={`Open ${project.title} preview`}
        >
          <img
            src={project.img}
            alt={project.title}
            width={1600}
            height={1200}
            loading="lazy"
            className={cn(
              "w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
              project.ratio,
            )}
          />
          {project.seal ? (
            <Seal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          ) : null}
        </button>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-medium transition-colors group-hover:text-brand">
          {project.title}
        </h3>
      </article>
    );
  }

  return (
    <section id="work" className="shell scroll-mt-24 py-16 md:py-24">
      <div className="flex items-start justify-center gap-2">
        <h2
          className={cn(
            "display text-center tracking-wide",
            ru ? "text-5xl md:text-6xl" : "max-[400px]:text-5xl text-6xl md:text-7xl",
          )}
        >
          {t.work.title}
        </h2>
        <span className={`eyebrow ${ru && "max-sm:hidden"}`}>{t.work.eyebrow}</span>
      </div>

      <div className="mt-14 space-y-14">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <Card project={projects[0]!} className="md:pr-6" />
          <Card project={projects[1]!} className="md:mt-10" />
        </div>

        <Card project={projects[2]!} />

        <div className="grid items-start gap-8 md:grid-cols-[1.35fr_1fr]">
          <Card project={projects[3]!} className="md:mt-10" />
          <Card project={projects[4]!} />
        </div>
      </div>

      <div className="mt-14 flex justify-center">
        <PillButton>{t.work.viewAll}</PillButton>
      </div>

      {/* Full-screen project lightbox */}
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="left-0 top-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center gap-0 rounded-none border-0 bg-black/95 p-4 sm:rounded-none sm:p-6">
          {selected ? (
            <>
              <DialogClose className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>

              <img
                src={selected.img}
                alt={selected.title}
                width={1600}
                height={1200}
                className="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-xl object-contain"
              />

              <div className="mt-4 text-center">
                <DialogTitle className="display font-medium! text-2xl text-white sm:text-3xl">
                  {selected.title}
                </DialogTitle>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {selected.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
