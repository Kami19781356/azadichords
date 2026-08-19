import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Thank You — Azadichords",
    description: "Your support has been received.",
    robots: { index: false, follow: false },
  },
  fa: {
    title: "سپاسگزاریم — آزادی‌کورد",
    description: "حمایت شما دریافت شد.",
    robots: { index: false, follow: false },
  },
};

const copy: Record<
  Locale,
  { eyebrow: string; title: string; body: string; note: string; back: string }
> = {
  en: {
    eyebrow: "Support",
    title: "Thank You",
    body: "Your support has been received. A receipt and your download link are on their way to your inbox.",
    note: "Nothing arrived after a few minutes? Check spam, or use the contact form and we'll sort it out.",
    back: "Back to Azadichords",
  },
  fa: {
    eyebrow: "حمایت",
    title: "سپاسگزاریم",
    body: "حمایت شما دریافت شد. رسید و لینک دانلود به‌زودی به ایمیل شما می‌رسد.",
    note: "بعد از چند دقیقه چیزی دریافت نکردید؟ پوشه اسپم را چک کنید یا از طریق فرم تماس با ما در ارتباط باشید.",
    back: "بازگشت به آزادی‌کورد",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return meta[locale as Locale] ?? meta.en;
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "fa" ? "fa" : "en") as Locale;
  const t = copy[locale];

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-24 text-center md:px-16">
      <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
        {t.eyebrow}
      </div>
      <h1 className="m-0 mb-6 font-serif text-[clamp(36px,5vw,56px)] font-semibold">
        {t.title}
      </h1>
      <p className="m-0 mb-2 max-w-[520px] text-lg leading-[1.7] text-paper/75">
        {t.body}
      </p>
      <p className="m-0 mb-12 max-w-[520px] text-sm leading-[1.6] text-paper/45">
        {t.note}
      </p>
      <Link
        href={`/${locale}`}
        className="rounded-full border border-paper px-9 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-colors duration-[250ms] hover:bg-paper hover:text-ink"
      >
        {t.back}
      </Link>
    </section>
  );
}
