"use client";

import { cn, formatPrice } from "@/lib/utils";

interface SubscriptionToggleProps {
  price: number;
  subscriptionPrice: number;
  isSubscription: boolean;
  onChange: (isSubscription: boolean) => void;
}

export function SubscriptionToggle({
  price,
  subscriptionPrice,
  isSubscription,
  onChange,
}: SubscriptionToggleProps) {
  return (
    <div className="flex rounded-full border border-cream-300 bg-cream-100 p-0.5 text-xs font-medium">
      <button
        onClick={() => onChange(false)}
        className={cn(
          "flex-1 px-3 py-1.5 rounded-full transition-all duration-200",
          !isSubscription
            ? "bg-white text-olive-900 shadow-sm"
            : "text-olive-500 hover:text-olive-700"
        )}
      >
        Once · {formatPrice(price)}
      </button>
      <button
        onClick={() => onChange(true)}
        className={cn(
          "flex-1 px-3 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center gap-1",
          isSubscription
            ? "bg-gold-400 text-olive-900 shadow-sm"
            : "text-olive-500 hover:text-olive-700"
        )}
      >
        Weekly · {formatPrice(subscriptionPrice)}
        <span className={cn("text-[9px] font-bold px-1 rounded-full", isSubscription ? "bg-olive-900/20 text-olive-900" : "bg-gold-100 text-gold-600")}>
          -10%
        </span>
      </button>
    </div>
  );
}
