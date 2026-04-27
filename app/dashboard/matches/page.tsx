"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { scoreProfile, type MatchResult } from "@/lib/scholarships/matcher";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { ChevronDown, ChevronUp, ExternalLink, Eye, EyeOff } from "lucide-react";

const CURRENCIES = [
  { code: "USD", symbol: "$",  label: "USD", key: "amountUsd" as const },
  { code: "ZAR", symbol: "R",  label: "ZAR", key: "amountLocal" as const },
  { code: "GBP", symbol: "£",  label: "GBP", key: "amountUsd" as const },
  { code: "EUR", symbol: "€",  label: "GBP", key: "amountUsd" as const },
];

function formatAmount(match: MatchResult, currency: typeof CURRENCIES[0]) {
  const raw = match.scholarship[currency.key] ?? match.scholarship.amountUsd;
  if (!raw) return "Varies";
  const converted = currency.code === "GBP" ? Math.round(raw * 0.79)
    : currency.code === "EUR" ? Math.round(raw * 0.92)
    : currency.code === "ZAR" ? Math.round(raw * 18.7)
    : raw;
  return `${currency.symbol}${converted.toLocaleString()}`;
}

export default function MatchesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [insiderVisible, setInsiderVisible] = useState<string | null>(null);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signin"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      const results = scoreProfile({
        fieldOfStudy: data?.field_of_study,
        studyLevel: data?.study_level,
        gpa: data?.gpa,
        achievements: data?.achievements,
        communityInvolvement: data?.community_involvement,
        careerGoals: data?.career_goals,
        careerVision: data?.career_vision,
      });
      setMatches(results);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-8 w-8 border-2 border-terra border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-bark">Your matches</h1>
          <p className="text-bark/60 text-sm mt-1">{matches.length} scholarships ranked by compatibility</p>
        </div>
        {/* Currency toggle */}
        <div className="flex gap-1 bg-cream2 rounded-lg p-1 border border-sand">
          {CURRENCIES.map((c) => (
            <button key={c.code} onClick={() => setCurrency(c)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                currency.code === c.code ? "bg-bark text-cream" : "text-bark/60 hover:text-bark"
              }`}>
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {matches.map(({ scholarship: s, score, reasons }) => (
          <div key={s.id} className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
            {/* Main row */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl mt-0.5">{s.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-bark">{s.name}</h3>
                      <p className="text-xs text-bark/50 mt-0.5">{s.organisation} · {s.hostCountry}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-serif text-xl text-bark">{formatAmount({ scholarship: s, score, reasons }, currency)}</div>
                      <div className="text-xs text-bark/40">per year</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <ScoreBar score={score} />
                  </div>

                  {/* Reasons */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {reasons.map((r) => (
                      <span key={r} className="text-xs bg-sage/10 text-sage border border-sage/20 rounded-full px-2.5 py-0.5 font-medium">{r}</span>
                    ))}
                    {s.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs bg-cream2 text-bark/60 border border-sand rounded-full px-2.5 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-sand">
                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-bark/60 hover:text-bark transition-colors">
                  {expanded === s.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {expanded === s.id ? "Less detail" : "More detail"}
                </button>
                <button onClick={() => setInsiderVisible(insiderVisible === s.id ? null : s.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-terra hover:text-terra2 transition-colors">
                  {insiderVisible === s.id ? <EyeOff size={14} /> : <Eye size={14} />}
                  Insider knowledge
                </button>
                <a href={s.applicationUrl} target="_blank" rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-bark bg-cream2 border border-sand px-3 py-1.5 rounded-lg hover:bg-sand transition-colors">
                  Apply <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Expanded description */}
            {expanded === s.id && (
              <div className="px-5 pb-5 border-t border-sand bg-cream/50">
                <p className="text-sm text-bark/70 leading-relaxed pt-4">{s.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="text-xs text-bark/50">Levels:</span>
                  {s.levels.map((l) => (
                    <span key={l} className="text-xs bg-gold/10 text-gold2 border border-gold/20 rounded-full px-2.5 py-0.5 font-medium capitalize">{l}</span>
                  ))}
                  <span className="text-xs text-bark/50 ml-2">Deadline:</span>
                  <span className="text-xs font-medium text-bark">{s.deadline}</span>
                </div>
              </div>
            )}

            {/* Insider knowledge panel */}
            {insiderVisible === s.id && (
              <div className="px-5 pb-5 border-t-2 border-terra/30 bg-terra/5">
                <div className="flex items-center gap-2 pt-4 mb-2">
                  <span className="text-sm font-semibold text-terra">🔍 Insider knowledge</span>
                  <span className="text-xs text-bark/40">— what the website won&apos;t tell you</span>
                </div>
                <p className="text-sm text-bark/80 leading-relaxed">{s.hiddenRequirements}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
