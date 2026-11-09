"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, ExternalLink } from "lucide-react";
import { SponsorItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SealedPlacardProps {
  item: SponsorItem;
  size?: "grand" | "prominent" | "standard";
  className?: string;
}

export const SealedPlacard: React.FC<SealedPlacardProps> = ({
  item,
  size = "standard",
  className,
}) => {
  const sizeStyles = {
    grand: "h-68 sm:h-76 max-w-2xl mx-auto",
    prominent: "h-56 sm:h-60 max-w-xl mx-auto",
    standard: "h-44 sm:h-48",
  }[size];

  if (item.revealed && item.name) {
    // Unveiled / Announced State
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative rounded-xl bg-cream border-2 border-orange p-6 flex flex-col items-center justify-center text-center shadow-subtle group hover:border-orange-deep transition-colors",
          sizeStyles,
          className
        )}
      >
        {item.logo ? (
          <div className="relative w-32 h-16 mb-4">
            <Image
              src={item.logo}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <h4 className="font-sans font-bold text-2xl text-ink mb-1.5">
            {item.name}
          </h4>
        )}
        <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold">
          {item.tier}
        </span>
        {item.tag && (
          <p className="font-sans text-xs text-ink-soft mt-1.5">{item.tag}</p>
        )}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-orange-deep hover:text-ink text-xs flex items-center gap-1 font-mono uppercase tracking-mono font-semibold"
          >
            <span>Visit Partner</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </motion.div>
    );
  }

  // Sealed State (Theme Revision: --sand placards with cream inner border, small orange seal/lock glyph, slow orange breathing glow)
  return (
    <div
      className={cn(
        "relative rounded-xl bg-sand border border-sand-dark p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-subtle group hover:border-orange transition-all duration-300",
        sizeStyles,
        className
      )}
    >
      {/* Cream Inner Border Accent */}
      <div className="absolute inset-2.5 rounded-lg border border-cream/80 pointer-events-none" />

      {/* Slow Orange Breathing Glow */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-orange/0 via-orange/15 to-orange/0 opacity-40 group-hover:opacity-100 animate-pulse transition-opacity" />

      {/* Wax Seal / Lock Medallion Motif */}
      <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream border-2 border-orange shadow-orange-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
        <Lock className="w-5 h-5 text-orange" />
      </div>

      {/* Sealed Text in Mono Caps Ink */}
      <div className="relative z-10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-mono text-ink-soft font-semibold block mb-1">
          {item.tier}
        </span>
        <h4 className="font-sans font-bold text-lg sm:text-xl text-ink tracking-tight">
          Revealing Soon
        </h4>
        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft/75 mt-1 block">
          Curtain Held // In Camera
        </span>
      </div>
    </div>
  );
};
