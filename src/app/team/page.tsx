import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldRule } from "@/components/ui/GoldRule";
import { OrgHierarchyTree } from "@/components/team/OrgHierarchyTree";
import { TeamData } from "@/lib/types";
import rawTeamData from "@content/team.json";

const teamData = rawTeamData as TeamData;

export const metadata: Metadata = {
  title: "Our Team · The Ensemble | Institute of Conversations · MNIT Jaipur",
  description: "The leadership, mentors, and student ensemble powering the Institute of Conversations at MNIT Jaipur.",
};

export default function TeamPage() {
  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow number="04" label="OUR TEAM" className="mb-3" />
          <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mt-2">
            The <span className="font-accent text-ink">Ensemble</span>
          </h1>
          <p className="font-serif italic text-ink-soft text-lg sm:text-xl mt-3">
            &ldquo;A structured institution for long-form dialogue, research, and institutional memory.&rdquo;
          </p>
          <GoldRule />
        </div>

        {/* Dynamic Org Chart Hierarchy Tree */}
        <OrgHierarchyTree data={teamData} />
      </div>
    </div>
  );
}
