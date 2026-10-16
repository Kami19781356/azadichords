import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/lib/ContentProvider";
import type { Locale } from "@/lib/content.types";
import { SITE_URL, SITE_INDEXABLE } from "@/lib/site";
import "../globals.css";

const LOCALES: Locale[] = ["en", "fa"];

// Fonts are bundled in src/fonts (from the open-source Fontsource
// packages), so building never depends on reaching Google.
const bodoniModa = localFont({
  variable: "--font-bodoni",
  display: "swap",
  src: [
    { path: "../../fonts/bodoni-moda-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/bodoni-moda-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const workSans = localFont({
  variable: "--font-work-sans",
  display: "swap",
  src: [
    { path: "../../fonts/work-sans-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/work-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/work-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/work-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

const vazirmatn = localFont({
  variable: "--font-vazirmatn",
  display: "swap",
  src: [
    { path: "../../fonts/vazirmatn-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/vazirmatn-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/vazirmatn-arabic-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/vazirmatn-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

// Persian headings: a classical Naskh serif (mirroring Bodoni Moda's
// editorial-serif role on the English site) instead of reusing
// Vazirmatn for everything, which flattened the heading/body contrast
// the brand relies on.
const notoNaskhArabic = localFont({
  variable: "--font-noto-naskh-arabic",
  display: "swap",
  src: [
    { path: "../../fonts/noto-naskh-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/noto-naskh-arabic-arabic-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/noto-naskh-arabic-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Azadichords — Independent Label & Song Festival, Paris",
  description:
    "A home for free voices: an independent music label and a song festival, based in Paris.",
  applicationName: "Azadichords",
  robots: SITE_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Azadichords",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Azadichords — Home for Free Voices" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${bodoniModa.variable} ${workSans.variable} ${vazirmatn.variable} ${notoNaskhArabic.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col bg-ink text-paper ${locale === "fa" ? "font-farsi" : ""}`}
      >
        <ContentProvider locale={locale as Locale}>
          <Preloader />
          <SmoothScroll>
            <div className="relative w-full overflow-x-clip">
              <Nav />
              <main>{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ContentProvider>
      </body>
    </html>
  );
}
