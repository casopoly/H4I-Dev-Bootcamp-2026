"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { requestJson } from "@/lib/requestJson";
import { validateMessage, MessageErrors } from "@/lib/validateMessage";
import { EMAIL_MAX_LENGTH, MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/messages";

const inputClass =
  "w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-sm font-semibold text-brand-700";
const errorClass = "mt-1 min-h-5 text-sm font-medium text-red-700";

const EMPTY = { name: "", email: "", message: "" };

/**
 * The Apply button for a job listing. Opens a pop-up form that sends the application to POST /api/contact
 * as a "job-application" message, where the store manager reads it at /admin/messages.
 * `jobLabel` describes the job, e.g. "Barista at 123 Higuera St"
 */
export default function ApplyButton({ jobLabel }: { jobLabel: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState<MessageErrors>({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleId = `apply-title-${jobLabel.replace(/\W+/g, "-")}`;

  function open() {
    setErrors({});
    setFormError("");
    setSent(false);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function update(field: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const body = { ...fields, type: "job-application", subject: `Application: ${jobLabel}` };
    const found = validateMessage(body);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    const result = await requestJson("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);

    if (!result.ok) {
      // Show the server's per-field errors when it sent them, otherwise one general message
      if (result.errors) setErrors(result.errors);
      else setFormError(result.error);
      return;
    }
    setFields(EMPTY);
    setSent(true);
  }

  return (
    <>
      <Button type="button" onClick={open}>
        Apply
      </Button>
      {/* A native <dialog> gives us the backdrop, focus trapping and closing with the Escape key */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-full max-w-md rounded-lg bg-white p-6 text-ink shadow-lg backdrop:bg-brand-950/50"
        // Clicking the dark backdrop (the dialog element itself) closes it
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <h2 id={titleId} className="mb-4 text-xl">
          Apply: {jobLabel}
        </h2>
        {sent ? (
          <div className="flex flex-col items-start gap-4">
            <p role="status" className="font-medium text-brand-800">
              Thanks! Your application was sent. We&apos;ll be in touch soon.
            </p>
            <Button type="button" onClick={close}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
            <div>
              <label htmlFor={`${titleId}-name`} className={labelClass}>
                Name
              </label>
              <input
                id={`${titleId}-name`}
                name="name"
                autoComplete="name"
                maxLength={NAME_MAX_LENGTH}
                className={inputClass}
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
              />
              <p role="alert" className={errorClass}>
                {errors.name}
              </p>
            </div>
            <div>
              <label htmlFor={`${titleId}-email`} className={labelClass}>
                Email
              </label>
              <input
                id={`${titleId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={EMAIL_MAX_LENGTH}
                className={inputClass}
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <p role="alert" className={errorClass}>
                {errors.email}
              </p>
            </div>
            <div>
              <label htmlFor={`${titleId}-message`} className={labelClass}>
                Why are you a good fit?
              </label>
              <textarea
                id={`${titleId}-message`}
                name="message"
                rows={5}
                maxLength={MESSAGE_MAX_LENGTH}
                className={inputClass}
                value={fields.message}
                onChange={(e) => update("message", e.target.value)}
              />
              <p role="alert" className={errorClass}>
                {errors.message}
              </p>
            </div>
            <p role="alert" className={errorClass}>
              {formError}
            </p>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="dark" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send application"}
              </Button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
