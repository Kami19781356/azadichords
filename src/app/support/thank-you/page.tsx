import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Azadichords",
  description: "Your support has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-24 text-center md:px-16">
      <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
        Support
      </div>
      <h1 className="m-0 mb-6 font-serif text-[clamp(36px,5vw,56px)] font-semibold">
        Thank You
      </h1>
      <p className="m-0 mb-2 max-w-[520px] text-lg leading-[1.7] text-paper/75">
        Your support has been received. A receipt and your download link are
        on their way to your inbox.
      </p>
      <p className="m-0 mb-12 max-w-[520px] text-sm leading-[1.6] text-paper/45">
        Nothing arrived after a few minutes? Check spam, or use the contact
        form and we&rsquo;ll sort it out.
      </p>
      <Link
        href="/"
        className="rounded-full border border-paper px-9 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-colors duration-[250ms] hover:bg-paper hover:text-ink"
      >
        Back to Azadichords
      </Link>
    </section>
  );
}
