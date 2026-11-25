import {
  ArrowRight,
  CircleCheck,
  MailCheck,
  Send,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { destaque } from "./RichText";

/** <br></br> do título: só quebra a linha a partir do breakpoint sm. */
const quebra = () => <br className="hidden sm:block" />;

const garantias = ["contrato", "entrega", "suporte"] as const;

const stats = [
  { valor: "98%", key: "aprovacao" },
  { valor: "5d", key: "entrega" },
  { valor: "24/7", key: "suporte" },
] as const;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-titulo"
      className="bg-hero relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32"
    >
      <div aria-hidden className="bg-grid absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/15 px-3.5 py-1.5 text-sm font-semibold text-brand-light">
            <Zap className="size-4 fill-current" aria-hidden />
            {t("badge")}
          </span>

          <h1
            id="hero-titulo"
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {t.rich("title", { br: quebra, destaque })}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65 lg:mx-0">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row lg:justify-start">
            <a
              href="#proposta"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
            >
              <Send className="size-4" aria-hidden />
              {t("ctaPrimary")}
            </a>
            <a
              href="#como-funciona"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              {t("ctaSecondary")}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60 lg:justify-start">
            {garantias.map((g) => (
              <li key={g} className="flex items-center gap-1.5">
                <CircleCheck className="size-4 text-teal" aria-hidden />
                {t(`garantias.${g}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup ilustrativo */}
        <div aria-hidden className="relative hidden lg:block">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.45)] [transform:perspective(1000px)_rotateY(-6deg)_rotateX(2deg)]">
            <div className="flex items-center gap-1.5 bg-[#1e1e2e] px-3.5 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2.5 rounded bg-white/10 px-2.5 py-0.5 text-[0.7rem] text-white/50">
                {t("mockup.url")}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-4 rounded-xl bg-linear-to-br from-brand to-[#3b37ce] p-5">
                <span className="inline-block rounded-full bg-white/15 px-2 py-0.5 text-xs text-white">
                  {t("mockup.aprovada")}
                </span>
                <div className="mt-3 h-3.5 w-[70%] rounded-md bg-white/70" />
                <div className="mt-2 h-2.5 w-[90%] rounded-md bg-white/40" />
                <div className="mt-2 h-2.5 w-[60%] rounded-md bg-white/30" />
                <div className="mt-4 h-7 w-[40%] rounded-md bg-white/90" />
              </div>
              <div className="flex gap-3">
                {stats.map((s) => (
                  <div
                    key={s.key}
                    className="flex-1 rounded-lg bg-surface p-2.5 text-center"
                  >
                    <span className="block text-lg font-extrabold text-brand">
                      {s.valor}
                    </span>
                    <span className="text-[0.7rem] text-muted">
                      {t(`mockup.stats.${s.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -left-5 bottom-10 flex animate-float items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#00897a] shadow-xl">
            <MailCheck className="size-4" />
            {t("mockup.emailEnviado")}
          </div>
          <div className="absolute -right-3 top-5 flex animate-float items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#e04848] shadow-xl [animation-delay:1.5s]">
            <TrendingUp className="size-4" />
            {t("mockup.conversao")}
          </div>
        </div>
      </div>
    </section>
  );
}
