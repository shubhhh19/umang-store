// ── Razorpay Order Route ──────────────────────────────────────────────────────
// When RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are configured this route creates
// a real Razorpay order. Without keys it returns a mock response so the
// checkout flow can be tested immediately.
// Replace this template with your production credentials before going live.

import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const body = await request.json();
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay payment gateway credentials are not configured" },
      { status: 500 }
    );
  }

  // ── Live mode ─────────────────────────────────────────────────────────────
  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `order_${Date.now()}`,
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
  });
}
