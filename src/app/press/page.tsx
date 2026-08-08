import type { Metadata } from "next";
import Press from "@/components/sections/Press";

export const metadata: Metadata = {
  title: "Press — Azadichords",
  description:
    "Press materials and interviews from Azadichords, an independent music label based in Paris.",
};

export default function PressPage() {
  return <Press />;
}
