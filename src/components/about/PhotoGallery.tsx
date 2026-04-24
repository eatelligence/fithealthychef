"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Chef Michele plating a dish",
    aspect: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Elegant private dining table setting",
    aspect: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    alt: "Fresh ingredients prepared for meal prep",
    aspect: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    alt: "Colourful nutritious meal bowl",
    aspect: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    alt: "Premium salmon dish with garnish",
    aspect: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    alt: "Beautifully plated gourmet meal",
    aspect: "tall",
  },
];

export function PhotoGallery() {
  return (
    <section className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="The Art of Food"
            title="Seen Through the Lens"
            subtitle="A visual glimpse into Chef Michele's world — where every dish is a canvas and every meal is a masterpiece."
          />
        </AnimatedSection>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="break-inside-avoid overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  img.aspect === "tall"
                    ? "h-80"
                    : img.aspect === "wide"
                    ? "h-48"
                    : "h-64"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
