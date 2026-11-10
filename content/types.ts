/**
 * Content model. Strings support light inline markup rendered by <Rich>:
 *   **bold**   and   [link text](/path)   (internal paths are locale-prefixed automatically)
 */

export type FaqItem = { q: string; a: string };

export type IconName =
  | "tv"
  | "film"
  | "bolt"
  | "headset"
  | "cogs"
  | "shield-alt"
  | "globe"
  | "signal"
  | "clock"
  | "trophy"
  | "check-circle"
  | "play-circle"
  | "book-open"
  | "question-circle"
  | "clipboard-check"
  | "credit-card";

export type CategoryKey = "sport" | "movie" | "news" | "kids" | "entertainment" | "music";

export type LegalDoc = {
  meta: { title: string; description: string };
  title: string;
  intro: string;
  sections: { h: string; p: string[] }[];
};

export type Dict = {
  nav: {
    home: string;
    channels: string;
    guide: string;
    blog: string;
    faq: string;
    contact: string;
    cta: string;
    menu: string;
    language: string;
  };
  footer: {
    tagline: string;
    explore: string;
    help: string;
    legal: string;
    terms: string;
    privacy: string;
    refund: string;
    rights: string;
    disclaimer: string;
  };
  common: {
    seePlans: string;
    setupGuide: string;
    readMore: string;
    readGuide: string;
    contactUs: string;
    whatsapp: string;
    minRead: string;
    updated: string;
    backToBlog: string;
    home: string;
    relatedTitle: string;
    tocTitle: string;
    faqShort: string;
  };
  home: {
    meta: { title: string; description: string };
    hero: {
      eyebrow: string;
      title: string;
      titleAccent: string;
      lead: string;
      ctaPrimary: string;
      ctaSecondary: string;
      chips: string[];
      imageAlt: string;
      floatA: string;
      floatB: string;
    };
    stats: { value: string; label: string }[];
    intro: { kicker: string; title: string; paragraphs: string[] };
    features: {
      kicker: string;
      title: string;
      lead: string;
      items: { icon: IconName; title: string; text: string }[];
    };
    categories: {
      kicker: string;
      title: string;
      lead: string;
      items: { key: CategoryKey; title: string; text: string }[];
      cta: string;
    };
    sports: {
      kicker: string;
      title: string;
      lead: string;
      points: { title: string; text: string }[];
      chips: string[];
      imageAlt: string;
      badge: string;
    };
    vod: { kicker: string; title: string; lead: string; points: string[]; pillA: string; pillB: string };
    devices: {
      kicker: string;
      title: string;
      lead: string;
      /** 9 labels, order: smart tv, stick, box, phone, tablet, laptop, desktop, console, projector */
      labels: string[];
      appsTitle: string;
      apps: string[];
      appsNote: string;
    };
    steps: { kicker: string; title: string; items: { title: string; text: string }[] };
    pricing: {
      kicker: string;
      title: string;
      lead: string;
      standard: string;
      premium: string;
      popular: string;
      monthLabel: string;
      monthsLabel: string;
      premiumSuffix: string;
      /** period suffix per plan: 1, 3, 6, 12 months */
      periods: [string, string, string, string];
      perMonth: string;
      order: string;
      standardFeatures: string[];
      premiumFeatures: string[];
      payTitle: string;
      payText: string;
      payMethods: string[];
      delivery: string;
    };
    compare: {
      kicker: string;
      title: string;
      lead: string;
      cols: [string, string, string];
      rows: [string, string, string][];
    };
    faq: { kicker: string; title: string; lead: string; more: string };
    blog: { kicker: string; title: string; lead: string; all: string };
    cta: { title: string; text: string; primary: string; secondary: string };
  };
  faqPage: {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    lead: string;
    groups: { title: string; items: FaqItem[] }[];
    stillTitle: string;
    stillText: string;
  };
  channels: {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    lead: string;
    items: { key: CategoryKey; title: string; text: string; alt: string }[];
    epgTitle: string;
    epgText: string;
    ctaTitle: string;
    ctaText: string;
  };
  guide: {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    lead: string;
    beforeTitle: string;
    before: string[];
    jump: string;
    devices: { id: string; title: string; intro: string; steps: string[] }[];
    playersTitle: string;
    playersLead: string;
    players: { name: string; text: string }[];
    tipsTitle: string;
    tips: string[];
    helpTitle: string;
    helpText: string;
  };
  contact: {
    meta: { title: string; description: string };
    kicker: string;
    title: string;
    lead: string;
    form: {
      title: string;
      name: string;
      email: string;
      message: string;
      namePh: string;
      emailPh: string;
      messagePh: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    whatsappTitle: string;
    whatsappText: string;
    emailTitle: string;
    emailText: string;
    panels: { title: string; text: string }[];
  };
  blogIndex: { meta: { title: string; description: string }; kicker: string; title: string; lead: string };
  legal: { terms: LegalDoc; privacy: LegalDoc; refund: LegalDoc };
  notFound: { title: string; text: string; cta: string };
};

export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { tip: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date */
  date: string;
  minutes: number;
  /** image path under /public */
  image: string;
  blocks: Block[];
  faq?: FaqItem[];
};
