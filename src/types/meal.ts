export type AllergenTag =
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "egg-free"
  | "soy-free";

export type DietTag =
  | "low-carb"
  | "keto"
  | "performance"
  | "vegan"
  | "vegetarian"
  | "protein-packed";

export type CalorieBand = "under-400" | "under-500" | "under-600";

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface MealItem {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  price: number;
  subscriptionPrice: number;
  macros: Macros;
  allergens: AllergenTag[];
  dietTags: DietTag[];
  isAvailable: boolean;
  isFeatured: boolean;
  servingSize: string;
  badge?: string;
  stripePriceId: string;
  stripeSubscriptionPriceId: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  subscriptionPrice: number;
  mealIds: string[];
  macrosSummary: Macros;
  dietTags: DietTag[];
  allergens: AllergenTag[];
  servingCount: number;
  stripePriceId: string;
  stripeSubscriptionPriceId: string;
}

export interface CartItem {
  meal: MealItem | Bundle;
  quantity: number;
  isSubscription: boolean;
  itemType: "meal" | "bundle";
}
