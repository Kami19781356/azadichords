import type { Metadata } from "next";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "What the Label Offers — Azadichords",
  description:
    "Production, distribution, visual identity, live performance, and licensing support for the artists Azadichords works with.",
};

export default function ServicesPage() {
  return <Services />;
}
