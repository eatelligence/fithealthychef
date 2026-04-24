"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StarRating } from "@/components/ui/StarRating";
import { REVIEWS } from "@/data/reviews";

export function SocialProof() {
  const displayed = REVIEWS.slice(0, 3);

  return (
    <section className="bg-olive-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating summary */}
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase">
              What Our Clients Say
            </p>
            <div className="flex items-center gap-4">
              <p className="font-serif text-6xl text-cream-50 leading-none">5.0</p>
              <div>
                <StarRating rating={5} size="lg" />
                <p className="text-cream-300 text-sm mt-1">ProductReview.com.au</p>
              </div>
            </div>
            <div className="h-0.5 w-16 bg-gold-400" />
          </div>
        </AnimatedSection>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayed.map((review, i) => (
            <AnimatedSection key={review.id} delay={i * 0.1}>
              <div className="bg-olive-800 rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center">
                    <span className="font-bold text-olive-900 text-sm">{review.authorInitials}</span>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <h3 className="font-serif text-lg text-cream-50 mb-2 leading-tight">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-cream-300 text-sm leading-relaxed flex-1">
                  {review.body}
                </p>
                <div className="mt-4 pt-4 border-t border-olive-700 flex items-center justify-between">
                  <p className="text-cream-400 text-xs">{review.authorName}</p>
                  {review.verifiedPurchase && (
                    <span className="text-[10px] text-gold-400 flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
