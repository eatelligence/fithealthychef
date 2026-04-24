import Image from "next/image";

export function ChefHero() {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
          alt="Private chef service by Chef Michele Laiso"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-900 via-olive-900/60 to-olive-900/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Private Chef Sydney
          </p>
          <h1 className="font-serif text-display-lg text-cream-50 mb-5 leading-[1.05]">
            Your Home.<br />
            <span className="text-gold-400">A Michelin-Star Experience.</span>
          </h1>
          <p className="text-cream-200 text-xl leading-relaxed max-w-lg">
            Chef Michele arrives at your home and transforms your kitchen into a fine-dining destination — for intimate dinners, milestone celebrations, corporate events, or luxury yacht experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
