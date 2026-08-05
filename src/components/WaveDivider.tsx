"use client";

import { motion } from "framer-motion";
import { easeCustom } from "@/lib/motionVariants";

const wrapperVariants = { hidden: {}, show: {} };
const svgVariants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, ease: easeCustom } },
};

export default function WaveDivider({ fill }: { fill: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 translate-y-[1px] overflow-hidden md:h-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={wrapperVariants}
    >
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        variants={svgVariants}
        style={{ transformOrigin: "bottom" }}
      >
        <path
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,64 L1440,120 L0,120 Z"
          fill={fill}
        />
      </motion.svg>
    </motion.div>
  );
}
