"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import siteData from "@content/site.json";
import { copyToClipboard } from "@/lib/utils";
import { Mail, Check, Copy, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const interestOptions = [
  "Join the club (Recruitment & Auditions)",
  "Take part in an event (Campus Participation)",
  "Partner with us (Institutional Sponsorship)",
  "Be a guest (Green Room Recommendation)",
  "General Inquiry / Secretariat",
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: interestOptions[0],
    message: "",
  });

  useEffect(() => {
    if (initialSubject) {
      if (initialSubject.toLowerCase().includes("join")) {
        setFormData((prev) => ({ ...prev, interest: interestOptions[0] }));
      } else if (initialSubject.toLowerCase().includes("guest") || initialSubject.toLowerCase().includes("mic")) {
        setFormData((prev) => ({ ...prev, interest: interestOptions[3] }));
      } else if (initialSubject.toLowerCase().includes("event")) {
        setFormData((prev) => ({ ...prev, interest: interestOptions[1] }));
      }
    }
  }, [initialSubject]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please provide your full name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please include a message for the secretariat.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`[IoC MNIT] ${formData.interest} - ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${siteData.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Full Name */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono text-ink-soft mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
          placeholder="e.g. Namit Shastry"
          className={cn(
            "w-full px-4 py-3 rounded-card bg-cream-deep/70 border text-ink placeholder-ink-muted font-sans text-sm transition-all focus:outline-none",
            errors.name
              ? "border-error focus:ring-2 focus:ring-error"
              : "border-line focus:border-orange focus:ring-2 focus:ring-orange/30"
          )}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-error font-mono flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono text-ink-soft mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          placeholder="name@example.com"
          className={cn(
            "w-full px-4 py-3 rounded-card bg-cream-deep/70 border text-ink placeholder-ink-muted font-sans text-sm transition-all focus:outline-none",
            errors.email
              ? "border-error focus:ring-2 focus:ring-error"
              : "border-line focus:border-orange focus:ring-2 focus:ring-orange/30"
          )}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-error font-mono flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Purpose of Inquiry */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono text-ink-soft mb-2">
          Area of Interest
        </label>
        <select
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="w-full px-4 py-3 rounded-card bg-cream-deep/70 border border-line text-ink font-sans text-sm focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
        >
          {interestOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono text-ink-soft mb-2">
          Message *
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: "" });
          }}
          placeholder="Inquire about auditions, campus events, guest recommendations, or institutional partnerships..."
          className={cn(
            "w-full px-4 py-3 rounded-card bg-cream-deep/70 border text-ink placeholder-ink-muted font-sans text-sm transition-all focus:outline-none",
            errors.message
              ? "border-error focus:ring-2 focus:ring-error"
              : "border-line focus:border-orange focus:ring-2 focus:ring-orange/30"
          )}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-error font-mono flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Black Ink Pill Submit Button with Arrow */}
      <button
        type="submit"
        className="w-full py-3.5 rounded-full bg-ink hover:bg-ink/90 text-cream font-mono font-medium text-xs uppercase tracking-mono transition-all shadow-soft flex items-center justify-center gap-2 group"
      >
        <span>Dispatch Via Mail Client</span>
        <ArrowRight className="w-4 h-4 text-cream group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(siteData.contactEmail);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two-Column Layout (§7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Heading with italic accent, email in large type with copy button, secretariat details) */}
          <div className="lg:col-span-5 flex flex-col">
            <Eyebrow number="07" label="CONTACT US" className="mb-4" />
            
            <h1 className="font-display font-semibold text-4xl sm:text-6xl tracking-tightest text-ink mb-4">
              The <span className="font-accent text-ink">Secretariat</span>
            </h1>

            <p className="font-serif italic text-ink-soft text-xl sm:text-2xl mb-8 leading-snug">
              &ldquo;Connect with the leadership, propose conversations, or join the platform.&rdquo;
            </p>

            {/* Official Email in Large Type + Copy Button */}
            <div className="bg-paper border border-line rounded-card p-6 shadow-card mb-8">
              <span className="font-mono text-[10px] uppercase tracking-mono text-orange block mb-2 font-medium">
                OFFICIAL CORRESPONDENCE
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${siteData.contactEmail}`}
                  className="font-mono text-lg sm:text-xl font-semibold text-ink hover:text-orange transition-colors truncate"
                >
                  {siteData.contactEmail}
                </a>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-deep hover:bg-ink hover:text-cream text-ink text-xs font-mono tracking-mono uppercase transition-colors shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-orange" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Physical Secretariat Location */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-5 rounded-card bg-paper border border-line">
                <Mail className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-mono text-ink-muted block mb-1">
                    PHYSICAL SECRETARIAT
                  </span>
                  <h4 className="font-display font-semibold text-base text-ink mb-1">
                    MNIT Campus Stage
                  </h4>
                  <p className="font-sans text-xs text-ink-soft leading-relaxed">
                    {siteData.location}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-card bg-cream-deep/50 border border-line">
                <h5 className="font-display font-semibold text-sm text-ink mb-1.5">
                  Secretariat Timelines
                </h5>
                <p className="font-sans text-xs text-ink-soft leading-relaxed text-pretty">
                  Guest briefings, event participation inquiries, and institutional proposals are formally reviewed weekly by the President and Faculty Advisory council.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: --paper form card, inputs on --cream-deep, orange focus ring, black ink pill submit */}
          <div className="lg:col-span-7 bg-paper border border-line rounded-card p-8 sm:p-10 shadow-card">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-mono text-orange block mb-1 font-medium">
                DISPATCH FORM
              </span>
              <h3 className="font-display font-semibold text-2xl text-ink tracking-tight">
                Send a Correspondence
              </h3>
            </div>

            <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-ink-soft">Loading form...</div>}>
              <ContactFormContent />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
}
