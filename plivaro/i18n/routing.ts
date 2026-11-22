import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "en"],
  defaultLocale: "pt-BR",
  // Português continua na raiz (/, /politica-privacidade-cookies);
  // inglês ganha o prefixo /en.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
