"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight, Play, CheckCircle2, Disc } from "lucide-react";
import siteData from "@content/site.json";

// Dynamically import 3D Canvas
const SilkStageScene = dynamic(
  () => import("@/components/3d/SilkStageScene").then((mod) => mod.SilkStageScene),
  { ssr: false }
);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP ScrollTrigger to scrub the silk drape transition into About (pin ≈ 220vh)
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hero recedes (scale 1 -> 0.96, opacity fades) as satin drapes close
  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.6);
  const contentScale = 1 - scrollProgress * 0.04;
  const contentY = scrollProgress * 40;

  const branches = [
    "Civil",
    "Computer Science",
    "Mechanical",
    "Electrical",
    "Electronics",
    "Architecture",
    "Management",
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-cream text-ink select-none flex flex-col justify-between"
    >
      {/* 3D Satin Drapes and Floating Medallion Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <SilkStageScene
          scrollProgress={scrollProgress}
          mouse={mousePos}
          isDesktop={isDesktop}
        />
      </div>

      {/* Main Hero Container */}
      <div
        style={{
          opacity: contentOpacity,
          transform: `scale(${contentScale}) translateY(${contentY}px)`,
        }}
        className="relative z-10 w-full flex-grow flex flex-col justify-between pt-28 sm:pt-32 pb-0 transition-all duration-75"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Column (Cols 1-6) */}
            <div className="lg:col-span-6 flex flex-col items-start z-10">
              
              {/* Eyebrow Pill Tag in --orange-tint */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 bg-orange-tint/70 text-orange-deep px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-mono mb-6 border border-orange/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                <span>A STUDENT-RUN INSTITUTION · MNIT JAIPUR</span>
              </motion.div>

              {/* H1 Headline: Institute of *Conversations* + MNIT tag */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-semibold text-ink tracking-tightest leading-[0.98] text-[clamp(48px,6.8vw,112px)] mb-6"
              >
                Institute of{" "}
                <span className="relative inline-block font-accent text-ink">
                  Conversations
                  {/* Self-drawing orange underline stroke on reveal */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3.5 overflow-visible pointer-events-none"
                    viewBox="0 0 100 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 2 8 Q 50 13 98 4"
                      stroke="#D9541E"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                </span>{" "}
                <span className="inline-block font-mono text-xs uppercase tracking-mono text-ink-soft bg-cream-deep/80 border border-line px-2.5 py-1 rounded-md align-middle -mt-3 ml-2 font-medium">
                  MNIT
                </span>
              </motion.h1>

              {/* Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed max-w-[56ch] mb-8 text-pretty"
              >
                Research-driven interviews, long-form conversations and the documented voices of MNIT Jaipur.
              </motion.p>

              {/* Dual Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                {/* Primary Button: --orange-strong fill, white text, arrow */}
                <Link
                  href="/team"
                  className="bg-orange-strong hover:bg-orange-hover text-cream px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-mono font-medium flex items-center gap-2 shadow-soft transition-all duration-200 group"
                >
                  <span>Meet the Team</span>
                  <ArrowRight className="w-4 h-4 text-cream transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Ghost Button: 1px ink outline, arrow */}
                <Link
                  href="/events"
                  className="border border-line hover:border-ink bg-transparent text-ink hover:text-ink px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-mono font-medium flex items-center gap-2 transition-all duration-200 group"
                >
                  <Play className="w-3.5 h-3.5 fill-ink text-ink transition-transform duration-200 group-hover:scale-110" />
                  <span>See Our Events</span>
                </Link>
              </motion.div>

              {/* Quiet Proof Row (Placeholder Avatar Stack + Branch Proof) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3 pt-2 border-t border-line w-full max-w-md"
              >
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-cream-deep border-2 border-cream flex items-center justify-center text-[10px] font-mono text-ink-soft font-semibold">
                    01
                  </div>
                  <div className="w-7 h-7 rounded-full bg-paper border-2 border-cream flex items-center justify-center text-[10px] font-mono text-ink-soft font-semibold">
                    02
                  </div>
                  <div className="w-7 h-7 rounded-full bg-orange-tint border-2 border-cream flex items-center justify-center text-[10px] font-mono text-orange-deep font-semibold">
                    03
                  </div>
                  <div className="w-7 h-7 rounded-full bg-cream-deep border-2 border-cream flex items-center justify-center text-[10px] font-mono text-ink-soft font-semibold">
                    04
                  </div>
                </div>
                <p className="font-mono text-xs text-ink-soft tracking-tight">
                  Open to every branch at MNIT Jaipur
                </p>
              </motion.div>

            </div>

            {/* Right Column (Cols 7-12): Framed Visual Panel + Offset Orange Block */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
              
              {/* Offset Burnt-Orange Block Behind Visual Panel (Shifted bottom-right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full bg-orange rounded-panel translate-x-3.5 translate-y-3.5 sm:translate-x-5 sm:translate-y-5 -z-10 shadow-panel"
              />

              {/* Framed Visual Panel (Radius 20px, Duotone Studio Render) */}
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-panel overflow-hidden border border-line shadow-panel bg-ink flex items-center justify-center"
              >
                {/* Duotone B&W Studio Render Vector */}
                <Image
                  src="/assets/hero/studio-duotone.svg"
                  alt="Studio Setting at Institute of Conversations"
                  fill
                  className="object-cover opacity-90"
                  priority
                />

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />
              </motion.div>

              {/* Floating Product-Style Card 1: "Now in the studio" (Top-Right overlap) */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-4 -right-2 sm:-right-4 z-30 bg-paper border border-line rounded-card p-3.5 sm:p-4 shadow-card max-w-[210px] sm:max-w-[240px] pointer-events-auto"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-mono text-ink-muted">
                    STUDIO // ON AIR
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2.5">
                  <Disc className="w-4 h-4 text-orange animate-spin duration-3000" />
                  <span className="font-display font-semibold text-xs text-ink tracking-tight">
                    Episode in Production
                  </span>
                </div>

                {/* Equalizer Waveform & Progress Bar */}
                <div className="flex items-center gap-1.5 h-4 mb-2">
                  {[40, 75, 55, 95, 60, 85, 45, 100, 70, 50, 80, 65].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-ink/70 rounded-full"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="w-full bg-cream-deep h-1 rounded-full overflow-hidden">
                  <div className="bg-orange h-full w-3/5 rounded-full" />
                </div>
              </motion.div>

              {/* Floating Product-Style Card 2: "The Archive" (Bottom-Left overlap) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 -left-2 sm:-left-6 z-30 bg-paper border border-line rounded-card p-4 shadow-card max-w-[240px] sm:max-w-[270px] pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft font-medium">
                    ORAL ARCHIVE // REPOSITORY
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-mono text-ink-muted">
                    MNIT
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                    <span className="font-sans text-xs text-ink truncate">
                      Institutional Briefing Dossier
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                    <span className="font-sans text-xs text-ink truncate">
                      Faculty Retrospective Dialogue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-orange flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                    </span>
                    <span className="font-sans text-xs text-ink truncate">
                      Curated Campus Oral History
                    </span>
                    <span className="font-mono text-[8px] bg-orange-tint text-orange-deep px-1 rounded ml-auto flex-shrink-0">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* Bottom of the Hero: Quiet Strip on --cream-deep */}
        <div className="w-full bg-cream-deep/70 border-t border-line py-3 px-4 sm:px-6 lg:px-8 mt-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <span className="text-ink-soft uppercase tracking-mono font-medium">
              Built across every branch
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-muted tracking-mono uppercase text-[11px]">
              {branches.map((b, i) => (
                <React.Fragment key={b}>
                  <span className="hover:text-ink transition-colors cursor-default">
                    {b}
                  </span>
                  {i < branches.length - 1 && (
                    <span className="text-line select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
