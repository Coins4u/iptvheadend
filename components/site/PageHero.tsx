import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl, localePath, type Locale } from "@/lib/i18n";
import JsonLd from "./JsonLd";

export type Crumb = { label: string; path?: string };

type Props = {
  locale: Locale;
  homeLabel: string;
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

export default function PageHero({ locale, homeLabel, crumbs, kicker, title, lead, children }: Props) {
  const all: Crumb[] = [{ label: homeLabel, path: "" }, ...crumbs];
  return (
    <section className="hx-page-hero">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.path !== undefined ? { item: absoluteUrl(locale, c.path) } : {}),
          })),
        }}
      />
      <div className="hx-container">
        <nav className="hx-crumbs" aria-label="Breadcrumb">
          <ol>
            {all.map((c, i) =>
              i === all.length - 1 || c.path === undefined ? (
                <li key={i} aria-current="page">
                  {c.label}
                </li>
              ) : (
                <li key={i}>
                  <Link href={localePath(locale, c.path)}>{c.label}</Link>
                </li>
              ),
            )}
          </ol>
        </nav>
        {kicker && (
          <p className="hx-kicker" style={{ marginTop: 22 }}>
            {kicker}
          </p>
        )}
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
        {children}
      </div>
    </section>
  );
}
