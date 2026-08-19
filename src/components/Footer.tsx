"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentProvider";
import { reveal } from "@/lib/motionVariants";

export default function Footer() {
  const content = useContent();
  return (
    <motion.footer
      {...reveal}
      className="flex flex-col items-center gap-7 border-t border-paper/8 bg-ink px-6 py-16 text-center md:px-16"
    >
      <div className="font-serif text-xl tracking-[0.02em]">
        {content.footer.copyright}
      </div>
      <div className="flex flex-wrap justify-center gap-7">
        {content.footer.social
          .filter((link) => link.href && link.href !== "#")
          .map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] tracking-[0.06em] text-paper/60 uppercase transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
      </div>
      <p className="m-0 max-w-[480px] text-[13px] text-paper/35">
        {content.footer.disclaimer}
      </p>
    </motion.footer>
  );
}
