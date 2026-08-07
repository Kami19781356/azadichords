import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Azadichords",
  description: "For music, press, or performance inquiries.",
};

export default function ContactPage() {
  return <Contact />;
}
