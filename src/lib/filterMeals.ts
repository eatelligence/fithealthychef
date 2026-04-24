import type { MealItem, AllergenTag, DietTag, CalorieBand } from "@/types/meal";

export interface FilterState {
  allergens: AllergenTag[];
  calorieBand: CalorieBand | null;
  dietTags: DietTag[];
}

const CALORIE_BAND_MAX: Record<CalorieBand, number> = {
  "under-400": 400,
  "under-500": 500,
  "under-600": 600,
};

export function filterMeals(meals: MealItem[], filters: FilterState): MealItem[] {
  return meals.filter((meal) => {
    if (filters.allergens.length > 0) {
      const hasAll = filters.allergens.every((tag) => meal.allergens.includes(tag));
      if (!hasAll) return false;
    }

    if (filters.calorieBand !== null) {
      const maxCal = CALORIE_BAND_MAX[filters.calorieBand];
      if (meal.macros.calories >= maxCal) return false;
    }

    if (filters.dietTags.length > 0) {
      const hasAny = filters.dietTags.some((tag) => meal.dietTags.includes(tag));
      if (!hasAny) return false;
    }

    return true;
  });
}
