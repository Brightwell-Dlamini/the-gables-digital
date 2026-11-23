import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Production: forward to email/CRM (Resend, SendGrid, Supabase, etc.)
    console.log("[contact]", {
      name,
      email,
      subject: subject ?? "general",
      message: String(message).slice(0, 200),
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, received: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
