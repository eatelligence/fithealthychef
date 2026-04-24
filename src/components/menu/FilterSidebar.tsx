"use client";

import { useFilterStore } from "@/store/filterStore";
import type { AllergenTag, DietTag, CalorieBand } from "@/types/meal";

const ALLERGEN_OPTIONS: { value: AllergenTag; label: string }[] = [
  { value: "gluten-free", label: "Gluten Free" },
  { value: "dairy-free", label: "Dairy Free" },
  { value: "nut-free", label: "Nut Free" },
  { value: "egg-free", label: "Egg Free" },
  { value: "soy-free", label: "Soy Free" },
];

const CALORIE_OPTIONS: { value: CalorieBand; label: string }[] = [
  { value: "under-400", label: "Under 400 cal" },
  { value: "under-500", label: "Under 500 cal" },
  { value: "under-600", label: "Under 600 cal" },
];

const DIET_OPTIONS: { value: DietTag; label: string }[] = [
  { value: "low-carb", label: "Low Carb" },
  { value: "keto", label: "Keto" },
  { value: "performance", label: "Performance" },
  { value: "protein-packed", label: "Protein Packed" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
];

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function FilterCheckbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span
        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-olive-600 border-olive-600" : "border-cream-300 group-hover:border-olive-400"
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-sm text-olive-700 group-hover:text-olive-900 transition-colors">{label}</span>
    </label>
  );
}

export function FilterSidebar() {
  const allergens = useFilterStore((s) => s.allergens);
  const calorieBand = useFilterStore((s) => s.calorieBand);
  const dietTags = useFilterStore((s) => s.dietTags);
  const toggleAllergen = useFilterStore((s) => s.toggleAllergen);
  const setCalorieBand = useFilterStore((s) => s.setCalorieBand);
  const toggleDietTag = useFilterStore((s) => s.toggleDietTag);
  const clearAll = useFilterStore((s) => s.clearAll);
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount);
  const count = activeFilterCount();

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm p-5 lg:sticky lg:top-24 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-olive-900 text-base">Filter Meals</h3>
            {count > 0 && (
              <p className="text-xs text-olive-500">{count} active filter{count !== 1 ? "s" : ""}</p>
            )}
          </div>
          {count > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gold-500 hover:text-gold-600 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Allergens */}
        <div>
          <h4 className="text-xs font-semibold text-olive-500 uppercase tracking-wider mb-3">
            Allergen Free
          </h4>
          <div className="space-y-2.5">
            {ALLERGEN_OPTIONS.map((opt) => (
              <FilterCheckbox
                key={opt.value}
                checked={allergens.includes(opt.value)}
                onChange={() => toggleAllergen(opt.value)}
                label={opt.label}
              />
            ))}
          </div>
        </div>

        <div className="h-px bg-cream-200" />

        {/* Calories */}
        <div>
          <h4 className="text-xs font-semibold text-olive-500 uppercase tracking-wider mb-3">
            Calories
          </h4>
          <div className="space-y-2.5">
            {CALORIE_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    calorieBand === opt.value
                      ? "bg-olive-600 border-olive-600"
                      : "border-cream-300 group-hover:border-olive-400"
                  }`}
                  onClick={() => setCalorieBand(calorieBand === opt.value ? null : opt.value)}
                >
                  {calorieBand === opt.value && (
                    <span className="w-2 h-2 rounded-full bg-white block" />
                  )}
                </span>
                <input
                  type="radio"
                  className="sr-only"
                  checked={calorieBand === opt.value}
                  onChange={() => setCalorieBand(opt.value)}
                />
                <span className="text-sm text-olive-700 group-hover:text-olive-900 transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-cream-200" />

        {/* Diet type */}
        <div>
          <h4 className="text-xs font-semibold text-olive-500 uppercase tracking-wider mb-3">
            Diet Type
          </h4>
          <div className="space-y-2.5">
            {DIET_OPTIONS.map((opt) => (
              <FilterCheckbox
                key={opt.value}
                checked={dietTags.includes(opt.value)}
                onChange={() => toggleDietTag(opt.value)}
                label={opt.label}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
