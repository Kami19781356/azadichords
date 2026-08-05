"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const STRIPE_VARIANTS = {
  warm: "repeating-linear-gradient(135deg,#e3ded3,#e3ded3_12px,#dcd6c8_12px,#dcd6c8_24px)",
  dark45: "repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a_12px,#141414_12px,#141414_24px)",
  dark135: "repeating-linear-gradient(135deg,#1a1a1a,#1a1a1a_12px,#141414_12px,#141414_24px)",
  dark90: "repeating-linear-gradient(90deg,#1a1a1a,#1a1a1a_12px,#141414_12px,#141414_24px)",
} as const;

export default function Placeholder({
  caption,
  variant,
  aspect,
  rounded = true,
  className,
}: {
  caption: string;
  variant: keyof typeof STRIPE_VARIANTS;
  aspect?: string;
  rounded?: boolean;
  className?: string;
}) {
  const isDark = variant !== "warm";
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        rounded && "rounded",
        className,
      )}
      style={{ background: STRIPE_VARIANTS[variant], aspectRatio: aspect }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "px-6 py-6 text-center font-mono text-[13px]",
          isDark ? "text-paper/40" : "text-ink/50",
        )}
      >
        [ {caption} ]
      </motion.div>
    </div>
  );
}
