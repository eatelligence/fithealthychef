import type { Bundle } from "@/types/meal";

export const ALL_BUNDLES: Bundle[] = [
  {
    id: "premium-fuel-pack",
    name: "Premium Fuel Pack",
    description:
      "Chef Michele's hand-selected weekly performance package — 5 premium meals curated to fuel your training, optimise recovery, and keep you eating like a champion all week long.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    price: 8500,
    originalPrice: 9725,
    subscriptionPrice: 7650,
    mealIds: [
      "beef-ragu-tortellini",
      "chicken-parmigiana",
      "salmon-lemon-caper",
      "greek-lamb-bowl",
      "keto-steak-asparagus",
    ],
    macrosSummary: { protein: 43, carbs: 30, fat: 22, calories: 486 },
    dietTags: ["performance", "protein-packed"],
    allergens: ["nut-free"],
    servingCount: 5,
    stripePriceId: "price_premium_fuel_pack_single",
    stripeSubscriptionPriceId: "price_premium_fuel_pack_weekly",
  },
];
