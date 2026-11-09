"use client";

import React from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MemberCircleProps {
  member: TeamMember;
  size?: "lg" | "md" | "sm" | "xs";
  onClick: (member: TeamMember) => void;
  className?: string;
}

export const MemberCircle: React.FC<MemberCircleProps> = ({
  member,
  size = "md",
  onClick,
  className,
}) => {
  const sizeConfig = {
    lg: {
      circle: "w-24 h-24 sm:w-28 sm:h-28",
      name: "text-base sm:text-lg font-bold font-sans",
      designation: "text-[10px] sm:text-xs tracking-mono font-mono",
      ringWidth: "p-1",
      glow: "shadow-subtle",
    },
    md: {
      circle: "w-20 h-20 sm:w-22 sm:h-22",
      name: "text-sm sm:text-base font-bold font-sans",
      designation: "text-[9px] sm:text-[10px] tracking-mono font-mono",
      ringWidth: "p-0.5",
      glow: "shadow-subtle",
    },
    sm: {
      circle: "w-16 h-16 sm:w-18 sm:h-18",
      name: "text-xs sm:text-sm font-semibold font-sans",
      designation: "text-[8px] sm:text-[9px] tracking-mono font-mono",
      ringWidth: "p-0.5",
      glow: "shadow-subtle",
    },
    xs: {
      circle: "w-12 h-12 sm:w-14 sm:h-14",
      name: "text-[11px] sm:text-xs font-medium font-sans",
      designation: "text-[8px] tracking-mono font-mono",
      ringWidth: "p-0.5",
      glow: "shadow-xs",
    },
  }[size];

  return (
    <div
      onClick={() => onClick(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(member);
        }
      }}
      className={cn(
        "group flex flex-col items-center text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-2xl p-2 transition-transform duration-300 hover:-translate-y-1 select-none",
        className
      )}
    >
      {/* Orange Ring Avatar with hover light sweep (peach->orange) */}
      <div
        className={cn(
          "relative rounded-full transition-all duration-500 bg-sand border-2 border-orange group-hover:border-orange-deep",
          sizeConfig.circle,
          sizeConfig.ringWidth,
          sizeConfig.glow
        )}
      >
        {/* Animated Light Sweep Aura on hover (peach -> orange) */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_0deg,transparent_0_300deg,#F7B58A_340deg,#F26A1B_360deg)] animate-spin [animation-duration:3s]" />

        {/* Inner Avatar Surface */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-cream border border-sand">
          <Image
            src={member.photo || "/assets/avatars/member.svg"}
            alt={member.name}
            width={100}
            height={100}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Designation (mono caps in ink-soft) */}
      <span
        className={cn(
          "mt-2 uppercase text-ink-soft group-hover:text-orange-deep transition-colors block leading-tight font-medium",
          sizeConfig.designation
        )}
      >
        {member.designation}
      </span>

      {/* Name (Modern grotesque bold) */}
      <h4
        className={cn(
          "text-ink tracking-tight mt-0.5 group-hover:text-ink transition-colors",
          sizeConfig.name
        )}
      >
        {member.name}
      </h4>

      {/* Year footnote if provided */}
      {member.year && size !== "xs" && (
        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft/75 mt-0.5">
          {member.year}
        </span>
      )}
    </div>
  );
};
