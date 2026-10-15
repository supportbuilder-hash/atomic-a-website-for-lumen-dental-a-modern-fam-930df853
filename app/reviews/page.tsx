"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, Quote, MessageCircle, Check } from 'lucide-react';
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RatingBreakdownItem = { stars: number; percentage: number };
type TestimonialItem = {
  quote: string;
  name: string;
  service: string;
  rating: number;
  date: string;
};

const RATING_BREAKDOWN_PERCENTAGES = [82, 12, 4, 1, 1];
const RATING_BREAKDOWN: RatingBreakdownItem[] = [5, 4, 3, 2, 1].map((stars, i) => ({
  stars,
  percentage: RATING_BREAKDOWN_PERCENTAGES[i] ?? 0,
}));

const OVERALL_RATING = 4.9;
const TOTAL_REVIEWS = 312;

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRow({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.round(rating) ? "fill-primary text-primary" : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ReviewsPage() {
  const t = useTranslations();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const testimonials = (
    Array.isArray(t.raw("reviewsPage.testimonials.items"))
      ? t.raw("reviewsPage.testimonials.items")
      : []
  ) as TestimonialItem[];

  return (
    <main>
      {/* Hero */}
      <Reveal id="hero">
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-8 md:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              {t("reviewsPage.hero.eyebrow")}
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t("reviewsPage.hero.title")}{" "}
              <span className="text-gradient">{t("reviewsPage.hero.titleAccent")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("reviewsPage.hero.subtitle")}
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <StarRow rating={5} />
              <span className="text-sm font-medium text-foreground">
                {t("reviewsPage.hero.ratingLine", { rating: OVERALL_RATING, count: TOTAL_REVIEWS })}
              </span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Ratings summary */}
      <Reveal id="ratings-summary">
        <section className="border-t border-border bg-background">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-28">
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("reviewsPage.ratingsSummary.eyebrow")}
              </span>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl font-semibold tracking-tight text-foreground">
                  {OVERALL_RATING}
                </span>
                <span className="text-lg text-muted-foreground">/ 5</span>
              </div>
              <StarRow rating={OVERALL_RATING} className="mt-3 scale-125 origin-left" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t("reviewsPage.ratingsSummary.summary", { count: TOTAL_REVIEWS })}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.stars} className="flex items-center gap-4">
                  <span className="w-12 shrink-0 text-sm font-medium text-foreground">
                    {t("reviewsPage.ratingsSummary.starsLabel", { stars: row.stars })}
                  </span>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.percentage}%` }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-sm text-muted-foreground">
                    {row.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Testimonials grid */}
      <Reveal id="testimonials-grid">
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("reviewsPage.testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("reviewsPage.testimonials.title")}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {t("reviewsPage.testimonials.subtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3"
            >
              {testimonials.map((item, i) => (
                <motion.div
                  key={`${item.name}-${i}`}
                  variants={cardMotion}
                  onMouseEnter={() => setHoveredId(i)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "surface-elevated mb-6 inline-block w-full break-inside-avoid rounded-xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none",
                    hoveredId === i && "shadow-glow"
                  )}
                >
                  <Quote className="h-5 w-5 text-primary/60" aria-hidden="true" />
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <StarRow rating={item.rating} className="mt-4" />
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                      aria-hidden="true"
                    >
                      {initialsFromName(item.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.service} &middot; {item.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal id="cta">
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 md:py-24">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-brand px-8 py-14 text-center shadow-glow sm:px-16">
              <h2 className="mx-auto max-w-xl text-balance font-display text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                {t("reviewsPage.cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-primary-foreground/85">
                {t("reviewsPage.cta.subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none sm:w-auto"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {t("reviewsPage.cta.primaryButton")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-primary-foreground/30 bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary-foreground/10 motion-reduce:transition-none sm:w-auto"
                >
                  {t("reviewsPage.cta.secondaryButton")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}