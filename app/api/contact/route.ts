import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
  pagePath?: string;
};

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("Missing SMTP_HOST, SMTP_USER, or SMTP_PASS");
  }
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = port === 465 || process.env.SMTP_SECURE === "true";
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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = typeof body.locale === "string" ? body.locale.trim() : "";
  const pagePath = typeof body.pagePath === "string" ? body.pagePath.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const from = (process.env.SMTP_FROM || process.env.SMTP_USER)?.trim();
  if (!from) {
    return NextResponse.json({ error: "Server email configuration error" }, { status: 500 });
  }

  const to = process.env.CONTACT_EMAIL?.trim() || "support.iptv.headend@gmail.com";
  const subject = `New contact message: ${name}`;
  const text = `New contact message received.

Name: ${name}
Email: ${email}
Locale: ${locale || "—"}
Page: ${pagePath || "—"}

Message:
${message}
`;

  let transporter: nodemailer.Transporter;
  try {
    transporter = buildTransporter();
  } catch (e) {
    console.error("contact: SMTP config error:", e);
    return NextResponse.json({ error: "Server email configuration error" }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });
  } catch (err) {
    console.error("contact: SMTP send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

