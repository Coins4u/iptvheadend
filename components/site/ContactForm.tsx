"use client";

import { useState } from "react";
import type { Dict } from "@/content/types";

export default function ContactForm({
  form,
  locale,
  pagePath,
}: {
  form: Dict["contact"]["form"];
  locale: string;
  pagePath: string;
}) {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"ok" | "err" | null>(null);
  const [errText, setErrText] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, locale, pagePath }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setErrText(json.error || form.error);
        setStatus("err");
        return;
      }
      setStatus("ok");
      setData({ name: "", email: "", message: "" });
    } catch {
      setErrText(form.error);
      setStatus("err");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="hx-form" onSubmit={submit}>
      <h2>{form.title}</h2>
      <label className="hx-field">
        {form.name}
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder={form.namePh}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </label>
      <label className="hx-field">
        {form.email}
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={form.emailPh}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </label>
      <label className="hx-field">
        {form.message}
        <textarea
          name="message"
          rows={6}
          required
          placeholder={form.messagePh}
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
      </label>
      <button type="submit" className="hx-btn hx-btn--primary hx-btn--block" disabled={sending}>
        {sending ? form.sending : form.send}
      </button>
      {status === "ok" && (
        <p className="hx-form__msg hx-form__msg--ok" role="status">
          {form.success}
        </p>
      )}
      {status === "err" && (
        <p className="hx-form__msg hx-form__msg--err" role="alert">
          {errText}
        </p>
      )}
    </form>
  );
}
