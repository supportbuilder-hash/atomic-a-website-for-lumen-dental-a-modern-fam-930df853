"use client";

// KIT PAGE (clinic) — FIXED FILE, do not edit. Copy: messages/<locale>.json "home.*";
// layout variant + images: content/pages.json "home".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Hero from "@/components/blocks/Hero";
import StatsBand, { type StatItem } from "@/components/blocks/StatsBand";
import Testimonials, { type TestimonialItem } from "@/components/blocks/Testimonials";
import { list, pageData, type Feature } from "@/lib/content";
import { primaryCta } from "@/lib/data";

const LAYOUTS = {
  a: { hero: "mesh", services: "glass", stats: "primary", testimonials: "glass", cta: "gradient" },
  b: { hero: "background", services: "list", stats: "glass", testimonials: "single", cta: "card" },
  c: { hero: "centered", services: "minimal", stats: "plain", testimonials: "masonry", cta: "split" },
} as const;

export default function HomePage() {
  const t = useTranslations("home");
  const p = pageData("home");
  const l = LAYOUTS[p.variant];
  const heroImage = p.image("hero", t("hero.title"));
  return (
    <main>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={{ label: t("hero.cta"), href: "/contact" }}
        secondaryCta={{ label: t("hero.secondaryCta"), href: "/services" }}
        image={heroImage}
        variant={l.hero}
      />
      <p className="mx-auto max-w-2xl px-6 pb-10 text-center text-base font-medium text-primary md:text-lg">
        {t("hero.reassurance")}
      </p>
      <FeatureGrid
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        items={list<Feature>(t.raw("services.items"))}
        variant={l.services}
      />
      <StatsBand items={list<StatItem>(t.raw("stats"))} variant={l.stats} />
      <Testimonials
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        items={list<TestimonialItem>(t.raw("testimonials.items"))}
        variant={l.testimonials}
      />
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        image={heroImage}
        variant={l.cta}
      />
    </main>
  );
}
