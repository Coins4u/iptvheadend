import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  buildBuyerOrderEmailHtml,
  buildBuyerOrderEmailText,
  getBuyerEmailSubject,
  generateInvoiceRef,
  resolveBuyerLocaleFromCountry,
} from "../../../lib/buyer-order-email-html";
import { resolveOrderPrices } from "../../../lib/order-pricing";
import {
  getPaymentDetailsUrl,
  isSelectablePaymentMethod,
  PAYMENT_METHOD_LABELS,
  type SelectablePaymentMethod,
} from "../../../lib/payment-method";

type Body = {
  fullName?: string;
  email?: string;
  country?: string;
  tierName?: string;
  /** Display price from the pricing card, e.g. "€14.32 /mo" */
  priceDisplay?: string;
  paymentMethod?: string;
};

function normalizeSiteOrigin(raw: string | undefined): string {
  const fallback = "https://iptvheadend.net";
  const value = (raw || "").trim();
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, "");
  return `https://${value.replace(/\/$/, "")}`;
}

/** Extract bare email from `Name <email@x.com>` or plain address. */
function extractEmailAddress(fromOrEmail: string): string {
  const angle = fromOrEmail.match(/<([^>]+)>/);
  if (angle?.[1]) return angle[1].trim();
  return fromOrEmail.trim();
}

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("Missing SMTP_HOST, SMTP_USER, or SMTP_PASS");
  }
  const port = Number(process.env.SMTP_PORT) || 587;
  // Port 465 uses implicit TLS (SSL); Hostinger needs secure: true
  const secure =
    port === 465 || process.env.SMTP_SECURE === "true";
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const country = typeof body.country === "string" ? body.country.trim() : "";
  const tierName =
    typeof body.tierName === "string" ? body.tierName.trim() : "";
  const priceDisplay =
    typeof body.priceDisplay === "string" ? body.priceDisplay.trim() : "";
  const paymentMethodRaw =
    typeof body.paymentMethod === "string" ? body.paymentMethod.trim() : "";

  if (!fullName || !email || !country || !tierName || !paymentMethodRaw) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!isSelectablePaymentMethod(paymentMethodRaw)) {
    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 },
    );
  }

  // Keep a uniquely named const (avoid object-shorthand minify bugs in prod).
  const selectedPaymentMethod: SelectablePaymentMethod = paymentMethodRaw;
  const paymentMethodLabel = PAYMENT_METHOD_LABELS[selectedPaymentMethod];

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const prices = resolveOrderPrices(priceDisplay);
  const listedPriceDisplay = prices?.listedDisplay ?? (priceDisplay || "—");
  const discountedPriceDisplay = prices?.discountedDisplay ?? "—";
  const discountedAmount =
    prices?.discountedPrice ??
    (parseFloat(discountedPriceDisplay.replace(/[^\d.]/g, "")) || 0);

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const from = (process.env.SMTP_FROM || process.env.SMTP_USER)?.trim();
  if (!adminEmail || !from) {
    console.error(
      "send-order-link: Missing ADMIN_EMAIL or SMTP_FROM/SMTP_USER — add them to .env.local (not only .env.example)",
    );
    return NextResponse.json(
      { error: "Server email configuration error" },
      { status: 500 },
    );
  }

  let transporter: nodemailer.Transporter;
  try {
    transporter = buildTransporter();
  } catch (e) {
    console.error("send-order-link: SMTP config error:", e);
    return NextResponse.json(
      { error: "Server email configuration error" },
      { status: 500 },
    );
  }

  try {
    const siteOrigin = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
    const invoiceRef = generateInvoiceRef();
    const locale = resolveBuyerLocaleFromCountry(country);
    const isBankTransfer = selectedPaymentMethod === "bank_transfer";
    // Crypto keeps the automated payment-page CTA. Bank transfer emails ask the
    // customer to reply instead — never link to public IBAN details.
    const paymentDetailsUrl = isBankTransfer
      ? ""
      : getPaymentDetailsUrl(selectedPaymentMethod, {
          siteOrigin,
          plan: tierName,
          amount: discountedAmount,
          invoiceRef,
        });

    const buyerSubject = getBuyerEmailSubject(tierName, invoiceRef, locale);
    const buyerHtml = buildBuyerOrderEmailHtml({
      fullName,
      email,
      country,
      tierName,
      listedPriceDisplay,
      discountedPriceDisplay,
      invoiceRef,
      siteOrigin,
      locale,
      paymentMethod: selectedPaymentMethod,
      paymentDetailsUrl,
    });

    const buyerText = buildBuyerOrderEmailText({
      fullName,
      tierName,
      listedPriceDisplay,
      discountedPriceDisplay,
      invoiceRef,
      locale,
      paymentMethod: selectedPaymentMethod,
      paymentDetailsUrl,
    });

    const replyInbox = extractEmailAddress(from);
    const adminSubject = `NEW FORM FILLED: ${tierName} - ${fullName}`;
    const adminText = isBankTransfer
      ? [
          "A user has filled the order form (BANK TRANSFER).",
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Country: ${country}`,
          `Tier Selected: ${tierName}`,
          `Payment Method: ${paymentMethodLabel}`,
          `Listed price: ${listedPriceDisplay}`,
          `Discounted price (15% off): ${discountedPriceDisplay}`,
          `Order reference: ${invoiceRef}`,
          `Status: Buyer was asked to REPLY to the order email for secure bank details (no IBAN sent).`,
          `Action: When they reply to ${replyInbox}, review the order and send bank credentials privately in that thread.`,
        ].join("\n")
      : [
          "A user has filled the order form.",
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Country: ${country}`,
          `Tier Selected: ${tierName}`,
          `Payment Method: ${paymentMethodLabel}`,
          `Listed price: ${listedPriceDisplay}`,
          `Discounted price (15% off bank transfer / crypto): ${discountedPriceDisplay}`,
          `Status: Payment details follow-up email sent to the buyer (${paymentMethodLabel}).`,
          `Payment page: ${paymentDetailsUrl}`,
        ].join("\n");

    await Promise.all([
      transporter.sendMail({
        from,
        to: email,
        // Bank replies must land in the same inbox you use for order mail so you
        // can send IBAN privately. Crypto also replies here for receipt matching.
        replyTo: replyInbox,
        subject: buyerSubject,
        text: buyerText,
        html: buyerHtml,
      }),
      transporter.sendMail({
        from,
        to: adminEmail,
        subject: adminSubject,
        text: adminText,
      }),
    ]);

    return NextResponse.json({
      ok: true,
      listedPriceDisplay,
      discountedPriceDisplay,
      paymentMethod: selectedPaymentMethod,
    });
  } catch (err) {
    console.error("send-order-link: order processing error:", err);
    const message =
      err instanceof Error && /smtp|mail|econn|auth/i.test(err.message)
        ? "Failed to send emails. Please try again later."
        : "Failed to process order. Please try again later.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
