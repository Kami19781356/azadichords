import type { Metadata } from "next";
import Submissions from "@/components/sections/Submissions";

export const metadata: Metadata = {
  title: "For the Next Voice — Submit Your Music — Azadichords",
  description:
    "Azadichords is an independent Persian label reviewing music submissions from artists whose work needed a home beyond permission.",
};

export default function SubmissionsPage() {
  return <Submissions />;
}
