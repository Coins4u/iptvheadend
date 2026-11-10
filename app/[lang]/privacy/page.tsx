import type { Metadata } from "next";
import { getDict } from "@/content";
import { pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import LegalPage from "@/components/site/LegalPage";

const PATH = "/privacy";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.privacy;
  return pageMetadata({ locale, path: PATH, title: d.meta.title, description: d.meta.description });
}

export default async function Page({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  return <LegalPage locale={locale} dict={dict} doc={dict.legal.privacy} path={PATH} />;
}
