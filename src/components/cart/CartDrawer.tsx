"use client";

import { useCartStore, useCartSubtotal, useCartTotal, useCartItemCount } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoDiscount = useCartStore((s) => s.promoDiscount);
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const itemCount = useCartItemCount();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const router = useRouter();

  useScrollLock(isOpen);

  const handlePromo = () => {
    if (!promoInput.trim()) return;
    const valid = applyPromoCode(promoInput.trim());
    if (!valid) {
      setPromoError("Invalid promo code. Try WELCOME for $20 off.");
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    closeCart();
    router.push("/checkout");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
          <div>
            <h2 className="font-serif text-xl text-olive-900">Your Order</h2>
            <p className="text-sm text-olive-500">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={closeCart} className="p-2 text-olive-600 hover:text-olive-900 transition-colors" aria-label="Close cart">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-olive-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-serif text-lg text-olive-700 mb-1">Your cart is empty</p>
              <p className="text-sm text-olive-500">Add some delicious meals to get started</p>
            </div>
          ) : (
            items.map((item) => {
              const price = item.isSubscription
                ? item.meal.subscriptionPrice
                : item.meal.price;
              return (
                <div key={`${item.meal.id}-${item.isSubscription}`} className="flex gap-4 bg-white rounded-xl p-3 shadow-sm">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.meal.image} alt={item.meal.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-olive-900 text-sm leading-tight truncate">{item.meal.name}</p>
                    {item.isSubscription && (
                      <span className="text-[10px] bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full font-medium">Weekly</span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-cream-300 rounded-full">
                        <button onClick={() => updateQuantity(item.meal.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-olive-600 hover:text-olive-900 text-lg leading-none">−</button>
                        <span className="w-6 text-center text-sm font-medium text-olive-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.meal.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-olive-600 hover:text-olive-900 text-lg leading-none">+</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-olive-900">{formatPrice(price * item.quantity)}</p>
                        <button onClick={() => removeItem(item.meal.id)} className="text-olive-400 hover:text-red-500 transition-colors" aria-label="Remove">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-cream-200 space-y-4 bg-white">
            {/* Promo code */}
            {!promoCode ? (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                    placeholder="Promo code (e.g. WELCOME)"
                    className="flex-1 px-3 py-2 text-sm border border-cream-300 rounded-lg bg-cream-50 focus:outline-none focus:border-olive-400"
                  />
                  <button onClick={handlePromo} className="px-4 py-2 bg-olive-600 text-cream-50 text-sm rounded-lg hover:bg-olive-700 transition-colors font-medium">
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
              </div>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-olive-700">
                  <svg className="w-4 h-4 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
                  </svg>
                  Code <strong className="text-gold-600">{promoCode}</strong> applied
                </span>
                <span className="text-gold-600 font-semibold">-{formatPrice(promoDiscount)}</span>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-olive-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-gold-600">
                  <span>Discount</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-olive-900 text-base pt-1 border-t border-cream-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            <p className="text-center text-xs text-olive-400">
              Secure checkout via Stripe · Free delivery in Sydney
            </p>
          </div>
        )}
      </div>
    </>
  );
}
