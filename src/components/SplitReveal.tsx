"use client";

import { motion } from "framer-motion";
import { easeCustom } from "@/lib/motionVariants";
import type { ElementType } from "react";

const container = (stagger: number, delayChildren: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCustom } },
};

export default function SplitReveal({
  text,
  mode = "word",
  as: Tag = "span",
  className,
  stagger = 0.06,
  delayChildren = 0,
  triggerOnMount = false,
  active = true,
}: {
  text: string;
  mode?: "word" | "letter";
  as?: ElementType;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  triggerOnMount?: boolean;
  active?: boolean;
}) {
  const pieces = mode === "word" ? text.split(" ") : Array.from(text);

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        {...(triggerOnMount
          ? { animate: active ? "show" : "hidden" }
          : { whileInView: "show", viewport: { once: true, margin: "-50px" } })}
        variants={container(stagger, delayChildren)}
        style={{ display: "inline-block" }}
      >
        {pieces.map((piece, i) => (
          <motion.span
            key={`${piece}-${i}`}
            variants={item}
            style={{ display: "inline-block" }}
          >
            {piece === " " ? " " : piece}
            {mode === "word" && i < pieces.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
