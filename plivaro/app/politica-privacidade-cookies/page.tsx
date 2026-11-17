import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, CircleCheck, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Eyebrow } from "@/components/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade e Cookies",
  description: "Política de Privacidade e Cookies da Plivaro.",
  alternates: { canonical: "/politica-privacidade-cookies" },
};

const indice = [
  { href: "#privacidade", label: "Política de Privacidade" },
  { href: "#cookies", label: "Política de Cookies" },
  { href: "#direitos", label: "Seus direitos" },
  { href: "#contato", label: "Contato" },
];

const resumo = [
  "Usamos seus dados para contato, proposta e suporte.",
  "Cookies ajudam o site, a análise de tráfego e a publicidade.",
  "Você pode controlar cookies no seu navegador.",
  "Pedidos e dúvidas podem ser enviados por e-mail.",
];

export default function PoliticaPage() {
  return (
    <>
      <Header variant="legal" />
      <main id="conteudo" className="bg-linear-to-b from-surface to-white">
        <section className="bg-hero relative overflow-hidden pb-14 pt-32 sm:pt-36">
          <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.85fr]">
            <div>
              <Eyebrow tone="dark">Transparência e privacidade</Eyebrow>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
                Política de Privacidade e Cookies
              </h1>
              <p className="mt-5 max-w-2xl text-white/70">
                Esta página explica como a Plivaro coleta, usa, compartilha e
                protege dados pessoais ao receber pedidos de proposta, atender
                contatos e operar este site.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4" aria-hidden />
                  Última atualização: 28/06/2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="size-4" aria-hidden />
                  Compromisso com segurança e transparência
                </span>
              </div>
              <Link
                href="/"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Voltar para a página inicial
              </Link>
            </div>

            <nav
              aria-label="Nesta página"
              className="rounded-2xl border border-line/80 bg-white/95 p-7 shadow-2xl shadow-ink/20"
            >
              <h2 className="mb-3.5 font-bold text-fg">Nesta página</h2>
              <ul className="flex flex-col gap-2">
                {indice.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block rounded-xl border border-transparent bg-surface px-3 py-2.5 text-fg transition hover:translate-x-0.5 hover:border-brand/20"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-6">
            <Artigo id="privacidade" titulo="1. Política de Privacidade">
              <p>
                A Plivaro respeita a sua privacidade e trata dados pessoais
                apenas para finalidades legítimas, informadas e compatíveis com
                a relação que você mantém conosco.
              </p>
              <p className="rounded-2xl border border-brand/15 bg-brand/[0.07] px-5 py-4 text-fg">
                Quando você preenche o formulário de proposta ou entra em
                contato, usamos as informações para responder sua solicitação,
                montar a proposta comercial e dar continuidade ao atendimento.
              </p>

              <h3>Dados que podemos coletar</h3>
              <ul>
                <li>Nome, empresa, e-mail, telefone e mensagem enviados nos formulários do site.</li>
                <li>Dados de navegação, como endereço IP, navegador, páginas acessadas, tempo de visita e origem do acesso.</li>
                <li>Identificadores de cookies e eventos de medição, quando habilitados no navegador.</li>
              </ul>

              <h3>Como usamos essas informações</h3>
              <ul>
                <li>Responder contatos, enviar propostas e prestar suporte.</li>
                <li>Melhorar a experiência de navegação, desempenho do site e qualidade do conteúdo.</li>
                <li>Medir campanhas, conversões e desempenho de anúncios e analytics.</li>
                <li>Proteger o site contra fraude, abuso e uso indevido.</li>
              </ul>

              <h3>Compartilhamento</h3>
              <p>
                Podemos compartilhar dados com fornecedores que nos ajudam a
                operar o site e o atendimento, como serviços de hospedagem,
                e-mail, análise de tráfego, publicidade e automação. Quando isso
                acontece, exigimos que esses parceiros tratem os dados com
                segurança e apenas para a finalidade contratada.
              </p>

              <h3>Armazenamento e segurança</h3>
              <p>
                Adotamos medidas técnicas e administrativas razoáveis para
                proteger as informações contra acesso não autorizado, alteração,
                divulgação ou destruição indevida. Mantemos os dados pelo tempo
                necessário para cumprir as finalidades desta política,
                obrigações legais e defesa de direitos.
              </p>
            </Artigo>

            <Artigo id="cookies" titulo="2. Política de Cookies">
              <p>
                Cookies são pequenos arquivos gravados no seu navegador para que
                o site funcione corretamente, lembre preferências e ajude a
                medir o uso da página.
              </p>

              <h3>Tipos de cookies que podem ser usados</h3>
              <ul>
                <li><strong>Essenciais:</strong> necessários para navegação, segurança e funcionamento de formulários.</li>
                <li><strong>Desempenho:</strong> ajudam a entender como os visitantes usam o site para melhorar conteúdo e velocidade.</li>
                <li><strong>Funcionais:</strong> lembram preferências e tornam a experiência mais prática.</li>
                <li><strong>Publicidade e medição:</strong> podem ser usados por ferramentas como Google Analytics, Google Ads e serviços semelhantes.</li>
              </ul>

              <h3>Ferramentas de terceiros</h3>
              <p>
                Este site pode usar ferramentas de terceiros para análise de
                acesso e anúncios, incluindo scripts de medição e publicidade.
                Esses serviços podem definir cookies próprios para medir
                resultados e melhorar a relevância de campanhas.
              </p>

              <h3>Como gerenciar cookies</h3>
              <p>
                Você pode bloquear, apagar ou configurar cookies diretamente nas
                preferências do seu navegador. Ao desativar cookies essenciais,
                algumas partes do site podem não funcionar corretamente.
              </p>
            </Artigo>

            <Artigo id="direitos" titulo="3. Seus direitos">
              <p>
                Você pode solicitar, conforme aplicável, informações sobre os
                dados tratados e exercer direitos relacionados ao seu uso.
              </p>
              <ul>
                <li>Confirmação da existência de tratamento.</li>
                <li>Acesso, correção e atualização de dados.</li>
                <li>Solicitação de exclusão, limitação ou oposição ao tratamento, quando cabível.</li>
                <li>Revogação de consentimento, quando o tratamento depender dessa base legal.</li>
              </ul>
            </Artigo>

            <Artigo id="contato" titulo="4. Contato">
              <p>
                Para dúvidas, solicitações ou exercício de direitos relacionados
                a esta política, fale com a Plivaro pelo e-mail{" "}
                <a
                  href={`mailto:${site.privacyEmail}`}
                  className="font-semibold text-brand-dark hover:underline"
                >
                  {site.privacyEmail}
                </a>
                .
              </p>
              <p>
                Podemos atualizar este documento periodicamente para refletir
                mudanças no site, em ferramentas utilizadas ou em exigências
                legais. Recomendamos revisar esta página de tempos em tempos.
              </p>
            </Artigo>
          </div>

          <aside className="rounded-2xl border border-line bg-white p-7 shadow-xl shadow-ink/5 lg:sticky lg:top-24">
            <h2 className="mb-3.5 font-bold text-fg">Resumo rápido</h2>
            <ul className="flex flex-col gap-3">
              {resumo.map((item) => (
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
