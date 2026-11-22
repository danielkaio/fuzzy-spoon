import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: localeExplicito }) => {
  // Quem passa o idioma explicitamente (ex.: imagem Open Graph) não precisa
  // ler o parâmetro da rota; o resto vem do segmento app/[locale].
  const candidato = localeExplicito ?? (await rootLocale());
  const locale = hasLocale(routing.locales, candidato)
    ? candidato
    : routing.defaultLocale;

  return {
    locale,
    timeZone: "America/Sao_Paulo",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
