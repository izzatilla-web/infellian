/* eslint-disable prettier/prettier */
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";
import c1 from "@/assets/cta-11.jpg";
import c2 from "@/assets/cta-22.jpg";
import c3 from "@/assets/cta-33.jpg";
import c4 from "@/assets/cta-44.jpg";
import c5 from "@/assets/cta-55.jpg";
import { useI18n } from "@/i18n/i18n";

export function ContactCta() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error(t.contact.invalidEmail);
      return;
    }
    toast.success(t.contact.success);
    setEmail("");
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="shell relative">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="display text-5xl md:text-6xl">
            {t.contact.titleLine1}
            <br />
            {t.contact.titleLine2}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.contact.intro}
          </p>

          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-xl bg-surface p-1.5"
          >
            <label className="sr-only" htmlFor="cta-email">
              {t.contact.emailLabel}
            </label>
            <input
              id="cta-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.contact.placeholder}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              {t.contact.cta}
            </button>
          </form>
        </div>

        {/* floating gallery */}
        <img
          src={c1}
          alt=""
          width={700}
          height={900}
          loading="lazy"
          className="absolute top-0 left-0 hidden w-28 rotate-[-4deg] rounded-xl object-cover lg:block"
        />
        <img
          src={c2}
          alt=""
          width={700}
          height={900}
          loading="lazy"
          className="absolute top-2 right-0 hidden w-28 rotate-[4deg] rounded-xl object-cover lg:block"
        />
        <img
          src={c3}
          alt=""
          width={700}
          height={900}
          loading="lazy"
          className="absolute -bottom-12 left-[2%] hidden w-32 rounded-xl object-cover lg:block"
        />
        <img
          src={c4}
          alt=""
          width={700}
          height={700}
          loading="lazy"
          className="absolute -bottom-20 left-[22%] hidden w-20 rounded-lg object-cover lg:block"
        />
        <img
          src={c5}
          alt=""
          width={700}
          height={900}
          loading="lazy"
          className="absolute right-[3%] -bottom-16 hidden w-32 rounded-xl object-cover lg:block"
        />
      </div>

      <div className="mt-32 overflow-hidden py-4 md:mt-40">
        <div className="animate-marquee flex w-max items-center py-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-6 text-4xl leading-normal md:text-5xl md:leading-normal py-2">
                {t.contact.marquee}
              </span>
              <Asterisk className="size-6 text-brand" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
