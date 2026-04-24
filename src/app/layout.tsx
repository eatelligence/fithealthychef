import type { Metadata } from "next";
import "./globals.css";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fithealthychef.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fit & Healthy Chef | Premium Meal Prep Delivery Sydney",
    template: "%s | Fit & Healthy Chef",
  },
  description:
    "Restaurant-quality fresh meal prep delivered to your door in Sydney. Chef Michele Laiso — 25+ years in Michelin-star kitchens. Never frozen. Nutritionist-approved.",
  keywords: [
    "healthy meal prep delivery Sydney",
    "meal prep Sydney",
    "private chef Sydney",
    "fresh meals delivered Sydney",
    "nutritionist approved meal prep",
    "Home Foodz",
  ],
  openGraph: {
    siteName: "Fit & Healthy Chef",
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="bg-cream-50 text-olive-900 antialiased">
        <PromoBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
