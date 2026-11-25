import { Clock, HandCoins, Headset, Mail, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./SectionHeader";
import { ProposalForm } from "./ProposalForm";
import { destaque } from "./RichText";
import { site } from "@/lib/site";

const confianca = [
  { icon: ShieldCheck, key: "seguranca" },
  { icon: Clock, key: "resposta" },
  { icon: HandCoins, key: "compromisso" },
  { icon: Headset, key: "atendimento" },
] as const;

export function ProposalSection() {
  const t = useTranslations("Proposal");

  return (
    <section
      id="proposta"
      aria-labelledby="proposta-titulo"
      className="bg-surface py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="reveal lg:sticky lg:top-28">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            id="proposta-titulo"
            className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl"
          >
            {t.rich("title", { destaque })}
          </h2>
          <p className="mt-4 text-muted">{t("description")}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {confianca.map(({ icon: Icon, key }) => (
              <li key={key} className="flex items-center gap-3 text-muted">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                {t(`confianca.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-line bg-white p-5">
            <p className="text-sm text-muted">{t("emailPrompt")}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-1 inline-flex items-center gap-2 break-all font-semibold text-brand-dark hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {site.contactEmail}
            </a>
          </div>
        </div>

        <ProposalForm />
      </div>
    </section>
  );
}
