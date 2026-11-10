/**
 * Destination account details.
 *
 * CRYPTO_PAYMENT_DETAILS — used on the public /pay/crypto page (automated flow).
 * BANK_PAYMENT_DETAILS — private reference only. Do NOT render on public pages or
 * in automated buyer emails; bank credentials are sent manually after the customer replies.
 */

export const BANK_PAYMENT_DETAILS = {
  beneficiary: "AYOUB ESADIK",
  bankName: "Clear Junction Limited",
  iban: "GB05CLJU04130742245935",
  bic: "CLJUGB21XXX",
  bankAddress:
    "4th Floor Imperial House, 15 Kingsway, London, WC2B 6UN, United Kingdom",
  transferType: "SEPA Instant Transfer",
} as const;

export const CRYPTO_PAYMENT_DETAILS = {
  asset: "USDT",
  network: "BEP20 (BNB Smart Chain)",
  networkShort: "USDT (BEP20) BNB Smart Chain",
  walletAddress: "0x954705efe9a5c038d90fae64fd5408ea71d7a1cb",
  note: "Send only USDT on BEP20 (BNB Smart Chain). Other assets or networks may be lost.",
} as const;

/** Suggested payment reference: order ref + full name (no TV/IPTV wording). */
export function paymentReferenceHint(invoiceRef: string): string {
  const ref = invoiceRef.trim() || "ORDER REF";
  return `${ref} + your full name`;
}
