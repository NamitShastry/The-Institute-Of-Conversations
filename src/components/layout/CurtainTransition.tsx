"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface CurtainTransitionProps {
  children: React.ReactNode;
}

export const CurtainTransition: React.FC<CurtainTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== displayPath) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayPath(pathname);
        const exitTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 450);
        return () => clearTimeout(exitTimer);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath]);

  return (
    <>
      {/* Route Wipe Silk Gradient Panels */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-50 pointer-events-none flex w-full h-full overflow-hidden">
            {/* Left Silk Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-1/2 h-full bg-sand border-r border-orange shadow-[6px_0_24px_rgba(242,106,27,0.25)] relative overflow-hidden"
              style={{
                background: "linear-gradient(115deg, #F3ECE0 0%, #E6D8C3 40%, #F7B58A 75%, #F26A1B 100%)",
              }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-l from-orange to-transparent opacity-80" />
            </motion.div>

            {/* Right Silk Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-1/2 h-full bg-sand border-l border-orange shadow-[-6px_0_24px_rgba(242,106,27,0.25)] relative overflow-hidden"
              style={{
                background: "linear-gradient(-115deg, #F3ECE0 0%, #E6D8C3 40%, #F7B58A 75%, #F26A1B 100%)",
              }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-orange to-transparent opacity-80" />
            </motion.div>

            {/* Center Orange Spark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-12 h-12 rotate-45 border border-orange bg-cream shadow-orange-glow flex items-center justify-center">
                <div className="w-3 h-3 bg-orange rotate-45 animate-pulse" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
};
