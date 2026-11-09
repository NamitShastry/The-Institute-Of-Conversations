"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import eventsDataRaw from "@content/events.json";
import { EventsData, EventItem } from "@/lib/types";
import {
  Mic,
  Tv,
  Trophy,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const eventsData = eventsDataRaw as EventsData;

const months = [
  { name: "AUG", label: "August" },
  { name: "SEPT", label: "September" },
  { name: "OCT", label: "October" },
  { name: "NOV", label: "November" },
  { name: "DEC", label: "Winter Break" },
  { name: "JAN", label: "January" },
  { name: "FEB", label: "February" },
  { name: "MAR", label: "March" },
  { name: "APR", label: "April" },
];

export default function EventsPage() {
  const [activeEventId, setActiveEventId] = useState<string>("voice-of-mnit");

  // Scroll-spy observer for sticky ribbon
  useEffect(() => {
    const handleScroll = () => {
      const sections = eventsData.events.map((e) => document.getElementById(e.id));
      const scrollPosition = window.scrollY + 240;

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
      const yOffset = -160;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderEventIllustration = (icon: string) => {
    switch (icon) {
      case "mic":
        return (
          <svg className="w-full h-auto max-w-[280px]" viewBox="0 0 240 240" fill="none">
            <rect x="20" y="200" width="200" height="12" rx="4" fill="#D9C3A5" stroke="#1C1713" strokeWidth="2"/>
            <line x1="120" y1="200" x2="120" y2="80" stroke="#1C1713" strokeWidth="6" strokeLinecap="round"/>
            <rect x="100" y="40" width="40" height="65" rx="20" fill="#E6D8C3" stroke="#1C1713" strokeWidth="3"/>
            <rect x="100" y="40" width="40" height="35" rx="20" fill="#1C1713" fillOpacity="0.8"/>
            <circle cx="120" cy="58" r="4" fill="#F26A1B"/>
            <path d="M 85 75 C 85 105 155 105 155 75" stroke="#1C1713" strokeWidth="3.5" fill="none"/>
            <line x1="60" y1="40" x2="40" y2="25" stroke="#F26A1B" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="180" y1="40" x2="200" y2="25" stroke="#F26A1B" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        );
      case "theater":
        return (
          <svg className="w-full h-auto max-w-[280px]" viewBox="0 0 240 240" fill="none">
            <rect x="25" y="40" width="190" height="110" rx="8" fill="#E6D8C3" stroke="#1C1713" strokeWidth="3"/>
            <path d="M 35 130 Q 120 70 205 130" stroke="#F26A1B" strokeWidth="3" fill="none"/>
            <circle cx="120" cy="85" r="14" fill="#F26A1B"/>
            <circle cx="90" cy="95" r="9" fill="#1C1713"/>
            <circle cx="150" cy="95" r="9" fill="#1C1713"/>
            <rect x="40" y="170" width="160" height="20" rx="4" fill="#D9C3A5" stroke="#1C1713" strokeWidth="2"/>
            <line x1="60" y1="190" x2="50" y2="215" stroke="#1C1713" strokeWidth="4"/>
            <line x1="180" y1="190" x2="190" y2="215" stroke="#1C1713" strokeWidth="4"/>
          </svg>
        );
      case "trophy":
        return (
          <svg className="w-full h-auto max-w-[280px]" viewBox="0 0 240 240" fill="none">
            <circle cx="70" cy="80" r="30" stroke="#1C1713" strokeWidth="3" strokeDasharray="3 3"/>
            <line x1="70" y1="80" x2="70" y2="60" stroke="#F26A1B" strokeWidth="2.5"/>
            <path d="M 120 40 L 170 40 C 170 85 145 105 120 105 C 95 105 70 85 70 40 Z" fill="#E6D8C3" stroke="#1C1713" strokeWidth="3"/>
            <path d="M 170 50 C 195 50 195 80 170 80" stroke="#1C1713" strokeWidth="3" fill="none"/>
            <path d="M 70 50 C 45 50 45 80 70 80" stroke="#1C1713" strokeWidth="3" fill="none"/>
            <line x1="120" y1="105" x2="120" y2="155" stroke="#1C1713" strokeWidth="6"/>
            <rect x="90" y="155" width="60" height="35" rx="3" fill="#D9C3A5" stroke="#1C1713" strokeWidth="3"/>
            <rect x="100" y="165" width="40" height="15" fill="#F26A1B"/>
          </svg>
        );
      case "book":
        return (
          <svg className="w-full h-auto max-w-[280px]" viewBox="0 0 240 240" fill="none">
            <path d="M 30 170 C 70 150 110 155 120 175 C 130 155 170 150 210 170 L 205 60 C 165 40 125 45 120 65 C 115 45 75 40 35 60 Z" fill="#E6D8C3" stroke="#1C1713" strokeWidth="3"/>
            <line x1="120" y1="65" x2="120" y2="175" stroke="#F26A1B" strokeWidth="3"/>
            <path d="M 50 85 C 80 75 105 80 110 90" stroke="#1C1713" strokeWidth="1.5"/>
            <path d="M 50 110 C 80 100 105 105 110 115" stroke="#1C1713" strokeWidth="1.5"/>
            <path d="M 130 90 C 135 80 160 75 190 85" stroke="#1C1713" strokeWidth="1.5"/>
            <path d="M 130 115 C 135 105 160 100 190 110" stroke="#1C1713" strokeWidth="1.5"/>
          </svg>
        );
      case "users":
        return (
          <svg className="w-full h-auto max-w-[280px]" viewBox="0 0 240 240" fill="none">
            <rect x="35" y="80" width="55" height="90" rx="8" fill="#E6D8C3" stroke="#1C1713" strokeWidth="3"/>
            <rect x="150" y="80" width="55" height="90" rx="8" fill="#E6D8C3" stroke="#1C1713" strokeWidth="3"/>
            <line x1="90" y1="125" x2="150" y2="125" stroke="#F26A1B" strokeWidth="3" strokeDasharray="4 3"/>
            <circle cx="120" cy="125" r="8" fill="#F26A1B"/>
            <line x1="45" y1="170" x2="40" y2="200" stroke="#1C1713" strokeWidth="4"/>
            <line x1="80" y1="170" x2="85" y2="200" stroke="#1C1713" strokeWidth="4"/>
            <line x1="160" y1="170" x2="155" y2="200" stroke="#1C1713" strokeWidth="4"/>
            <line x1="195" y1="170" x2="200" y2="200" stroke="#1C1713" strokeWidth="4"/>
          </svg>
        );
      case "star":
      default:
        return (
          <svg className="w-full h-auto max-w-[280px]" viewBox="0 0 240 240" fill="none">
            <polygon points="120,30 135,75 185,75 145,105 160,150 120,122 80,150 95,105 55,75 105,75" fill="#F26A1B" stroke="#1C1713" strokeWidth="3"/>
            <circle cx="120" cy="90" r="14" fill="#F3ECE0" stroke="#1C1713" strokeWidth="2"/>
            <line x1="120" y1="150" x2="120" y2="190" stroke="#1C1713" strokeWidth="6"/>
            <rect x="80" y="190" width="80" height="22" rx="4" fill="#D9C3A5" stroke="#1C1713" strokeWidth="2.5"/>
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      {/* Paper grain overlay */}
      <div className="absolute inset-0 pointer-events-none paper-grain" />

      {/* Header Band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="font-mono text-xs uppercase tracking-mono text-ink-soft font-semibold">
              {eventsData.eyebrow}
            </span>
          </div>

          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mb-3">
            {eventsData.title}
          </h1>

          <div className="flex items-center gap-3">
            <p className="font-serif italic text-2xl sm:text-3xl text-orange-deep">
              &ldquo;{eventsData.subtitle}&rdquo;
            </p>
            {/* Hand-drawn arrow pointing down into calendar */}
            <svg className="w-8 h-8 text-orange hidden sm:block" viewBox="0 0 24 24" fill="none">
              <path d="M 6 4 L 18 16 M 18 16 L 9 16 M 18 16 L 18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed mt-4 max-w-2xl">
            {eventsData.description}
          </p>
        </div>
      </div>

      {/* Sticky Annual Calendar Ribbon (Aug -> Apr) */}
      <div className="sticky top-16 z-30 w-full bg-sand/95 backdrop-blur-md border-y border-hairline py-3 mb-16 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center space-x-2 shrink-0 pr-4 border-r border-hairline">
            <Calendar className="w-4 h-4 text-orange" />
            <span className="font-mono text-xs uppercase tracking-mono text-ink font-bold">
              Annual Calendar
            </span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            {eventsData.events.map((evt) => {
              const isActive = activeEventId === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => scrollToEvent(evt.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all flex items-center gap-1.5 whitespace-nowrap",
                    isActive
                      ? "bg-orange text-ink font-bold shadow-sm"
                      : "bg-cream/70 hover:bg-cream text-ink-soft border border-hairline"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-ink" : "bg-orange")} />
                  <span>{evt.name}</span>
                  <span className="text-[9px] opacity-75">({evt.season})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Six Rich Editorial Event Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 md:space-y-36">
        {eventsData.events.map((event, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section
              key={event.id}
              id={event.id}
              className="scroll-mt-32 pt-6 border-t border-hairline"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Numeral, Title & Meta */}
                <div
                  className={cn(
                    "lg:col-span-6 flex flex-col",
                    isEven ? "lg:order-1" : "lg:order-2"
                  )}
                >
                  {/* Giant Outlined Numeral + Season Chip */}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl text-transparent [-webkit-text-stroke:2px_var(--sand-dark)] select-none">
                      {event.number}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-mono font-semibold px-3 py-1 rounded-full bg-sand-light border border-sand text-ink">
                      WHEN // {event.season}
                    </span>
                  </div>

                  <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold mb-1">
                    {event.subtitle}
                  </span>

                  <h2 className="font-sans font-bold text-3xl sm:text-5xl text-ink tracking-tightest leading-tight mb-3">
                    {event.name}
                  </h2>

                  <p className="font-serif italic text-xl text-orange-deep mb-6">
                    &ldquo;{event.hook}&rdquo;
                  </p>

                  {/* What Happens Narrative (2-3 paragraphs) */}
                  <div className="space-y-4 font-sans text-base leading-relaxed text-ink/85 mb-8">
                    {event.whatHappens.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Who Can Take Part & Walk Away With */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sand-light/50 p-5 rounded-xl border border-sand mb-8 text-xs font-sans">
                    <div>
                      <span className="font-mono uppercase tracking-mono font-bold text-orange-deep block mb-1">
                        Who Can Take Part
                      </span>
                      <p className="text-ink-soft leading-relaxed">{event.whoCanTakePart}</p>
                    </div>
                    <div>
                      <span className="font-mono uppercase tracking-mono font-bold text-orange-deep block mb-1">
                        What Participants Gain
                      </span>
                      <p className="text-ink-soft leading-relaxed">{event.walkAwayWith}</p>
                    </div>
                  </div>

                  {/* What the Club Does With It */}
                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-cream border border-sand shadow-subtle mb-6">
                    <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-mono font-bold text-ink block mb-0.5">
                        Archival & Media Footprint
                      </span>
                      <p className="font-sans text-xs text-ink-soft leading-relaxed">
                        {event.clubOutput}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right / Left Alternate: Prop Illustration & How It Works Flow & Format Table */}
                <div
                  className={cn(
                    "lg:col-span-6 flex flex-col space-y-6",
                    isEven ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  {/* Prop Illustration Card */}
                  <div className="w-full bg-sand-light/60 border border-sand rounded-2xl p-8 flex items-center justify-center relative overflow-hidden shadow-subtle group">
                    <div className="absolute top-3 left-4 font-mono text-[9px] uppercase tracking-mono text-ink-soft">
                      FIG. {event.number} // {event.id.toUpperCase()}
                    </div>
                    <div className="py-4 group-hover:scale-105 transition-transform duration-500">
                      {renderEventIllustration(event.icon)}
                    </div>
                  </div>

                  {/* How It Works: Step-by-Step Flow */}
                  <div className="bg-cream border border-sand rounded-2xl p-6 shadow-subtle">
                    <span className="font-mono text-xs uppercase tracking-mono font-semibold text-orange-deep block mb-4">
                      How It Works // 4-Step Flow
                    </span>

                    <div className="space-y-4">
                      {event.howItWorks.map((step) => (
                        <div key={step.step} className="flex items-start space-x-3.5">
                          <span className="w-6 h-6 rounded-full bg-sand text-ink font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {step.step}
                          </span>
                          <div>
                            <h4 className="font-sans font-bold text-sm text-ink mb-0.5">
                              {step.title}
                            </h4>
                            <p className="font-sans text-xs text-ink-soft leading-relaxed">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Format At a Glance Taped/Stickered Card */}
                  <div className="bg-sand p-6 rounded-2xl border border-sand-dark relative shadow-sm">
                    {/* Top tape sticker mark */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-cream/90 border border-sand text-[9px] font-mono tracking-mono uppercase text-ink rotate-[-1deg]">
                      FORMAT SPECIFICATION
                    </div>

                    <h4 className="font-mono text-xs uppercase tracking-mono font-bold text-ink mb-4 pt-1">
                      Format At a Glance
                    </h4>

                    <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                      <div className="p-2.5 rounded bg-cream/80 border border-sand">
                        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft block">
                          Season Window
                        </span>
                        <span className="font-bold text-ink mt-0.5 block">
                          {event.format.season}
                        </span>
                      </div>
                      <div className="p-2.5 rounded bg-cream/80 border border-sand">
                        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft block">
                          Duration
                        </span>
                        <span className="font-bold text-ink mt-0.5 block">
                          {event.format.duration}
                        </span>
                      </div>
                      <div className="p-2.5 rounded bg-cream/80 border border-sand">
                        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft block">
                          Eligible Participants
                        </span>
                        <span className="font-bold text-ink mt-0.5 block">
                          {event.format.participants}
                        </span>
                      </div>
                      <div className="p-2.5 rounded bg-cream/80 border border-sand">
                        <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft block">
                          Setting & Stage
                        </span>
                        <span className="font-bold text-ink mt-0.5 block">
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
        <div className="bg-sand border border-sand-dark rounded-3xl p-8 sm:p-12 text-center shadow-card relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-sand text-[10px] font-mono uppercase tracking-mono text-orange-deep font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>Campus Opportunities</span>
          </div>

          <h3 className="font-sans font-bold text-3xl sm:text-5xl text-ink tracking-tight mb-3">
            Want to take part?
          </h3>

          <p className="font-sans text-base text-ink-soft max-w-lg mx-auto mb-8 leading-relaxed">
            Whether you want to join our investigative research cohorts, moderate university symposiums, or take the open microphone at our next session.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?subject=Join+the+club"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange hover:bg-orange-hover text-ink font-mono text-xs uppercase tracking-mono font-semibold shadow-orange-sm transition-all"
            >
              <span>Join the Club</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact?subject=Be+a+guest"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink hover:bg-ink-soft text-cream font-mono text-xs uppercase tracking-mono font-medium transition-colors"
            >
              <span>Be on the Mic</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Final Silk Gradient Band */}
      <div className="mt-24 h-12 w-full bg-silk opacity-90 border-t border-hairline" />
    </div>
  );
}

