import type { Metadata } from "next";
import { ArrowLeft, Calendar, CircleCheck, ShieldCheck } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Eyebrow } from "@/components/SectionHeader";
import { alternates, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/politica-privacidade-cookies">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale, "/politica-privacidade-cookies"),
  };
}

const indice = ["privacidade", "cookies", "direitos", "contato"] as const;

export default async function PoliticaPage() {
  const t = await getTranslations("Privacy");
  const lista = (chave: Parameters<typeof t.raw>[0]) => t.raw(chave) as string[];

  return (
    <>
      <Header variant="legal" />
      <main id="conteudo" className="bg-linear-to-b from-surface to-white">
        <section className="bg-hero relative overflow-hidden pb-14 pt-32 sm:pt-36">
          <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.85fr]">
            <div>
              <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-5 max-w-2xl text-white/70">{t("intro")}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4" aria-hidden />
                  {t("updated")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="size-4" aria-hidden />
                  {t("commitment")}
                </span>
              </div>
              <Link
                href="/"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t("back")}
              </Link>
            </div>

            <nav
              aria-label={t("tocTitle")}
              className="rounded-2xl border border-line/80 bg-white/95 p-7 shadow-2xl shadow-ink/20"
            >
              <h2 className="mb-3.5 font-bold text-fg">{t("tocTitle")}</h2>
              <ul className="flex flex-col gap-2">
                {indice.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block rounded-xl border border-transparent bg-surface px-3 py-2.5 text-fg transition hover:translate-x-0.5 hover:border-brand/20"
                    >
                      {t(`toc.${id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-6">
            <Artigo id="privacidade" titulo={t("privacidade.titulo")}>
              <p>{t("privacidade.p1")}</p>
              <p className="rounded-2xl border border-brand/15 bg-brand/[0.07] px-5 py-4 text-fg">
                {t("privacidade.destaque")}
              </p>

              <h3>{t("privacidade.coletaTitulo")}</h3>
              <Lista itens={lista("privacidade.coleta")} />

              <h3>{t("privacidade.usoTitulo")}</h3>
              <Lista itens={lista("privacidade.uso")} />

              <h3>{t("privacidade.compartilhamentoTitulo")}</h3>
              <p>{t("privacidade.compartilhamento")}</p>

              <h3>{t("privacidade.segurancaTitulo")}</h3>
              <p>{t("privacidade.seguranca")}</p>
            </Artigo>

            <Artigo id="cookies" titulo={t("cookies.titulo")}>
              <p>{t("cookies.p1")}</p>

              <h3>{t("cookies.tiposTitulo")}</h3>
              <ul>
                {(t.raw("cookies.tipos") as { termo: string; texto: string }[]).map(
                  ({ termo, texto }) => (
                    <li key={termo}>
                      <strong>{termo}</strong> {texto}
                    </li>
                  ),
                )}
              </ul>

              <h3>{t("cookies.terceirosTitulo")}</h3>
              <p>{t("cookies.terceiros")}</p>

              <h3>{t("cookies.gerenciarTitulo")}</h3>
              <p>{t("cookies.gerenciar")}</p>
            </Artigo>

            <Artigo id="direitos" titulo={t("direitos.titulo")}>
              <p>{t("direitos.p1")}</p>
              <Lista itens={lista("direitos.lista")} />
            </Artigo>

            <Artigo id="contato" titulo={t("contato.titulo")}>
              <p>
                {t.rich("contato.p1", {
                  email: () => (
                    <a
                      href={`mailto:${site.privacyEmail}`}
                      className="font-semibold text-brand-dark hover:underline"
                    >
                      {site.privacyEmail}
                    </a>
                  ),
                })}
              </p>
              <p>{t("contato.p2")}</p>
            </Artigo>
          </div>

          <aside className="rounded-2xl border border-line bg-white p-7 shadow-xl shadow-ink/5 lg:sticky lg:top-24">
            <h2 className="mb-3.5 font-bold text-fg">{t("summaryTitle")}</h2>
            <ul className="flex flex-col gap-3">
              {lista("summary").map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-muted">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <Footer compact />
    </>
  );
}

function Lista({ itens }: Readonly<{ itens: string[] }>) {
  return (
    <ul>
      {itens.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Artigo({
  id,
  titulo,
  children,
}: Readonly<{
  id: string;
  titulo: string;
  children: React.ReactNode;
}>) {
  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 text-muted shadow-[0_8px_28px_rgba(15,15,35,0.05)] sm:p-8 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-fg [&_li]:pl-1 [&_p]:mb-4 [&_strong]:text-fg [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5"
    >
      <h2 className="mb-4 text-2xl font-bold text-fg">{titulo}</h2>
      {children}
    </article>
  );
}
