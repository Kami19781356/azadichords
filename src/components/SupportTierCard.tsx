"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerChild } from "@/lib/motionVariants";
import type { SupportTier } from "@/lib/content.types";

const TIER_IDS = ["tier1", "tier2", "tier3"] as const;

export default function SupportTierCard({
  tier,
  index,
}: {
  tier: SupportTier;
  index: number;
}) {
  const tierId = TIER_IDS[index] ?? "tier1";
  const isTier3 = tierId === "tier3";

  const [open, setOpen] = useState(false);
  const [withdrawalConsent, setWithdrawalConsent] = useState(false);
  const [nameOptIn, setNameOptIn] = useState(false);
  const [supporterName, setSupporterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tier: tierId,
          withdrawalConsent,
          nameOptIn: isTier3 ? nameOptIn : false,
          supporterName: isTier3 && nameOptIn ? supporterName : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <motion.div
      {...staggerChild}
      whileHover={open ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded border border-paper/12 p-8"
    >
      <div className="mb-3 text-[13px] tracking-[0.15em] text-gold uppercase">
        {tier.name}
      </div>
      <h3 className="m-0 mb-4 font-serif text-2xl font-semibold">
        {tier.title}
      </h3>
      <p className="m-0 mb-4 text-[15px] leading-[1.7] text-paper/65">
        {tier.description}
      </p>
      {tier.note && (
        <p className="m-0 mb-4 border-t border-paper/12 pt-4 text-[13px] leading-[1.6] text-paper/45">
          {tier.note}
        </p>
      )}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-auto rounded-full border border-gold px-6 py-3 text-[13px] tracking-[0.08em] text-gold uppercase transition-colors duration-200 hover:bg-gold hover:text-ink"
        >
          Support — {tier.title}
        </button>
      ) : (
        <div className="mt-auto flex flex-col gap-4 border-t border-paper/12 pt-5">
          {isTier3 && (
            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-2 text-[13px] leading-[1.5] text-paper/75">
                <input
                  type="checkbox"
                  checked={nameOptIn}
                  onChange={(e) => setNameOptIn(e.target.checked)}
                  className="mt-1"
                />
                Include my name publicly (opt-in — default is anonymous, listed
                as &ldquo;A Founding Supporter&rdquo;)
              </label>
              {nameOptIn && (
                <input
                  type="text"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  placeholder="Name to display"
                  className="border-0 border-b border-paper/25 bg-transparent px-1 py-2 text-sm text-paper outline-none focus:border-gold"
                />
              )}
            </div>
          )}

          <label className="flex items-start gap-2 text-[13px] leading-[1.5] text-paper/75">
            <input
              type="checkbox"
              checked={withdrawalConsent}
              onChange={(e) => setWithdrawalConsent(e.target.checked)}
              className="mt-1"
            />
            I understand this is digital content and agree to waive my 14-day
            withdrawal right upon delivery.
          </label>

          {error && <p className="m-0 text-[13px] text-garnet">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              disabled={!withdrawalConsent || loading}
              onClick={handleCheckout}
              className="rounded-full bg-garnet px-6 py-3 text-[13px] tracking-[0.08em] text-paper uppercase transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-garnet-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Redirecting…" : "Continue to Payment"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[13px] tracking-[0.06em] text-paper/50 uppercase transition-colors duration-200 hover:text-paper"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
