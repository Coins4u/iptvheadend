import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { localePath, type Locale } from "@/lib/i18n";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function renderLink(label: string, href: string, locale: Locale, key: number): ReactNode {
  if (href.startsWith("/")) {
    const [path, hash] = href.split("#");
    const target = localePath(locale, path === "/" ? "" : path) + (hash ? `#${hash}` : "");
    return (
      <Link key={key} href={target}>
        {label}
      </Link>
    );
  }
  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

/** Renders **bold** and [label](href) inline markup. Internal hrefs are locale-prefixed. */
export function rich(text: string, locale: Locale): ReactNode {
  const parts = text.split(TOKEN);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (m) return renderLink(m[1], m[2], locale, i);
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Plain-text version (for JSON-LD / meta). */
export function plain(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export default function Rich({ text, locale }: { text: string; locale: Locale }) {
  return <>{rich(text, locale)}</>;
}
