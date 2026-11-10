import type { Metadata } from "next";
import { getDict } from "@/content";
import { localePath, pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import FaqList, { faqJsonLd } from "@/components/site/FaqList";
import JsonLd from "@/components/site/JsonLd";
import Icon from "@/components/site/Icon";
import { rich } from "@/components/site/Rich";

const PATH = "/faq";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale).faqPage;
  return pageMetadata({ locale, path: PATH, title: d.meta.title, description: d.meta.description });
}

export default async function FaqPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  const f = dict.faqPage;
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path={PATH} active="faq" />
      <JsonLd data={faqJsonLd(f.groups.flatMap((g) => g.items))} />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[{ label: dict.nav.faq, path: PATH }]}
          kicker={f.kicker}
          title={f.title}
          lead={rich(f.lead, locale)}
        >
          <nav className="hx-jump" aria-label={f.kicker}>
            {f.groups.map((g, i) => (
              <a key={g.title} href={`#faq-${i + 1}`}>
                {g.title}
              </a>
            ))}
          </nav>
        </PageHero>
        <section className="hx-section hx-section--alt">
          <div className="hx-container">
            {f.groups.map((g, i) => (
              <div key={g.title} id={`faq-${i + 1}`} className="hx-faq-group">
                <h2>{g.title}</h2>
                <FaqList items={g.items} locale={locale} />
              </div>
            ))}
          </div>
        </section>
        <section className="hx-section">
          <div className="hx-container">
            <div className="hx-cta">
              <div>
                <h2>{f.stillTitle}</h2>
                <p>{f.stillText}</p>
              </div>
              <div className="hx-cta__btns">
                <a href={localePath(locale, "/contact")} className="hx-btn hx-btn--bright">
                  {dict.common.contactUs} <Icon name="arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} path={PATH} />
    </>
  );
}
