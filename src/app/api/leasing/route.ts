import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, persona, spaceSize } = body ?? {};

    if (!name || !email || !persona || !spaceSize) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Production: persist to CRM / email leasing team
    console.log("[leasing]", {
      name,
      email,
      persona,
      spaceSize,
      company: body.company,
      phone: body.phone,
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
