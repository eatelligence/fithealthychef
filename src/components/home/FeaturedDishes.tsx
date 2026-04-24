import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ALL_MEALS } from "@/data/meals";
import { formatPrice } from "@/lib/utils";

export function FeaturedDishes() {
  const featured = ALL_MEALS.filter((m) => m.isFeatured).slice(0, 3);

  return (
    <section className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="This Week's Menu"
            title="Chef's Featured Dishes"
            subtitle="A glimpse at what's on the menu — fresh ingredients, precise macros, and flavours that actually make healthy eating something to look forward to."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((meal, i) => (
            <AnimatedSection key={meal.id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {meal.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="chef">{meal.badge}</Badge>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-olive-900 mb-1 leading-tight">{meal.name}</h3>
                  <p className="text-olive-500 text-sm mb-4 line-clamp-2">{meal.shortDescription}</p>

                  {/* Macros */}
                  <div className="flex gap-3 mb-4">
                    {[
                      { label: "P", value: meal.macros.protein, unit: "g" },
                      { label: "C", value: meal.macros.carbs, unit: "g" },
                      { label: "F", value: meal.macros.fat, unit: "g" },
                    ].map((m) => (
                      <div key={m.label} className="flex-1 bg-cream-100 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-olive-500 uppercase tracking-wide">{m.label === "P" ? "Protein" : m.label === "C" ? "Carbs" : "Fat"}</p>
                        <p className="text-sm font-bold text-olive-800">{m.value}{m.unit}</p>
                      </div>
                    ))}
                    <div className="flex-1 bg-gold-100 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-gold-700 uppercase tracking-wide">Cals</p>
                      <p className="text-sm font-bold text-gold-700">{meal.macros.calories}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-olive-900">{formatPrice(meal.price)}</p>
                    <Link
                      href="/menu"
                      className="text-gold-500 text-sm font-medium hover:text-gold-600 transition-colors flex items-center gap-1"
                    >
                      Order now
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-olive-700 font-medium hover:text-olive-900 transition-colors border-b-2 border-gold-400 pb-1"
          >
            View the full menu — 10+ dishes updated weekly
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
