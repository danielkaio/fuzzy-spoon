import { SectionHeader } from "./SectionHeader";
import { steps } from "@/lib/site";

export function Process() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="processo-titulo"
      className="relative overflow-hidden bg-ink py-24 sm:py-28"
    >
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="processo-titulo"
          tone="dark"
          label="Processo"
          title="Como funciona"
          description="Do briefing ao ar em 5 passos simples."
        />

        <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Linha que conecta os passos */}
          <span
            aria-hidden
            className="absolute bottom-6 left-[1.625rem] top-6 w-px bg-linear-to-b from-brand via-brand/40 to-transparent lg:inset-x-[10%] lg:bottom-auto lg:top-[1.625rem] lg:h-px lg:w-auto lg:bg-linear-to-r"
          />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              <span className="relative z-10 grid size-13 shrink-0 place-items-center rounded-full bg-brand text-lg font-extrabold text-white ring-8 ring-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 lg:pt-0">
                <h3 className="font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/55">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 text-center">
          <a
            href="#proposta"
            className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
          >
            Começar pelo passo 1
          </a>
        </div>
      </div>
    </section>
  );
}
