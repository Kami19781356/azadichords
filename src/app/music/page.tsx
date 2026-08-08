import type { Metadata } from "next";
import Music from "@/components/sections/Music";

export const metadata: Metadata = {
  title: "Music — Azadichords",
  description:
    "Listen to releases from Azadichords, an independent Paris label for uncensored voices.",
};

export default function MusicPage() {
  return <Music />;
}
