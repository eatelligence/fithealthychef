import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank You for Your Order",
  description: "Your order has been confirmed. Chef Michele is preparing your fresh meals.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-serif text-display-md text-olive-900 mb-3">
          Thank You!
        </h1>
        <p className="text-xl font-serif text-olive-600 italic mb-5">
          Your order has been confirmed.
        </p>
        <p className="text-olive-600 leading-relaxed mb-8">
          Chef Michele is already thinking about your meals. You'll receive a confirmation email with your order details and estimated delivery information shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button variant="primary" size="lg">Browse the Menu Again</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="lg">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
