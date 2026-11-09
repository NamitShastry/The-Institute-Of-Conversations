"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { GuestItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ArchFrameProps {
  guest: GuestItem;
  className?: string;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({ guest, className }) => {
  if (guest.revealed && guest.name) {
    // Unveiled / Announced Guest with clean mask wipe
    return (
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "group relative flex flex-col items-center text-center",
          className
        )}
      >
        <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-t-full rounded-b-2xl p-1 bg-paper border border-line shadow-card mb-4 group-hover:border-orange/60 transition-colors">
          <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-cream-deep relative">
            <Image
              src={guest.photo || "/assets/avatars/member.svg"}
              alt={guest.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-mono font-medium text-orange">
          {guest.tag}
        </span>
        <h4 className="font-display font-semibold text-lg text-ink mt-1 tracking-tight">
          {guest.name}
        </h4>
        <p className="font-sans text-xs text-ink-soft mt-0.5">
          {guest.designation} · {guest.organisation}
        </p>
      </motion.div>
    );
  }

  // Sealed Stage Door Frame: rounded portrait frame with neutral silhouette on --cream-deep, hairline tags
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center text-center",
        className
      )}
    >
      <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-t-full rounded-b-2xl p-1 bg-paper border border-line shadow-card group-hover:border-orange/50 transition-colors duration-200">
        <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-cream-deep flex flex-col items-center justify-center p-4">
          {/* Neutral Silhouette Head & Shoulders */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-paper border border-line flex items-center justify-center mb-3">
            <User className="w-9 h-9 text-ink-muted group-hover:text-ink transition-colors" />
          </div>

          {/* Minimal Lock Icon in --ink-muted */}
          <div className="relative z-10 w-7 h-7 rounded-full bg-paper border border-line flex items-center justify-center">
            <Lock className="w-3.5 h-3.5 text-ink-muted group-hover:text-orange transition-colors" />
          </div>
        </div>
      </div>

      {/* Hairline Tag Nameplate */}
      <div className="mt-4 text-center max-w-[200px]">
        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-muted block">
          {guest.tag || "Distinguished Voice"}
        </span>
        <h4 className="font-display font-semibold text-base text-ink tracking-tight mt-0.5">
          Revealing Soon
        </h4>
        <div className="w-6 h-[1px] bg-orange mx-auto my-1.5" />
        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft block">
          In Green Room
        </span>
      </div>
    </div>
  );
};
