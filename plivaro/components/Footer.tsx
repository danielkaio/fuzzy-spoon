import { Clock, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { serviceHref, services, site } from "@/lib/site";

const navegacao = [
  { href: "/#servicos", key: "servicos" },
  { href: "/#como-funciona", key: "comoFunciona" },
  { href: "/#depoimentos", key: "depoimentos" },
  { href: "/#proposta", key: "faleConosco" },
] as const;


export function Footer({ compact = false }: Readonly<{ compact?: boolean }>) {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tSite = useTranslations("Site");

  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-brand to-transparent opacity-70"
      />

      {!compact && (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 pb-12 pt-14 sm:px-6 sm:pt-16 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1.3fr] lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              {t("about")}
            </p>
          </div>

          <FooterCol title={t("navTitle")}>
            {navegacao.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link py-1">
                  {tNav(l.key)}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title={t("servicesTitle")}>
            {services.map((s) => (
              <li key={s.key}>
                <Link href={serviceHref(s)} className="footer-link py-1">
                  {t(`servicos.${s.key}`)}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title={t("contactTitle")} className="col-span-2 md:col-span-1">
            <li className="flex items-center gap-3 py-1">
              <Mail className="size-4 shrink-0 text-brand" aria-hidden />
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-white/75 transition-colors wrap-anywhere hover:text-white"
              >
                {site.contactEmail}
              </a>
            </li>
            <li className="flex items-center gap-3 py-1">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden />
              {tSite("location")}
            </li>
            <li className="flex items-center gap-3 py-1">
              <Clock className="size-4 shrink-0 text-brand" aria-hidden />
              {tSite("hours")}
            </li>
          </FooterCol>
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-[0.82rem] text-white/50 sm:flex-row sm:px-6 sm:text-left">
          <p>
            {t.rich("copyright", { strong: negrito })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5">
            <Link
              href="/politica-privacidade-cookies#privacidade"
              className="py-1 transition-colors hover:text-white"
            >
              {t("privacy")}
            </Link>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <Link
              href="/politica-privacidade-cookies#cookies"
              className="py-1 transition-colors hover:text-white"
            >
              {t("cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const negrito = (chunks: React.ReactNode) => (
  <strong className="text-white/75">{chunks}</strong>
);

function FooterCol({
  title,
  className = "",
  children,
}: Readonly<{
  title: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className={className}>
      <h2 className="mb-3 font-bold text-white">{title}</h2>
      <ul className="flex flex-col gap-1.5 text-sm">{children}</ul>
    </div>
  );
}
