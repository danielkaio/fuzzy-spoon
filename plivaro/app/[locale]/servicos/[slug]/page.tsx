import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Send,
  Target,
} from "lucide-react";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Process } from "@/components/Process";
import { ProposalSection } from "@/components/ProposalSection";
import { destaque } from "@/components/RichText";
import { SectionHeader } from "@/components/SectionHeader";
import { alternates, getPathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  findService,
  SITE_URL,
  serviceHref,
  services,
  site,
  type Service,
} from "@/lib/site";

// Todas as páginas de serviço são geradas no build; qualquer outro slug vira 404.
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/servicos/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = findService(slug);
  if (!hasLocale(routing.locales, locale) || !service) return {};

  const t = await getTranslations({ locale, namespace: "ServicePage" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const title = t(`items.${service.key}.metaTitle`);
  const description = t(`items.${service.key}.metaDescription`);
  const links = alternates(locale, serviceHref(service));

  return {
    title,
    description,
    alternates: links,
    openGraph: {
      type: "website",
      locale: tMeta("ogLocale"),
      siteName: site.name,
      title,
      description,
      url: links.canonical,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

type Params = PageProps<"/[locale]/servicos/[slug]">["params"];
type Beneficio = { titulo: string; texto: string };
type Pergunta = { pergunta: string; resposta: string };

// `params` é dado da URL: lê-lo fora de <Suspense> amarraria o shell da rota
// (compartilhado por todos os serviços) a um único endereço e impediria a
// navegação instantânea. Por isso só os blocos específicos de cada serviço
// esperam `params`; o resto da página fica no shell.
export default function ServicoPage({
  params,
}: PageProps<"/[locale]/servicos/[slug]">) {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Suspense fallback={<TopoPlaceholder />}>
          <ServicoTopo params={params} />
        </Suspense>

        <Process />

        <Suspense>
          <ServicoFinal params={params} />
        </Suspense>

        <ProposalSection />
      </main>
      <Footer />
    </>
  );
}

async function resolverServico(params: Params): Promise<Service> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  return service;
}

const corDoServico = (service: Service) =>
  ({ "--c": service.color }) as React.CSSProperties;

/** Topo, itens inclusos, benefícios e dados estruturados. */
async function ServicoTopo({ params }: Readonly<{ params: Params }>) {
  const service = await resolverServico(params);
  const { key, icon: Icon } = service;
  const locale = await getLocale();
  const t = await getTranslations("ServicePage");
  const tServices = await getTranslations("Services");

  const nome = tServices(`items.${key}.title`);
  const destaques = tServices.raw(`items.${key}.lista`) as string[];
  const incluso = t.raw(`items.${key}.incluso`) as string[];
  const beneficios = t.raw(`items.${key}.beneficios`) as Beneficio[];
  const idealPara = t.raw(`items.${key}.idealPara`) as string[];
  const faq = t.raw(`items.${key}.faq`) as Pergunta[];
  const garantias = t.raw("garantias") as string[];

  const url = (href: string) => SITE_URL + getPathname({ locale, href });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: nome,
        description: t(`items.${key}.metaDescription`),
        url: url(serviceHref(service)),
        areaServed: "BR",
        provider: {
          "@type": "ProfessionalService",
          name: site.name,
          url: url("/"),
          email: site.contactEmail,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: t("breadcrumb.home"), item: url("/") },
          { name: t("breadcrumb.services"), item: url("/#servicos") },
          { name: nome, item: url(serviceHref(service)) },
        ].map((item, i) => ({ "@type": "ListItem", position: i + 1, ...item })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ pergunta, resposta }) => ({
          "@type": "Question",
          name: pergunta,
          acceptedAnswer: { "@type": "Answer", text: resposta },
        })),
      },
    ],
  };

  return (
    <div style={corDoServico(service)}>
      <section
        aria-labelledby="servico-titulo"
        className="bg-hero relative overflow-hidden pb-20 pt-32 sm:pt-36"
      >
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <nav aria-label={t("breadcrumb.ariaLabel")}>
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
                <li className="flex items-center gap-1.5">
                  <Link href="/" className="transition-colors hover:text-white">
                    {t("breadcrumb.home")}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden />
                </li>
                <li className="flex items-center gap-1.5">
                  <Link href="/#servicos" className="transition-colors hover:text-white">
                    {t("breadcrumb.services")}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden />
                </li>
                <li aria-current="page" className="font-medium text-white/85">
                  {nome}
                </li>
              </ol>
            </nav>

            <span className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white">
              <span className="grid size-7 place-items-center rounded-full bg-(--c) text-white">
                <Icon className="size-4" aria-hidden />
              </span>
              {nome}
            </span>

            <h1
              id="servico-titulo"
              className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
            >
              {t.rich(`items.${key}.headline`, { destaque })}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/65">
              {t(`items.${key}.intro`)}
            </p>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <a
                href="#proposta"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
              >
                <Send className="size-4" aria-hidden />
                {t("ctaPrimary")}
              </a>
              <Link
                href="/#servicos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white p-7 shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-muted">
              {t("destaquesTitulo")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {destaques.map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold text-fg">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--c)_12%,transparent)] text-(--c)">
                    <Check className="size-4" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="mt-7 border-t border-line pt-6 text-sm font-bold uppercase tracking-[0.1em] text-muted">
              {t("garantiasTitulo")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {garantias.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-muted">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* O que está incluso */}
      <section aria-labelledby="incluso-titulo" className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            id="incluso-titulo"
            label={t("inclusoLabel")}
            title={t("inclusoTitle")}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {incluso.map((item) => (
              <li
                key={item}
                className="reveal flex gap-3 rounded-2xl border border-line bg-white p-5 text-[0.95rem] font-medium text-fg"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-(--c)" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefícios e público */}
      <section aria-labelledby="beneficios-titulo" className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            id="beneficios-titulo"
            label={t("beneficiosLabel")}
            title={t("beneficiosTitle")}
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {beneficios.map(({ titulo, texto }, i) => (
              <li key={titulo} className="reveal rounded-2xl border border-line bg-white p-7">
                <span className="text-sm font-extrabold text-(--c)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-fg">{titulo}</h3>
                <p className="mt-2.5 text-[0.92rem] text-muted">{texto}</p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-6 rounded-2xl border border-line bg-white p-7 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-fg">
              <Target className="size-5 text-(--c)" aria-hidden />
              {t("idealTitulo")}
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {idealPara.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-muted">
                  <CircleCheck className="size-4 shrink-0 text-teal" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

/** Perguntas frequentes e links para os demais serviços. */
async function ServicoFinal({ params }: Readonly<{ params: Params }>) {
  const service = await resolverServico(params);
  const { key } = service;
  const t = await getTranslations("ServicePage");
  const tServices = await getTranslations("Services");
  const faq = t.raw(`items.${key}.faq`) as Pergunta[];
  const outros = services.filter((s) => s.key !== key);

  return (
    <div style={corDoServico(service)}>
      <section aria-labelledby="faq-titulo" className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeader id="faq-titulo" label={t("faqLabel")} title={t("faqTitle")} />
          <div className="flex flex-col gap-3">
            {faq.map(({ pergunta, resposta }) => (
              <details
                key={pergunta}
                className="reveal group rounded-2xl border border-line bg-white open:border-brand/25 open:shadow-[0_12px_40px_rgba(108,99,255,0.10)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-fg [&::-webkit-details-marker]:hidden">
                  {pergunta}
                  <ChevronDown
                    className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="px-6 pb-6 text-muted">{resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="outros-titulo" className="border-t border-line py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            id="outros-titulo"
            label={t("outrosLabel")}
            title={t("outrosTitle")}
            description={t("outrosDescription")}
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {outros.map((outro) => {
              const OutroIcon = outro.icon;
              return (
                <li key={outro.key} className="reveal">
                  <Link
                    href={serviceHref(outro)}
                    style={corDoServico(outro)}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_12px_40px_rgba(108,99,255,0.14)]"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--c)_12%,transparent)] text-(--c)">
                      <OutroIcon className="size-5" aria-hidden />
                    </span>
                    <span className="mt-4 font-bold text-fg">
                      {tServices(`items.${outro.key}.title`)}
                    </span>
                    <span className="mb-4 mt-2 text-sm text-muted">
                      {tServices(`items.${outro.key}.description`)}
                    </span>
                    <ArrowRight
                      className="mt-auto size-4 self-end text-(--c) transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

/** Ocupa o espaço do topo enquanto o conteúdo do serviço chega na navegação. */
function TopoPlaceholder() {
  return (
    <section aria-hidden className="bg-hero relative overflow-hidden pb-20 pt-32 sm:pt-36">
      <div className="bg-grid absolute inset-0" />
      <div className="relative mx-auto grid min-h-[26rem] max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="flex animate-pulse flex-col gap-5">
          <div className="h-4 w-48 rounded bg-white/10" />
          <div className="h-8 w-40 rounded-full bg-white/10" />
          <div className="h-12 w-full max-w-lg rounded-lg bg-white/15" />
          <div className="h-12 w-3/4 max-w-md rounded-lg bg-white/15" />
          <div className="h-5 w-full max-w-xl rounded bg-white/10" />
          <div className="h-5 w-2/3 max-w-md rounded bg-white/10" />
        </div>
        <div className="hidden h-80 animate-pulse rounded-2xl bg-white/10 lg:block" />
      </div>
    </section>
  );
}
