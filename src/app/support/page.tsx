import type { Metadata } from "next";
import Support from "@/components/sections/Support";

export const metadata: Metadata = {
  title: "Support the Project — Azadichords",
  description:
    "Azadichords is fully independent. Support brings this music directly to a stage.",
};

export default function SupportPage() {
  return <Support />;
}
