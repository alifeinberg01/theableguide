import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = "The Able Guide <hello@theableguide.com>";
export const REPLY_TO  = "hello@theableguide.com";

// ─── Email Templates ──────────────────────────────────────────────────────────

export function freeGuideEmailHtml(firstName: string, downloadUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FEFDF8;font-family:'Inter',system-ui,sans-serif;color:#1E293B;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,58,92,0.08);">
    <!-- Header -->
    <tr>
      <td style="background:#1E3A5C;padding:40px;text-align:center;">
        <p style="color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">The Able Guide</p>
        <h1 style="color:white;font-size:28px;margin:0;font-weight:700;">Your Free Guide is Here! 🎉</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:40px;">
        <p style="font-size:16px;line-height:1.7;color:#334155;">Hi ${firstName},</p>
        <p style="font-size:16px;line-height:1.7;color:#334155;">
          Your <strong>Sensory-Friendly Travel Starter Guide</strong> is ready and waiting for you.
          This guide is your starting point — we built it to give every family a confident foundation,
          no matter where you are in your travel journey.
        </p>

        <div style="text-align:center;margin:32px 0;">
          <a href="${downloadUrl}" style="display:inline-block;background:#C8603A;color:white;padding:16px 36px;border-radius:9999px;font-weight:700;font-size:16px;text-decoration:none;">
            Download Your Guide →
          </a>
        </div>

        <p style="font-size:14px;color:#64748B;line-height:1.7;">
          Inside you'll find pre-trip preparation strategies, the complete sensory travel kit packing list,
          visual schedule templates, and honest advice for when things don't go as planned.
        </p>

        <hr style="border:none;border-top:1px solid #E2E8F0;margin:32px 0;">
        <p style="font-size:13px;color:#94A3B8;text-align:center;">
          Questions? Reply to this email — we read every one.<br>
          The Able Guide · <a href="https://theableguide.com" style="color:#0891B2;">theableguide.com</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function purchaseConfirmationHtml(firstName: string, guideTitle: string, downloadUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FEFDF8;font-family:'Inter',system-ui,sans-serif;color:#1E293B;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,58,92,0.08);">
    <tr>
      <td style="background:#1E3A5C;padding:40px;text-align:center;">
        <p style="color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">The Able Guide</p>
        <h1 style="color:white;font-size:28px;margin:0;font-weight:700;">Thank You for Your Purchase! ✈️</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:40px;">
        <p style="font-size:16px;line-height:1.7;color:#334155;">Hi ${firstName},</p>
        <p style="font-size:16px;line-height:1.7;color:#334155;">
          Your guide is confirmed and ready to download. Get ready — you're about to feel
          a whole lot more prepared for your next adventure.
        </p>
        <div style="background:#F0F7FF;border-radius:12px;padding:20px;margin:24px 0;">
          <p style="margin:0;font-weight:700;color:#1E3A5C;font-size:14px;">Your Purchase:</p>
          <p style="margin:4px 0 0;color:#334155;">${guideTitle}</p>
        </div>
        <div style="text-align:center;margin:32px 0;">
          <a href="${downloadUrl}" style="display:inline-block;background:#C8603A;color:white;padding:16px 36px;border-radius:9999px;font-weight:700;font-size:16px;text-decoration:none;">
            Download Guide →
          </a>
        </div>
        <p style="font-size:13px;color:#94A3B8;text-align:center;">
          30-day money-back guarantee · Lifetime updates included<br>
          Questions? <a href="mailto:hello@theableguide.com" style="color:#0891B2;">hello@theableguide.com</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
