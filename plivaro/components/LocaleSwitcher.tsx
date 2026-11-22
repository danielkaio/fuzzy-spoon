"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Leva para a mesma página no outro idioma.
 *
 * É um <a> comum de propósito: a troca de idioma recarrega a página inteira
 * (html lang, metadados, todos os textos) e começa do topo. Com <Link>, o
 * Next mantinha a página anterior escondida e às vezes abria rolada.
 */
export function LocaleSwitcher({ className = "" }: Readonly<{ className?: string }>) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const outro = locale === "pt-BR" ? "en" : "pt-BR";

  // O português não tem prefixo na URL, mas o link usa /pt-BR para o proxy
  // gravar a preferência no cookie antes de redirecionar para /.
  // (forcePrefix: false desligaria o prefixo /en, por isso só passa `true`.)
  const href = getPathname({
    locale: outro,
    href: pathname,
    ...(outro === routing.defaultLocale && { forcePrefix: true }),
  });

  return (
    <a
      href={href}
      hrefLang={outro}
      lang={outro}
      aria-label={t("ariaLabel")}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-2.5 py-1.5 text-xs font-bold tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white ${className}`}
    >
      <Globe className="size-3.5" aria-hidden />
      {t("label")}
    </a>
  );
}
