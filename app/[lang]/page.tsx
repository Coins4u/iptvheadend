import type { Metadata } from "next";
import { getDict, getPosts } from "@/content";
import { pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import HomePage from "@/components/site/HomePage";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale);
  return pageMetadata({ locale, path: "", title: d.home.meta.title, description: d.home.meta.description });
}

export default async function Page({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path="" active="home" />
      <main>
        <HomePage locale={locale} dict={dict} posts={getPosts(locale)} />
      </main>
      <SiteFooter locale={locale} dict={dict} path="" />
    </>
  );
}
