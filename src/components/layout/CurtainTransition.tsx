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
        }, 325);
        return () => clearTimeout(exitTimer);
      }, 325);

      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath]);

  return (
    <>
      {/* Route Transition: Clean Ink Panel Wipe with Cream Wordmark Flash (650ms total) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.32,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{ originY: 1 }}
            className="fixed inset-0 z-50 pointer-events-none bg-ink flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, delay: 0.15 }}
              className="text-center"
            >
              <span className="font-display font-semibold text-2xl tracking-tight text-cream block">
                Institute of Conversations
              </span>
              <span className="font-mono text-xs uppercase tracking-mono text-orange block mt-1">
                MNIT JAIPUR
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
};
