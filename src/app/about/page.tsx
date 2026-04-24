import type { Metadata } from "next";
import Script from "next/script";
import { ChefStory } from "@/components/about/ChefStory";
import { CredentialsBanner } from "@/components/about/CredentialsBanner";
import { PhotoGallery } from "@/components/about/PhotoGallery";
import { CtaBanner } from "@/components/home/CtaBanner";
import { CHEF } from "@/data/chef";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fithealthychef.com.au";

export const metadata: Metadata = {
  title: "About Chef Michele Laiso — 25+ Years of Culinary Excellence",
  description:
    "Meet Chef Michele Laiso — the man behind Fit & Healthy Chef. From Michelin-star kitchens in Rome and London to luxury super-yachts and UFC athlete nutrition in Sydney.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Chef Michele Laiso | Fit & Healthy Chef Sydney",
    description: "25+ years in Michelin-star kitchens, luxury yachts, and elite sports nutrition — now in your Sydney home.",
    url: `${SITE_URL}/about`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CHEF.name,
  jobTitle: CHEF.title,
  description: CHEF.shortBio,
  image: CHEF.portrait,
  worksFor: {
    "@type": "Organization",
    name: "Home Foodz Pty Ltd",
    url: SITE_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  knowsAbout: ["Italian cuisine", "Mediterranean cooking", "Sports nutrition", "Private chef services"],
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="jsonld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChefStory />
      <CredentialsBanner />
      <PhotoGallery />
      <CtaBanner />
    </>
  );
}
