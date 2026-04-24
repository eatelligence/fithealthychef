import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TIERS = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "In-Home Private Dining",
    description:
      "Chef Michele cooks in your kitchen for intimate dinners, date nights, birthday celebrations, and family gatherings. Arrive at the table — everything else is taken care of.",
    details: ["Minimum 4 guests", "Menu personalised to your tastes", "Full clean-up included", "Pairs perfectly with BYO wine"],
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Corporate Event Catering",
    description:
      "Elevate your client entertainment, team celebration, or product launch with a bespoke catering experience that leaves a lasting impression.",
    details: ["Groups of 10–100+", "Canape to full sit-down service", "Dietary accommodations", "Tailored to your brand"],
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Luxury Yacht Service",
    id: "yacht",
    description:
      "Drawing on years of cooking aboard super-yachts in the Mediterranean and Caribbean, Michele brings world-class cuisine to your vessel — wherever you sail.",
    details: ["Sydney Harbour & coastal cruises", "Full galley service", "Customised charter menus", "Premium provisioning"],
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Weekly Meal Prep at Home",
    description:
      "Have Chef Michele visit your home and prepare a full week of healthy, restaurant-quality meals in your own kitchen — stocked and ready to go.",
    details: ["3–5 hours in your kitchen", "5–7 days of fresh meals", "Tailored to your macros", "Shopping handled"],
  },
];

export function ServiceTiers() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            eyebrow="What We Offer"
            title="How Can Chef Michele Help?"
            subtitle="From intimate dinner parties to full-scale events aboard a superyacht — every experience is crafted to the same Michelin-level standard."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier, i) => (
            <AnimatedSection key={tier.title} delay={i * 0.1}>
              <div
                id={(tier as { id?: string }).id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
              >
                <div className="w-14 h-14 bg-olive-100 rounded-2xl flex items-center justify-center text-olive-700 mb-5">
                  {tier.icon}
                </div>
                <h3 className="font-serif text-lg text-olive-900 mb-2 leading-tight">{tier.title}</h3>
                <p className="text-olive-600 text-sm leading-relaxed mb-5 flex-1">{tier.description}</p>
                <ul className="space-y-1.5">
                  {tier.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-xs text-olive-600">
                      <div className="w-4 h-4 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-gold-500" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
