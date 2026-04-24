import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartItem } from "@/types/meal";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-04-22.dahlia",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, promoCode }: { items: CartItem[]; promoCode?: string } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = items.map((item) => {
      const priceId = item.isSubscription
        ? item.meal.stripeSubscriptionPriceId
        : item.meal.stripePriceId;
      return { price: priceId, quantity: item.quantity };
    });

    const hasSubscription = items.some((i) => i.isSubscription);
    const mode = hasSubscription ? "subscription" : "payment";

    const params = {
      mode,
      line_items: lineItems,
      success_url: `${SITE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/menu`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["AU"] },
      metadata: { source: "fithealthychef" },
    } as Parameters<typeof stripe.checkout.sessions.create>[0];

    // WELCOME coupon should be pre-created in Stripe Dashboard as a $20 discount
    if (promoCode?.toUpperCase() === "WELCOME" && mode === "payment") {
      // params.discounts = [{ coupon: "WELCOME_20" }];
    }

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
