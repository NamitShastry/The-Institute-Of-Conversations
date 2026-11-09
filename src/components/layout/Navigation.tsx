"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import siteData from "@content/site.json";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-cream/90 backdrop-blur-md py-3 border-b border-sand shadow-subtle"
          : "bg-cream/70 backdrop-blur-sm py-4 border-b border-hairline"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark (Original colours untouched) */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-md"
          aria-label="Institute of Conversations Home"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-sand p-0.5 group-hover:border-orange transition-colors bg-cream">
            <Image
              src="/assets/ioc-logo-transparent.png"
              alt="Institute of Conversations Emblem"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-ink group-hover:text-orange-deep transition-colors">
              IoC · MNIT
            </span>
            <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft -mt-1 font-medium">
              JAIPUR
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {siteData.navigation.map((link) => {
            const isActive = pathname === link.href;
            const isContact = link.href === "/contact";

            if (isContact) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "ml-2 px-4 py-1.5 font-mono text-xs uppercase tracking-mono rounded-full font-semibold transition-all",
                    isActive
                      ? "bg-orange-hover text-ink shadow-orange-sm"
                      : "bg-orange text-ink hover:bg-orange-hover shadow-orange-sm"
                  )}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 font-mono text-xs uppercase tracking-mono rounded-full transition-all",
                  isActive
                    ? "text-ink font-bold"
                    : "text-ink-soft hover:text-ink hover:bg-sand-light/50"
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-sand rounded-full -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-md bg-sand-light/70 border border-sand"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-end">
              <span
                className={cn(
                  "h-0.5 bg-ink transition-all duration-300",
                  mobileMenuOpen ? "w-5 rotate-45 translate-y-1.5" : "w-5"
                )}
              />
              <span
                className={cn(
                  "h-0.5 bg-ink transition-all duration-300",
                  mobileMenuOpen ? "opacity-0" : "w-3.5"
                )}
              />
              <span
                className={cn(
                  "h-0.5 bg-ink transition-all duration-300",
                  mobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Curtain-Style Menu (Silk & Sand sliding panels) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[60px] z-50 lg:hidden flex overflow-hidden">
            {/* Left Sand Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-1/2 h-full bg-sand border-r border-hairline relative"
            />

            {/* Right Silk Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-1/2 h-full bg-sand-light border-l border-hairline relative"
            />

            {/* Content Revealed Inside Parted Stage */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.18, duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-center items-center px-8 z-10 space-y-4 bg-cream/95 backdrop-blur-md"
            >
              <div className="text-center mb-2">
                <span className="font-mono text-[10px] uppercase tracking-mono text-orange-deep font-semibold">
                  DIRECTORY
                </span>
                <div className="w-8 h-[1.5px] bg-orange mx-auto mt-1" />
              </div>

              {siteData.navigation.map((link, idx) => {
                const isActive = pathname === link.href;
                const isContact = link.href === "/contact";

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-mono text-lg uppercase tracking-mono transition-colors block text-center py-1.5 px-4 rounded-full",
                        isActive
                          ? "bg-sand text-ink font-bold"
                          : isContact
                          ? "bg-orange text-ink font-bold"
                          : "text-ink-soft hover:text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-6 text-center border-t border-sand w-full max-w-xs mt-4">
                <p className="font-serif italic text-base text-orange-deep">
                  &ldquo;Where Ideas Meet.&rdquo;
                </p>
                <p className="font-mono text-[10px] text-ink-soft uppercase tracking-mono mt-1">
                  IoC · MNIT Jaipur
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
