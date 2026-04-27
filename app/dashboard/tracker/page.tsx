"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { scholarships } from "@/lib/scholarships/data";
import { CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

type AppStatus = "not_started" | "in_progress" | "submitted" | "rejected" | "accepted";

const STATUS_CONFIG: Record<AppStatus, { label: string; color: string; bg: string }> = {
  not_started: { label: "Not started",  color: "text-bark/50",  bg: "bg-bark/10" },
  in_progress:  { label: "In progress",  color: "text-gold2",    bg: "bg-gold/15" },
  submitted:    { label: "Submitted",    color: "text-sage",     bg: "bg-sage/15" },
  rejected:     { label: "Rejected",     color: "text-red-500",  bg: "bg-red-50" },
  accepted:     { label: "Accepted 🎉",  color: "text-sage",     bg: "bg-sage/20" },
};

const DOC_CHECKLISTS: Record<string, string[]> = {
  chevening:        ["Personal statement (500 words)", "Leadership essay (500 words)", "Networking essay (500 words)", "Study in the UK essay (500 words)", "2 references", "Degree certificate", "Transcripts", "English language certificate", "Passport copy"],
  daad:             ["Research proposal (3–5 pages)", "CV / Résumé", "Motivation letter", "2 academic references", "Degree certificate", "Transcripts", "Language certificate (German or English)", "Passport copy"],
  mastercard:       ["Personal statement", "Community impact essay", "2 references (academic + community)", "Transcripts", "Proof of financial need", "Passport copy"],
  fulbright:        ["Personal statement", "Study/research objective", "3 references", "Transcripts", "English proficiency test", "Passport copy", "CV"],
  commonwealth:     ["Personal statement", "Development impact statement", "2 references", "Transcripts", "English language certificate", "Passport copy"],
  "gates-cambridge":["Research proposal", "Personal statement", "2 academic references", "Transcripts", "English language certificate", "Passport copy"],
  "chinese-government": ["Application form", "Study plan", "2 academic references", "Transcripts", "Physical examination form", "Passport copy", "Language certificate"],
  "australia-awards": ["Personal statement", "Development impact statement", "2 references", "Transcripts", "English language certificate", "Passport copy", "Work experience evidence"],
};

const INSIDER_TIPS: Record<string, string> = {
  chevening:        "Submit at least 2 weeks before the deadline — late submissions are auto-rejected. Start your references 6 weeks early; referees are the #1 bottleneck.",
  daad:             "Email your target professor before submitting. A positive response from them dramatically improves your chances. Attach a 1-page research summary.",
  mastercard:       "The community impact section carries more weight than academics. Quantify everything: numbers of people reached, percentage improvements, measurable outcomes.",
  fulbright:        "The personal statement should read like a conversation, not a CV. Panels want to feel your personality. Avoid bullet points entirely.",
  commonwealth:     "Explicitly reference the Commonwealth Sustainable Development Goals in your development impact statement. Panels notice alignment.",
  "gates-cambridge":"Gates Cambridge interviews are conversational and probing. They will challenge your research assumptions. Prepare to defend your methodology.",
  "chinese-government": "Cold-email 2–3 professors at your target university before applying. A faculty acceptance letter is not required but significantly helps.",
  "australia-awards": "DFAT verifies return obligations strictly. Include a concrete plan for how you will return and contribute — vague statements are flagged.",
};

export default function TrackerPage() {
  const router = useRouter();
  const supabase = createClient();
  const [applications, setApplications] = useState<Record<string, { status: AppStatus; checked: string[] }>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signin"); return; }
      const { data } = await supabase.from("applications").select("*").eq("profile_id", user.id);
      const map: Record<string, { status: AppStatus; checked: string[] }> = {};
      (data || []).forEach((a: any) => {
        map[a.scholarship_id] = { status: a.status, checked: [] };
      });
      setApplications(map);
      setLoading(false);
    }
    load();
  }, []);

  async function updateStatus(schId: string, status: AppStatus) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setApplications((prev) => ({ ...prev, [schId]: { ...prev[schId], status } }));
    await supabase.from("applications").upsert({
      profile_id: user.id,
      scholarship_id: schId,
      status,
      updated_at: new Date().toISOString(),
    }, { onConflict: "profile_id,scholarship_id" });
  }

  function toggleDoc(schId: string, doc: string) {
    setApplications((prev) => {
      const current = prev[schId]?.checked || [];
      const checked = current.includes(doc) ? current.filter((d) => d !== doc) : [...current, doc];
      return { ...prev, [schId]: { ...prev[schId], checked } };
    });
  }

  const appStatus = (schId: string): AppStatus => applications[schId]?.status || "not_started";
  const checkedDocs = (schId: string) => applications[schId]?.checked || [];

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-8 w-8 border-2 border-terra border-t-transparent rounded-full" />
    </div>
  );

  const activeCount = Object.values(applications).filter((a) => a.status !== "not_started").length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-bark">Application Tracker</h1>
        <p className="text-bark/60 text-sm mt-1">
          {activeCount > 0 ? `${activeCount} application${activeCount > 1 ? "s" : ""} in progress` : "Track every scholarship from first click to acceptance."}
        </p>
      </div>

      {/* Summary bar */}
      {activeCount > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(["in_progress", "submitted", "accepted", "rejected"] as AppStatus[]).map((s) => {
            const count = Object.values(applications).filter((a) => a.status === s).length;
            const cfg = STATUS_CONFIG[s];
            return (
              <div key={s} className={`rounded-xl border p-3 text-center ${cfg.bg}`}>
                <div className={`font-serif text-2xl ${cfg.color}`}>{count}</div>
                <div className="text-xs text-bark/60 mt-0.5">{cfg.label}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        {scholarships.map((s) => {
          const status = appStatus(s.id);
          const cfg = STATUS_CONFIG[status];
          const docs = DOC_CHECKLISTS[s.id] || [];
          const checked = checkedDocs(s.id);
          const pct = docs.length > 0 ? Math.round((checked.length / docs.length) * 100) : 0;
          const isExpanded = expanded === s.id;

          return (
            <div key={s.id} className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
              {/* Header row */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{s.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-bark text-sm">{s.name}</h3>
                        <p className="text-xs text-bark/50 mt-0.5">{s.hostCountry} · Deadline: {s.deadline}</p>
                      </div>
                      {/* Status selector */}
                      <select
                        value={status}
                        onChange={(e) => updateStatus(s.id, e.target.value as AppStatus)}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-terra/30 ${cfg.bg} ${cfg.color}`}
                      >
                        {Object.entries(STATUS_CONFIG).map(([val, c]) => (
                          <option key={val} value={val}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Progress bar (only if started) */}
                    {status !== "not_started" && docs.length > 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden">
                          <div className="h-full bg-terra rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-bark/50 shrink-0">{checked.length}/{docs.length} docs</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-sand">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : s.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-bark/60 hover:text-bark transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {isExpanded ? "Hide checklist" : "Document checklist"}
                  </button>
                  <a href={s.applicationUrl} target="_blank" rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-bark bg-cream2 border border-sand px-3 py-1.5 rounded-lg hover:bg-sand transition-colors">
                    Apply <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* Expanded checklist + insider tip */}
              {isExpanded && (
                <div className="border-t border-sand bg-cream/40 px-5 pb-5 pt-4 space-y-4">
                  {/* Document checklist */}
                  <div>
                    <p className="text-xs font-semibold text-bark/60 uppercase tracking-wide mb-3">Required documents</p>
                    <div className="space-y-2">
                      {docs.map((doc) => {
                        const done = checked.includes(doc);
                        return (
                          <button key={doc} onClick={() => toggleDoc(s.id, doc)}
                            className="flex items-center gap-3 w-full text-left group">
                            {done
                              ? <CheckCircle2 size={16} className="text-sage shrink-0" />
                              : <Circle size={16} className="text-bark/30 group-hover:text-bark/60 shrink-0 transition-colors" />
                            }
                            <span className={`text-sm transition-colors ${done ? "line-through text-bark/40" : "text-bark/80 group-hover:text-bark"}`}>
                              {doc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Insider tip */}
                  {INSIDER_TIPS[s.id] && (
                    <div className="bg-terra/8 border border-terra/20 rounded-xl p-3">
                      <p className="text-xs font-semibold text-terra mb-1">⚡ Insider tip</p>
                      <p className="text-xs text-bark/70 leading-relaxed">{INSIDER_TIPS[s.id]}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
