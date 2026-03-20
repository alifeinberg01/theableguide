import { NextRequest, NextResponse } from "next/server";
import { stripe, DOMAIN } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, guideId, title, metadata } = body;

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${DOMAIN}/purchase/success?session_id={CHECKOUT_SESSION_ID}&guide=${guideId || "custom"}`,
      cancel_url: `${DOMAIN}/guides`,
      metadata: {
        guideId: guideId || "custom",
        guideTitle: title || "The Able Guide Product",
        ...metadata,
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
