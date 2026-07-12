import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { resend, FROM_EMAIL, freeGuideEmailHtml } from "@/lib/resend";

const FREE_GUIDE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/disneyland-sample-preview.pdf`;

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer");
  const redirectBase = referer ? new URL(referer).origin : req.nextUrl.origin;

  try {
    const form = await req.formData();
    const email = String(form.get("email") ?? "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.redirect(`${redirectBase}/?subscribed=error`, 303);
    }

    await adminDb.collection("subscribers").doc(email.toLowerCase()).set(
      { email, subscribedAt: new Date().toISOString(), source: "footer" },
      { merge: true }
    );

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your Free Guide Preview is here!",
      html: freeGuideEmailHtml("there", FREE_GUIDE_URL),
    });

    return NextResponse.redirect(`${redirectBase}/?subscribed=success`, 303);
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.redirect(`${redirectBase}/?subscribed=error`, 303);
  }
}
