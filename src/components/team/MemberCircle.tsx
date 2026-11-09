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
      name: "text-sm sm:text-base font-display font-semibold",
      designation: "text-[10px] sm:text-[11px] tracking-mono font-mono",
      ringWidth: "p-0.5",
    },
    md: {
      circle: "w-20 h-20 sm:w-22 sm:h-22",
      name: "text-xs sm:text-sm font-display font-semibold",
      designation: "text-[9px] sm:text-[10px] tracking-mono font-mono",
      ringWidth: "p-0.5",
    },
    sm: {
      circle: "w-16 h-16 sm:w-18 sm:h-18",
      name: "text-xs font-display font-semibold",
      designation: "text-[8px] sm:text-[9px] tracking-mono font-mono",
      ringWidth: "p-0.5",
    },
    xs: {
      circle: "w-12 h-12 sm:w-14 sm:h-14",
      name: "text-[11px] font-display font-semibold",
      designation: "text-[8px] tracking-mono font-mono",
      ringWidth: "p-0.5",
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
        "group flex flex-col items-center text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-card p-2 transition-transform duration-200 hover:-translate-y-1 select-none",
        className
      )}
    >
      {/* 2px Ink Ring Avatar (Orange when active/hovered) */}
      <div
        className={cn(
          "relative rounded-full transition-colors duration-200 bg-paper border-2 border-ink group-hover:border-orange shadow-card",
          sizeConfig.circle,
          sizeConfig.ringWidth
        )}
      >
        {/* Inner Avatar Surface */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-cream-deep border border-line">
          <Image
            src={member.photo || "/assets/avatars/member.svg"}
            alt={member.name}
            width={100}
            height={100}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Designation (mono caps in ink-soft) */}
      <span
        className={cn(
          "mt-2 uppercase text-ink-soft group-hover:text-orange transition-colors block leading-tight font-medium",
          sizeConfig.designation
        )}
      >
        {member.designation}
      </span>

      {/* Member Name (Inter Tight 600) */}
      <h4
        className={cn(
          "text-ink tracking-tight mt-0.5 group-hover:text-ink transition-colors",
          sizeConfig.name
        )}
      >
        {member.name}
      </h4>

      {/* Year Tag if present */}
      {member.year && (
        <span className="font-mono text-[8px] uppercase tracking-mono text-ink-muted mt-0.5">
          {member.year}
        </span>
      )}
    </div>
  );
};
