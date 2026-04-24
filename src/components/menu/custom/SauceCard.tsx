"use client";

import { cn } from "@/lib/utils";
import type { SauceOption } from "@/types/customMeal";

interface SauceCardProps {
  sauce: SauceOption;
  isSelected: boolean;
  onSelect: () => void;
}

export function SauceCard({ sauce, isSelected, onSelect }: SauceCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 bg-white focus-visible:outline-2 focus-visible:outline-gold-400",
        isSelected
          ? "border-gold-400 shadow-md shadow-gold-400/20 bg-gold-50"
          : "border-cream-200 hover:border-olive-300 hover:shadow-sm"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className={cn(
              "font-semibold text-sm leading-tight",
              isSelected ? "text-gold-700" : "text-olive-900"
            )}>
              {sauce.name}
            </p>
            {sauce.isSpicy && (
              <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                🌶 Spicy
              </span>
            )}
            {sauce.id === "no-sauce" && (
              <span className="text-[10px] bg-cream-200 text-olive-500 px-1.5 py-0.5 rounded-full font-medium">
                Free
              </span>
            )}
          </div>
          <p className="text-[10px] text-olive-500 leading-tight">{sauce.description}</p>
        </div>

        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors mt-0.5",
          isSelected ? "bg-gold-400 border-gold-400" : "border-cream-300"
        )}>
          {isSelected && (
            <svg className="w-3 h-3 text-olive-900" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>

      {sauce.id !== "no-sauce" && (
        <div className="mt-2 flex gap-3 text-[10px] text-olive-500">
          <span>{sauce.macrosPerServing.calories} cal</span>
          <span>P: {sauce.macrosPerServing.protein}g</span>
          <span>C: {sauce.macrosPerServing.carbs}g</span>
          <span>F: {sauce.macrosPerServing.fat}g</span>
        </div>
      )}
    </button>
  );
}
