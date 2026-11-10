import type { Locale } from "@/lib/i18n";
import type { Dict, LegalDoc } from "@/content/types";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import PageHero from "./PageHero";
import { rich } from "./Rich";

export default function LegalPage({
  locale,
  dict,
  doc,
  path,
}: {
  locale: Locale;
  dict: Dict;
  doc: LegalDoc;
  path: string;
}) {
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path={path} />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[{ label: doc.title, path }]}
          title={doc.title}
          lead={rich(doc.intro, locale)}
        />
        <section className="hx-section">
          <div className="hx-container">
            <div className="hx-prose hx-legal">
              {doc.sections.map((s) => (
                <section key={s.h}>
                  <h2>{s.h}</h2>
                  {s.p.map((p, i) => (
                    <p key={i} style={{ marginTop: 14 }}>
                      {rich(p, locale)}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} path={path} />
    </>
  );
}
