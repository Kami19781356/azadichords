"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SIZE = 12;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    queueMicrotask(() => setEnabled(true));
    document.body.classList.add("cursor-none-custom");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, input, select, textarea"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.body.classList.remove("cursor-none-custom");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [prefersReducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full bg-gold/80"
      style={{
        width: SIZE,
        height: SIZE,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
      animate={{ scale: hovering ? 3.6 : 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
