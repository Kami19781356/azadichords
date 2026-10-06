import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Work_Sans, Vazirmatn, Noto_Naskh_Arabic } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/lib/ContentProvider";
import type { Locale } from "@/lib/content.types";
import { SITE_URL, SITE_INDEXABLE } from "@/lib/site";
import "../globals.css";

const LOCALES: Locale[] = ["en", "fa"];

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

// Persian headings: a classical Naskh serif (mirroring Bodoni Moda's
// editorial-serif role on the English site) instead of reusing
// Vazirmatn for everything, which flattened the heading/body contrast
// the brand relies on.
const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Azadichords — Independent Label & Festival for Free Voices, Paris",
  description:
    "A home for free voices: an independent music label and an international festival, based in Paris.",
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
