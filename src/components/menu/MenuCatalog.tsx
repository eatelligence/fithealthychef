"use client";

import { MealCard } from "./MealCard";
import { useFilteredMeals } from "@/hooks/useFilteredMeals";
import { useFilterStore } from "@/store/filterStore";

export function MenuCatalog() {
  const meals = useFilteredMeals();
  const clearAll = useFilterStore((s) => s.clearAll);
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount);
  const hasFilters = activeFilterCount() > 0;

  if (meals.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-olive-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-olive-900 mb-2">No meals match your filters</h3>
        <p className="text-olive-500 mb-5 max-w-xs">
          Try adjusting your filters or clearing them to see all available dishes.
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="px-6 py-2.5 bg-olive-600 text-cream-50 text-sm font-medium rounded-full hover:bg-olive-700 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 content-start">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}
