import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { testimonial } from "@/lib/site";

export function Testimonial() {
  const t = useTranslations("Testimonial");

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="bg-linear-to-b from-surface to-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="depoimentos-titulo"
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />

        <figure className="reveal relative mx-auto mt-20 max-w-3xl rounded-3xl border border-line bg-white px-6 pb-10 pt-14 text-center shadow-[0_12px_40px_rgba(108,99,255,0.12)] sm:px-12">
          <div className="absolute -top-8 left-1/2 grid size-16 -translate-x-1/2 place-items-center rounded-full bg-linear-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/40">
            <Quote className="size-7 fill-current" aria-hidden />
          </div>

          <div
            className="mb-6 inline-flex gap-1 text-gold"
            role="img"
            aria-label={t("rating")}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-5 fill-current" aria-hidden />
            ))}
          </div>

          <blockquote className="space-y-4 text-lg leading-8 text-fg">
            {(t.raw("paragraphs") as string[]).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </blockquote>

          <figcaption className="mt-8 inline-flex items-center gap-3.5 border-t border-line pt-6 text-left">
            <span className="grid size-13 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">
              {testimonial.initials}
            </span>
            <span>
              <strong className="block text-fg">{testimonial.author}</strong>
              <span className="block text-sm text-muted">{t("role")}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
