import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe() {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. See docs/SALES_SETUP.md for the Stripe setup this feature needs.",
      );
    }
    stripe = new Stripe(secretKey);
  }
  return stripe;
}

export type TierId = "tier1" | "tier2" | "tier3";

export const TIER_PRICE_ENV: Record<TierId, string> = {
  tier1: "STRIPE_PRICE_ID_TIER_1",
  tier2: "STRIPE_PRICE_ID_TIER_2",
  tier3: "STRIPE_PRICE_ID_TIER_3",
};

export function getTierPriceId(tier: TierId): string {
  const envVar = TIER_PRICE_ENV[tier];
  const priceId = process.env[envVar];
  if (!priceId) {
    throw new Error(`${envVar} is not set. See docs/SALES_SETUP.md.`);
  }
  return priceId;
}
