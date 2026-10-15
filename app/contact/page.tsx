"use client";

// Contact page — full content inlined so the route is self-contained.
// Copy: messages/<locale>.json "contact.*"; layout variant: content/pages.json "contact".
import { useTranslations } from "next-intl";
import ContactForm from "@/components/blocks/ContactForm";
import { Section } from "@/components/blocks/shared";
import { list, pageData, type Detail } from "@/lib/content";

const LAYOUTS = { a: "split", b: "card", c: "simple" } as const;

export default function ContactPage() {
  const t = useTranslations("contact");
  const p = pageData("contact");
  const details = list<Detail>(t.raw("form.details"));
  const hoursDetail = details.find((d) => d.label.toLowerCase() === "hours");

  return (
    <main>
      <ContactForm
        id="contact"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        nameLabel={t("form.nameLabel")}
        emailLabel={t("form.emailLabel")}
        messageLabel={t("form.messageLabel")}
        submitLabel={t("form.submitLabel")}
        successMessage={t("form.successMessage")}
        details={details}
        variant={LAYOUTS[p.variant]}
      />
      <Section className="bg-muted/30">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-foreground">Office Hours</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {hoursDetail?.value ?? "Mon–Thu 8am–6pm · Fri 8am–3pm · Sat 9am–1pm"}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Closed Sundays and major holidays. Same-day emergency slots are reserved every weekday.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-foreground">Insurance &amp; Payment</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We accept most major dental insurance plans and offer flexible payment plans for larger treatments.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Delta Dental", "Cigna", "Aetna", "MetLife", "CareCredit", "HSA / FSA"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
