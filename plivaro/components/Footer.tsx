import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const navegacao = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#proposta", label: "Fale conosco" },
];

const servicos = [
  "Landing Page",
  "Hotsite de Evento",
  "Integração com APIs",
  "Hospedagem & Deploy",
];

export function Footer({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-brand to-transparent opacity-70"
      />

      {!compact && (
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_1fr_1fr_1.3fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              Transformando ideias em páginas que vendem. Landing pages e
              hotsites de alta conversão com integração de APIs e automações.
            </p>
          </div>

          <FooterCol title="Navegação">
            {navegacao.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Serviços">
            {servicos.map((s) => (
              <li key={s}>
                <Link href="/#servicos" className="footer-link">
                  {s}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Contato">
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-brand" aria-hidden />
              <a
                href={`mailto:${site.contactEmail}`}
                className="break-all text-white/75 transition-colors hover:text-white"
              >
                {site.contactEmail}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden />
              {site.location}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0 text-brand" aria-hidden />
              {site.hours}
            </li>
          </FooterCol>
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-[0.82rem] text-white/50 sm:flex-row sm:px-6 sm:text-left">
          <p>
            © 2026 <strong className="text-white/75">Plivaro</strong>. Todos os
            direitos reservados.
          </p>
          <div className="flex items-center gap-2.5">
            <Link
              href="/politica-privacidade-cookies#privacidade"
              className="transition-colors hover:text-white"
            >
              Política de Privacidade
            </Link>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <Link
              href="/politica-privacidade-cookies#cookies"
              className="transition-colors hover:text-white"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h2 className="mb-4 font-bold text-white">{title}</h2>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}
