import type { CustomMealSelection, CustomMealMacros } from "@/types/customMeal";

export function calculateMacros(selection: CustomMealSelection): CustomMealMacros {
  const result = { protein: 0, carbs: 0, fat: 0, calories: 0 };

  if (selection.protein) {
    const g = selection.proteinPortion;
    const m = selection.protein.macrosPerGram;
    result.protein += m.protein * g;
    result.carbs += m.carbs * g;
    result.fat += m.fat * g;
    result.calories += m.calories * g;
  }

  if (selection.side1) {
    const g = selection.side1Portion;
    const m = selection.side1.macrosPerGram;
    result.protein += m.protein * g;
    result.carbs += m.carbs * g;
    result.fat += m.fat * g;
    result.calories += m.calories * g;
  }

  if (selection.side2) {
    const g = selection.side2Portion;
    const m = selection.side2.macrosPerGram;
    result.protein += m.protein * g;
    result.carbs += m.carbs * g;
    result.fat += m.fat * g;
    result.calories += m.calories * g;
  }

  if (selection.sauce) {
    const s = selection.sauce.macrosPerServing;
    result.protein += s.protein;
    result.carbs += s.carbs;
    result.fat += s.fat;
    result.calories += s.calories;
  }

  return {
    protein: Math.round(result.protein),
    carbs: Math.round(result.carbs),
    fat: Math.round(result.fat),
    calories: Math.round(result.calories),
  };
}

export function calculatePrice(selection: CustomMealSelection): number {
  let total = 0;

  if (selection.protein) {
    total += selection.protein.pricePerGram * selection.proteinPortion;
  }
  if (selection.side1) {
    total += selection.side1.pricePerGram * selection.side1Portion;
  }
  if (selection.side2) {
    total += selection.side2.pricePerGram * selection.side2Portion;
  }
  if (selection.sauce) {
    total += selection.sauce.priceFixed;
  }

  // Base assembly fee
  total += 300;

  return Math.round(total);
}

export function isSelectionComplete(selection: CustomMealSelection): boolean {
  return (
    selection.protein !== null &&
    selection.side1 !== null &&
    selection.sauce !== null
  );
}
