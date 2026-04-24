"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useCartStore,
  useCartSubtotal,
  useCartTotal,
  useCartItemCount,
} from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const toggleSubscription = useCartStore((s) => s.toggleSubscription);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoDiscount = useCartStore((s) => s.promoDiscount);
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const itemCount = useCartItemCount();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handlePromo = () => {
    if (!promoInput.trim()) return;
    const valid = applyPromoCode(promoInput.trim());
    if (valid) {
      setPromoSuccess(`Code "${promoInput.toUpperCase()}" applied — $20 off!`);
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try WELCOME for $20 off your first order.");
      setPromoSuccess("");
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, promoCode }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        setCheckoutError("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setCheckoutError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-olive-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-olive-900 mb-2">Your cart is empty</h1>
          <p className="text-olive-500 mb-8">Add some meals before checking out.</p>
          <Link href="/menu">
            <Button variant="primary" size="lg">Browse the Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-cream-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-olive-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <span className="font-serif font-semibold text-olive-900 text-sm">Fit & Healthy Chef</span>
          </Link>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Link href="/menu" className="text-olive-500 hover:text-olive-700 transition-colors">Menu</Link>
            <svg className="w-4 h-4 text-olive-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-olive-900 font-medium">Checkout</span>
          </div>

          <Link href="/menu" className="text-sm text-olive-500 hover:text-olive-700 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Continue shopping
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-serif text-display-md text-olive-900 mb-8">
          Your Order
          <span className="ml-3 text-base font-sans font-normal text-olive-400">
            ({itemCount} item{itemCount !== 1 ? "s" : ""})
          </span>
        </h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* LEFT: Order items */}
          <div className="space-y-4">
            {/* Delivery info banner */}
            <div className="bg-olive-50 border border-olive-100 rounded-2xl px-5 py-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-olive-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm text-olive-700">
                <span className="font-semibold">Free delivery</span> across Sydney — orders placed by Friday delivered Sunday morning.
              </p>
            </div>

            {/* Items list */}
            <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
              <div className="divide-y divide-cream-100">
                {items.map((item, idx) => {
                  const price = item.isSubscription
                    ? item.meal.subscriptionPrice
                    : item.meal.price;
                  return (
                    <div key={`${item.meal.id}-${idx}`} className="p-5 sm:p-6">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-cream-200">
                          <Image
                            src={item.meal.image}
                            alt={item.meal.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-olive-900 leading-tight">{item.meal.name}</h3>
                              {"servingSize" in item.meal && item.meal.servingSize && (
                                <p className="text-xs text-olive-400 mt-0.5">{item.meal.servingSize}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.meal.id)}
                              className="text-olive-300 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                              aria-label="Remove item"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>

                          {/* Subscription toggle */}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <div className="flex rounded-full border border-cream-300 bg-cream-50 p-0.5 text-xs font-medium">
                              <button
                                onClick={() => item.isSubscription && toggleSubscription(item.meal.id)}
                                className={`px-3 py-1 rounded-full transition-all ${
                                  !item.isSubscription
                                    ? "bg-white text-olive-900 shadow-sm"
                                    : "text-olive-400 hover:text-olive-600"
                                }`}
                              >
                                One-off
                              </button>
                              <button
                                onClick={() => !item.isSubscription && toggleSubscription(item.meal.id)}
                                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                                  item.isSubscription
                                    ? "bg-gold-400 text-olive-900 shadow-sm"
                                    : "text-olive-400 hover:text-olive-600"
                                }`}
                              >
                                Weekly
                                <span className="text-[9px] font-bold bg-olive-900/10 px-1 rounded-full">-10%</span>
                              </button>
                            </div>
                          </div>

                          {/* Quantity + price */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1 border border-cream-300 rounded-full bg-cream-50">
                              <button
                                onClick={() => updateQuantity(item.meal.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-olive-500 hover:text-olive-900 text-lg leading-none rounded-full"
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-sm font-semibold text-olive-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.meal.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-olive-500 hover:text-olive-900 text-lg leading-none rounded-full"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-semibold text-olive-900">
                              {formatPrice(price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upsell — add more */}
            <Link
              href="/menu"
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border-2 border-dashed border-cream-300 hover:border-olive-300 hover:bg-cream-50 transition-all group"
            >
              <div className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center group-hover:bg-olive-100 transition-colors">
                <svg className="w-5 h-5 text-olive-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-olive-700">Add more meals</p>
                <p className="text-xs text-olive-400">Browse the full weekly menu</p>
              </div>
              <svg className="w-4 h-4 text-olive-400 ml-auto group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* RIGHT: Order summary */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6">
              <h2 className="font-serif text-xl text-olive-900 mb-5">Order Summary</h2>

              {/* Line totals */}
              <div className="space-y-3 text-sm mb-5">
                {items.map((item, idx) => {
                  const price = item.isSubscription
                    ? item.meal.subscriptionPrice
                    : item.meal.price;
                  return (
                    <div key={`${item.meal.id}-sum-${idx}`} className="flex justify-between text-olive-700">
                      <span className="truncate pr-4">
                        {item.meal.name}
                        {item.quantity > 1 && (
                          <span className="text-olive-400"> ×{item.quantity}</span>
                        )}
                        {item.isSubscription && (
                          <span className="ml-1 text-[10px] bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full font-medium">
                            Weekly
                          </span>
                        )}
                      </span>
                      <span className="flex-shrink-0 font-medium">{formatPrice(price * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-cream-200 mb-4" />

              {/* Promo code */}
              {!promoCode ? (
                <div className="mb-4">
                  <label className="block text-xs font-medium text-olive-600 mb-2 uppercase tracking-wide">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        setPromoError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                      placeholder="e.g. WELCOME"
                      className="flex-1 px-3 py-2.5 text-sm border border-cream-300 rounded-xl bg-cream-50 focus:outline-none focus:border-olive-400 transition-colors font-mono tracking-wider"
                    />
                    <button
                      onClick={handlePromo}
                      className="px-4 py-2.5 bg-olive-700 text-cream-50 text-sm font-medium rounded-xl hover:bg-olive-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-xs mt-1.5">{promoError}</p>
                  )}
                  <p className="text-olive-400 text-xs mt-1.5">
                    New customer? Try <span className="font-mono font-bold text-olive-600">WELCOME</span> for $20 off
                  </p>
                </div>
              ) : (
                <div className="mb-4 flex items-center justify-between bg-gold-50 border border-gold-200 rounded-xl px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-olive-700">
                    <svg className="w-4 h-4 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
                    </svg>
                    Code <strong className="font-mono text-gold-700">{promoCode}</strong> applied
                  </span>
                  <span className="text-gold-600 font-semibold text-sm">-{formatPrice(promoDiscount)}</span>
                </div>
              )}

              {promoSuccess && !promoCode && (
                <p className="text-gold-600 text-xs mb-3">{promoSuccess}</p>
              )}

              <div className="h-px bg-cream-200 mb-4" />

              {/* Totals */}
              <div className="space-y-2.5 text-sm mb-6">
                <div className="flex justify-between text-olive-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-gold-600">
                    <span>Discount ({promoCode})</span>
                    <span>−{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-olive-600">
                  <span>Delivery</span>
                  <span className="text-olive-500">Free</span>
                </div>
                <div className="h-px bg-cream-200" />
                <div className="flex justify-between font-bold text-lg text-olive-900 pt-1">
                  <span>Total</span>
                  <span className="font-serif text-2xl">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-olive-400 text-right">
                  AUD · GST included
                </p>
              </div>

              {/* Error */}
              {checkoutError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {checkoutError}
                </div>
              )}

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                className="w-full text-base"
                onClick={handleCheckout}
                isLoading={isLoading}
              >
                {isLoading ? "Redirecting to payment…" : "Pay Now — " + formatPrice(total)}
                {!isLoading && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Button>

              {/* Trust signals */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-4 text-xs text-olive-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <path d="M1 10h22" />
                    </svg>
                    Stripe Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" />
                    </svg>
                    SSL Encrypted
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Cancel anytime
                  </span>
                </div>
                <p className="text-center text-xs text-olive-400">
                  Powered by Stripe · Visa · Mastercard · Apple Pay · Google Pay
                </p>
              </div>
            </div>

            {/* Chef note */}
            <div className="bg-olive-900 rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-olive-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <div>
                <p className="text-cream-50 text-sm font-semibold mb-1">A note from Chef Michele</p>
                <p className="text-cream-300 text-xs leading-relaxed">
                  Every meal is prepared fresh on the day of delivery. Never frozen, never compromised. Thank you for trusting me with your nutrition.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
