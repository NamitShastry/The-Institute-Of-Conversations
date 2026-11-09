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
    <section className="relative w-full bg-sand text-ink py-24 md:py-32 overflow-hidden border-t border-hairline">
      {/* Background paper grain */}
      <div className="absolute inset-0 pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow & Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="font-mono text-xs uppercase tracking-mono text-ink-soft font-semibold">
              02 · DIRECTOR&apos;S MESSAGE
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-5xl tracking-tightest text-ink">
            Patron-in-Chief
          </h2>
          <div className="w-16 h-[1.5px] bg-orange mx-auto mt-4" />
        </div>

        {/* Content Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center bg-cream p-8 sm:p-12 md:p-16 rounded-3xl border border-sand-dark shadow-card relative">
          {/* Left: Perfectly Round Circular Portrait (§3) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Soft peach glow behind */}
              <div className="absolute -inset-4 rounded-full bg-peach/40 blur-xl group-hover:bg-peach/60 transition-all duration-700 pointer-events-none" />

              {/* Offset Thin Orange Ring */}
              <div className="absolute -inset-2.5 rounded-full border border-orange/60 group-hover:border-orange transition-colors" />

              {/* Cream Mat Ring with 1px Ink Hairline */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-full p-2 bg-cream border border-ink/20 shadow-subtle flex items-center justify-center">
                {/* Slow ring-sweep light on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_0deg,transparent_0_300deg,#F26A1B_340deg,transparent_360deg)] animate-spin [animation-duration:4s] pointer-events-none" />

                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-sand-light border border-hairline">
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
                    /* Neutral circular silhouette fallback */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-sand-light text-ink-soft">
                      <div className="w-24 h-24 rounded-full bg-sand border border-ink/20 mb-2" />
                      <span className="font-mono text-[10px] uppercase tracking-mono">
                        Director MNIT
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pedestal Tag */}
              <div className="text-center mt-4">
                <span className="font-mono text-[11px] uppercase tracking-mono text-orange-deep font-semibold block">
                  Office of the Director
                </span>
                <span className="font-sans text-xs text-ink-soft">
                  MNIT Jaipur
                </span>
              </div>
            </div>
          </div>

          {/* Right: Details & Blank Message Container */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold block mb-1">
                PATRON-IN-CHIEF
              </span>
              <h3 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
                {directorData.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-ink-soft uppercase tracking-mono mt-1.5 font-medium">
                {directorData.designation}
              </p>
            </div>

            <div className="w-16 h-[1.5px] bg-orange mb-6" />

            {/* Message Area: Large Orange Quote Mark + Hairline only (intentionally blank per §3) */}
            {hasMessage ? (
              <div className="space-y-4 font-sans text-ink/90 text-lg leading-relaxed relative">
                <span className="text-orange font-serif text-5xl leading-none absolute -top-6 -left-4 select-none opacity-40">
                  &ldquo;
                </span>
                {directorData.message.map((paragraph: string, idx: number) => (
                  <p key={idx} className="relative z-10 italic">
                    {paragraph}
                  </p>
                ))}
                {directorData.signature && (
                  <div className="pt-6 border-t border-hairline">
                    <p className="font-serif text-ink font-semibold text-lg">
                      {directorData.signature}
                    </p>
                    <p className="font-mono text-xs text-ink-soft uppercase tracking-mono">
                      {directorData.signatureTitle}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* When empty: Large orange quote mark + hairline only (no placeholder sentence) */
              <div className="p-8 rounded-2xl border border-sand bg-sand-light/30 relative">
                <div className="text-orange font-serif text-6xl leading-none select-none -mt-4 mb-2">
                  &ldquo;
                </div>
                <div className="h-[1px] w-full bg-sand-dark/40 mb-4" />
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-mono text-ink-soft">
                  <span>Inaugural Address</span>
                  <span className="text-orange">To Be Delivered</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
