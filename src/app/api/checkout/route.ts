import { NextRequest, NextResponse } from "next/server";
import { getStripe, getTierPriceId, type TierId } from "@/lib/stripe";

const VALID_TIERS: TierId[] = ["tier1", "tier2", "tier3"];

export async function POST(req: NextRequest) {
  let body: {
    tier?: string;
    withdrawalConsent?: boolean;
    nameOptIn?: boolean;
    supporterName?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { tier, withdrawalConsent, nameOptIn, supporterName } = body;

  if (!tier || !VALID_TIERS.includes(tier as TierId)) {
    return NextResponse.json({ error: "Unknown tier." }, { status: 400 });
  }

  // French/EU digital-goods law: the 14-day withdrawal-right waiver
  // must be explicit and separate from general terms — enforce it
  // server-side too, not just as a disabled submit button client-side.
  // (Sales Process Spec, section 4.)
  if (withdrawalConsent !== true) {
    return NextResponse.json(
      { error: "Withdrawal-right consent is required before checkout." },
      { status: 400 },
    );
  }

  const origin = req.nextUrl.origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: getTierPriceId(tier as TierId), quantity: 1 }],
      success_url: `${origin}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/support`,
      customer_email: undefined,
      metadata: {
        tier,
        nameOptIn: tier === "tier3" ? String(!!nameOptIn) : "false",
        supporterName: tier === "tier3" && nameOptIn ? (supporterName ?? "") : "",
        withdrawalConsent: "true",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout session creation failed", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}
