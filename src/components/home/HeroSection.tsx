"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85"
          alt="Restaurant-quality fresh meal prep by Chef Michele Laiso"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-olive-900/90 via-olive-900/70 to-olive-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sydney's Premier Culinary Experience
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-serif text-display-lg text-cream-50 leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Restaurant Quality.<br />
            <span className="text-gold-400">Delivered to You.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-cream-200 text-xl leading-relaxed mb-10 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Chef Michele Laiso brings Michelin-star technique to your table — through weekly meal prep delivery or an intimate private dining experience in your home.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/menu">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-base px-8 py-4">
                Order Meal Prep
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </Link>
            <Link href="/private-chef">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-8 py-4 border-cream-200 text-cream-50 hover:bg-cream-50 hover:text-olive-900">
                Book a Private Chef
              </Button>
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className="flex items-center gap-6 mt-12 pt-8 border-t border-cream-200/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-cream-200 text-sm">5.0 on ProductReview.com.au</span>
            </div>
            <div className="h-8 w-px bg-cream-200/20" />
            <div className="text-cream-200 text-sm">
              <span className="text-gold-400 font-semibold">Fresh.</span> Never frozen.
            </div>
            <div className="h-8 w-px bg-cream-200/20 hidden sm:block" />
            <div className="text-cream-200 text-sm hidden sm:block">
              <span className="text-gold-400 font-semibold">25+</span> years experience
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-6 h-10 border-2 border-cream-200/40 rounded-full flex items-start justify-center pt-2">
          <motion.div
            className="w-1.5 h-2.5 bg-gold-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
