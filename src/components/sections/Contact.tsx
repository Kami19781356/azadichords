"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentProvider";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";

const inputClass =
  "border-0 border-b border-paper/25 bg-transparent px-1 py-3.5 font-sans text-base text-paper outline-none transition-colors duration-200 focus:border-gold";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const content = useContent();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      category: data.get("category"),
      message: data.get("message"),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

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
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            name="name"
            required
            placeholder={content.contact.fields.name}
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            required
            placeholder={content.contact.fields.email}
            className={inputClass}
          />
          <input
            type="text"
            name="subject"
            required
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
          <textarea
            name="message"
            required
            rows={5}
            placeholder={content.contact.fields.message}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-4 rounded-full bg-garnet px-4 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-garnet-hover disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {status === "sending" ? content.contact.sending : content.contact.submit}
          </button>
          {status === "success" && (
            <p className="m-0 text-center text-sm text-gold">
              {content.contact.successMessage}
            </p>
          )}
          {status === "error" && (
            <p className="m-0 text-center text-sm text-garnet">
              {content.contact.errorMessage}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
