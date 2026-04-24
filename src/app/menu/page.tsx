import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { FilterSidebar } from "@/components/menu/FilterSidebar";
import { FilterChips } from "@/components/menu/FilterChips";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { BundleCard } from "@/components/menu/BundleCard";
import { ALL_MEALS } from "@/data/meals";
import { ALL_BUNDLES } from "@/data/bundles";
import { formatPrice } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fithealthychef.com.au";

export const metadata: Metadata = {
  title: "Meal Prep Delivery Menu Sydney",
  description:
    "Browse Chef Michele Laiso's weekly meal prep menu. Fresh, never frozen meals with full macro & allergen labels delivered to your door in Sydney. Order now.",
  alternates: { canonical: `${SITE_URL}/menu` },
  openGraph: {
    title: "Weekly Meal Prep Menu | Fit & Healthy Chef Sydney",
    description: "10+ restaurant-quality dishes, fresh every week. Filter by allergens, macros, and diet type.",
    url: `${SITE_URL}/menu`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Weekly Meal Prep Menu — Fit & Healthy Chef",
  itemListElement: ALL_MEALS.map((meal, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: meal.name,
      description: meal.shortDescription,
      image: meal.image,
      offers: {
        "@type": "Offer",
        price: (meal.price / 100).toFixed(2),
        priceCurrency: "AUD",
        availability: meal.isAvailable
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${meal.macros.calories} calories`,
        proteinContent: `${meal.macros.protein}g`,
        carbohydrateContent: `${meal.macros.carbs}g`,
        fatContent: `${meal.macros.fat}g`,
      },
    },
  })),
};

export default function MenuPage() {
  return (
    <>
      <Script
        id="jsonld-menu"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header */}
      <div className="bg-olive-900 text-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Updated Every Week
          </p>
          <h1 className="font-serif text-display-lg text-cream-50 mb-4">
            This Week's Menu
          </h1>
          <p className="text-cream-300 text-lg max-w-xl mx-auto">
            Fresh, nutritionist-approved meals crafted by Chef Michele. Delivered to your door across Sydney every Sunday.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            {[
              { icon: "🌿", text: "Fresh, never frozen" },
              { icon: "✓", text: "Nutritionist-approved" },
              { icon: "📊", text: "Full macro labels" },
              { icon: "🚚", text: "Free Sydney delivery" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-2 text-cream-300">
                <span>{item.icon}</span> {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bundle — always visible above filters */}
        <div className="mb-10">
          <BundleCard bundle={ALL_BUNDLES[0]} />
        </div>

        {/* Create Your Own CTA banner */}
        <Link href="/menu/create-your-own" className="group block mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-olive-800 to-olive-600 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  New Feature
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-cream-50 mb-2 leading-tight">
                  Create Your Own Meal
                </h2>
                <p className="text-cream-300 text-sm max-w-md">
                  Mix your favourite protein, sides & sauce — see live macros update as you build. Fully customised, chef-quality, delivered fresh.
                </p>
                <div className="flex gap-4 mt-3 text-xs text-cream-400">
                  <span>🥩 8 proteins</span>
                  <span>🥦 11 sides</span>
                  <span>🫙 8 sauces</span>
                  <span>📊 Live macros</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-3 bg-gold-400 text-olive-900 font-semibold px-6 py-3 rounded-full group-hover:bg-gold-300 transition-colors shadow-md">
                Build My Meal
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-olive-500/30 rounded-full" />
            <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-gold-400/20 rounded-full" />
          </div>
        </Link>

        <div className="flex gap-8 items-start">
          <FilterSidebar />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-olive-900">
                À La Carte Meals
              </h2>
              <p className="text-sm text-olive-500">{ALL_MEALS.length} dishes</p>
            </div>
            <FilterChips />
            <MenuCatalog />
          </div>
        </div>
      </div>
    </>
  );
}
