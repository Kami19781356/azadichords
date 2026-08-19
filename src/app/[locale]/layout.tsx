import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Work_Sans, Vazirmatn } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/lib/ContentProvider";
import type { Locale } from "@/lib/content.types";
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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Azadichords — Independent Music Label, Paris",
  description:
    "An independent label for the voice that refuses to be silent.",
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
      className={`${bodoniModa.variable} ${workSans.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col bg-ink text-paper ${locale === "fa" ? "font-farsi" : ""}`}
      >
        <ContentProvider locale={locale as Locale}>
          <Preloader />
          <CustomCursor />
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
