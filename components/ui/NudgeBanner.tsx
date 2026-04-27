"use client";
import { useState, useEffect } from "react";
import { type Nudge } from "@/lib/nudges/engine";
import { X } from "lucide-react";

interface NudgeBannerProps {
  nudges: Nudge[];
  onCtaClick: (tab: string) => void;
}

export function NudgeBanner({ nudges, onCtaClick }: NudgeBannerProps) {
  const [idx, setIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (nudges.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % nudges.length), 6000);
    return () => clearInterval(t);
  }, [nudges.length]);

  if (dismissed || nudges.length === 0) return null;

  const nudge = nudges[idx];

  const bgMap: Record<Nudge["type"], string> = {
    loss_aversion: "bg-terra/10 border-terra/30",
    social_proof:  "bg-sage/10 border-sage/30",
    commitment:    "bg-gold/10 border-gold/30",
    urgency:       "bg-red-50 border-red-200",
  };

  const iconBgMap: Record<Nudge["type"], string> = {
    loss_aversion: "bg-terra/20",
    social_proof:  "bg-sage/20",
    commitment:    "bg-gold/20",
    urgency:       "bg-red-100",
  };

  return (
    <div
      className={`relative flex items-start gap-3 rounded-xl border px-4 py-3 mb-6 ${bgMap[nudge.type]}`}
    >
      <span className={`text-xl rounded-lg p-1.5 ${iconBgMap[nudge.type]}`}>
        {nudge.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-bark text-sm">{nudge.headline}</p>
        <p className="text-bark/70 text-xs mt-0.5 leading-relaxed">{nudge.message}</p>
        <button
          onClick={() => onCtaClick(nudge.ctaTab)}
          className="mt-2 text-xs font-semibold text-terra hover:text-terra2 underline underline-offset-2"
        >
          {nudge.cta}
        </button>
      </div>
      {nudges.length > 1 && (
        <div className="flex gap-1 absolute bottom-2 right-8">
          {nudges.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === idx ? "bg-terra" : "bg-bark/20"
              }`}
            />
          ))}
        </div>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="text-bark/40 hover:text-bark/70 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
