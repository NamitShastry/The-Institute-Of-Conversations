"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import eventsDataRaw from "@content/events.json";
import { EventsData, EventItem } from "@/lib/types";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const eventsData = eventsDataRaw as EventsData;

export default function EventsPage() {
  const [activeEventId, setActiveEventId] = useState<string>("voice-of-mnit");

  // Scroll-spy observer for sticky ribbon
  useEffect(() => {
    const handleScroll = () => {
      const sections = eventsData.events.map((e) => document.getElementById(e.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveEventId(eventsData.events[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToEvent = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderEventIllustration = (icon: string, isDark: boolean = false) => {
    const strokeColor = isDark ? "#F3EEE3" : "#111111";
    const fillColor = isDark ? "rgba(243,238,227,0.12)" : "#EAE3D3";
    const accentColor = "#D9541E";

    switch (icon) {
      case "mic":
        return (
          <svg className="w-full h-auto max-w-[260px]" viewBox="0 0 240 240" fill="none">
            <rect x="20" y="200" width="200" height="10" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="1.5"/>
            <line x1="120" y1="200" x2="120" y2="80" stroke={strokeColor} strokeWidth="4" strokeLinecap="round"/>
            <rect x="100" y="40" width="40" height="65" rx="20" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <rect x="100" y="40" width="40" height="32" rx="20" fill={strokeColor} fillOpacity="0.85"/>
            <circle cx="120" cy="56" r="3.5" fill={accentColor}/>
            <path d="M 85 75 C 85 105 155 105 155 75" stroke={strokeColor} strokeWidth="2.5" fill="none"/>
            <line x1="60" y1="40" x2="40" y2="25" stroke={accentColor} strokeWidth="2" strokeLinecap="round"/>
            <line x1="180" y1="40" x2="200" y2="25" stroke={accentColor} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "theater":
        return (
          <svg className="w-full h-auto max-w-[260px]" viewBox="0 0 240 240" fill="none">
            <rect x="25" y="40" width="190" height="110" rx="8" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <path d="M 35 130 Q 120 70 205 130" stroke={accentColor} strokeWidth="2.5" fill="none"/>
            <circle cx="120" cy="85" r="12" fill={accentColor}/>
            <circle cx="90" cy="95" r="8" fill={strokeColor}/>
            <circle cx="150" cy="95" r="8" fill={strokeColor}/>
            <rect x="40" y="170" width="160" height="18" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="1.5"/>
            <line x1="60" y1="188" x2="50" y2="215" stroke={strokeColor} strokeWidth="3"/>
            <line x1="180" y1="188" x2="190" y2="215" stroke={strokeColor} strokeWidth="3"/>
          </svg>
        );
      case "trophy":
        return (
          <svg className="w-full h-auto max-w-[260px]" viewBox="0 0 240 240" fill="none">
            <circle cx="70" cy="80" r="28" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3"/>
            <line x1="70" y1="80" x2="70" y2="60" stroke={accentColor} strokeWidth="2"/>
            <path d="M 120 40 L 170 40 C 170 85 145 105 120 105 C 95 105 70 85 70 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <path d="M 170 50 C 195 50 195 80 170 80" stroke={strokeColor} strokeWidth="2" fill="none"/>
            <path d="M 70 50 C 45 50 45 80 70 80" stroke={strokeColor} strokeWidth="2" fill="none"/>
            <line x1="120" y1="105" x2="120" y2="155" stroke={strokeColor} strokeWidth="4"/>
            <rect x="90" y="155" width="60" height="35" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <rect x="102" y="166" width="36" height="12" fill={accentColor}/>
          </svg>
        );
      case "book":
        return (
          <svg className="w-full h-auto max-w-[260px]" viewBox="0 0 240 240" fill="none">
            <path d="M 30 170 C 70 150 110 155 120 175 C 130 155 170 150 210 170 L 205 60 C 165 40 125 45 120 65 C 115 45 75 40 35 60 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <line x1="120" y1="65" x2="120" y2="175" stroke={accentColor} strokeWidth="2"/>
            <path d="M 50 85 C 80 75 105 80 110 90" stroke={strokeColor} strokeWidth="1.2"/>
            <path d="M 50 110 C 80 100 105 105 110 115" stroke={strokeColor} strokeWidth="1.2"/>
            <path d="M 130 90 C 135 80 160 75 190 85" stroke={strokeColor} strokeWidth="1.2"/>
            <path d="M 130 115 C 135 105 160 100 190 110" stroke={strokeColor} strokeWidth="1.2"/>
          </svg>
        );
      case "users":
        return (
          <svg className="w-full h-auto max-w-[260px]" viewBox="0 0 240 240" fill="none">
            <rect x="35" y="80" width="55" height="90" rx="8" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <rect x="150" y="80" width="55" height="90" rx="8" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <line x1="90" y1="125" x2="150" y2="125" stroke={accentColor} strokeWidth="2" strokeDasharray="4 3"/>
            <circle cx="120" cy="125" r="7" fill={accentColor}/>
            <line x1="45" y1="170" x2="40" y2="200" stroke={strokeColor} strokeWidth="3"/>
            <line x1="80" y1="170" x2="85" y2="200" stroke={strokeColor} strokeWidth="3"/>
            <line x1="160" y1="170" x2="155" y2="200" stroke={strokeColor} strokeWidth="3"/>
            <line x1="195" y1="170" x2="200" y2="200" stroke={strokeColor} strokeWidth="3"/>
          </svg>
        );
      case "star":
      default:
        return (
          <svg className="w-full h-auto max-w-[260px]" viewBox="0 0 240 240" fill="none">
            <polygon points="120,30 135,75 185,75 145,105 160,150 120,122 80,150 95,105 55,75 105,75" fill={accentColor} stroke={strokeColor} strokeWidth="2"/>
            <circle cx="120" cy="90" r="12" fill={fillColor} stroke={strokeColor} strokeWidth="1.5"/>
            <line x1="120" y1="150" x2="120" y2="190" stroke={strokeColor} strokeWidth="4"/>
            <rect x="80" y="190" width="80" height="20" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      {/* Header Band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            <span className="font-mono text-[11px] uppercase tracking-mono text-ink-soft">
              05 · OUR EVENTS
            </span>
          </div>

          <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mb-3">
            Our <span className="font-accent text-ink">Events</span>
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-ink-soft">
            &ldquo;Six occasions. One academic year.&rdquo;
          </p>

          <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed mt-4 max-w-2xl text-pretty">
            {eventsData.description}
          </p>
        </div>
      </div>

      {/* Sticky Calendar Ribbon (Ink hairlines with orange span markers) */}
      <div className="sticky top-16 z-30 w-full bg-cream/90 backdrop-blur-md border-y border-line py-3 mb-16 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center space-x-2 shrink-0 pr-4 border-r border-line">
            <Calendar className="w-3.5 h-3.5 text-orange" />
            <span className="font-mono text-xs uppercase tracking-mono text-ink font-medium">
              Aug → Apr Calendar
            </span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {eventsData.events.map((evt) => {
              const isActive = activeEventId === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => scrollToEvent(evt.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all flex items-center gap-1.5 whitespace-nowrap",
                    isActive
                      ? "bg-ink text-cream font-medium shadow-soft"
                      : "bg-paper hover:bg-cream-deep text-ink-soft border border-line"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-orange" : "bg-orange/40")} />
                  <span>{evt.name}</span>
                  <span className="text-[9px] opacity-60">({evt.season})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Six Editorial Event Sections (Alternating Cream & Cream-Deep; Gala Band is Full-Bleed Ink) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 md:space-y-32">
        {eventsData.events.map((event, idx) => {
          const isEven = idx % 2 === 0;
          const isGala = event.id === "annual-conversations-awards";

          return (
            <section
              key={event.id}
              id={event.id}
              className={cn(
                "scroll-mt-32 rounded-panel transition-colors",
                isGala
                  ? "bg-ink text-cream p-8 sm:p-12 md:p-16 border border-line-dark shadow-panel"
                  : idx % 2 === 1
                  ? "bg-cream-deep/40 p-8 sm:p-10 border border-line"
                  : "pt-6 border-t border-line"
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left/Right Text Content */}
                <div
                  className={cn(
                    "lg:col-span-6 flex flex-col",
                    isEven ? "lg:order-1" : "lg:order-2"
                  )}
                >
                  {/* Giant Outlined Numeral (12% opacity) + Season Chip */}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={cn(
                      "font-display font-black text-6xl sm:text-7xl md:text-8xl select-none leading-none tracking-tightest",
                      isGala ? "text-cream/12" : "text-ink/12"
                    )}>
                      {event.number}
                    </span>
                    <span className={cn(
                      "font-mono text-xs uppercase tracking-mono px-3 py-1 rounded-full border",
                      isGala ? "bg-ink border-line-dark text-orange" : "bg-paper border-line text-ink-soft"
                    )}>
                      {event.season}
                    </span>
                  </div>

                  <span className="font-mono text-xs uppercase tracking-mono text-orange mb-1 font-medium">
                    {event.subtitle}
                  </span>

                  <h2 className={cn(
                    "font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-tight mb-3",
                    isGala ? "text-cream" : "text-ink"
                  )}>
                    {event.name}
                  </h2>

                  <p className={cn(
                    "font-serif italic text-xl mb-6",
                    isGala ? "text-cream/80" : "text-ink-soft"
                  )}>
                    &ldquo;{event.hook}&rdquo;
                  </p>

                  {/* Narrative Body */}
                  <div className={cn(
                    "space-y-4 font-sans text-base leading-relaxed mb-8",
                    isGala ? "text-cream/80" : "text-ink/85"
                  )}>
                    {event.whatHappens.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Who Can Take Part & Walk Away With */}
                  <div className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-card border mb-6 text-xs font-sans",
                    isGala ? "bg-ink/60 border-line-dark text-cream/75" : "bg-paper border-line text-ink-soft"
                  )}>
                    <div>
                      <span className="font-mono uppercase tracking-mono text-orange block mb-1 font-medium">
                        Who Can Take Part
                      </span>
                      <p className="leading-relaxed">{event.whoCanTakePart}</p>
                    </div>
                    <div>
                      <span className="font-mono uppercase tracking-mono text-orange block mb-1 font-medium">
                        What Participants Gain
                      </span>
                      <p className="leading-relaxed">{event.walkAwayWith}</p>
                    </div>
                  </div>

                  {/* Output Footprint */}
                  <div className={cn(
                    "flex items-start space-x-3 p-4 rounded-card border",
                    isGala ? "bg-ink border-line-dark text-cream/80" : "bg-paper border-line text-ink-soft"
                  )}>
                    <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                    <div>
                      <span className={cn(
                        "font-mono text-[10px] uppercase tracking-mono block mb-0.5 font-medium",
                        isGala ? "text-cream" : "text-ink"
                      )}>
                        Archival & Media Footprint
                      </span>
                      <p className="font-sans text-xs leading-relaxed">
                        {event.clubOutput}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right/Left Prop Artwork, 4-Step Flow & Hairline Format Table */}
                <div
                  className={cn(
                    "lg:col-span-6 flex flex-col space-y-6",
                    isEven ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  {/* Prop Artwork Card */}
                  <div className={cn(
                    "w-full rounded-card p-8 flex items-center justify-center relative overflow-hidden border shadow-card group",
                    isGala ? "bg-ink/80 border-line-dark" : "bg-paper border-line"
                  )}>
                    <div className={cn(
                      "absolute top-3 left-4 font-mono text-[9px] uppercase tracking-mono",
                      isGala ? "text-cream/40" : "text-ink-muted"
                    )}>
                      FIG. {event.number} // {event.id.toUpperCase()}
                    </div>
                    <div className="py-4 group-hover:scale-105 transition-transform duration-300">
                      {renderEventIllustration(event.icon, isGala)}
                    </div>
                  </div>

                  {/* 4-Step Flow */}
                  <div className={cn(
                    "rounded-card p-6 border shadow-card",
                    isGala ? "bg-ink/80 border-line-dark" : "bg-paper border-line"
                  )}>
                    <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-4 font-medium">
                      How It Works // 4-Step Flow
                    </span>

                    <div className="space-y-4">
                      {event.howItWorks.map((step) => (
                        <div key={step.step} className="flex items-start space-x-3.5">
                          <span className={cn(
                            "w-6 h-6 rounded-full font-mono font-medium text-xs flex items-center justify-center shrink-0 mt-0.5 border",
                            isGala ? "bg-cream-deep/20 border-line-dark text-cream" : "bg-cream-deep border-line text-ink"
                          )}>
                            {step.step}
                          </span>
                          <div>
                            <h4 className={cn(
                              "font-display font-semibold text-sm mb-0.5 tracking-tight",
                              isGala ? "text-cream" : "text-ink"
                            )}>
                              {step.title}
                            </h4>
                            <p className={cn(
                              "font-sans text-xs leading-relaxed",
                              isGala ? "text-cream/70" : "text-ink-soft"
                            )}>
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Format At a Glance: Clean Hairline Table */}
                  <div className={cn(
                    "rounded-card border overflow-hidden shadow-card",
                    isGala ? "bg-ink/80 border-line-dark divide-y divide-line-dark" : "bg-paper border-line divide-y divide-line"
                  )}>
                    <div className="p-4 bg-cream-deep/30 flex items-center justify-between">
                      <h4 className={cn(
                        "font-mono text-xs uppercase tracking-mono font-medium",
                        isGala ? "text-cream" : "text-ink"
                      )}>
                        Format At a Glance
                      </h4>
                      <span className="font-mono text-[9px] uppercase tracking-mono text-orange">
                        SPECIFICATION
                      </span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-line text-xs font-sans">
                      <div className="p-3">
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-mono block",
                          isGala ? "text-cream/50" : "text-ink-muted"
                        )}>
                          Season Window
                        </span>
                        <span className={cn(
                          "font-display font-semibold mt-0.5 block",
                          isGala ? "text-cream" : "text-ink"
                        )}>
                          {event.format.season}
                        </span>
                      </div>
                      <div className="p-3">
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-mono block",
                          isGala ? "text-cream/50" : "text-ink-muted"
                        )}>
                          Duration
                        </span>
                        <span className={cn(
                          "font-display font-semibold mt-0.5 block",
                          isGala ? "text-cream" : "text-ink"
                        )}>
                          {event.format.duration}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-line text-xs font-sans">
                      <div className="p-3">
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-mono block",
                          isGala ? "text-cream/50" : "text-ink-muted"
                        )}>
                          Eligible
                        </span>
                        <span className={cn(
                          "font-display font-semibold mt-0.5 block",
                          isGala ? "text-cream" : "text-ink"
                        )}>
                          {event.format.participants}
                        </span>
                      </div>
                      <div className="p-3">
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-mono block",
                          isGala ? "text-cream/50" : "text-ink-muted"
                        )}>
                          Setting & Stage
                        </span>
                        <span className={cn(
                          "font-display font-semibold mt-0.5 block",
                          isGala ? "text-cream" : "text-ink"
                        )}>
                          {event.format.setting}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* End of Page: "Want to take part?" CTA Block */}
      <div className="max-w-4xl mx-auto mt-28 px-4 sm:px-6 relative z-10">
        <div className="bg-paper border border-line rounded-panel p-8 sm:p-12 text-center shadow-card relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-deep/70 border border-line text-[10px] font-mono uppercase tracking-mono text-orange font-medium mb-4">
            <span>CAMPUS OPPORTUNITIES</span>
          </div>

          <h3 className="font-display font-semibold text-3xl sm:text-5xl text-ink tracking-tight mb-3">
            Want to take part?
          </h3>

          <p className="font-sans text-base text-ink-soft max-w-lg mx-auto mb-8 leading-relaxed text-pretty">
            Whether you want to join our investigative research cohorts, moderate university symposiums, or take the open microphone at our next session.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?subject=Join+the+club"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-strong hover:bg-orange-hover text-cream font-mono text-xs uppercase tracking-mono font-medium shadow-soft transition-all"
            >
              <span>Join the Club</span>
              <ArrowRight className="w-4 h-4 text-cream" />
            </Link>

            <Link
              href="/contact?subject=Be+a+guest"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink hover:bg-ink/90 text-cream font-mono text-xs uppercase tracking-mono font-medium transition-colors"
            >
              <span>Be on the Mic</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
