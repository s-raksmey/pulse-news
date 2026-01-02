"use client";

import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: connect to API later
    setSuccess(true);
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="h-11 w-full rounded-md border border-slate-300 px-4 text-sm focus:ring-2 focus:ring-slate-900"
      />

      <button
        type="submit"
        className="h-11 rounded-md bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Subscribe
      </button>

      {success && (
        <p className="text-xs text-green-600 sm:ml-2 sm:self-center">
          ✓ Subscribed
        </p>
      )}
    </form>
  );
}
