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
  icons: { icon: "/img/favicon.png" },
  robots: { index: false, follow: false },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>{children}</body>
    </html>
  );
}
