"use client";

import { useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"EN" | "KH">("EN");

  return (
    <div className="inline-flex items-center rounded-md border bg-white p-1 text-xs">
      <button
        type="button"
        onClick={() => setLang("EN")}
        className={`rounded px-2 py-1 ${lang === "EN" ? "bg-slate-900 text-white" : "text-slate-700"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("KH")}
        className={`rounded px-2 py-1 ${lang === "KH" ? "bg-slate-900 text-white" : "text-slate-700"}`}
      >
        KH
      </button>
    </div>
  );
}
