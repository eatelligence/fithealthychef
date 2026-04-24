import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CHEF } from "@/data/chef";

export function ChefStory() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Portrait */}
          <AnimatedSection direction="right" className="lg:sticky lg:top-24">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={CHEF.portrait}
                alt={`Chef ${CHEF.name} — Private Chef Sydney`}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-3xl text-cream-50">{CHEF.name}</p>
                <p className="text-gold-400 text-sm">{CHEF.title}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Story */}
          <AnimatedSection direction="left">
            <p className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              The Chef Behind the Food
            </p>
            <h1 className="font-serif text-display-md text-olive-900 mb-3 leading-tight">
              {CHEF.name}
            </h1>
            <p className="font-serif text-xl text-olive-600 italic mb-8">{CHEF.tagline}</p>

            <div className="space-y-10">
              {CHEF.story.map((section, i) => (
                <div key={section.heading}>
                  {i > 0 && <div className="h-px bg-cream-200 mb-10" />}
                  <h2 className="font-serif text-xl text-olive-900 mb-3">{section.heading}</h2>
                  <p className="text-olive-600 leading-relaxed">{section.body}</p>
                  {i === 1 && (
                    <blockquote className="mt-6 border-l-4 border-gold-400 pl-5 py-2">
                      <p className="font-serif text-lg text-olive-800 italic leading-relaxed">
                        "Great food doesn't just nourish the body — it lifts the spirit, connects people, and creates memories that last a lifetime."
                      </p>
                      <cite className="block mt-2 text-sm text-olive-500 not-italic">— Chef Michele Laiso</cite>
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
