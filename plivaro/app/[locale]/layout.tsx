import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { alternates } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL, site } from "@/lib/site";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const links = alternates(locale, "/");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | Plivaro",
    },
    description: t("description"),
    alternates: links,
    openGraph: {
      type: "website",
      locale: t("ogLocale"),
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      url: links.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f0f23",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Layout");
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${jakarta.variable} antialiased`}>
      <body className="min-h-dvh font-sans leading-relaxed">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-fg focus:shadow-lg"
        >
          {t("skipToContent")}
        </a>
        {/* Só os textos usados por componentes de cliente vão para o navegador. */}
        <NextIntlClientProvider
          messages={{
            Logo: messages.Logo,
            LocaleSwitcher: messages.LocaleSwitcher,
            Nav: messages.Nav,
            Header: messages.Header,
            Form: messages.Form,
          }}
        >
          {children}
        </NextIntlClientProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
        </Script>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
