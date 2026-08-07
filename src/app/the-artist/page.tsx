import type { Metadata } from "next";
import Artist from "@/components/sections/Artist";

export const metadata: Metadata = {
  title: "Kamran Rasoolzadeh — Azadichords",
  description:
    "Iranian poet, composer, and singer-songwriter. Creator of CHESHMAT (2014) and Azadichords' first artist.",
};

export default function TheArtistPage() {
  return <Artist />;
}
