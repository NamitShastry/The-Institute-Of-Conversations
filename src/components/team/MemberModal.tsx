"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { TeamMember } from "@/lib/types";

interface MemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/75 backdrop-blur-sm">
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card with Cream face and Sand trim */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-cream border border-sand rounded-2xl p-6 sm:p-8 shadow-card text-ink z-10 overflow-hidden"
        >
          {/* Top orange accent hairline */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-ink-soft hover:text-ink hover:bg-sand-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mt-2">
            {/* Avatar with orange ring */}
            <div className="relative w-24 h-24 rounded-full p-1 bg-sand border-2 border-orange mb-3">
              <div className="w-full h-full rounded-full overflow-hidden bg-cream flex items-center justify-center">
                <Image
                  src={member.photo || "/assets/avatars/member.svg"}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <span className="font-mono text-[10px] tracking-mono uppercase font-semibold text-orange-deep mb-1">
              {member.designation}
            </span>

            <h3 className="font-sans font-bold text-2xl text-ink tracking-tight mb-0.5">
              {member.name}
            </h3>

            <p className="font-mono text-xs text-ink-soft uppercase tracking-mono mb-4">
              {member.role} {member.year ? `// ${member.year}` : ""}
            </p>

            <div className="w-12 h-[1.5px] bg-sand mb-5" />

            {/* Role & Bio Area */}
            <div className="w-full bg-sand-light/50 border border-sand rounded-xl p-4 text-left mb-6">
              <span className="font-mono text-[10px] uppercase tracking-mono text-ink-soft font-semibold block mb-1.5">
                Mandate & Focus
              </span>
              <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed italic">
                {member.bio && member.bio.trim() !== ""
                  ? member.bio
                  : "Dedicated to the institutional excellence and archival integrity of the Institute of Conversations."}
              </p>
            </div>

            {/* Mentorship or Institutional Footprint */}
            {member.mentoredTeamIds && member.mentoredTeamIds.length > 0 && (
              <div className="w-full font-mono text-[11px] text-ink-soft flex items-center justify-center gap-1.5 bg-sand-light py-2 px-3 rounded-full border border-sand mb-5">
                <Sparkles className="w-3.5 h-3.5 text-orange" />
                <span>Mentors: {member.mentoredTeamIds.map(t => t.replace(/-/g, " ")).join(", ")}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-orange hover:bg-orange-hover text-ink font-mono font-semibold text-xs tracking-mono uppercase transition-colors shadow-orange-sm"
            >
              Return to Ensemble
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
