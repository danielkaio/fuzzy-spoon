import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tudo, menos a API, arquivos internos do Next/Vercel e arquivos com
  // extensão (icon.svg, robots.txt, sitemap.xml...).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
