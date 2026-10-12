"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { requestJson } from "@/lib/requestJson";
import { validateMessage } from "@/lib/validateMessage";

type Props = {
  type: "contact" | "job-application";
  subject?: string;
  initialMessage?: string;
  onSent?: () => void;
};

const inputStyles = "mt-1 w-full rounded-lg border border-brand-100 bg-white px-3 py-2";

export default function ContactForm({ type, subject, initialMessage = "", onSent }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    // Clear an earlier "Thank you" so it never shows next to new errors
    setStatus("idle");

    const payload = { name, email, message, type, subject };
    const found = validateMessage(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const result = await requestJson("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!result.ok) {
      setServerError(result.error);
      setStatus("error");
      return;
    }
    setStatus("success");
    setName("");
    setEmail("");
    setMessage(initialMessage);
    onSent?.();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="font-medium">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyles}
          />
          {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="font-medium">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyles}
          />
          {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputStyles}
        />
        {errors.message && <p className="mt-1 text-sm text-red-700">{errors.message}</p>}
      </div>

      {/* The result message sits on the left and the Send button at the bottom right */}
      <div className="flex items-center justify-between gap-4">
        <div aria-live="polite">
          {status === "success" && <p className="text-brand-800">Thank you! Your message was sent.</p>}
          {status === "error" && <p className="text-red-700">{serverError}</p>}
        </div>
        <Button type="submit" disabled={status === "sending"} className="shrink-0">
          {status === "sending" ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
