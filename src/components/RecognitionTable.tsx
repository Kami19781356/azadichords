"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";

export default function RecognitionTable() {
  return (
    <div>
      <motion.div
        {...reveal}
        className="mb-8 text-[13px] tracking-[0.2em] text-gold uppercase"
      >
        {content.recognition.title}
      </motion.div>
      <div className="border-t border-paper/15">
        <div className="grid grid-cols-[2fr_2fr_1fr] border-b border-paper/15 py-4 text-[13px] tracking-[0.08em] text-paper/50 uppercase">
          {content.recognition.columns.map((col) => (
            <div key={col}>{col}</div>
          ))}
        </div>
        {content.recognition.rows.map((row, i) => (
          <motion.div
            key={row.award}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 * (i + 1) }}
            className="grid grid-cols-[2fr_2fr_1fr] border-b border-paper/15 py-6 text-[17px] last:border-b-0"
          >
            <div>{row.award}</div>
            <div className="text-paper/65">{row.category}</div>
            <div>{row.year}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
