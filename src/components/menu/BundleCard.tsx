"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MacroBadge } from "./MacroBadge";
import { SubscriptionToggle } from "./SubscriptionToggle";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { Bundle } from "@/types/meal";

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const [isSubscription, setIsSubscription] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const savings = bundle.originalPrice - bundle.price;
  const savingsPct = Math.round((savings / bundle.originalPrice) * 100);

  const handleAdd = () => {
    addItem(bundle, "bundle", isSubscription);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div id="bundles" className="bg-gradient-to-br from-olive-900 to-olive-700 rounded-2xl overflow-hidden shadow-xl relative">
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="promo" className="text-xs px-3 py-1">
          Save {savingsPct}% · {formatPrice(savings)} off
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-56 md:h-auto overflow-hidden">
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-olive-900/60 hidden md:block" />
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 text-cream-50 flex flex-col gap-4">
          <div>
            <p className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Premium Bundle · {bundle.servingCount} Meals
            </p>
            <h3 className="font-serif text-2xl text-cream-50 mb-2">{bundle.name}</h3>
            <p className="text-cream-300 text-sm leading-relaxed">{bundle.description}</p>
          </div>

          <div className="py-3 border-y border-olive-600">
            <MacroBadge macros={bundle.macrosSummary} />
            <p className="text-cream-400 text-[10px] text-center mt-1.5">Average macros per meal</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {bundle.dietTags.map((tag) => (
              <Badge key={tag} variant="diet" className="capitalize text-[10px] opacity-90">
                {tag.replace("-", " ")}
              </Badge>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-cream-50 font-bold">{formatPrice(isSubscription ? bundle.subscriptionPrice : bundle.price)}</span>
              <span className="text-cream-400 text-sm line-through">{formatPrice(bundle.originalPrice)}</span>
            </div>
            <SubscriptionToggle
              price={bundle.price}
              subscriptionPrice={bundle.subscriptionPrice}
              isSubscription={isSubscription}
              onChange={setIsSubscription}
            />
            <Button
              variant={added ? "ghost" : "primary"}
              size="md"
              className="w-full"
              onClick={handleAdd}
            >
              {added ? "Added to Cart ✓" : "Add Bundle to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
