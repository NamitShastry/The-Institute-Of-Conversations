import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldRule } from "@/components/ui/GoldRule";
import { SealedPlacard } from "@/components/ui/SealedPlacard";
import { SponsorsData } from "@/lib/types";
import rawSponsorsData from "@content/sponsors.json";
import { ArrowRight } from "lucide-react";

const sponsorsData = rawSponsorsData as SponsorsData;

export const metadata: Metadata = {
  title: "Our Sponsors · The Marquee | Institute of Conversations · MNIT Jaipur",
  description: "Partners and benefactors supporting research, long-form dialogue, and university archiving at MNIT Jaipur.",
};

export default function SponsorsPage() {
  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow number="03" label="OUR SPONSORS" className="mb-3" />
          <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mt-2">
            The <span className="font-accent text-ink">Marquee</span>
          </h1>
          <p className="font-serif italic text-ink-soft text-lg sm:text-2xl mt-3">
            &ldquo;{sponsorsData.description}&rdquo;
          </p>
          <GoldRule />
        </div>

        {/* Tiers Architecture */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {sponsorsData.tiers.map((tier) => (
            <div key={tier.id} className="relative">
              <div className="text-center mb-8">
                <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1 font-medium">
                  TIER SLOT ARCHITECTURE
                </span>
                <h3 className="font-display font-semibold text-2xl sm:text-4xl text-ink tracking-tight">
                  {tier.name}
                </h3>
              </div>

              {tier.size === "grand" && (
                <div className="flex justify-center">
                  <div className="w-full max-w-2xl">
                    {tier.items.map((item) => (
                      <SealedPlacard key={item.id} item={item} size="grand" />
                    ))}
                  </div>
                </div>
              )}

              {tier.size === "prominent" && (
                <div className="flex justify-center">
                  <div className="w-full max-w-xl">
                    {tier.items.map((item) => (
                      <SealedPlacard key={item.id} item={item} size="prominent" />
                    ))}
                  </div>
                </div>
              )}

              {tier.size === "standard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {tier.items.map((item) => (
                    <SealedPlacard key={item.id} item={item} size="standard" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Partner With Us CTA */}
        <div className="mt-24 max-w-3xl mx-auto text-center bg-paper border border-line rounded-card p-8 sm:p-12 shadow-card relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-deep/70 border border-line text-[10px] font-mono uppercase tracking-mono text-orange font-medium mb-3">
            <span>Institutional Sponsorship</span>
          </div>
          <h3 className="font-display font-semibold text-3xl sm:text-4xl text-ink tracking-tight mb-3">
            Partner With the Institute
          </h3>
          <p className="font-sans text-sm sm:text-base text-ink-soft max-w-lg mx-auto mb-8 leading-relaxed text-pretty">
            Support research-driven student broadcasting, campus dialogues, and national university distribution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-strong hover:bg-orange-hover text-cream font-mono font-medium text-xs uppercase tracking-mono transition-all shadow-soft"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4 text-cream" />
          </Link>
        </div>
      </div>
    </div>
  );
}
