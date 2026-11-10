import type { Metadata } from "next";
import { getDict } from "@/content";
import { SUPPORT_EMAIL, WHATSAPP_URL, localePath, pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import Icon from "@/components/site/Icon";
import { rich } from "@/components/site/Rich";

const PATH = "/contact";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale).contact;
  return pageMetadata({ locale, path: PATH, title: d.meta.title, description: d.meta.description });
}

export default async function ContactPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  const c = dict.contact;
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path={PATH} active="contact" />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[{ label: dict.nav.contact, path: PATH }]}
          kicker={c.kicker}
          title={c.title}
          lead={rich(c.lead, locale)}
        />
        <section className="hx-section hx-section--alt">
          <div className="hx-container hx-contact">
            <ContactForm form={c.form} locale={locale} pagePath={localePath(locale, PATH)} />
            <div className="hx-contact__aside">
              <div className="hx-contact__wa">
                <h2>{c.whatsappTitle}</h2>
                <p>{c.whatsappText}</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hx-btn hx-btn--bright">
                  <Icon name="whatsapp" /> {dict.common.whatsapp}
                </a>
              </div>
              <div className="hx-card">
                <span className="hx-icon-bubble">
                  <Icon name="envelope" />
                </span>
                <h3>{c.emailTitle}</h3>
                <p>
                  {c.emailText}{" "}
                  <a className="hx-link" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              </div>
              {c.panels.map((p, i) => (
                <div key={p.title} className="hx-card">
                  <span className="hx-icon-bubble">
                    <Icon name={i === 0 ? "book-open" : "question-circle"} />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{rich(p.text, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} path={PATH} />
    </>
  );
}
