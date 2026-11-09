"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import aboutData from "@content/about.json";
import {
  Compass,
  Mic,
  Users2,
  BookOpen,
  Archive,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    title: "Research",
    icon: Compass,
    eyebrow: "FOUNDATION",
    description:
      "Deep investigative briefings, archival cross-referencing, and intellectual preparation before any microphone is switched on.",
  },
  {
    title: "Interviewing",
    icon: Mic,
    eyebrow: "CRAFT",
    description:
      "Formulating probing questions, active listening, and directing the intellectual pacing of deep long-form dialogues.",
  },
  {
    title: "Moderation",
    icon: Users2,
    eyebrow: "DISCOURSE",
    description:
      "Presiding over multi-perspective panels, navigating contentious topics with civility, and guiding high-level symposiums.",
  },
  {
    title: "Storytelling",
    icon: BookOpen,
    eyebrow: "NARRATIVE",
    description:
      "Sculpting compelling institutional narrative arcs, documentary audio design, and preserving human nuance in every cut.",
  },
  {
    title: "The Archive",
    icon: Archive,
    eyebrow: "LEGACY",
    description:
      "Building a permanent, documented repository of the living history, faculty insights, and distinguished voices of MNIT Jaipur.",
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
  const isLadderInView = useInView(ladderRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full bg-cream text-ink py-24 md:py-32 overflow-hidden border-t border-hairline">
      {/* Background paper texture */}
      <div className="absolute inset-0 pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ONE SINGLE TEXT BOX (Revision 2 §2) */}
        <div className="max-w-4xl mx-auto mb-20 bg-sand-light/70 border border-sand rounded-2xl p-8 sm:p-12 md:p-14 shadow-sm">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="font-mono text-xs uppercase tracking-mono text-ink-soft font-semibold">
              {aboutData.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl tracking-tightest leading-[1.02] text-ink mb-8">
            {aboutData.headline}
          </h2>

          {/* Flowing Body Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-ink/85 font-sans">
            {aboutData.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-sand flex items-center justify-between text-xs font-mono text-ink-soft uppercase tracking-mono">
            <span>Chartered Under Student Welfare</span>
            <span className="text-orange">MNIT JAIPUR · 2026</span>
          </div>
        </div>

        {/* The Quote Statement Band (Separate Sand Band with Marker Highlight) */}
        <div className="my-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-sand py-16 px-6 sm:px-12 relative overflow-hidden border-y border-hairline">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-mono text-ink-soft font-semibold block mb-4">
              FOUNDING STATEMENT
            </span>
            <blockquote className="font-sans font-bold text-xl sm:text-3xl md:text-4xl text-ink leading-tight tracking-tight">
              &ldquo;We do not seek to create another podcast at MNIT Jaipur. We seek to build an{" "}
              <span className="marker-highlight font-extrabold">institutional ecosystem</span>{" "}
              for conversations, interviewing, research and storytelling, with podcasting as its flagship medium.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Five Core Disciplines (Cards in sand-light with 1px sand border) */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-hairline">
            <div>
              <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold block mb-1">
                DISCIPLINES
              </span>
              <h3 className="font-sans font-bold text-2xl sm:text-4xl text-ink tracking-tight">
                Five Core Disciplines
              </h3>
            </div>
            <p className="font-mono text-xs uppercase tracking-mono text-ink-soft mt-2 md:mt-0">
              CRAFT · RESEARCH · RECORDING
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-sand-light/60 p-6 rounded-xl border border-sand hover:border-orange transition-colors flex flex-col justify-between group shadow-subtle"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-cream border border-sand text-ink flex items-center justify-center mb-5 group-hover:border-orange transition-colors">
                      <Icon className="w-5 h-5 text-orange" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-mono text-ink-soft font-semibold block mb-1.5">
                      {pillar.eyebrow}
                    </span>
                    <h4 className="font-sans font-bold text-xl text-ink mb-2">
                      {pillar.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-sand/70 flex items-center justify-between font-mono text-xs text-ink-soft">
                    <span>0{i + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* A Platform for Every Branch */}
        <div className="mb-24 bg-sand-light/40 rounded-2xl p-8 border border-sand">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold block mb-1">
                INCLUSIVITY & BREADTH
              </span>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-ink tracking-tight">
                A Platform for Every Branch
              </h3>
            </div>
            <p className="font-sans text-sm text-ink-soft max-w-sm mt-2 sm:mt-0">
              Open to researchers, thinkers, and moderators across every academic discipline.
            </p>
          </div>

          <div className="overflow-x-auto pb-2 no-scrollbar">
            <div className="flex space-x-2.5 w-max">
              {branches.map((branch) => (
                <div
                  key={branch}
                  className="px-4 py-2 rounded-full bg-cream border border-sand text-xs font-mono tracking-wide text-ink font-medium shadow-subtle hover:border-orange transition-colors"
                >
                  <span className="text-orange mr-1.5">✱</span>
                  {branch}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Member Journey Ladder */}
        <div ref={ladderRef} className="mb-24">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold block mb-1">
              SUCCESSION
            </span>
            <h3 className="font-sans font-bold text-2xl sm:text-4xl text-ink tracking-tight">
              The Member Journey
            </h3>
            <p className="font-sans text-sm text-ink-soft max-w-md mx-auto mt-2">
              From foundational research to institutional stewardship.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated drawing line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-sand hidden md:block">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isLadderInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-orange origin-left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {journeySteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLadderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center bg-sand-light/70 md:bg-transparent p-5 md:p-2 rounded-xl border md:border-none border-sand"
                >
                  <div className="w-12 h-12 rounded-full bg-cream border-2 border-orange text-ink font-mono font-bold text-sm flex items-center justify-center mb-3 shadow-sm shrink-0">
                    {step.step}
                  </div>
                  <h4 className="font-sans font-bold text-base text-ink mb-1">
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

        {/* The Archive Teaser */}
        <div className="mb-20 bg-sand rounded-2xl p-8 sm:p-12 border border-sand-dark relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-mono text-orange-deep font-semibold block mb-2">
                INSTITUTIONAL MEMORY
              </span>
              <h3 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight mb-4">
                The Living Archive of MNIT Jaipur
              </h3>
              <p className="font-sans text-base text-ink-soft leading-relaxed mb-6">
                Every interview is captured in lossless audio, indexed with full transcripts, cataloged by topic, and preserved as part of the permanent oral history of our university.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  Structured Dossiers
                </span>
                <span>·</span>
                <span>Permanent Transcripts</span>
                <span>·</span>
                <span>Open University Access</span>
              </div>
            </div>

            {/* Audio Waveform Equalizer Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-cream p-6 rounded-xl border border-sand">
              <div className="flex items-end justify-center space-x-1.5 h-16 w-full mb-4">
                {[15, 30, 52, 68, 38, 80, 95, 65, 48, 85, 55, 32, 70, 90, 42, 24].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [`${height}%`, `${(height * 1.4) % 95 + 10}%`, `${height}%`],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4 + (i % 5) * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 bg-orange rounded-t-xs"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between w-full pt-2 border-t border-sand font-mono text-[10px] uppercase tracking-mono text-ink-soft">
                <span>Lossless Audio Master</span>
                <span className="text-orange font-bold">VOL. 01 / ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Closing CTA Row (§2: Meet the Team · See Our Events · Contact Us) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/team"
            className="px-6 py-3.5 rounded-full bg-orange hover:bg-orange-hover text-ink font-mono text-xs uppercase tracking-mono font-semibold shadow-orange-sm transition-all flex items-center gap-2 group"
          >
            <span>Meet the Team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/events"
            className="px-6 py-3.5 rounded-full bg-ink hover:bg-ink-soft text-cream font-mono text-xs uppercase tracking-mono font-medium transition-colors"
          >
            See Our Events
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-sand-light hover:bg-sand text-ink border border-sand font-mono text-xs uppercase tracking-mono font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};
