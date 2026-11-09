"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldRule } from "@/components/ui/GoldRule";
import { GalleryData, GalleryItem } from "@/lib/types";
import rawGalleryData from "@content/gallery.json";
import { Film, Clapperboard, Sparkles, X } from "lucide-react";
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
      {/* Background paper texture */}
      <div className="absolute inset-0 pointer-events-none paper-grain" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow number="06" label="GALLERY" className="mb-3" />
          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mt-2">
            The Reel
          </h1>
          <p className="font-serif italic text-orange-deep text-lg sm:text-2xl mt-3">
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
                    ? "bg-orange text-ink font-bold shadow-orange-sm"
                    : "bg-sand-light text-ink-soft hover:text-ink border border-sand"
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
                className="group relative h-72 rounded-xl overflow-hidden bg-sand border border-sand-dark cursor-pointer shadow-subtle hover:border-orange transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-sans font-bold text-lg text-cream">
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
          /* Empty State: Cream stage with one orange silk drape and "The first reel is being shot." */
          <div className="max-w-2xl mx-auto my-12 bg-sand-light/60 border border-sand rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden shadow-card">
            {/* Silk Drape Accent along right side */}
            <div
              className="absolute top-0 right-0 w-36 h-full opacity-60 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #F3ECE0 0%, #E6D8C3 40%, #F7B58A 75%, #F26A1B 100%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-18 h-18 rounded-full bg-cream border-2 border-orange flex items-center justify-center mb-6 shadow-orange-sm">
                <Clapperboard className="w-8 h-8 text-orange" />
              </div>

              <span className="font-mono text-xs uppercase tracking-mono font-semibold text-orange-deep mb-2">
                PRODUCTION FLOOR // ARCHIVE
              </span>

              <h3 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight mb-3">
                {galleryData.emptyStateMessage}
              </h3>

              <p className="font-sans text-sm text-ink-soft max-w-md mx-auto leading-relaxed mb-6">
                {galleryData.emptyStateDescription}
              </p>

              <div className="flex items-center space-x-2 font-mono text-xs text-ink bg-cream px-4 py-2 rounded-full border border-sand">
                <Sparkles className="w-3.5 h-3.5 text-orange" />
                <span>Lossless 4K Captures & Archival Stills Loading Soon</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal (Backdrop is --ink at 88% per theme specs) */}
      {activeLightboxItem && (
        <div
          onClick={() => setActiveLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/88 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-cream border border-sand rounded-2xl overflow-hidden shadow-card"
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cream/90 text-ink hover:text-orange transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-[60vh] w-full bg-ink/90">
              <Image
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-sand">
              <h4 className="font-sans font-bold text-2xl text-ink">
                {activeLightboxItem.title}
              </h4>
              <p className="font-sans text-sm text-ink-soft mt-1">
                {activeLightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
