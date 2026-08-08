"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-paper/8 bg-ink/85 backdrop-blur-md">
      <div className="flex items-center justify-between gap-12 px-6 py-5 md:px-12">
        <Link href="/" className="flex-none">
          <span className="block font-serif text-xl font-semibold tracking-[0.02em] text-paper">
            {content.nav.brand}
          </span>
          <span className="block text-[10px] tracking-[0.15em] text-gold/80 uppercase">
            {content.nav.tagline}
          </span>
        </Link>
        <div className="ms-auto hidden flex-wrap justify-end gap-8 md:flex">
          {content.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] tracking-[0.06em] uppercase transition-colors duration-200 hover:text-gold hover:opacity-100",
                pathname === link.href ? "text-gold opacity-100" : "text-paper/80",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex-none text-paper md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-1 border-t border-paper/8 px-6 pb-6 md:hidden">
          {content.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-[13px] tracking-[0.06em] uppercase transition-colors duration-200 hover:text-gold",
                pathname === link.href ? "text-gold" : "text-paper/80",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
