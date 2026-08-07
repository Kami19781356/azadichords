import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import ArtistDetail from "@/components/sections/ArtistDetail";

export function generateStaticParams() {
  return content.artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = content.artists.find((a) => a.slug === slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — Azadichords`,
    description: `${artist.role}. ${artist.intro}`,
  };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = content.artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  return <ArtistDetail artist={artist} />;
}
