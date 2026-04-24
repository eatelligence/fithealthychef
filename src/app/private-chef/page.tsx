import type { Metadata } from "next";
import { ChefHero } from "@/components/private-chef/ChefHero";
import { ServiceTiers } from "@/components/private-chef/ServiceTiers";
import { SampleMenus } from "@/components/private-chef/SampleMenus";
import { BookingForm } from "@/components/private-chef/BookingForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fithealthychef.com.au";

export const metadata: Metadata = {
  title: "Private Chef Sydney — In-Home Dining & Event Catering",
  description:
    "Book Chef Michele Laiso as your private chef in Sydney. In-home dining, birthday celebrations, corporate events, and luxury yacht service. Request a free discovery call.",
  alternates: { canonical: `${SITE_URL}/private-chef` },
  openGraph: {
    title: "Private Chef Sydney | Fit & Healthy Chef",
    description: "Michelin-star quality in your own home. Intimate dinners, events, and yacht service across Sydney.",
    url: `${SITE_URL}/private-chef`,
  },
};

export default function PrivateChefPage() {
  return (
    <>
      <ChefHero />
      <ServiceTiers />
      <SampleMenus />

      {/* Booking form section */}
      <section id="book" className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: copy */}
            <AnimatedSection direction="right">
              <p className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Get in Touch
              </p>
              <h2 className="font-serif text-display-md text-olive-900 mb-5 leading-tight">
                Book Your Free Discovery Call
              </h2>
              <p className="text-olive-600 text-lg leading-relaxed mb-8">
                Tell Chef Michele about your occasion, your guests, and your vision. He'll reach out personally within 24 hours to discuss how to make your experience extraordinary.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { step: "01", title: "Submit your enquiry", desc: "Fill in the form with your event details, guest count, and dietary requirements." },
                  { step: "02", title: "Discovery call", desc: "Chef Michele contacts you personally to understand your needs and craft a tailored proposal." },
                  { step: "03", title: "Tailored menu & quote", desc: "Receive a personalised menu and transparent pricing — no surprises." },
                  { step: "04", title: "Enjoy the experience", desc: "Sit back and savour a truly world-class culinary experience in your own home." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-olive-900 text-sm font-bold">{item.step}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-olive-900 text-sm">{item.title}</p>
                      <p className="text-olive-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-olive-100 rounded-2xl p-5">
                <p className="font-semibold text-olive-900 text-sm mb-1">Not ready to book?</p>
                <p className="text-olive-600 text-sm">
                  Email us at{" "}
                  <a href="mailto:hello@fithealthychef.com.au" className="text-olive-900 underline hover:text-gold-600 transition-colors">
                    hello@fithealthychef.com.au
                  </a>{" "}
                  and Michele will personally get back to you.
                </p>
              </div>
            </AnimatedSection>

            {/* Right: form */}
            <AnimatedSection direction="left">
              <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
                <h3 className="font-serif text-xl text-olive-900 mb-6">
                  Request a Discovery Call
                </h3>
                <BookingForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
