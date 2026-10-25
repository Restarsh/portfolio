import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

function isNonEmptyString(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function looksLikeEmail(value: string): boolean {
  // Deliberately permissive: the only reliable validation is sending the mail.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let body: Partial<Payload>;

  try {
    body = (await req.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Report success so they do not retry.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const { name, email, message } = body;

  if (!isNonEmptyString(name, 120)) {
    return NextResponse.json({ error: "Please include your name." }, { status: 422 });
  }
  if (!isNonEmptyString(email, 254) || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "Please include a valid email address." }, { status: 422 });
  }
  if (!isNonEmptyString(message, 5000)) {
    return NextResponse.json(
      { error: "Please include a message under 5,000 characters." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Fail loudly rather than pretending to send. The UI surfaces this and
  // offers the visitor a direct email link instead.
  if (!apiKey || !to || !from) {
    console.error("[contact] missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 503 },
    );
  }

  const text = [
    `From: ${name} <${email}>`,
    "",
    message.trim(),
    "",
    "---",
    "Sent from the portfolio contact form.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Lets you hit reply without copying the address across.
        reply_to: email,
        subject: `Portfolio message from ${name.trim()}`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] resend rejected the message:", res.status, detail);
      return NextResponse.json(
        { error: "The message could not be delivered. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] network failure calling resend:", err);
    return NextResponse.json(
      { error: "The message could not be delivered. Please email me directly." },
      { status: 502 },
    );
  }
}
