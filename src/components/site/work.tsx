/* eslint-disable prettier/prettier */
import w1 from "@/assets/project-1.jpg";
import w2 from "@/assets/project-2.jpg";
import w3 from "@/assets/project-3.jpg";
import w4 from "@/assets/project-4.jpg";
import w5 from "@/assets/project-5.jpg";
import w6 from "@/assets/project-6.png";
import w1ru from "@/assets/project-1-ru.jpg";
import w2ru from "@/assets/project-2-ru.jpg";
import w3ru from "@/assets/project-3-ru.jpg";
import w4ru from "@/assets/project-4-ru.jpg";
import w5ru from "@/assets/project-5-ru.jpg";
import w6ru from "@/assets/project-6-ru.jpg";
import w1en from "@/assets/project-1-en.jpg";
import w2en from "@/assets/project-2-en.jpg";
import w3en from "@/assets/project-3-en.jpg";
import w4en from "@/assets/project-4-en.jpg";
import w5en from "@/assets/project-5-en.jpg";
import w6en from "@/assets/project-6-en.jpg";
import { PillButton, Seal } from "./primitives";
import { useI18n } from "@/i18n/i18n";
import { cn } from "@/lib/utils";

type Project = {
  img: string;
  title: string;
  tags: string[];
  ratio: string;
  seal?: boolean;
  url: string;
};

export function Work() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const tags = t.work.tags;

  const projects: Project[] = [
    {
      img: ru ? w1ru : language === "en" ? w1en : w1,
      title: "Robivox",
      tags: [tags.uiUxDesign, tags.branding, tags.webDevelopment],
      ratio: "",
      url: "http://robivox.ru/",
    },
    {
      img: ru ? w2ru : language === "en" ? w2en : w2,
      title: "SAMUR Group",
      tags: [tags.productDesign, tags.motion, tags.webDevelopment],
      ratio: "",
      url: "https://samur.group/",
    },
    {
      img: ru ? w3ru : language === "en" ? w3en : w3,
      title: "SEO Computer",
      tags: [tags.webDevelopment, tags.visualIdentity],
      ratio: "",
      seal: false,
      url: "https://seo.computer/en",
    },
    {
      img: ru ? w4ru : language === "en" ? w4en : w4,
      title: "Family Nest",
      tags: [tags.productDesign, tags.webDevelopment, tags.artDirection],
      ratio: "",
      url: "https://invest.familynest.com/",
    },
    {
      img: ru ? w5ru : language === "en" ? w5en : w5,
      title: "BIG Corporation INDUSTRY",
      tags: [tags.brandDevelopment, tags.webDevelopment, tags.webIdentity],
      ratio: "",
      url: "https://aobig.ru/",
    },
       {
      img: ru ? w6ru : language === "en" ? w6en : w6,
      title: "edu.infellian",
      tags: [tags.brandDevelopment, tags.webDevelopment, tags.webIdentity, tags.uiUxDesign],
      ratio: "",
      url: "https://edu.infellian.com/",
    },
  ];

  function Card({ project, className }: { project: Project; className?: string }) {
    return (
      <article className={cn("group", className)}>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full cursor-pointer overflow-hidden rounded-2xl text-left"
          aria-label={`Open ${project.title} website`}
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
        </a>
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
        <div className="grid items-start gap-8 md:grid-cols-3">
          <Card project={projects[0]!} className="md:pr-6" />
          <Card project={projects[1]!} className="md:mt-10" />
          <Card project={projects[2]!} />
        </div>

        {/* <Card project={projects[2]!} /> */}

        <div className="grid items-start gap-8 md:grid-cols-[1fr_1fr_1fr]">
          <Card project={projects[3]!} className="" />
          <Card project={projects[4]!} className="md:mt-10" />
          <Card project={projects[5]!} />
        </div>
      </div>

      <div className="mt-14 flex justify-center">
        <PillButton>{t.work.viewAll}</PillButton>
      </div>
    </section>
  );
}
