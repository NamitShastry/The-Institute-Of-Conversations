"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldRule } from "@/components/ui/GoldRule";
import siteData from "@content/site.json";
import { copyToClipboard } from "@/lib/utils";
import { Mail, Check, Copy, Send, AlertCircle } from "lucide-react";
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
      newErrors.email = "Please provide a valid email format.";
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
        <label className="block font-mono text-xs uppercase tracking-mono font-semibold text-ink mb-2">
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
            "w-full px-4 py-3 rounded-xl bg-cream border text-ink placeholder-ink-soft/40 font-sans text-sm focus:outline-none transition-all",
            errors.name
              ? "border-error focus:ring-2 focus:ring-error"
              : "border-sand focus:border-orange focus:ring-2 focus:ring-orange/30"
          )}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs px-3 py-1.5 rounded-lg bg-error-bg text-error font-mono flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono font-semibold text-ink mb-2">
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
            "w-full px-4 py-3 rounded-xl bg-cream border text-ink placeholder-ink-soft/40 font-sans text-sm focus:outline-none transition-all",
            errors.email
              ? "border-error focus:ring-2 focus:ring-error"
              : "border-sand focus:border-orange focus:ring-2 focus:ring-orange/30"
          )}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs px-3 py-1.5 rounded-lg bg-error-bg text-error font-mono flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Purpose / Interest */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono font-semibold text-ink mb-2">
          Purpose / Interest
        </label>
        <select
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-cream border border-sand text-ink font-sans text-sm focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
        >
          {interestOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-cream text-ink">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-mono font-semibold text-ink mb-2">
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
            "w-full px-4 py-3 rounded-xl bg-cream border text-ink placeholder-ink-soft/40 font-sans text-sm focus:outline-none transition-all",
            errors.message
              ? "border-error focus:ring-2 focus:ring-error"
              : "border-sand focus:border-orange focus:ring-2 focus:ring-orange/30"
          )}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs px-3 py-1.5 rounded-lg bg-error-bg text-error font-mono flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-full bg-orange hover:bg-orange-hover text-ink font-mono font-semibold text-xs uppercase tracking-mono transition-all shadow-orange-sm flex items-center justify-center gap-2 group"
      >
        <span>Dispatch Via Mail Client</span>
        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = async () => {
    const success = await copyToClipboard(siteData.contactEmail);
    if (success) {
      setCopied(true);
      setToastMessage("Email copied to clipboard!");
      setTimeout(() => {
        setCopied(false);
        setToastMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="w-full bg-cream text-ink min-h-screen pt-28 pb-32 relative overflow-hidden">
      {/* Background paper texture */}
      <div className="absolute inset-0 pointer-events-none paper-grain" />

      {/* Copy Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-orange text-ink px-5 py-3 rounded-full font-mono font-bold text-xs tracking-mono uppercase shadow-orange-sm flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow number="07" label="CONTACT US" className="mb-3" />
          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl tracking-tightest text-ink mt-2">
            The Secretariat
          </h1>
          <p className="font-serif italic text-orange-deep text-lg sm:text-2xl mt-3">
            &ldquo;Connect with the leadership, propose conversations, or join the platform.&rdquo;
          </p>
          <GoldRule />
        </div>

        {/* Primary Click-to-Copy Headline Email */}
        <div className="max-w-2xl mx-auto text-center mb-16 p-8 rounded-3xl bg-sand-light/60 border border-sand shadow-subtle">
          <span className="font-mono text-[10px] uppercase tracking-mono text-orange-deep font-semibold block mb-2">
            OFFICIAL CORRESPONDENCE
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${siteData.contactEmail}`}
              className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-ink underline decoration-orange hover:text-orange-deep transition-colors"
            >
              {siteData.contactEmail}
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream hover:bg-orange text-ink text-xs font-mono font-semibold uppercase tracking-mono transition-all border border-sand shadow-xs"
              aria-label="Copy email address"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Contact Form & Side Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          {/* Left Form: Sand Panel with Cream Inputs and 1px Sand Borders */}
          <div className="lg:col-span-7 bg-sand border border-sand-dark rounded-3xl p-8 sm:p-10 shadow-card relative">
            <h3 className="font-sans font-bold text-2xl text-ink tracking-tight mb-6">
              Dispatch a Message
            </h3>

            <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-ink-soft">Loading form...</div>}>
              <ContactFormContent />
            </Suspense>
          </div>

          {/* Right Side Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* The Envelope Box on Sand */}
            <div className="group relative bg-sand-light/70 border border-sand rounded-3xl p-8 shadow-card overflow-hidden hover:border-orange transition-all duration-300">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-cream border-2 border-orange flex items-center justify-center mb-5 shadow-orange-sm group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-9 h-9 text-orange" />
                </div>

                <span className="font-mono text-[10px] uppercase tracking-mono text-orange-deep font-semibold block mb-1">
                  PHYSICAL SECRETARIAT
                </span>
                <h4 className="font-sans font-bold text-2xl text-ink mb-2">
                  MNIT Campus Stage
                </h4>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">
                  {siteData.location}
                </p>
              </div>
            </div>

            {/* Secretariat Timelines */}
            <div className="bg-sand-light/50 border border-sand rounded-2xl p-6">
              <h5 className="font-sans font-bold text-base text-ink mb-2">
                Secretariat Timelines
              </h5>
              <p className="font-sans text-xs text-ink-soft leading-relaxed">
                Guest briefings, event participation inquiries, and institutional proposals are formally reviewed weekly by the President and Faculty Advisory council.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
