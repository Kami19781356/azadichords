"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { cn } from "@/lib/cn";

const LOCALE_LABEL: Record<string, string> = { en: "EN", fa: "FA" };

export default function Nav() {
  const content = useContent();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "fa" : "en";
  const otherPath = pathname.replace(/^\/(en|fa)/, `/${otherLocale}`);

  return (
    <nav className="sticky top-0 z-50 border-b border-paper/8 bg-ink/85 backdrop-blur-md">
      <div className="flex items-center justify-between gap-12 px-6 py-5 md:px-12">
        <Link href={localizeHref("/", locale)} className="flex-none">
          <span className="block font-serif text-xl font-semibold tracking-[0.02em] text-paper">
            {content.nav.brand}
          </span>
          <span className="block text-[10px] tracking-[0.15em] text-gold/80 uppercase">
            {content.nav.tagline}
          </span>
        </Link>
        <div className="ms-auto hidden flex-wrap items-center justify-end gap-8 md:flex">
          {content.nav.links.map((link) => {
            const href = localizeHref(link.href, locale);
            return (
              <Link
                key={link.href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={cn(
                  "border-b-2 pb-1 text-[13px] tracking-[0.06em] uppercase transition-colors duration-200 hover:text-gold hover:opacity-100",
                  pathname === href
                    ? "border-gold text-gold opacity-100"
                    : "border-transparent text-paper/80",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={otherPath}
            className="text-[13px] tracking-[0.06em] text-paper/60 uppercase transition-colors duration-200 hover:text-gold"
          >
            {LOCALE_LABEL[otherLocale]}
          </Link>
        </div>
        <div className="flex flex-none items-center gap-5 md:hidden">
          <Link
            href={otherPath}
            className="text-[13px] tracking-[0.06em] text-paper/60 uppercase transition-colors duration-200 hover:text-gold"
          >
            {LOCALE_LABEL[otherLocale]}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-paper"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-1 border-t border-paper/8 px-6 pb-6 md:hidden">
          {content.nav.links.map((link) => {
            const href = localizeHref(link.href, locale);
            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className={cn(
                  "border-s-2 py-3 ps-3 text-[13px] tracking-[0.06em] uppercase transition-colors duration-200 hover:text-gold",
                  pathname === href
                    ? "border-gold text-gold"
                    : "border-transparent text-paper/80",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
