"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
// TODO: confirm the real export/path of validateMessage (from issue #78)
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

    const payload = { name, email, message, type, subject };
    const found = validateMessage(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage(initialMessage);
      onSent?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

      <div>
        <label htmlFor="contact-message" className="font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputStyles}
        />
        {errors.message && <p className="mt-1 text-sm text-red-700">{errors.message}</p>}
      </div>

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>

      <div aria-live="polite">
        {status === "success" && <p className="text-brand-800">Thank you! Your message was sent.</p>}
        {status === "error" && <p className="text-red-700">{serverError}</p>}
      </div>
    </form>
  );
}
