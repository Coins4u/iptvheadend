import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Outfit } from "next/font/google";
import JsonLd from "@/components/site/JsonLd";
import { LOCALES, LOCALE_META, SITE_NAME, SITE_URL, SUPPORT_EMAIL, absoluteUrl, isLocale } from "@/lib/i18n";
import "../styles/site.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04291c",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: { icon: "/img/favicon.png", apple: "/img/favicon.png" },
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION in the hosting env to verify Search Console via meta tag.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={LOCALE_META[lang].htmlLang}>
      <body className={outfit.variable}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
                logo: `${SITE_URL}/img/logo-mark.png`,
                email: SUPPORT_EMAIL,
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: SUPPORT_EMAIL,
                  availableLanguage: ["English", "French", "German", "Italian", "Dutch", "Portuguese"],
                },
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: absoluteUrl(lang),
                inLanguage: LOCALE_META[lang].htmlLang,
                publisher: { "@id": `${SITE_URL}/#organization` },
              },
            ],
          }}
        />
        {children}
      </body>
    </html>
  );
}
