import type { Metadata } from "next";
import Manifesto from "@/components/sections/Manifesto";

export const metadata: Metadata = {
  title: "Our Story — Azadichords",
  description:
    "Azadichords began with an album that needed a home beyond permission. This is why we exist.",
};

export default function ManifestoPage() {
  return <Manifesto />;
}
