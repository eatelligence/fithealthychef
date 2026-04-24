"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("fhc-promo-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem("fhc-promo-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-olive-700 text-cream-50 py-2.5 px-4 text-center text-sm relative">
      <p className="max-w-3xl mx-auto">
        <span className="font-semibold">🎉 Welcome offer: </span>
        Use code{" "}
        <span className="bg-gold-400 text-olive-900 font-bold px-2 py-0.5 rounded mx-1">
          WELCOME
        </span>{" "}
        for{" "}
        <span className="font-semibold">$20 off</span> your first order — plus{" "}
        <span className="font-semibold">save up to 10%</span> with a weekly subscription.
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss promotion"
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 text-cream-200 hover:text-cream-50 transition-colors p-1"
        )}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
