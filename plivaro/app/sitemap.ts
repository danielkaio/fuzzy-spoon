import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-11-17",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/politica-privacidade-cookies`,
      lastModified: "2026-06-28",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
