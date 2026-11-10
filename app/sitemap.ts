import type { MetadataRoute } from "next";
import { getPosts } from "@/content";
import { LOCALES, absoluteUrl, languageAlternates } from "@/lib/i18n";

const PAGES: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, freq: "daily" },
  { path: "/channels", priority: 0.8, freq: "weekly" },
  { path: "/guide", priority: 0.8, freq: "monthly" },
  { path: "/faq", priority: 0.8, freq: "monthly" },
  { path: "/blog", priority: 0.7, freq: "weekly" },
  { path: "/contact", priority: 0.5, freq: "yearly" },
  { path: "/TermsConditions", priority: 0.2, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/RefundPolicy", priority: 0.2, freq: "yearly" },
];

const SITE_UPDATED = new Date("2026-11-08");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = LOCALES.flatMap((locale) =>
    PAGES.map((p) => ({
      url: absoluteUrl(locale, p.path),
      lastModified: SITE_UPDATED,
      changeFrequency: p.freq,
      priority: locale === "en" ? p.priority : Math.max(0.1, +(p.priority - 0.1).toFixed(1)),
      alternates: { languages: languageAlternates(p.path) },
    })),
  );
  const posts = LOCALES.flatMap((locale) =>
    getPosts(locale).map((post) => ({
      url: absoluteUrl(locale, `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );
  return [...pages, ...posts];
}
