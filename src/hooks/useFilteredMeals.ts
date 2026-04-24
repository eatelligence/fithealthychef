import { useMemo } from "react";
import { useFilterStore } from "@/store/filterStore";
import { filterMeals } from "@/lib/filterMeals";
import { ALL_MEALS } from "@/data/meals";
import type { MealItem } from "@/types/meal";

export function useFilteredMeals(): MealItem[] {
  const allergens = useFilterStore((s) => s.allergens);
  const calorieBand = useFilterStore((s) => s.calorieBand);
  const dietTags = useFilterStore((s) => s.dietTags);

  return useMemo(
    () => filterMeals(ALL_MEALS, { allergens, calorieBand, dietTags }),
    [allergens, calorieBand, dietTags]
  );
}
