import type { Metadata } from "next";
import Link from "next/link";
import { CustomMealBuilder } from "@/components/menu/custom/CustomMealBuilder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fithealthychef.com.au";

export const metadata: Metadata = {
  title: "Create Your Own Meal — Custom Meal Builder Sydney",
  description:
    "Build your perfect meal with Chef Michele's fresh ingredients. Choose your protein, sides, and sauce — see live macros and order for delivery across Sydney.",
  alternates: { canonical: `${SITE_URL}/menu/create-your-own` },
  openGraph: {
    title: "Create Your Own Meal | Fit & Healthy Chef Sydney",
    description: "Custom meal builder — choose protein, sides & sauce. Live macro calculator. Fresh delivery across Sydney.",
    url: `${SITE_URL}/menu/create-your-own`,
  },
};

export default function CreateYourOwnPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-br from-olive-900 to-olive-700 text-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cream-300 text-sm mb-5">
            <Link href="/menu" className="hover:text-gold-400 transition-colors">Menu</Link>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-cream-50">Create Your Own</span>
          </div>

          <div className="max-w-2xl">
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Build Your Perfect Meal
            </p>
            <h1 className="font-serif text-display-lg text-cream-50 mb-4 leading-tight">
              Create Your Own
            </h1>
            <p className="text-cream-200 text-lg leading-relaxed mb-8">
              Mix and match from Chef Michele's premium fresh ingredients. Pick your protein, choose your sides, add a sauce — and watch your macros update in real time.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              {[
                { icon: "🥩", text: "8 premium proteins" },
                { icon: "🥦", text: "11 sides & veggies" },
                { icon: "🫙", text: "8 house-made sauces" },
                { icon: "📊", text: "Live macro calculator" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-2 text-cream-300">
                  <span>{item.icon}</span> {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Builder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CustomMealBuilder />
      </div>

      {/* Back to menu strip */}
      <div className="bg-cream-100 border-t border-cream-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-olive-900">Prefer a ready-made meal?</p>
            <p className="text-olive-500 text-sm">Browse Chef Michele's curated weekly menu — already optimised for performance.</p>
          </div>
          <Link
            href="/menu"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-olive-600 text-cream-50 font-medium rounded-full hover:bg-olive-700 transition-colors"
          >
            ← Back to Full Menu
          </Link>
        </div>
      </div>
    </>
  );
}
