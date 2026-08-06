/* eslint-disable prettier/prettier */
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Logo } from "./primitives";
import { useI18n } from "@/i18n/i18n";

type IconProps = { className?: string };

function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.58 4.61-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.16-.04.25z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socials = [
  { Icon: TelegramIcon, label: "Telegram", href: "https://t.me/infellian" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/infellian" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/company/infellian" },
];

export function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error(t.footer.invalidEmail);
      return;
    }
    toast.success(t.footer.subscribed);
    setEmail("");
  };

  return (
    <footer className="shell pt-16 pb-8">
      <div className="flex flex-wrap justify-between gap-12">
        <div>
          <Logo className="w-[170px] md:w-[200px]" />
          <p className="mt-6 text-lg leading-snug font-medium">
            {t.footer.newsletterTitleLine1}
            <br />
            {t.footer.newsletterTitleLine2}
          </p>
          <form
            onSubmit={subscribe}
            className="mt-4 flex max-w-xs items-center gap-1.5 rounded-lg bg-surface p-1.5"
          >
            <label className="sr-only" htmlFor="footer-email">
              {t.footer.emailLabel}
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.footer.emailPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-xs outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground"
            >
              {t.footer.subscribe}
            </button>
          </form>
        </div>

        <div>
          <a href="tel:+998974249484" className="block text-sm font-medium hover:text-brand transition-colors">
            +998 (97) 424-94-84
          </a>
          <a href="mailto:infellian@gmail.com" className="mt-2 block text-sm font-medium hover:text-brand transition-colors">
            infellian@gmail.com
          </a>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{t.footer.followUs}</span>
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-foreground/80 transition-colors hover:text-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 text-center sm:text-left text-xs text-muted-foreground">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
