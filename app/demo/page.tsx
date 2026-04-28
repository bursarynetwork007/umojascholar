"use client";
import { useState } from "react";
import Link from "next/link";
import { scoreProfile } from "@/lib/scholarships/matcher";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ArrowRight, ChevronDown, ChevronUp, Eye, EyeOff, Sparkles } from "lucide-react";

const FIELDS = [
  "Engineering", "Computer Science", "Medicine", "Public Health",
  "Agriculture", "Economics", "Education", "Social Sciences", "Other",
];
const LEVELS = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "masters",       label: "Masters" },
  { value: "phd",           label: "PhD" },
];

export default function DemoPage() {
  const [field, setField]   = useState("Computer Science");
  const [level, setLevel]   = useState("masters");
  const [gpa, setGpa]       = useState("3.7");
  const [ran, setRan]       = useState(false);
  const [expanded, setExpanded]         = useState<string | null>(null);
  const [insiderVisible, setInsiderVisible] = useState<string | null>(null);

  const matches = ran ? scoreProfile({ fieldOfStudy: field, studyLevel: level, gpa }) : [];

  const completeness = [field, level, gpa].filter(Boolean).length * 33;

  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1.5 kente-stripe w-full" />

      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1">
          <span className="font-serif text-xl text-bark">Umoja</span>
          <span className="font-serif text-xl text-terra">Scholar</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="text-sm text-bark/60 hover:text-bark transition-colors">Sign in</Link>
          <Link href="/signup" className="text-sm font-semibold bg-terra text-cream px-4 py-2 rounded-lg hover:bg-terra2 transition-colors shadow-sm">
            Create free account
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-terra/10 border border-terra/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={13} className="text-terra" />
            <span className="text-xs font-semibold text-terra">Live demo — no account needed</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-bark mb-3">
            See your scholarship matches
          </h1>
          <p className="text-bark/60 max-w-xl mx-auto leading-relaxed">
            Enter three details below and see which international scholarships you qualify for — ranked by compatibility, with insider knowledge panels.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Input panel */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-sand shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg text-bark">Your profile</h2>
                <ProgressRing pct={completeness} size={52} />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bark mb-1.5">Field of study</label>
                  <select value={field} onChange={(e) => { setField(e.target.value); setRan(false); }}
                    className="w-full border border-sand2 rounded-lg px-3 py-2.5 text-sm text-bark bg-cream focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra">
                    {FIELDS.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bark mb-1.5">Study level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {LEVELS.map((l) => (
                      <button key={l.value} onClick={() => { setLevel(l.value); setRan(false); }}
                        className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                          level === l.value
                            ? "bg-terra text-cream border-terra"
                            : "bg-cream border-sand2 text-bark/70 hover:border-terra/40"
                        }`}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bark mb-1.5">GPA / Grade</label>
                  <input type="text" value={gpa}
                    onChange={(e) => { setGpa(e.target.value); setRan(false); }}
                    placeholder="e.g. 3.7 or 75%"
                    className="w-full border border-sand2 rounded-lg px-3 py-2.5 text-sm text-bark bg-cream focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra" />
                </div>

                <button onClick={() => setRan(true)}
                  className="w-full flex items-center justify-center gap-2 bg-terra text-cream py-3 rounded-xl font-semibold text-sm hover:bg-terra2 transition-all shadow-sm hover:shadow-md mt-2">
                  <Sparkles size={15} />
                  Show my matches
                </button>
              </div>

              {/* Upsell */}
              <div className="mt-5 pt-5 border-t border-sand">
                <p className="text-xs text-bark/50 leading-relaxed">
                  <span className="font-semibold text-bark">This is a preview.</span>{" "}
                  Create a free account to unlock full profile matching, essay AI coaching, and application tracking.
                </p>
                <Link href="/signup"
                  className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-terra hover:text-terra2 transition-colors">
                  Get full access free <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="md:col-span-3">
            {!ran ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-sand border-dashed text-center p-8">
                <div className="text-4xl mb-3">🌍</div>
                <p className="font-serif text-xl text-bark mb-1">Your matches will appear here</p>
                <p className="text-bark/50 text-sm">Fill in your details and click &ldquo;Show my matches&rdquo;</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-bark/60 mb-4">
                  <span className="font-semibold text-bark">{matches.length} scholarships</span> ranked for {field} · {level}
                </p>

                {matches.map(({ scholarship: s, score, reasons }) => (
                  <div key={s.id} className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">{s.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <h3 className="font-semibold text-bark text-sm">{s.name}</h3>
                              <p className="text-xs text-bark/50 mt-0.5">{s.hostCountry} · {s.deadline}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-serif text-lg text-bark">${s.amountUsd.toLocaleString()}</div>
                              <div className="text-xs text-bark/40">per year</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <ScoreBar score={score} />
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {reasons.map((r) => (
                              <span key={r} className="text-xs bg-sage/10 text-sage border border-sage/20 rounded-full px-2.5 py-0.5 font-medium">{r}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-sand">
                        <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-bark/60 hover:text-bark transition-colors">
                          {expanded === s.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          Details
                        </button>
                        <button onClick={() => setInsiderVisible(insiderVisible === s.id ? null : s.id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-terra hover:text-terra2 transition-colors">
                          {insiderVisible === s.id ? <EyeOff size={13} /> : <Eye size={13} />}
                          Insider knowledge
                        </button>
                        <Link href="/signup"
                          className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-cream bg-terra px-3 py-1.5 rounded-lg hover:bg-terra2 transition-colors">
                          Track this <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>

                    {expanded === s.id && (
                      <div className="px-5 pb-5 border-t border-sand bg-cream/50 pt-4">
                        <p className="text-sm text-bark/70 leading-relaxed">{s.description}</p>
                      </div>
                    )}

                    {insiderVisible === s.id && (
                      <div className="px-5 pb-5 border-t-2 border-terra/30 bg-terra/5 pt-4">
                        <p className="text-xs font-semibold text-terra mb-2">🔍 What the website won&apos;t tell you</p>
                        <p className="text-sm text-bark/80 leading-relaxed">{s.hiddenRequirements}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Bottom CTA */}
                <div className="bg-bark rounded-2xl p-6 text-center mt-4">
                  <div className="h-1 kente-stripe w-16 mx-auto mb-4 rounded-full" />
                  <p className="font-serif text-xl text-cream mb-2">
                    Want essay coaching for these scholarships?
                  </p>
                  <p className="text-cream/60 text-sm mb-4">
                    Create a free account to unlock AI essay feedback, full profile matching, and application tracking.
                  </p>
                  <Link href="/signup"
                    className="inline-flex items-center gap-2 bg-terra text-cream px-6 py-3 rounded-xl font-semibold text-sm hover:bg-terra2 transition-all shadow-md">
                    Create free account <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
