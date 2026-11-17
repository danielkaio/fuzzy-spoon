import { Clock, HandCoins, Headset, Mail, ShieldCheck } from "lucide-react";
import { Eyebrow } from "./SectionHeader";
import { ProposalForm } from "./ProposalForm";
import { site } from "@/lib/site";

const confianca = [
  { icon: ShieldCheck, texto: "Seus dados estão seguros" },
  { icon: Clock, texto: "Resposta em até 2 horas" },
  { icon: HandCoins, texto: "Proposta sem compromisso" },
  { icon: Headset, texto: "Atendimento humanizado" },
];

export function ProposalSection() {
  return (
    <section
      id="proposta"
      aria-labelledby="proposta-titulo"
      className="bg-surface py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="reveal lg:sticky lg:top-28">
          <Eyebrow>Vamos começar</Eyebrow>
          <h2
            id="proposta-titulo"
            className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl"
          >
            Solicite sua proposta <span className="text-gradient">gratuitamente</span>
          </h2>
          <p className="mt-4 text-muted">
            Preencha o formulário e receba em até 2 horas uma proposta
            personalizada com valores, prazo e escopo completo.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {confianca.map(({ icon: Icon, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-muted">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                {texto}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-line bg-white p-5">
            <p className="text-sm text-muted">Prefere falar por e-mail?</p>
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
