import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="py-24 bg-olive-700 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-olive-600 rounded-full opacity-40" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-olive-600 rounded-full opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Start Your Week Right
          </p>
          <h2 className="font-serif text-display-md text-cream-50 mb-5 leading-tight">
            Ready to Eat Like a Champion?
          </h2>
          <p className="text-cream-200 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Join hundreds of Sydney athletes and professionals who trust Chef Michele for their weekly nutrition. Fresh, never frozen — delivered Sunday.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/menu">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
                Browse the Menu
              </Button>
            </Link>
            <Link href="/private-chef#book">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-base text-cream-50 hover:bg-olive-600">
                Book a Free Discovery Call
              </Button>
            </Link>
          </div>

          <p className="text-cream-300 text-sm">
            Use code{" "}
            <span className="bg-gold-400 text-olive-900 font-bold px-2 py-0.5 rounded">WELCOME</span>
            {" "}for <strong className="text-cream-100">$20 off</strong> your first order
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
