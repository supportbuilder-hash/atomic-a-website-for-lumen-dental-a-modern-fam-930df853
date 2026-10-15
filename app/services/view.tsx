"use client";

// KIT PAGE (clinic) — FIXED FILE, do not edit. Copy: messages/<locale>.json "services.*";
// layout variant + images: content/pages.json "services".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import FAQ, { type FAQItem } from "@/components/blocks/FAQ";
import ProductGrid from "@/components/blocks/ProductGrid";
import { Section, SectionHeader } from "@/components/blocks/shared";
import { list, pageData, type Service } from "@/lib/content";
import { primaryCta } from "@/lib/data";

const LAYOUTS = {
  a: { services: "default", columns: 3, faq: "split", cta: "gradient" },
  b: { services: "compact", columns: 2, faq: "card", cta: "card" },
  c: { services: "overlay", columns: 3, faq: "simple", cta: "gradient" },
} as const;

export default function ServicesPage() {
  const t = useTranslations("services");
  const p = pageData("services");
  const l = LAYOUTS[p.variant];
  const services = list<Service>(t.raw("items")).map((s, i) => {
    const imageSlot = "items." + i;
    return {
      name: s.name,
      price: s.price,
      description: s.description,
      badge: s.duration,
      image: p.image(imageSlot, s.name),
    };
  });
  return (
    <main>
      <Section compact className="bg-muted/40">
        <SectionHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
      </Section>
      <ProductGrid products={services} columns={l.columns} variant={l.services} />
      <FAQ
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        items={list<FAQItem>(t.raw("faq.items"))}
        variant={l.faq}
      />
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        variant={l.cta}
      />
    </main>
  );
}
