import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Mantém funcionando os links do site estático anterior.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/politica-privacidade-cookies.html",
        destination: "/politica-privacidade-cookies",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
