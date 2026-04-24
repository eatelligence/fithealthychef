"use client";

import { useFilterStore } from "@/store/filterStore";
import type { AllergenTag, DietTag } from "@/types/meal";

const LABEL_MAP: Record<string, string> = {
  "gluten-free": "Gluten Free",
  "dairy-free": "Dairy Free",
  "nut-free": "Nut Free",
  "egg-free": "Egg Free",
  "soy-free": "Soy Free",
  "under-400": "< 400 cal",
  "under-500": "< 500 cal",
  "under-600": "< 600 cal",
  "low-carb": "Low Carb",
  keto: "Keto",
  performance: "Performance",
  "protein-packed": "Protein Packed",
  vegan: "Vegan",
  vegetarian: "Vegetarian",
};

export function FilterChips() {
  const allergens = useFilterStore((s) => s.allergens);
  const calorieBand = useFilterStore((s) => s.calorieBand);
  const dietTags = useFilterStore((s) => s.dietTags);
  const toggleAllergen = useFilterStore((s) => s.toggleAllergen);
  const setCalorieBand = useFilterStore((s) => s.setCalorieBand);
  const toggleDietTag = useFilterStore((s) => s.toggleDietTag);
  const clearAll = useFilterStore((s) => s.clearAll);

  const allChips = [
    ...allergens.map((a) => ({ key: a, type: "allergen" as const })),
    ...(calorieBand ? [{ key: calorieBand, type: "calorie" as const }] : []),
    ...dietTags.map((d) => ({ key: d, type: "diet" as const })),
  ];

  if (allChips.length === 0) return null;

  const handleRemove = (chip: { key: string; type: "allergen" | "calorie" | "diet" }) => {
    if (chip.type === "allergen") toggleAllergen(chip.key as AllergenTag);
    else if (chip.type === "calorie") setCalorieBand(null);
    else if (chip.type === "diet") toggleDietTag(chip.key as DietTag);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <span className="text-xs text-olive-500 font-medium">Filtered by:</span>
      {allChips.map((chip) => (
        <button
          key={`${chip.type}-${chip.key}`}
          onClick={() => handleRemove(chip)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-olive-100 text-olive-800 text-xs font-medium rounded-full hover:bg-olive-200 transition-colors"
        >
          {LABEL_MAP[chip.key] ?? chip.key}
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
          </svg>
        </button>
      ))}
      {allChips.length > 1 && (
        <button
          onClick={clearAll}
          className="text-xs text-gold-500 hover:text-gold-600 font-medium underline ml-1 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
