import { Asterisk } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

function Row({ className, reverse }: { className?: string; reverse?: boolean }) {
  const { t } = useI18n();
  const items = t.marquee.items;

  return (
    <div className={className}>
      <div className="flex w-max">
        <div
          className={
            reverse
              ? "animate-marquee-rev flex w-max items-center"
              : "animate-marquee flex w-max items-center"
          }
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-5 py-4 text-lg font-semibold md:text-2xl">{item}</span>
              <Asterisk className="size-6 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MarqueeBands() {
  return (
    <div className="relative my-10 h-44 overflow-hidden md:my-20 md:h-52">
      <Row
        className="absolute inset-x-[-6%] top-8 -rotate-3 bg-brand text-brand-foreground"
        reverse
      />
      <Row className="absolute inset-x-[-6%] top-20 rotate-3 bg-foreground text-background md:top-24" />
    </div>
  );
}
