"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "inherit",
  fontSize: "1rem",
  padding: "0.75rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.3)",
  background: "transparent",
  color: "#fff",
  outline: "none",
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact-general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="font-serif text-xl leading-relaxed text-white">
        Thanks — we&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <style>{`.contact-input::placeholder{color:rgba(255,255,255,0.45);opacity:1}`}</style>

      <input
        required
        type="text"
        placeholder="Name"
        className="contact-input"
        style={inputStyle}
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
      />
      <input
        required
        type="email"
        placeholder="Email"
        className="contact-input"
        style={inputStyle}
        value={form.email}
        onChange={(e) => set("email", e.target.value)}
      />
      <textarea
        required
        placeholder="Message"
        rows={5}
        className="contact-input"
        style={{ ...inputStyle, resize: "none" }}
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
      />

      {status === "error" && (
        <p className="font-serif text-sm" style={{ color: "#FFB81C" }}>
          Something went wrong. Please try again or call us at 718-875-0546.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start font-serif text-sm font-bold tracking-widest uppercase px-8 py-4 transition-opacity hover:opacity-80 disabled:opacity-50"
        style={{ backgroundColor: "#FFB81C", color: "#1a0a0e" }}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
