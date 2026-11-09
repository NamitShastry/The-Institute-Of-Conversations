"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldRule } from "@/components/ui/GoldRule";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { GuestsData } from "@/lib/types";
import rawGuestsData from "@content/guests.json";
import { cn } from "@/lib/utils";

const guestsData = rawGuestsData as GuestsData;

export default function GuestsPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredGuests =
    selectedTag === "All"
      ? guestsData.items
      : guestsData.items.filter((item) => item.tag === selectedTag);

  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      {/* Slow Marquee Ribbon */}
      <div className="w-full overflow-hidden py-2.5 bg-cream-deep/70 border-y border-line mb-12">
        <div className="flex space-x-12 whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-6 font-mono text-xs uppercase tracking-mono text-ink-soft">
              <span className="text-orange">✱</span>
              <span>{guestsData.marquee}</span>
              <span className="text-orange">✱</span>
              <span>The Green Room</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow number="04" label="OUR GUESTS" className="mb-3" />
          <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mt-2">
            The <span className="font-accent text-ink">Green Room</span>
          </h1>
          <p className="font-serif italic text-ink-soft text-lg sm:text-2xl mt-3">
            &ldquo;{guestsData.description}&rdquo;
          </p>
          <GoldRule />

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {guestsData.filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedTag(category)}
                className={cn(
                  "px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-mono transition-all",
                  selectedTag === category
                    ? "bg-orange-strong text-cream font-medium shadow-soft"
                    : "bg-paper text-ink-soft hover:text-ink border border-line"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Arched Stage Doors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 justify-items-center max-w-6xl mx-auto">
          {filteredGuests.map((guest) => (
            <ArchFrame key={guest.id} guest={guest} />
          ))}
        </div>

        {/* Footnote on In-Camera Privacy */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-deep/70 border border-line font-mono text-xs text-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            <span>Invitations and session recordings remain confidential until official broadcast.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
