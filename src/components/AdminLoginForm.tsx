"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

/**
 * Asks for the admin password and sends it to POST /api/admin/login.
 * On success it goes to `next` (the admin page the visitor asked for)
 */
export default function AdminLoginForm({ next }: { next: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error ?? `Request failed (${response.status})`);
        setLoading(false);
        return;
      }
      // A full page load (not router.push): the navbar link to /admin/menu was prefetched before login and the
      // router can reuse that cached redirect to the login page, so the page would never change
      window.location.assign(next);
    } catch {
      setError("Could not reach the server");
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden username so the browser's password manager saves this login as "admin". The server only checks the password */}
        <input
          type="text"
          name="username"
          value="admin"
          autoComplete="username"
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold text-brand-700">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p role="alert" className="min-h-5 text-sm font-medium text-red-700">
          {error}
        </p>
        <Button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Log in"}
        </Button>
      </form>
    </Card>
  );
}
