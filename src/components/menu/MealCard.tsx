"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MacroBadge } from "./MacroBadge";
import { SubscriptionToggle } from "./SubscriptionToggle";
import { useCartStore } from "@/store/cartStore";
import type { MealItem } from "@/types/meal";

interface MealCardProps {
  meal: MealItem;
}

const ALLERGEN_LABELS: Record<string, string> = {
  "gluten-free": "GF",
  "dairy-free": "DF",
  "nut-free": "NF",
  "egg-free": "EF",
  "soy-free": "SF",
};

export function MealCard({ meal }: MealCardProps) {
  const [isSubscription, setIsSubscription] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(meal, "meal", isSubscription);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {meal.badge && <Badge variant="chef">{meal.badge}</Badge>}
        </div>
        <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
          {meal.allergens.slice(0, 3).map((a) => (
            <span key={a} className="text-[9px] font-bold bg-white/90 text-olive-700 px-1.5 py-0.5 rounded-full">
              {ALLERGEN_LABELS[a]}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-serif text-olive-900 font-semibold leading-tight mb-1 text-base">{meal.name}</h3>
          <p className="text-olive-500 text-xs leading-relaxed line-clamp-2">{meal.shortDescription}</p>
        </div>

        <MacroBadge macros={meal.macros} />

        <div className="flex flex-wrap gap-1">
          {meal.dietTags.map((tag) => (
            <Badge key={tag} variant="diet" className="capitalize text-[10px]">
              {tag.replace("-", " ")}
            </Badge>
          ))}
        </div>

        <div className="mt-auto space-y-2.5">
          <SubscriptionToggle
            price={meal.price}
            subscriptionPrice={meal.subscriptionPrice}
            isSubscription={isSubscription}
            onChange={setIsSubscription}
          />
          <Button
            variant={added ? "ghost" : "primary"}
            size="sm"
            className="w-full"
            onClick={handleAdd}
          >
            {added ? (
              <>
                <svg className="w-4 h-4 text-olive-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Added to Cart
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
