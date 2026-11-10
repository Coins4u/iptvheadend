import type { Locale } from "@/lib/i18n";
import type { FaqItem } from "@/content/types";
import JsonLd from "./JsonLd";
import { plain, rich } from "./Rich";

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  };
}

export default function FaqList({
  items,
  locale,
  schema = false,
  openFirst = false,
}: {
  items: FaqItem[];
  locale: Locale;
  schema?: boolean;
  openFirst?: boolean;
}) {
  return (
    <div className="hx-faq">
      {schema && <JsonLd data={faqJsonLd(items)} />}
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0}>
          <summary>{f.q}</summary>
          <div className="hx-faq__a">{rich(f.a, locale)}</div>
        </details>
      ))}
    </div>
  );
}
