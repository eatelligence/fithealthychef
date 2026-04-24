import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { CHEF } from "@/data/chef";

export function ChefBio() {
  return (
    <section className="py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <AnimatedSection direction="right">
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={CHEF.portrait}
                  alt={`Chef ${CHEF.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating credential card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-olive-900 text-cream-50 rounded-2xl p-5 shadow-xl max-w-[220px]">
                <p className="font-serif text-3xl text-gold-400 font-bold leading-none">25+</p>
                <p className="text-cream-200 text-sm mt-1 leading-tight">Years of international culinary excellence</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="left">
            <p className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Meet the Chef
            </p>
            <h2 className="font-serif text-display-md text-olive-900 mb-3 leading-tight">
              {CHEF.name}
            </h2>
            <p className="font-serif text-xl text-olive-600 italic mb-6">{CHEF.tagline}</p>
            <p className="text-olive-600 text-lg leading-relaxed mb-6">
              {CHEF.shortBio}
            </p>
            <p className="text-olive-600 leading-relaxed mb-10">
              {CHEF.story[0].body}
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {CHEF.credentials.slice(0, 4).map((cred) => (
                <div key={cred.label} className="flex items-center gap-3 bg-cream-100 rounded-xl p-3">
                  <div className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-olive-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-olive-800 text-xs font-medium leading-tight">{cred.label}</p>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="secondary" size="lg">
                Read Chef Michele's Story
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
