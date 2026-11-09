"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const SpotlightCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouchDevice(false);
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest(".interactive-element"))
      ) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Soft peach halo (Theme Revision: works on light background) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-40 rounded-full mix-blend-multiply"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isInteractive ? 140 : 80,
          height: isInteractive ? 140 : 80,
          background: isInteractive
            ? "radial-gradient(circle, rgba(247, 181, 138, 0.45) 0%, rgba(242, 106, 27, 0.08) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(247, 181, 138, 0.3) 0%, transparent 70%)",
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
      {/* Small orange dot that becomes an orange ring on interactive hover */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-orange"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isInteractive ? 36 : 8,
          height: isInteractive ? 36 : 8,
          backgroundColor: isInteractive ? "rgba(242, 106, 27, 0.15)" : "#F26A1B",
          boxShadow: isInteractive ? "0 0 12px rgba(242, 106, 27, 0.4)" : "none",
          transition: "width 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s",
        }}
      />
    </>
  );
};
