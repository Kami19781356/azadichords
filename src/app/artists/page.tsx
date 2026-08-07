import type { Metadata } from "next";
import Artists from "@/components/sections/Artists";

export const metadata: Metadata = {
  title: "Artists — Azadichords",
  description:
    "The voices of Azadichords, an independent music label based in Paris.",
};

export default function ArtistsPage() {
  return <Artists />;
}
