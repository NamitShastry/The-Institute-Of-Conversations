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
    // Unveiled / Announced State with clean mask wipe
    return (
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative rounded-card bg-paper border border-line p-6 flex flex-col items-center justify-center text-center shadow-card group hover:border-orange/60 transition-colors",
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
          <h4 className="font-display font-semibold text-2xl text-ink mb-1.5 tracking-tight">
            {item.name}
          </h4>
        )}
        <span className="font-mono text-xs uppercase tracking-mono text-orange font-medium">
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
            className="mt-3 text-orange hover:text-ink text-xs flex items-center gap-1 font-mono uppercase tracking-mono font-medium"
          >
            <span>Visit Partner</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </motion.div>
    );
  }

  // Sealed State: --paper placard with hairline border, lock glyph in --ink-muted, "Revealing Soon"
  return (
    <div
      className={cn(
        "relative rounded-card bg-paper border border-line p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-card group hover:border-orange/50 transition-colors duration-200",
        sizeStyles,
        className
      )}
    >
      {/* Minimal Lock Icon in --ink-muted */}
      <div className="relative z-10 w-11 h-11 rounded-full bg-cream-deep/60 border border-line flex items-center justify-center mb-3 text-ink-muted group-hover:text-orange transition-colors">
        <Lock className="w-4 h-4" />
      </div>

      {/* Sealed Text in Mono Caps Ink */}
      <div className="relative z-10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-mono text-ink-soft block mb-1">
          {item.tier}
        </span>
        <h4 className="font-display font-semibold text-base sm:text-lg text-ink tracking-tight">
          Revealing Soon
        </h4>
        <p className="font-mono text-[10px] uppercase tracking-mono text-ink-muted mt-1">
          CONFIDENTIAL · PARTNERSHIP ARCHIVE
        </p>
      </div>
    </div>
  );
};
