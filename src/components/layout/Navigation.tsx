"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import siteData from "@content/site.json";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = siteData.navigation.filter((link) => link.href !== "/contact");
  const contactLink = siteData.navigation.find((link) => link.href === "/contact") || {
    label: "Contact Us",
    href: "/contact",
  };

  const showAnnouncement = siteData.announcement && !announcementDismissed;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* 1. Slim Announcement Bar (Top, 36px, --ink, cream text) */}
      {showAnnouncement && (
        <div className="bg-ink text-cream text-xs h-9 px-4 flex items-center justify-between border-b border-line-dark">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 w-full">
            <span className="bg-orange text-cream text-[10px] font-mono font-bold tracking-mono px-1.5 py-0.5 rounded-full uppercase">
              {siteData.announcement.tag}
            </span>
            <Link
              href={siteData.announcement.href}
              className="hover:underline flex items-center gap-1.5 text-xs text-cream/90 hover:text-cream transition-colors truncate"
            >
              <span>{siteData.announcement.text}</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange flex-shrink-0" />
            </Link>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-cream/60 hover:text-cream transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Main Sticky Nav */}
      <nav
        aria-label="Main Navigation"
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-line py-3 shadow-soft"
            : "bg-cream/70 backdrop-blur-sm border-b border-line py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark (Original colours untouched) */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-md"
            aria-label="Institute of Conversations Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-line p-0.5 group-hover:border-orange transition-colors bg-paper">
              <Image
                src="/assets/ioc-logo-transparent.png"
                alt="Institute of Conversations Emblem"
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm sm:text-base tracking-tight text-ink group-hover:text-orange-deep transition-colors">
                Institute of Conversations
              </span>
              <span className="font-mono text-[9px] uppercase tracking-mono text-ink-soft -mt-0.5">
                MNIT JAIPUR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden lg:flex items-center space-x-1 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-sm font-medium tracking-tight transition-colors duration-200",
                    isActive ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-underline"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-orange rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Black Ink Pill Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href={contactLink.href}
              className="bg-ink hover:bg-ink/90 text-cream px-4 py-2 rounded-full text-xs font-mono uppercase tracking-mono flex items-center gap-1.5 transition-all shadow-soft group"
            >
              <span>{contactLink.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cream transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-ink hover:bg-cream-deep transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-x-0 top-auto bottom-0 top-[88px] bg-cream/98 backdrop-blur-xl border-b border-line px-6 py-8 flex flex-col justify-between z-30"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-2xl font-display font-semibold tracking-tight transition-colors block py-1",
                        isActive ? "text-orange" : "text-ink hover:text-orange-deep"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pt-6 border-t border-line"
            >
              <Link
                href={contactLink.href}
                className="w-full bg-ink text-cream py-3 rounded-full text-center text-sm font-mono uppercase tracking-mono flex items-center justify-center gap-2 shadow-soft"
              >
                <span>{contactLink.label}</span>
                <ArrowRight className="w-4 h-4 text-cream" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
