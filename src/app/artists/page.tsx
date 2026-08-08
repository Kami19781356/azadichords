import type { Metadata } from "next";
import Artists from "@/components/sections/Artists";

export const metadata: Metadata = {
  title: "Kamran Rasoolzadeh — Azadichords",
  description:
    "Iranian poet, composer, and singer-songwriter. Composer and producer of CHESHMAT (2014) and Azadichords' first artist.",
};

export default function ArtistsPage() {
  return <Artists />;
}
