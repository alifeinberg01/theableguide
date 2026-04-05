import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase-admin";
import { resend, FROM_EMAIL, REPLY_TO, purchaseConfirmationHtml } from "@/lib/resend";
import { DOMAIN } from "@/lib/stripe";
import type Stripe from "stripe";

// Stripe requires the raw body for signature verification — disable body parsing
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";
  const secret    = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    await handleCompletedCheckout(session);
  } catch (err) {
    console.error("Webhook processing error:", err);
    // Return 200 so Stripe doesn't retry endlessly for non-transient errors
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  const email      = session.customer_details?.email ?? "";
  const fullName   = session.customer_details?.name ?? "there";
  const firstName  = fullName.split(" ")[0] ?? "there";
  const guideId    = session.metadata?.guideId ?? "";
  const guideTitle = session.metadata?.guideTitle ?? "Your Guide";
  const amountTotal = session.amount_total ?? 0;
  const currency   = session.currency ?? "usd";

  // ── 1. Look up the PDF download URL ──────────────────────────────────────
  let pdfUrl = `${DOMAIN}/downloads/${guideId}.pdf`; // static fallback

  try {
    const guideDoc = await adminDb.collection("guides").doc(guideId).get();
    if (guideDoc.exists && guideDoc.data()?.pdfUrl) {
      pdfUrl = guideDoc.data()!.pdfUrl as string;
    } else {
      // Try finding by slug
      const q = await adminDb
        .collection("guides")
        .where("slug", "==", guideId)
        .limit(1)
        .get();
      if (!q.empty && q.docs[0].data().pdfUrl) {
        pdfUrl = q.docs[0].data().pdfUrl as string;
      }
    }
  } catch {
    // Firestore not yet seeded — fall back to static path, proceed with email
  }

  // ── 2. Send the purchase confirmation email ───────────────────────────────
  if (email) {
    await resend.emails.send({
      from:    FROM_EMAIL,
      replyTo: REPLY_TO,
      to:      email,
      subject: `Your guide is ready — ${guideTitle}`,
      html:    purchaseConfirmationHtml(firstName, guideTitle, pdfUrl),
    });
  }

  // ── 3. Record the order in Firestore ─────────────────────────────────────
  await adminDb.collection("orders").doc(session.id).set({
    id:              session.id,
    email,
    name:            fullName,
    guideId,
    guideTitle,
    amountTotal,
    currency,
    stripeSessionId: session.id,
    createdAt:       new Date().toISOString(),
  });
}
