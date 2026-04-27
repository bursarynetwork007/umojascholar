export interface NudgeProfile {
  profile_completeness: number;
  fieldOfStudy?: string;
  country?: string;
}

export interface Nudge {
  id: string;
  type: "loss_aversion" | "social_proof" | "commitment" | "urgency";
  icon: string;
  headline: string;
  message: string;
  cta: string;
  ctaTab: string;
  priority: number;
}

export function getNudgesForProfile(profile: NudgeProfile): Nudge[] {
  const nudges: Nudge[] = [];
  const pct = profile.profile_completeness || 0;
  const country = profile.country || "your country";
  const field = profile.fieldOfStudy || "your field";

  if (pct < 30) {
    nudges.push({
      id: "profile_low",
      type: "loss_aversion",
      icon: "📊",
      headline: "You're missing 70% of your matches",
      message: `Without a complete profile, our AI can only show you a fraction of available scholarships. Students with 80%+ profiles receive 4× more relevant matches.`,
      cta: "Complete profile →",
      ctaTab: "profile",
      priority: 1,
    });
  } else if (pct < 60) {
    nudges.push({
      id: "profile_mid",
      type: "commitment",
      icon: "🎯",
      headline: "You're 3 questions away from your best matches",
      message: `Your profile is ${pct}% complete. Students who finish the profile wizard in one session are 3× more likely to submit an application.`,
      cta: "Finish profile →",
      ctaTab: "profile",
      priority: 1,
    });
  } else if (pct < 80) {
    nudges.push({
      id: "profile_high",
      type: "social_proof",
      icon: "🌟",
      headline: `Students from ${country} are winning right now`,
      message: `Your profile is strong. Add your career vision to unlock your final match tier — the scholarships that specifically value ${field} expertise.`,
      cta: "Add career vision →",
      ctaTab: "profile",
      priority: 2,
    });
  }

  nudges.push({
    id: "essay_nudge",
    type: "social_proof",
    icon: "✍️",
    headline: "Your essay is your biggest differentiator",
    message:
      "Grades get you shortlisted. Essays get you selected. Our AI Co-Pilot has helped students rewrite openings that panels remember.",
    cta: "Try Essay Co-Pilot →",
    ctaTab: "essay",
    priority: 3,
  });

  nudges.push({
    id: "deadline_nudge",
    type: "urgency",
    icon: "⏰",
    headline: "Chevening closes in 6 weeks",
    message:
      "The UK's most prestigious scholarship for African leaders closes November 5th. Students who start applications 4+ weeks early are 2× more likely to submit.",
    cta: "Start Chevening →",
    ctaTab: "tracker",
    priority: 4,
  });

  return nudges.sort((a, b) => a.priority - b.priority);
}
