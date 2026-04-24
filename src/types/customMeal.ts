export type PortionSize = 100 | 150 | 200;
export type SidePortionSize = 75 | 100 | 150;

export interface MacrosPerGram {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface ProteinOption {
  id: string;
  name: string;
  description: string;
  image: string;
  macrosPerGram: MacrosPerGram;
  availablePortions: PortionSize[];
  pricePerGram: number; // AUD cents per gram
  dietTags: string[];
}

export interface SideOption {
  id: string;
  name: string;
  category: "carb" | "veggie" | "mixed";
  image: string;
  macrosPerGram: MacrosPerGram;
  availablePortions: SidePortionSize[];
  pricePerGram: number; // AUD cents per gram
  dietTags: string[];
}

export interface SauceOption {
  id: string;
  name: string;
  description: string;
  macrosPerServing: { protein: number; carbs: number; fat: number; calories: number };
  priceFixed: number; // AUD cents flat price
  isSpicy?: boolean;
}

export interface CustomMealSelection {
  protein: ProteinOption | null;
  proteinPortion: PortionSize;
  side1: SideOption | null;
  side1Portion: SidePortionSize;
  side2: SideOption | null;
  side2Portion: SidePortionSize;
  sauce: SauceOption | null;
}

export interface CustomMealMacros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}
