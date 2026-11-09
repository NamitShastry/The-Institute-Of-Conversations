import React from "react";
import Link from "next/link";
import Image from "next/image";
import siteData from "@content/site.json";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-sand border-t border-hairline text-ink overflow-hidden">
      {/* Signature Silk Gradient Ribbon above Footer */}
      <div className="w-full h-2 bg-silk opacity-95" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-b border-sand-dark/40 pb-12">
          {/* Logo & Identity */}
          <div className="md:col-span-5 flex flex-col items-start space-y-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full border border-sand-dark p-0.5 bg-cream shadow-xs">
                <Image
                  src="/assets/ioc-logo-transparent.png"
                  alt="Institute of Conversations Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-sans text-lg font-bold tracking-tight text-ink block leading-snug">
                  Institute of Conversations
                </span>
                <span className="font-mono text-[10px] uppercase tracking-mono text-orange-deep block font-semibold">
                  MNIT JAIPUR
                </span>
              </div>
            </Link>

            <p className="font-serif italic text-orange-deep text-lg">
              &ldquo;{siteData.tagline}&rdquo;
            </p>

            <p className="font-sans text-xs text-ink-soft max-w-sm leading-relaxed">
              {siteData.subtagline}
            </p>
          </div>

          {/* Directory */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-mono text-ink font-bold mb-3">
              DIRECTORY // ARCHIVE
            </h4>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {siteData.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ink-soft hover:text-orange-deep transition-colors py-0.5 uppercase tracking-mono"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Secretariat Contact */}
          <div className="md:col-span-3 flex flex-col space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-mono text-ink font-bold mb-1">
              SECRETARIAT // INQUIRIES
            </h4>
            <a
              href={`mailto:${siteData.contactEmail}`}
              className="font-mono text-xs text-ink hover:text-orange-deep transition-colors underline underline-offset-4 decoration-orange font-semibold"
            >
              {siteData.contactEmail}
            </a>
            <p className="font-sans text-xs text-ink-soft leading-relaxed pt-1">
              {siteData.location}
            </p>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-ink-soft uppercase tracking-mono gap-3">
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
