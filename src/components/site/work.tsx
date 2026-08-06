import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import { PillButton, Seal } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

type Project = {
  img: string;
  title: string;
  tags: string[];
  ratio: string;
  seal?: boolean;
};

export function Work() {
  const { t } = useI18n();
  const tags = t.work.tags;

  const projects: Project[] = [
    {
      img: w1,
      title: "Oria Production",
      tags: [tags.uiUxDesign, tags.branding, tags.studioDesign],
      ratio: "aspect-[4/3]",
    },
    {
      img: w2,
      title: "Orbit Foundry",
      tags: [tags.productDesign, tags.motion, tags.strategy],
      ratio: "aspect-[4/3]",
    },
    {
      img: w3,
      title: "Brand Circuit",
      tags: [tags.artDirection, tags.websiteDesign, tags.visualIdentity],
      ratio: "aspect-[16/9]",
      seal: true,
    },
    {
      img: w4,
      title: "Quiet Method",
      tags: [tags.productDesign, tags.webDevelopment, tags.artDirection],
      ratio: "aspect-[4/3]",
    },
    {
      img: w5,
      title: "Union North",
      tags: [tags.brandDevelopment, tags.ecommerceSystems, tags.webIdentity],
      ratio: "aspect-square",
    },
  ];

  function Card({ project, className }: { project: Project; className?: string }) {
    return (
      <article className={cn("group", className)}>
        <div className="relative overflow-hidden rounded-2xl">
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
        </div>
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
        <h2 className="display text-center tracking-wide text-6xl md:text-7xl">{t.work.title}</h2>
        <span className="eyebrow">{t.work.eyebrow}</span>
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
    </section>
  );
}
