/**
 * Plan prices. The DOM order of the rendered cards (standard 1/3/6/12, then premium 1/3/6/12)
 * is what OrderLeadModal uses to identify the tier — keep this order.
 */
export type Plan = { months: 1 | 3 | 6 | 12; price: string; popular?: boolean };

export const STANDARD_PLANS: Plan[] = [
  { months: 1, price: "€13.67" },
  { months: 3, price: "€25.49", popular: true },
  { months: 6, price: "€37.78" },
  { months: 12, price: "€49.56" },
];

export const PREMIUM_PLANS: Plan[] = [
  { months: 1, price: "€23.12" },
  { months: 3, price: "€35.53", popular: true },
  { months: 6, price: "€45.79" },
  { months: 12, price: "€67.48" },
];

export const LOWEST_PRICE = "13.67";
export const HIGHEST_PRICE = "67.48";

/** Monthly equivalent, e.g. "€4.13" for the 12-month standard plan. */
export function perMonth(plan: Plan): string {
  const n = Number(plan.price.replace(/[^\d.]/g, ""));
  return `€${(n / plan.months).toFixed(2)}`;
}
