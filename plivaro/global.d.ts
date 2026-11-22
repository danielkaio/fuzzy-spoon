import type { routing } from "@/i18n/routing";
import type messages from "@/messages/pt-BR.json";

// Dá autocomplete e checagem de tipo às chaves de tradução.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
