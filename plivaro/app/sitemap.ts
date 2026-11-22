import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const paginas: {
  href: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { href: "/", lastModified: "2026-11-17", changeFrequency: "weekly", priority: 1 },
  {
    href: "/politica-privacidade-cookies",
    lastModified: "2026-06-28",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

const url = (locale: (typeof routing.locales)[number], href: string) =>
  SITE_URL + getPathname({ locale, href });

export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.flatMap(({ href, ...resto }) =>
    routing.locales.map((locale) => ({
      url: url(locale, href),
      ...resto,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, url(l, href)]),
        ),
      },
    })),
  );
}
