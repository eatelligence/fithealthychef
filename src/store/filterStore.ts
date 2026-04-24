"use client";

import { create } from "zustand";
import type { AllergenTag, DietTag, CalorieBand } from "@/types/meal";

interface FilterStore {
  allergens: AllergenTag[];
  calorieBand: CalorieBand | null;
  dietTags: DietTag[];

  toggleAllergen: (tag: AllergenTag) => void;
  setCalorieBand: (band: CalorieBand | null) => void;
  toggleDietTag: (tag: DietTag) => void;
  clearAll: () => void;
  activeFilterCount: () => number;
}

export const useFilterStore = create<FilterStore>()((set, get) => ({
  allergens: [],
  calorieBand: null,
  dietTags: [],

  toggleAllergen: (tag) =>
    set((state) => ({
      allergens: state.allergens.includes(tag)
        ? state.allergens.filter((a) => a !== tag)
        : [...state.allergens, tag],
    })),

  setCalorieBand: (band) => set({ calorieBand: band }),

  toggleDietTag: (tag) =>
    set((state) => ({
      dietTags: state.dietTags.includes(tag)
        ? state.dietTags.filter((d) => d !== tag)
        : [...state.dietTags, tag],
    })),

  clearAll: () => set({ allergens: [], calorieBand: null, dietTags: [] }),

  activeFilterCount: () => {
    const { allergens, calorieBand, dietTags } = get();
    return allergens.length + (calorieBand ? 1 : 0) + dietTags.length;
  },
}));
