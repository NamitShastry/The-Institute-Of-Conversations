import React from "react";
import Link from "next/link";
import Image from "next/image";
import siteData from "@content/site.json";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-ink border-t border-orange text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-b border-line-dark pb-12">
          {/* Logo & Identity */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-line-dark p-0.5 bg-paper shadow-soft">
                <Image
                  src="/assets/ioc-logo-transparent.png"
                  alt="Institute of Conversations Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-display text-lg font-semibold tracking-tight text-cream block leading-snug">
                  Institute of Conversations
                </span>
                <span className="font-mono text-[10px] uppercase tracking-mono text-orange block">
                  MNIT JAIPUR
                </span>
              </div>
            </Link>

            <p className="font-serif italic text-cream text-2xl">
              &ldquo;{siteData.tagline}&rdquo;
            </p>

            <p className="font-sans text-xs text-cream/70 max-w-sm leading-relaxed">
              {siteData.subtagline}
            </p>
          </div>

          {/* Directory Column */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-mono text-cream/60 font-semibold mb-4">
              DIRECTORY // ARCHIVE
            </h4>
            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              {siteData.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-cream/80 hover:text-orange transition-colors py-0.5 uppercase tracking-mono"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Secretariat Contact Column */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-mono text-cream/60 font-semibold mb-1">
              SECRETARIAT // INQUIRIES
            </h4>
            <a
              href={`mailto:${siteData.contactEmail}`}
              className="font-mono text-xs text-cream hover:text-orange transition-colors underline underline-offset-4 decoration-orange/60 font-semibold"
            >
              {siteData.contactEmail}
            </a>
            <p className="font-sans text-xs text-cream/70 leading-relaxed pt-1">
              {siteData.location}
            </p>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-cream/50 uppercase tracking-mono gap-3">
          <p>{siteData.footerNote}</p>
          <div className="flex items-center space-x-4">
            <span>OFFICIAL STUDENT INSTITUTION</span>
            <span>·</span>
            <span>EST. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
