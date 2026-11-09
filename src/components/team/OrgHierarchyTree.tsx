"use client";

import React, { useState } from "react";
import { TeamData, TeamMember } from "@/lib/types";
import { MemberCircle } from "@/components/team/MemberCircle";
import { MemberModal } from "@/components/team/MemberModal";
import { ChevronDown, Sparkles, Shield, Compass, Code, Mic, Users, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrgHierarchyTreeProps {
  data: TeamData;
}

export const OrgHierarchyTree: React.FC<OrgHierarchyTreeProps> = ({ data }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTeamTab, setActiveTeamTab] = useState<string>("all");
  const [expandedMobileTeams, setExpandedMobileTeams] = useState<Record<string, boolean>>({
    "social-media-editing": true,
    "content-research-hosting": true,
    "publicity-guest-outreach": true,
    "logistics-decor": true,
    "tech-team": true,
  });

  const toggleMobileTeam = (teamId: string) => {
    setExpandedMobileTeams((prev) => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const getTeamIcon = (id: string) => {
    switch (id) {
      case "social-media-editing":
        return Mic;
      case "content-research-hosting":
        return Compass;
      case "publicity-guest-outreach":
        return Users;
      case "logistics-decor":
        return Truck;
      case "tech-team":
        return Code;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="w-full relative">
      {/* 1. TIER 1: LEADERSHIP (Faculty Advisor & Student Advisor) */}
      <div className="relative mb-16 text-center">
        <div className="inline-block px-3.5 py-1 rounded-full bg-cream-deep/70 border border-line font-mono text-[10px] tracking-mono uppercase text-ink-soft mb-6">
          Institutional Governance & Advisory
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 relative z-10">
          {data.leadership.map((member) => (
            <MemberCircle
              key={member.id}
              member={member}
              size="lg"
              onClick={setSelectedMember}
            />
          ))}
        </div>

        {/* Drawn vertical ink hairline with subtle orange pulse */}
        <div className="relative w-[1px] h-12 bg-line mx-auto mt-6">
          <div className="absolute top-0 left-0 w-full h-3 bg-orange animate-pulse" />
        </div>
      </div>

      {/* 2. TIER 2: MENTORS (3rd Year) */}
      <div className="relative mb-20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-deep/70 border border-line font-mono text-[10px] tracking-mono uppercase text-ink-soft">
            <Sparkles className="w-3 h-3 text-orange" />
            <span>Advisory Mentors // 3rd Year</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
          {data.mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-paper p-5 rounded-card border border-line hover:border-orange/60 transition-colors flex flex-col items-center shadow-card relative group"
            >
              <MemberCircle
                member={mentor}
                size="md"
                onClick={setSelectedMember}
              />
              <div className="mt-3 font-mono text-[10px] text-ink-soft tracking-mono text-center border-t border-line pt-2.5 w-full">
                Mentoring:{" "}
                <span className="text-ink font-medium">
                  {mentor.mentoredTeamIds?.map((t) => t.replace(/-/g, " ")).join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dashed Secondary Mentorship Line Note (dashed at 30% ink) */}
        <div className="text-center mt-5">
          <span className="font-mono text-[10px] tracking-mono uppercase text-ink-muted border-t border-dashed border-ink/30 pt-2 inline-block px-4">
            Dashed Lines Represent Senior Advisory Mentorship to Respective Teams
          </span>
        </div>
      </div>

      {/* 3. TIER 3: EXECUTIVE CORE (President & Vice President) */}
      <div className="relative mb-24">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-deep/70 border border-line font-mono text-[10px] tracking-mono uppercase text-ink-soft">
            <Shield className="w-3 h-3 text-orange" />
            <span>Executive Command</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 relative z-10">
          {data.executives.map((exec) => (
            <MemberCircle
              key={exec.id}
              member={exec}
              size="md"
              onClick={setSelectedMember}
            />
          ))}
        </div>

        {/* Ink hairline bus dividing to the 5 teams */}
        <div className="max-w-4xl mx-auto relative mt-8 hidden md:block">
          <div className="w-full h-[1px] bg-line" />
          <div className="flex justify-between items-center -mt-[3px] px-8">
            {data.teams.map((team) => (
              <div
                key={team.id}
                className="w-1.5 h-1.5 rotate-45 bg-orange"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. TIER 4: THE FIVE OPERATIONAL TEAMS */}
      <div className="relative">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1">
            THE ENSEMBLE
          </span>
          <h3 className="font-display font-semibold text-3xl sm:text-5xl text-ink tracking-tight">
            Five Operational Wings
          </h3>
          <p className="font-sans text-sm text-ink-soft max-w-xl mx-auto mt-2 text-pretty">
            Each wing led by a 2nd Year Team Lead, operating with structured talent, training cycles, and accountability.
          </p>

          {/* Desktop Team Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTeamTab("all")}
              className={cn(
                "px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-mono transition-all",
                activeTeamTab === "all"
                  ? "bg-orange-strong text-cream font-medium shadow-soft"
                  : "bg-paper text-ink-soft hover:text-ink border border-line"
              )}
            >
              All Teams ({data.teams.reduce((acc, t) => acc + t.members.length + 1, 0)})
            </button>
            {data.teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setActiveTeamTab(team.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-mono transition-all",
                  activeTeamTab === team.id
                    ? "bg-orange-strong text-cream font-medium shadow-soft"
                    : "bg-paper text-ink-soft hover:text-ink border border-line"
                )}
              >
                {team.name} ({team.members.length + 1})
              </button>
            ))}
          </div>
        </div>

        {/* Teams Display Grid */}
        <div className="space-y-10">
          {data.teams
            .filter((t) => activeTeamTab === "all" || activeTeamTab === t.id)
            .map((team) => {
              const TeamIcon = getTeamIcon(team.id);
              const isExpanded = expandedMobileTeams[team.id];

              return (
                <div
                  key={team.id}
                  className="bg-paper border border-line rounded-card p-6 sm:p-10 relative overflow-hidden shadow-card"
                >
                  {/* Top orange trim line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange" />

                  {/* Team Wing Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-line gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-card bg-cream-deep/60 border border-line flex items-center justify-center text-orange shrink-0">
                        <TeamIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-2xl text-ink tracking-tight">
                          {team.name}
                        </h4>
                        <p className="font-sans text-xs text-ink-soft mt-0.5">
                          {team.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-cream-deep/60 border border-line text-ink-soft">
                        1 Lead + {team.members.length} Members
                      </span>
                      <button
                        onClick={() => toggleMobileTeam(team.id)}
                        className="md:hidden p-1.5 rounded-full bg-cream-deep text-ink"
                        aria-label="Toggle team view"
                      >
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded ? "rotate-180" : ""
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Team Structure Body */}
                  <div className={cn("pt-8", isExpanded ? "block" : "hidden md:block")}>
                    {/* Team Lead Section */}
                    <div className="flex flex-col items-center text-center mb-8">
                      <div className="font-mono text-[10px] uppercase tracking-mono font-medium text-orange mb-2">
                        Wing Leadership
                      </div>
                      <MemberCircle
                        member={team.lead}
                        size="sm"
                        onClick={setSelectedMember}
                      />
                      <div className="w-[1px] h-6 bg-line mt-2" />
                    </div>

                    {/* Member Grid */}
                    <div className="text-center mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-mono text-ink-muted">
                        Ensemble Members
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {team.members.map((member) => (
                        <div
                          key={member.id}
                          className="bg-cream-deep/40 p-3 rounded-card border border-line hover:border-orange/60 transition-colors flex flex-col items-center"
                        >
                          <MemberCircle
                            member={member}
                            size="xs"
                            onClick={setSelectedMember}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Member Flip-Card Modal */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};
