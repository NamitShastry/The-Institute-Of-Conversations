"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import heroData from "@content/hero.json";
import { ArrowRight, ArrowDown } from "lucide-react";

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

  // GSAP ScrollTrigger to scrub the silk drape transition into About
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Recede & fade hero content as drapes close
  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.8);
  const contentScale = 1 - scrollProgress * 0.15;
  const contentY = scrollProgress * 80;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-cream text-ink select-none flex flex-col justify-between"
    >
      {/* 1. Fine paper grain & editorial registration marks */}
      <div className="absolute inset-0 pointer-events-none z-10 paper-grain" />

      {/* Editorial registration crosshairs in 4 corners */}
      <div className="absolute top-20 left-6 z-20 hidden md:block">
        <div className="crosshair-mark" />
        <span className="font-mono text-[9px] text-ink-soft/50 uppercase tracking-mono mt-1 block">
          SEC.01 // JAIPUR
        </span>
      </div>
      <div className="absolute top-20 right-6 z-20 hidden md:block">
        <div className="crosshair-mark" />
        <span className="font-mono text-[9px] text-ink-soft/50 uppercase tracking-mono mt-1 block">
          26°51&apos;N 75°48&apos;E
        </span>
      </div>
      <div className="absolute bottom-16 left-6 z-20 hidden md:block">
        <div className="crosshair-mark" />
      </div>
      <div className="absolute bottom-16 right-6 z-20 hidden md:block">
        <div className="crosshair-mark" />
      </div>

      {/* 2. Layered Studio Props & Courtyard Scenery */}

      {/* Top Right Marigold Garland (Genda) */}
      <motion.div
        className="absolute -top-6 -right-6 w-56 sm:w-80 md:w-96 z-15 pointer-events-none origin-top-right"
        style={{
          x: mousePos.x * -12,
          y: mousePos.y * -10,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/assets/hero/marigold-garland.svg"
          alt="Jaipur Marigold Garland"
          width={400}
          height={400}
          className="w-full h-auto drop-shadow-sm"
          priority
        />
      </motion.div>

      {/* Jharokha Arch behind Right Logo Stage */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[2%] md:right-[6%] w-[320px] sm:w-[440px] md:w-[500px] h-[580px] pointer-events-none z-10 opacity-70"
        style={{
          transform: `translate3d(${mousePos.x * 10}px, calc(-50% + ${mousePos.y * 10}px), 0)`,
        }}
      >
        <Image
          src="/assets/hero/jharokha-arch.svg"
          alt="Rajasthani Jharokha Arch"
          width={500}
          height={650}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Boom Microphone entering from Right Edge */}
      <motion.div
        className="absolute top-[28%] md:top-[22%] -right-12 md:-right-8 w-52 sm:w-72 md:w-84 z-25 pointer-events-none"
        animate={{
          y: [-4, 6, -4],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        style={{
          x: mousePos.x * -24,
          y: mousePos.y * -18,
        }}
      >
        <Image
          src="/assets/hero/condenser-mic.svg"
          alt="Broadcast Studio Condenser Microphone"
          width={360}
          height={420}
          className="w-full h-auto drop-shadow-md"
          priority
        />
      </motion.div>

      {/* Vintage Ribbon Mic on lower left edge */}
      <div
        className="absolute bottom-24 -left-6 sm:left-4 w-28 sm:w-36 md:w-44 z-20 pointer-events-none opacity-80 hidden sm:block"
        style={{
          transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 12}px, 0)`,
        }}
      >
        <Image
          src="/assets/hero/vintage-mic.svg"
          alt="Vintage Ribbon Microphone"
          width={180}
          height={280}
          className="w-full h-auto"
        />
      </div>

      {/* Studio Headphones resting lower right */}
      <div
        className="absolute bottom-16 right-[18%] md:right-[26%] w-40 sm:w-52 z-20 pointer-events-none hidden md:block"
        style={{
          transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -14}px, 0)`,
        }}
      >
        <Image
          src="/assets/hero/headphones.svg"
          alt="Studio Monitor Headphones"
          width={240}
          height={200}
          className="w-full h-auto drop-shadow-sm"
        />
      </div>

      {/* 3. Three.js Canvas Layer (Silk Wave Ribbons + 3D Logo Medallion + Silk Drapes) */}
      <div className="absolute inset-0 z-15">
        <SilkStageScene
          scrollProgress={scrollProgress}
          mouse={mousePos}
          isDesktop={isDesktop}
        />
      </div>

      {/* 4. Foreground Content Grid (Edge-to-Edge 12-Column Layout) */}
      <div
        className="relative z-25 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-6 flex-grow flex flex-col justify-center"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px) scale(${contentScale})`,
          transition: "opacity 0.15s ease-out",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Half: Name, Eyebrow, Tagline, Subcopy, Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            {/* Mono Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-mono text-ink-soft font-medium">
                {heroData.eyebrow}
              </span>
            </div>

            {/* Headline with "Institute of" / "Conversations" and "MNIT" Tag */}
            <div className="relative mb-3">
              <h1 className="font-sans font-bold text-ink tracking-tightest leading-[0.93] text-5xl sm:text-7xl md:text-8xl lg:text-[102px] xl:text-[116px]">
                <span>{heroData.headline.line1}</span>
                <br />
                <span className="relative inline-block">
                  {heroData.headline.line2}
                  {/* Hand-drawn SVG underline under "Conversations" */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-orange pointer-events-none"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 3 8 C 70 3, 180 3, 296 9 C 240 11, 90 9, 45 10"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="inline-block ml-3 sm:ml-4 align-middle">
                  <span className="relative inline-block px-3 py-1 bg-orange text-ink font-mono text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider rounded-sm shadow-sm rotate-[-2deg]">
                    {heroData.headline.tag}
                    {/* Hand-drawn loose circle around MNIT */}
                    <svg
                      className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] text-ink pointer-events-none"
                      viewBox="0 0 90 40"
                      fill="none"
                    >
                      <ellipse
                        cx="45"
                        cy="20"
                        rx="41"
                        ry="17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="2 1"
                        opacity="0.4"
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="font-serif italic text-2xl sm:text-3xl text-orange-deep font-normal mt-3 mb-2">
              &ldquo;{heroData.tagline}&rdquo;
            </p>

            {/* Subcopy */}
            <p className="font-sans text-base sm:text-lg text-ink-soft max-w-xl leading-relaxed mb-8">
              {heroData.subcopy}
            </p>

            {/* Action Buttons: Meet the Team (orange) & See Our Events (ink pill) */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={heroData.buttons.primary.href}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-orange hover:bg-orange-hover text-ink font-mono text-xs uppercase tracking-mono font-semibold rounded-full shadow-orange-sm transition-all hover:translate-x-0.5 group"
              >
                <span>{heroData.buttons.primary.label}</span>
                <span className="w-5 h-5 bg-ink text-cream rounded-sm flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                href={heroData.buttons.secondary.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink hover:bg-ink-soft text-cream font-mono text-xs uppercase tracking-mono font-medium rounded-full transition-colors"
              >
                <span>{heroData.buttons.secondary.label}</span>
              </Link>
            </div>

            {/* Floating Hand-placed Mono Stickers */}
            <div className="flex flex-wrap items-center gap-2.5 mt-8">
              {heroData.stickers.map((stk) => (
                <div
                  key={stk.label}
                  style={{ transform: `rotate(${stk.rotate}deg)` }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-ink/20 bg-cream/80 backdrop-blur-sm text-[10px] font-mono tracking-mono uppercase text-ink shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                  <span>{stk.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Half: Reserved space for 3D logo medallion scene + Jharokha arch */}
          <div className="lg:col-span-5 h-[320px] sm:h-[420px] lg:h-[520px] pointer-events-none relative flex items-center justify-center">
            {/* The 3D scene renders the medallion in this screen quadrant */}
          </div>
        </div>

        {/* Bottom Micro-Row: ON AIR Sign & Audio Equalizer Bars */}
        <div className="pt-8 flex flex-wrap items-center justify-between border-t border-hairline mt-4">
          <div className="flex items-center space-x-4">
            {/* Pulsing ON AIR Sign */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-orange/15 border border-orange/40 rounded-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-orange-deep">
                ON AIR
              </span>
            </div>

            {/* Animated Equalizer Bars */}
            <div className="flex items-end space-x-1 h-4">
              {[8, 14, 6, 18, 12, 16, 9, 15, 11, 7].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${height * 20}%`, `${(height * 40) % 90 + 10}%`, `${height * 20}%`],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + (i % 4) * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-ink rounded-xs"
                />
              ))}
            </div>
          </div>

          {/* Hand-drawn Scroll Cue with Arrow */}
          <div className="flex items-center space-x-2 text-ink-soft">
            <span className="font-mono text-[10px] uppercase tracking-mono">
              Scroll to unfurl the silk
            </span>
            <svg className="w-4 h-4 text-orange" viewBox="0 0 16 16" fill="none">
              <path d="M 8 2 L 8 13 M 4 9 L 8 13 L 12 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 5. Bottom Marquee Ticker Strip (Sand background with ink text & orange asterisks) */}
      <div className="relative z-30 w-full overflow-hidden bg-sand py-2.5 border-t border-hairline">
        <div className="flex space-x-8 whitespace-nowrap animate-shimmer">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-6 font-mono text-[11px] uppercase tracking-mono text-ink font-semibold"
            >
              {heroData.ticker.map((item) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  <span className="text-orange">✱</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
