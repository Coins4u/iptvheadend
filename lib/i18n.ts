import type { Metadata } from "next";

export const SITE_URL = "https://iptvheadend.net";
export const SITE_NAME = "IPTV Headend";
export const WHATSAPP_URL = "https://wa.me/17624385265";
export const SUPPORT_EMAIL = "support@iptvheadend.net";
export const OG_IMAGE = `${SITE_URL}/img/og-image.jpg`;

export const LOCALES = ["en", "fr", "de", "it", "nl", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  { label: string; short: string; htmlLang: string; ogLocale: string; dateLocale: string }
> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US", dateLocale: "en-GB" },
  fr: { label: "Français", short: "FR", htmlLang: "fr", ogLocale: "fr_FR", dateLocale: "fr-FR" },
  de: { label: "Deutsch", short: "DE", htmlLang: "de", ogLocale: "de_DE", dateLocale: "de-DE" },
  it: { label: "Italiano", short: "IT", htmlLang: "it", ogLocale: "it_IT", dateLocale: "it-IT" },
  nl: { label: "Nederlands", short: "NL", htmlLang: "nl", ogLocale: "nl_NL", dateLocale: "nl-NL" },
  pt: { label: "Português", short: "PT", htmlLang: "pt-PT", ogLocale: "pt_PT", dateLocale: "pt-PT" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Public URL path for a page in a locale. English lives at the root (no /en prefix). */
export function localePath(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  const p = localePath(locale, path);
  return p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

/** hreflang map for a page that exists in every locale. */
export function languageAlternates(path = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[LOCALE_META[l].htmlLang] = absoluteUrl(l, path);
  out["x-default"] = absoluteUrl(DEFAULT_LOCALE, path);
  return out;
}

type PageMetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** false for pages that only exist in one language (blog posts) */
  translated?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  translated = true,
  type = "website",
  noindex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(translated ? { languages: languageAlternates(path) } : {}),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: LOCALE_META[locale].ogLocale,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
