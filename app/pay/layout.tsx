import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SITE_URL } from "@/lib/i18n";
import "../styles/site.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#04291c" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: [{ url: "/favicon.ico", sizes: "48x48" }, { url: "/img/favicon.png", type: "image/png", sizes: "192x192" }], apple: "/img/apple-touch-icon.png" },
  robots: { index: false, follow: false },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>{children}</body>
    </html>
  );
}
