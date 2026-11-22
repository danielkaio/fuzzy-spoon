import { createNavigation } from "next-intl/navigation";
import { routing, type Locale } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/** Canonical e hreflang de uma página em todos os idiomas. */
export function alternates(locale: Locale, href: string) {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href })]),
  );
  languages["x-default"] = getPathname({ locale: routing.defaultLocale, href });
  return { canonical: getPathname({ locale, href }), languages };
}
