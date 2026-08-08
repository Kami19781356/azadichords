import type { Metadata } from "next";
import Activity from "@/components/sections/Activity";

export const metadata: Metadata = {
  title: "Activity — Azadichords",
  description:
    "A running record of Azadichords' releases, performances, and milestones.",
};

export default function ActivityPage() {
  return <Activity />;
}
