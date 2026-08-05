"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "overflow-hidden",
        rounded && "rounded",
        className,
      )}
      style={{ aspectRatio: aspect, perspective: 800 }}
    >
      <motion.div
        style={{ rotateX, rotateY, background: STRIPE_VARIANTS[variant] }}
        className="flex h-full w-full items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "px-6 py-6 text-center font-mono text-[13px]",
            isDark ? "text-paper/40" : "text-ink/50",
          )}
        >
          [ {caption} ]
        </motion.div>
      </motion.div>
    </div>
  );
}
