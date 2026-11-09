"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import aboutData from "@content/about.json";
import { ArrowRight, Volume2 } from "lucide-react";

const disciplines = [
  {
    number: "01",
    eyebrow: "FOUNDATION",
    title: "Research",
    desc: "Deep investigative briefings, archival cross-referencing, and intellectual preparation before any microphone is switched on.",
  },
  {
    number: "02",
    eyebrow: "CRAFT",
    title: "Interviewing",
    desc: "Formulating probing questions, active listening, and directing the intellectual pacing of deep long-form dialogues.",
  },
  {
    number: "03",
    eyebrow: "DISCOURSE",
    title: "Moderation",
    desc: "Presiding over multi-perspective panels, navigating contentious topics with civility, and guiding high-level symposiums.",
  },
  {
    number: "04",
    eyebrow: "NARRATIVE",
    title: "Storytelling",
    desc: "Sculpting compelling institutional narrative arcs, documentary audio design, and preserving human nuance in every cut.",
  },
  {
    number: "05",
    eyebrow: "LEGACY",
    title: "The Archive",
    desc: "Building a permanent, documented repository of the living history, faculty insights, and distinguished voices of MNIT Jaipur.",
  },
];

const branches = [
  "Civil Engineering",
  "Computer Science & Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Electronics & Comm. Engineering",
  "Architecture & Planning",
  "Chemical Engineering",
  "Metallurgical & Materials",
  "Management Studies (DMS)",
  "Physics & Applied Sciences",
  "Chemistry",
  "Mathematics & Computing",
  "Artificial Intelligence & Data",
];

const journeySteps = [
  { step: "01", title: "Researcher", desc: "Dossier drafting, investigative rigor, fact architecture" },
  { step: "02", title: "Producer", desc: "Studio operations, audio engineering, editorial pacing" },
  { step: "03", title: "Host", desc: "On-stage presence, long-form dialogue, probing moderation" },
  { step: "04", title: "Executive", desc: "Department lead, talent mentorship, pipeline governance" },
  { step: "05", title: "Leadership", desc: "Presidential stewardship, advisory liaison, institutional vision" },
];

export const AboutSection: React.FC = () => {
  const ladderRef = useRef<HTMLDivElement>(null);
  const isLadderInView = useInView(ladderRef, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full bg-cream text-ink py-24 md:py-32 overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. ONE SINGLE TEXT BOX (--paper panel, 1px --line, radius 16px, large padding) */}
        <div className="max-w-4xl mx-auto mb-20 bg-paper border border-line rounded-card p-8 sm:p-12 md:p-14 shadow-card">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            <span className="font-mono text-[11px] uppercase tracking-mono text-ink-soft">
              01 · ABOUT
            </span>
          </div>

          {/* Headline with italic-serif accent */}
          <h2 className="font-display font-semibold text-3xl sm:text-5xl md:text-6xl tracking-tightest leading-[1.0] text-ink mb-8">
            Not another podcast. An{" "}
            <span className="font-accent text-ink">institution</span> for conversation.
          </h2>

          {/* Flowing Body Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-ink/85 font-sans">
            {aboutData.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-xs font-mono text-ink-soft uppercase tracking-mono">
            <span>Chartered Under Student Welfare</span>
            <span className="text-orange font-medium">MNIT JAIPUR · 2026</span>
          </div>
        </div>

        {/* 2. THE QUOTE BAND: Full-bleed --ink, huge cream type, orange marker highlight */}
        <div className="my-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-ink text-cream py-20 px-6 sm:px-12 relative overflow-hidden border-y border-line-dark">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-mono text-cream/50 mb-4 block">
              FOUNDING STATEMENT
            </span>
            <blockquote className="font-display font-semibold text-2xl sm:text-4xl md:text-5xl text-cream leading-tight tracking-tight">
              &ldquo;We do not seek to create another podcast at MNIT Jaipur. We seek to build an{" "}
              <span className="marker-highlight">institutional ecosystem</span>{" "}
              for conversations, interviewing, research and storytelling, with podcasting as its flagship medium.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* 3. FIVE CORE DISCIPLINES: Editorial 5-column index with hairline dividers */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-line">
            <div>
              <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1">
                DISCIPLINES
              </span>
              <h3 className="font-display font-semibold text-2xl sm:text-4xl text-ink tracking-tight">
                Five Core Disciplines
              </h3>
            </div>
            <p className="font-mono text-xs uppercase tracking-mono text-ink-muted mt-2 md:mt-0">
              CRAFT · RESEARCH · RECORDING
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-b border-line divide-y md:divide-y-0 md:divide-x divide-line">
            {disciplines.map((d) => (
              <div
                key={d.number}
                className="p-6 md:p-7 flex flex-col justify-between group hover:border-t-2 hover:border-orange hover:-translate-y-1 transition-all duration-200 bg-paper/50 hover:bg-paper"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-orange font-medium">
                      {d.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-mono text-ink-muted">
                      {d.eyebrow}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-xl text-ink mb-3 tracking-tight">
                    {d.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {d.desc}
                  </p>
                </div>
                <div className="mt-8 pt-3 border-t border-line flex items-center justify-between font-mono text-[10px] text-ink-muted uppercase tracking-mono">
                  <span>DISCIPLINE // IOC</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. A PLATFORM FOR EVERY BRANCH: Slow Marquee */}
        <div className="mb-24 bg-paper rounded-card p-8 border border-line shadow-card overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1">
                INCLUSIVITY & BREADTH
              </span>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
                A Platform for Every Branch
              </h3>
            </div>
            <p className="font-sans text-sm text-ink-soft max-w-sm mt-2 sm:mt-0">
              Open to researchers, thinkers, and moderators across every academic discipline.
            </p>
          </div>

          {/* Marquee in --ink-muted that darkens to ink on hover */}
          <div className="relative overflow-hidden w-full group py-2">
            <div className="flex space-x-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[...branches, ...branches].map((b, i) => (
                <div
                  key={`${b}-${i}`}
                  className="px-4 py-2 rounded-full bg-cream-deep/60 border border-line text-xs font-mono tracking-mono text-ink-muted hover:text-ink transition-colors cursor-default flex items-center gap-2"
                >
                  <span className="text-orange text-xs">✱</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. THE MEMBER JOURNEY LADDER */}
        <div ref={ladderRef} className="mb-24">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1">
              SUCCESSION
            </span>
            <h3 className="font-display font-semibold text-2xl sm:text-4xl text-ink tracking-tight">
              The Member Journey
            </h3>
            <p className="font-sans text-sm text-ink-soft max-w-md mx-auto mt-2">
              From foundational research to institutional stewardship.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Thin ink line with orange progress */}
            <div className="absolute top-6 left-0 right-0 h-[1px] bg-line hidden md:block">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isLadderInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-orange origin-left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {journeySteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isLadderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + idx * 0.12, duration: 0.4 }}
                  className="flex flex-col items-center text-center p-4 bg-paper md:bg-transparent rounded-card border md:border-none border-line"
                >
                  <div className="w-11 h-11 rounded-full bg-paper border border-line text-ink font-mono font-medium text-xs flex items-center justify-center mb-3 shadow-card shrink-0 relative group">
                    <span className="group-hover:text-orange transition-colors">{step.step}</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-display font-semibold text-base text-ink mb-1 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs text-ink-soft font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. THE LIVING ARCHIVE TEASER */}
        <div className="mb-20 bg-paper rounded-card p-8 sm:p-12 border border-line shadow-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-2">
                INSTITUTIONAL MEMORY
              </span>
              <h3 className="font-display font-semibold text-3xl sm:text-4xl text-ink tracking-tight mb-4">
                The Living Archive of MNIT Jaipur
              </h3>
              <p className="font-sans text-base text-ink-soft leading-relaxed mb-6">
                Every interview is captured in lossless audio, indexed with full transcripts, cataloged by topic, and preserved as part of the permanent oral history of our university.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                  Structured Dossiers
                </span>
                <span className="text-line">·</span>
                <span>Permanent Transcripts</span>
                <span className="text-line">·</span>
                <span>Open University Access</span>
              </div>
            </div>

            {/* Audio Waveform Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-cream-deep/50 p-6 rounded-card border border-line">
              <div className="flex items-end justify-center space-x-1.5 h-14 w-full mb-4">
                {[20, 45, 65, 80, 50, 95, 70, 60, 85, 40, 75, 55, 90, 65, 35, 25].map((height, i) => (
                  <span
                    key={i}
                    style={{ height: `${height}%` }}
                    className="w-1 bg-ink/75 rounded-full"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between w-full pt-2.5 border-t border-line font-mono text-[10px] uppercase tracking-mono text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-orange" />
                  Lossless Master
                </span>
                <span className="text-orange font-medium">VOL. 01 / ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. CLOSING CTA ROW */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/team"
            className="px-6 py-3.5 rounded-full bg-orange-strong hover:bg-orange-hover text-cream font-mono text-xs uppercase tracking-mono font-medium shadow-soft transition-all flex items-center gap-2 group"
          >
            <span>Meet the Team</span>
            <ArrowRight className="w-4 h-4 text-cream group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/events"
            className="px-6 py-3.5 rounded-full bg-ink hover:bg-ink/90 text-cream font-mono text-xs uppercase tracking-mono font-medium transition-colors"
          >
            See Our Events
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-transparent hover:bg-paper text-ink border border-line font-mono text-xs uppercase tracking-mono font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
};
