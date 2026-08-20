/* eslint-disable prettier/prettier */
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";
import c1 from "@/assets/cta-11.jpg";
import c2 from "@/assets/cta-22.jpg";
import c3 from "@/assets/cta-33.jpg";
import c4 from "@/assets/cta-44.jpg";
import c5 from "@/assets/cta-55.jpg";
import { useI18n } from "@/i18n/i18n";
import { submitContact } from "@/lib/contact-submit";
import { cn } from "@/lib/utils";

/**
 * Formats a raw digit string into the Uzbek phone format: +998 90 123 45 67.
 * Handles partial input gracefully so the user always sees a sensible mask.
 *
 * The +998 country code is "sticky": when the user backspaces down to it,
 * further backspaces do nothing (the prefix is preserved), and typing again
 * resumes from the operator code.
 */
function formatPhone(raw: string, prevRaw: string): string {
  // Keep only digits
  const digits = raw.replace(/\D/g, "");
  const prevDigits = prevRaw.replace(/\D/g, "");

  // If empty, return empty
  if (!digits) return "";

  // Detect whether the user is deleting (input shrank)
  const isDeleting = digits.length < prevDigits.length;

  // Normalize: if the user typed a leading 8 (common in CIS), convert to 998
  let d = digits;
  if (d.startsWith("8") && d.length >= 10) {
    d = "998" + d.slice(1);
  }

  // Keep the +998 prefix sticky while deleting — never drop below it
  if (isDeleting && d.length <= 3) {
    d = "998";
  } else if (!d.startsWith("998")) {
    // Only auto-prepend 998 when typing forward
    d = "998" + d;
  }

  // Build the formatted string progressively
  const country = d.slice(0, 3); // 998
  const operator = d.slice(3, 5); // 90
  const part1 = d.slice(5, 8); // 123
  const part2 = d.slice(8, 10); // 45
  const part3 = d.slice(10, 12); // 67

  let out = `+${country}`;
  if (operator) out += ` ${operator}`;
  if (part1) out += ` ${part1}`;
  if (part2) out += ` ${part2}`;
  if (part3) out += ` ${part3}`;
  return out;
}

/** Validates a formatted phone string: must be +998 XX XXX XX XX (12 digits). */
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("998");
}

export function ContactCta() {
  const { t, language } = useI18n();
  const ru = language === "ru";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContactFn = useServerFn(submitContact);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (website.trim()) {
      toast.error(t.contact.spamRejected);
      return;
    }

    if (!name.trim()) {
      toast.error(t.contact.invalidName);
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error(t.contact.invalidPhone);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactFn({
        data: {
          name,
          phone,
          website,
          language,
        },
      });

      toast.success(t.contact.success);
      setName("");
      setPhone("");
      setWebsite("");
    } catch (error) {
      const message = error instanceof Error ? error.message : t.contact.genericError;
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="shell relative">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className={cn("display", ru ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl")}>
            {t.contact.titleLine1}
            <br />
            {t.contact.titleLine2}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.contact.intro}
          </p>

          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 rounded-xl bg-surface p-1.5"
            noValidate
          >
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="cta-name">
                {t.contact.nameLabel}
              </label>
              <input
                id="cta-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.namePlaceholder}
                autoComplete="name"
                maxLength={80}
                disabled={isSubmitting}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
              />
            </div>
            <div className="flex items-center gap-2 border-t border-border/60 pt-1.5">
              <label className="sr-only" htmlFor="cta-phone">
                {t.contact.phoneLabel}
              </label>
              <input
                id="cta-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value, phone))}
                placeholder={t.contact.phonePlaceholder}
                autoComplete="tel"
                maxLength={18}
                disabled={isSubmitting}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t.contact.sending : t.contact.cta}
              </button>
            </div>
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
