"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldRule } from "@/components/ui/GoldRule";
import { GalleryData, GalleryItem } from "@/lib/types";
import rawGalleryData from "@content/gallery.json";
import { Clapperboard, X } from "lucide-react";
import { cn } from "@/lib/utils";

const galleryData = rawGalleryData as GalleryData;

export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeAlbum === "all"
      ? galleryData.items
      : galleryData.items.filter((item) => item.albumId === activeAlbum);

  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow number="06" label="GALLERY" className="mb-3" />
          <h1 className="font-display font-semibold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mt-2">
            The <span className="font-accent text-ink">Reel</span>
          </h1>
          <p className="font-serif italic text-ink-soft text-lg sm:text-2xl mt-3">
            &ldquo;Contact sheets and documentary captures from the recording floor.&rdquo;
          </p>
          <GoldRule />

          {/* Album Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {galleryData.albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-mono transition-all",
                  activeAlbum === album.id
                    ? "bg-orange-strong text-cream font-medium shadow-soft"
                    : "bg-paper text-ink-soft hover:text-ink border border-line"
                )}
              >
                {album.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Content or Poetic Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative h-72 rounded-card overflow-hidden bg-paper border border-line cursor-pointer shadow-card hover:border-orange/60 transition-colors"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-display font-semibold text-lg text-cream tracking-tight">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-cream/80 mt-0.5 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State: Quiet cream panel with single line illustration of empty reel */
          <div className="max-w-2xl mx-auto my-12 bg-paper border border-line rounded-card p-10 sm:p-16 text-center relative overflow-hidden shadow-card">
            <div className="relative z-10 flex flex-col items-center">
              {/* Single Line Illustration of Empty Film Reel */}
              <div className="w-16 h-16 rounded-full bg-cream-deep/60 border border-line flex items-center justify-center mb-6 text-ink-muted">
                <svg className="w-8 h-8 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="18" r="1.5" fill="currentColor" />
                  <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-2 font-medium">
                PRODUCTION IN PROGRESS
              </span>

              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                The first reel is being shot.
              </h3>

              <p className="font-sans text-sm text-ink-soft max-w-md mx-auto leading-relaxed text-pretty">
                Archival documentary captures, green room portraits, and production floor contact sheets will appear here following inaugural sessions.
              </p>
            </div>
          </div>
        )}

        {/* Lightbox Modal with rgba(17,17,17,.92) backdrop */}
        {activeLightboxItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: "rgba(17,17,17,0.92)" }}
            onClick={() => setActiveLightboxItem(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-paper rounded-card overflow-hidden border border-line p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-ink/70 text-cream hover:bg-ink transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[60vh] rounded-card overflow-hidden bg-cream-deep mb-4">
                <Image
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="px-2">
                <h3 className="font-display font-semibold text-xl text-ink tracking-tight">
                  {activeLightboxItem.title}
                </h3>
                <p className="font-sans text-sm text-ink-soft mt-1">
                  {activeLightboxItem.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
