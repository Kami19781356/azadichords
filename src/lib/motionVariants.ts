export const easeCustom = [0.16, 1, 0.3, 1] as const;
export const hoverSpring = { type: "spring", stiffness: 300, damping: 25 } as const;

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: easeCustom },
};

export const staggerParent = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-50px" },
  variants: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
};

export const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCustom } },
  },
};

export const cardHover = { whileHover: { scale: 1.015, transition: hoverSpring } };

export function heroStep(translate: number, delay: number) {
  return {
    initial: { opacity: 0, y: translate },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeCustom, delay: delay / 1000 },
  };
}
