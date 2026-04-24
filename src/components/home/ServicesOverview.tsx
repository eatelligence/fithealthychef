import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

const SERVICES = [
  {
    title: "Weekly Meal Prep Delivery",
    tagline: "Eat Like a Champion. Zero Effort.",
    description:
      "Fresh, nutritionist-approved meals crafted by Chef Michele and delivered to your door every week. With transparent macro tracking and allergen filters, fuelling your performance has never been this delicious — or this simple.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=85",
    href: "/menu",
    cta: "Browse the Menu",
    highlights: ["Fresh, never frozen", "Nutritionist-approved", "Macro & allergen labels", "Flexible weekly subscription"],
  },
  {
    title: "Private Chef & Event Catering",
    tagline: "Your Home. A Michelin-Star Experience.",
    description:
      "Chef Michele arrives at your home, transforms your kitchen into a fine-dining restaurant, and creates a bespoke culinary experience — for intimate dinners, birthday celebrations, corporate events, or luxury yacht service.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85",
    href: "/private-chef",
    cta: "Book a Discovery Call",
    highlights: ["In-home private dining", "Corporate event catering", "Luxury yacht service", "Custom menus"],
    reversed: true,
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {SERVICES.map((service, i) => (
          <AnimatedSection key={service.title} delay={0.1}>
            <div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                service.reversed ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-xl ${service.reversed ? "lg:col-start-2" : ""}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-900/40 to-transparent" />
              </div>

              {/* Content */}
              <div className={service.reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                <p className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                  Service 0{i + 1}
                </p>
                <h2 className="font-serif text-display-md text-olive-900 mb-3 leading-tight">
                  {service.title}
                </h2>
                <p className="font-serif text-xl text-olive-600 italic mb-5">{service.tagline}</p>
                <p className="text-olive-600 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Highlights */}
                <ul className="grid grid-cols-2 gap-2 mb-10">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-olive-700">
                      <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>

                <Link href={service.href}>
                  <Button size="lg" variant="primary">
                    {service.cta}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
