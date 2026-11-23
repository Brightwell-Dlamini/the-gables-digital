import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "gables_admin_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "gables-admin-dev-secret";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "gables-admin-2026";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(email: string): string {
  const exp = Date.now() + MAX_AGE * 1000;
  const body = `${email}|${exp}`;
  return `${body}|${sign(body)}`;
}

export function verifySessionToken(token: string | undefined): { email: string } | null {
  if (!token) return null;
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [email, expStr, sig] = parts;
  const body = `${email}|${expStr}`;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  const exp = Number(expStr);
  if (!exp || Date.now() > exp) return null;
  return { email };
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export function getAdminSession() {
  const jar = cookies();
  const token = jar.get(COOKIE)?.value;
  return verifySessionToken(token);
}

export { COOKIE as ADMIN_COOKIE };
