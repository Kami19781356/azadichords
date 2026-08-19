"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentProvider";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";

const inputClass =
  "border-0 border-b border-paper/25 bg-transparent px-1 py-3.5 font-sans text-base text-paper outline-none transition-colors duration-200 focus:border-gold";

export default function Contact() {
  const content = useContent();
  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col items-center border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <div className="w-full max-w-[560px]">
        <motion.div {...reveal} className="text-center">
          <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
            {content.contact.eyebrow}
          </div>
          <SplitReveal
            as="h2"
            text={content.contact.title}
            className="m-0 mb-4 font-serif text-[clamp(36px,5vw,56px)] font-semibold"
          />
          <p className="m-0 mb-12 text-[17px] text-paper/60">
            {content.contact.subhead}
          </p>
        </motion.div>
        <motion.form
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            name="name"
            placeholder={content.contact.fields.name}
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            placeholder={content.contact.fields.email}
            className={inputClass}
          />
          <input
            type="text"
            name="subject"
            placeholder={content.contact.fields.subject}
            className={inputClass}
          />
          <select
            name="category"
            aria-label={content.contact.fields.category}
            className="border-0 border-b border-paper/25 bg-ink px-1 py-3.5 font-sans text-base text-paper/70 outline-none"
          >
            {content.contact.categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 rounded-full bg-garnet px-4 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-garnet-hover"
          >
            {content.contact.submit}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
