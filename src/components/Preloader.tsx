"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeCustom } from "@/lib/motionVariants";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"dot" | "word" | "exit">("dot");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      queueMicrotask(() => setVisible(false));
      return;
    }
    const t1 = setTimeout(() => setPhase("word"), 350);
    const t2 = setTimeout(() => setPhase("exit"), 1100);
    const t3 = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1, scale: 1 }}
          animate={
            phase === "exit" ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeCustom }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="block h-2.5 w-2.5 rounded-full bg-gold"
              initial={{ scale: 0 }}
              animate={{ scale: phase === "dot" ? [0, 1.6, 1] : 1 }}
              transition={{ duration: 0.55, ease: easeCustom }}
            />
            <motion.span
              className="font-serif text-lg tracking-[0.14em] text-paper uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase !== "dot" ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easeCustom }}
            >
              Azadichords
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
