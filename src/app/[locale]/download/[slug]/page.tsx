import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getContent } from "@/lib/getContent";
import DownloadStart from "@/components/sections/DownloadStart";

// Free downloads exist on the Persian site only. Any other locale is
// sent to the music page instead.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = getContent("fa").releases.find((r) => r.slug === slug);
  return {
    title: release ? `دانلودِ «${release.title}» — آکوردهای آزادی` : "دانلود — آکوردهای آزادی",
    robots: { index: false, follow: true },
  };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "fa") redirect("/en/music");
  const release = getContent("fa").releases.find((r) => r.slug === slug);
  if (!release) notFound();
  return <DownloadStart slug={release.slug} />;
}
