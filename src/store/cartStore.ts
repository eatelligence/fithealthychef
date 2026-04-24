"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, MealItem, Bundle } from "@/types/meal";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  promoDiscount: number;

  addItem: (meal: MealItem | Bundle, itemType: "meal" | "bundle", isSubscription?: boolean) => void;
  removeItem: (mealId: string) => void;
  updateQuantity: (mealId: string, qty: number) => void;
  toggleSubscription: (mealId: string) => void;
  applyPromoCode: (code: string) => boolean;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const VALID_PROMO_CODES: Record<string, number> = {
  WELCOME: 2000,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      promoDiscount: 0,

      addItem: (meal, itemType, isSubscription = false) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.meal.id === meal.id && i.isSubscription === isSubscription
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.meal.id === meal.id && i.isSubscription === isSubscription
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { meal, quantity: 1, isSubscription, itemType }],
            isOpen: true,
          };
        });
      },

      removeItem: (mealId) =>
        set((state) => ({
          items: state.items.filter((i) => i.meal.id !== mealId),
        })),

      updateQuantity: (mealId, qty) => {
        if (qty <= 0) {
          get().removeItem(mealId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.meal.id === mealId ? { ...i, quantity: qty } : i
          ),
        }));
      },

      toggleSubscription: (mealId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.meal.id === mealId ? { ...i, isSubscription: !i.isSubscription } : i
          ),
        })),

      applyPromoCode: (code) => {
        const discount = VALID_PROMO_CODES[code.toUpperCase()];
        if (discount !== undefined) {
          set({ promoCode: code.toUpperCase(), promoDiscount: discount });
          return true;
        }
        return false;
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "fhc-cart-v1",
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
    }
  )
);

export function useCartSubtotal() {
  const items = useCartStore((s) => s.items);
  return items.reduce((sum, item) => {
    const price = item.isSubscription
      ? item.meal.subscriptionPrice
      : item.meal.price;
    return sum + price * item.quantity;
  }, 0);
}

export function useCartTotal() {
  const subtotal = useCartSubtotal();
  const discount = useCartStore((s) => s.promoDiscount);
  return Math.max(0, subtotal - discount);
}

export function useCartItemCount() {
  const items = useCartStore((s) => s.items);
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
