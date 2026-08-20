/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/i18n";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { MarqueeBands } from "@/components/site/marquee-bands";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Numbers } from "@/components/site/numbers";
import { Work } from "@/components/site/work";
import { Partners } from "@/components/site/partners";
import { Showreel } from "@/components/site/showreel";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
// import { Pricing } from "@/components/site/pricing";
import { ContactCta } from "@/components/site/contact-cta";
import { Footer } from "@/components/site/footer";

const title = "Infellian — Creative Digital Agency for Modern Brands";
const description =
  "Infellian is a creative digital agency crafting brand identity, websites, UI/UX and conversion systems for modern brands.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <MarqueeBands />
          <About />
          <Services />
          <Numbers />
          <Work />
          <Partners />
          <Showreel />
          <Testimonials />
          <Faq />
          {/* <Pricing /> */}
          <ContactCta />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
