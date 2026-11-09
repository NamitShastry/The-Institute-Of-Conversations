"use client";

import React, { useState } from "react";
import Image from "next/image";
import directorDataRaw from "@content/director.json";
import { DirectorData } from "@/lib/types";

const directorData = directorDataRaw as DirectorData;

export const DirectorSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const hasMessage =
    directorData.message &&
    Array.isArray(directorData.message) &&
    directorData.message.length > 0 &&
    directorData.message.some((p: string) => typeof p === "string" && p.trim() !== "");

  return (
    <section className="relative w-full bg-ink text-cream py-24 md:py-32 overflow-hidden border-t border-line-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow & Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            <span className="font-mono text-[11px] uppercase tracking-mono text-cream/60 font-medium">
              02 · DIRECTOR&apos;S MESSAGE
            </span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight text-cream">
            Patron-in-Chief
          </h2>
          <div className="w-12 h-[1px] bg-orange mx-auto mt-4" />
        </div>

        {/* Content Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Perfectly Round Circular Portrait (§3 & §6.3) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Soft orange glow behind */}
              <div className="absolute -inset-4 rounded-full bg-orange/20 blur-xl group-hover:bg-orange/30 transition-all duration-700 pointer-events-none" />

              {/* Offset Thin Orange Ring */}
              <div className="absolute -inset-2.5 rounded-full border border-orange/70 group-hover:border-orange transition-colors" />

              {/* Cream Mat Ring with 1px Hairline */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-84 md:h-84 rounded-full p-2 bg-cream border border-line-dark shadow-panel flex items-center justify-center">
                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-cream-deep border border-line">
                  {!imgError ? (
                    <Image
                      src={directorData.photo || "/assets/director.jpg"}
                      alt="Portrait of Prof. N. P. Padhy, Director, MNIT Jaipur"
                      fill
                      sizes="(max-width: 768px) 256px, 350px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: directorData.focus || "50% 25%" }}
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-cream-deep text-ink-soft">
                      <div className="w-24 h-24 rounded-full bg-paper border border-line mb-2" />
                      <span className="font-mono text-[10px] uppercase tracking-mono">
                        Director MNIT
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pedestal Tag */}
              <div className="text-center mt-5">
                <span className="font-mono text-[11px] uppercase tracking-mono text-orange block font-medium">
                  Office of the Director
                </span>
                <span className="font-mono text-[10px] uppercase tracking-mono text-cream/50 mt-0.5 block">
                  MNIT Jaipur
                </span>
              </div>
            </div>
          </div>

          {/* Right: Details & Blank Message Container */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="mb-8">
              <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1.5 font-medium">
                PATRON-IN-CHIEF
              </span>
              <h3 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight">
                {directorData.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-cream/70 uppercase tracking-mono mt-1.5 font-medium">
                {directorData.designation}
              </p>
            </div>

            {/* Address Container: If provided, render text; otherwise clean blank container with large orange quote mark + hairline */}
            {hasMessage ? (
              <div className="relative pl-6 border-l border-orange space-y-4 text-cream/90 font-sans text-base leading-relaxed">
                {(directorData.message as string[]).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="rounded-card border border-line-dark p-6 sm:p-8 bg-ink/60 relative">
                {/* Large Orange Quote Mark */}
                <span className="text-orange text-5xl font-serif leading-none block -mt-2 -ml-1 select-none">
                  “
                </span>

                <div className="mt-4 pt-4 border-t border-line-dark flex items-center justify-between font-mono text-[11px] uppercase tracking-mono text-cream/50">
                  <span>INAUGURAL ADDRESS</span>
                  <span className="text-orange font-medium">TO BE DELIVERED</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
