import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL, freeGuideEmailHtml } from "@/lib/resend";

// URL to the hosted free preview PDF (update when deployed)
const FREE_GUIDE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/disneyland-sample-preview.pdf`;

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const firstName = name.split(" ")[0];

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your Free Guide Preview is here!",
      html: freeGuideEmailHtml(firstName, FREE_GUIDE_URL),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Free guide email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
