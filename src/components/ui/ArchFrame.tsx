"use client";

import React from "react";
import Image from "next/image";
import { Lock, User } from "lucide-react";
import { GuestItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ArchFrameProps {
  guest: GuestItem;
  className?: string;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({ guest, className }) => {
  if (guest.revealed && guest.name) {
    // Unveiled / Announced Guest
    return (
      <div
        className={cn(
          "group relative flex flex-col items-center text-center",
          className
        )}
      >
        <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-t-full rounded-b-2xl p-1 bg-sand border-2 border-orange shadow-subtle mb-4">
          <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-cream relative">
            <Image
              src={guest.photo || "/assets/avatars/member.svg"}
              alt={guest.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-mono font-semibold text-orange-deep">
          {guest.tag}
        </span>
        <h4 className="font-sans font-bold text-xl text-ink mt-1">
          {guest.name}
        </h4>
        <p className="font-sans text-xs text-ink-soft mt-0.5">
          {guest.designation} · {guest.organisation}
        </p>
      </div>
    );
  }

  // Sealed Stage Door Arch Frame (Theme Revision: sand arched frames with cream silhouettes, orange nameplate line, drifting peach spotlight sweep)
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center text-center",
        className
      )}
    >
      {/* Sand Stage Door Arch with Cream Silhouette */}
      <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-t-full rounded-b-2xl p-1 bg-sand border border-sand-dark shadow-subtle group-hover:border-orange transition-all duration-300">
        {/* Inner Stage Light */}
        <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-sand-light/60 flex flex-col items-center justify-center p-4">
          {/* Drifting Peach Spotlight Sweep */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(247,181,138,0.45)_0%,transparent_70%)] group-hover:opacity-100 opacity-60 transition-opacity" />

          {/* Cream Silhouette Head & Shoulders */}
          <div className="relative z-10 w-22 h-22 rounded-full bg-cream border border-sand flex items-center justify-center mb-4 shadow-xs">
            <User className="w-10 h-10 text-sand-dark group-hover:text-orange transition-colors" />
          </div>

          {/* Wax Lock Badge in Orange */}
          <div className="relative z-10 w-8 h-8 rounded-full bg-cream border border-orange flex items-center justify-center shadow-xs">
            <Lock className="w-3.5 h-3.5 text-orange" />
          </div>
        </div>
      </div>

      {/* Sealed Nameplate */}
      <div className="mt-4 text-center max-w-[200px]">
        <span className="font-mono text-[9px] uppercase tracking-mono font-semibold text-orange-deep block">
          {guest.tag || "Distinguished Voice"}
        </span>
        <h4 className="font-sans font-bold text-base text-ink tracking-tight mt-0.5">
          Revealing Soon
        </h4>
        {/* Orange nameplate line */}
        <div className="w-8 h-[1.5px] bg-orange mx-auto my-1" />
        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft block">
          In Green Room
        </span>
      </div>
    </div>
  );
};
