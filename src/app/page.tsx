import type { Metadata } from "next";
import Script from "next/script";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProof } from "@/components/home/SocialProof";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { ChefBio } from "@/components/home/ChefBio";
import { CtaBanner } from "@/components/home/CtaBanner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fithealthychef.com.au";

export const metadata: Metadata = {
  title: "Fit & Healthy Chef | Premium Meal Prep Delivery Sydney",
  description:
    "Restaurant-quality fresh meal prep delivered to your door in Sydney. Chef Michele Laiso — 25+ years in Michelin-star kitchens. Fresh, never frozen. Nutritionist-approved.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Fit & Healthy Chef — Restaurant Quality, Delivered",
    description: "Weekly meal prep and private chef services in Sydney. Fresh, never frozen.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Fit & Healthy Chef",
  description:
    "Premium meal prep delivery and private chef services in Sydney, Australia. Chef Michele Laiso brings Michelin-star quality to your home.",
  url: SITE_URL,
  telephone: "+61-2-0000-0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  legalName: "Home Foodz Pty Ltd",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: "47",
  },
  priceRange: "$$",
  currenciesAccepted: "AUD",
  servesCuisine: ["Italian", "Mediterranean", "International"],
  founder: {
    "@type": "Person",
    name: "Michele Laiso",
    jobTitle: "Executive Chef",
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="jsonld-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <SocialProof />
      <ServicesOverview />
      <FeaturedDishes />
      <ChefBio />
      <CtaBanner />
    </>
  );
}
