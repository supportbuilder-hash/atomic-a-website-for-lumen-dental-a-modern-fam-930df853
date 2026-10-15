"use client";

// KIT PAGE (clinic) — FIXED FILE, do not edit. Copy: messages/<locale>.json "team.*";
// layout variant + images: content/pages.json "team".
import { useTranslations } from "next-intl";
import CTA from "@/components/blocks/CTA";
import { BlockImg, Section, SectionHeader } from "@/components/blocks/shared";
import { Card } from "@/components/ui/card";
import { list, pageData, type Member } from "@/lib/content";
import { primaryCta } from "@/lib/data";
import { cn } from "@/lib/utils";

const LAYOUTS = {
  a: { grid: "sm:grid-cols-2 lg:grid-cols-3", image: "aspect-[4/5] w-full", row: false, cta: "gradient" },
  b: { grid: "sm:grid-cols-2 lg:grid-cols-4", image: "aspect-square w-full", row: false, cta: "card" },
  c: { grid: "md:grid-cols-2", image: "h-28 w-28 shrink-0 rounded-full", row: true, cta: "gradient" },
} as const;

export default function TeamPage() {
  const t = useTranslations("team");
  const p = pageData("team");
  const l = LAYOUTS[p.variant];
  const members = list<Member>(t.raw("members"));
  return (
    <main>
      <Section>
        <SectionHeader eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
        <div className={cn("grid gap-6", l.grid)}>
          {members.map((m, i) => {
            const imageSlot = "members." + i;
            const image = p.image(imageSlot, m.name);
            return (
              <Card key={i} className={cn("overflow-hidden", l.row && "flex items-center gap-5 p-5")}>
                {image && <BlockImg image={image} className={l.image} />}
                <div className={cn(!l.row && "p-5")}>
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm font-medium text-primary">{m.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
      <CTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={{ label: t("cta.button"), href: primaryCta.href }}
        variant={l.cta}
      />
    </main>
  );
}
