"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { scholarships } from "@/lib/scholarships/data";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { fetchAuthSession } from "aws-amplify/auth";
import { Lightbulb, ChevronDown } from "lucide-react";

export default function EssayPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [draft, setDraft] = useState("");
  const [selectedSchId, setSelectedSchId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signin"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data);
    }
    load();
  }, []);

  const selectedSch = scholarships.find((s) => s.id === selectedSchId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || draft.length < 100) {
      setError("Please paste at least 100 characters of your essay draft.");
      return;
    }
    setLoading(true);
    setError("");
    setFeedback("");

    try {
      // Get Cognito JWT for API auth
      let token = "";
      try {
        const session = await fetchAuthSession();
        token = session.tokens?.idToken?.toString() ?? "";
      } catch {
        // Supabase fallback during transition
        const { data: { session } } = await supabase.auth.getSession();
        token = session?.access_token ?? "";
      }

      const profileContext = profile ? `
Name: ${profile.full_name || "Not provided"}
Country: ${profile.country || "Not provided"}
Field: ${profile.field_of_study || "Not provided"}
Level: ${profile.study_level || "Not provided"}
Institution: ${profile.institution || "Not provided"}
Achievements: ${profile.achievements || "Not provided"}
Community: ${profile.community_involvement || "Not provided"}
Goals: ${profile.career_goals || "Not provided"}`.trim() : "";

      const res = await fetch("/api/essay-copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          draft,
          scholarshipName: selectedSch?.name,
          scholarshipOrg: selectedSch?.organisation,
          hiddenRequirement: selectedSch?.hiddenRequirements,
          profileContext,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong"); setLoading(false); return; }
      setFeedback(data.feedback);
    } catch {
      setError("Network error — please try again.");
    }
    setLoading(false);
  }

  // Render markdown-ish feedback with section highlighting
  function renderFeedback(text: string) {
    const sections = text.split(/\n(?=\*\*[✅🔍🌍✍️💬])/);
    return sections.map((section, i) => {
      const headerMatch = section.match(/^\*\*([^*]+)\*\*/);
      const header = headerMatch?.[1] ?? "";
      const body = section.replace(/^\*\*[^*]+\*\*\n?/, "").trim();
      const colors = ["bg-sage/10 border-sage/30","bg-terra/10 border-terra/30","bg-gold/10 border-gold/30","bg-bark/5 border-bark/20","bg-cream2 border-sand2"];
      return (
        <div key={i} className={`rounded-xl border p-4 ${colors[i % colors.length]}`}>
          {header && <p className="font-semibold text-bark text-sm mb-2">{header}</p>}
          <p className="text-sm text-bark/80 leading-relaxed whitespace-pre-wrap">{body}</p>
        </div>
      );
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-bark">Essay Co-Pilot</h1>
        <p className="text-bark/60 text-sm mt-1">
          Paste your draft. Get structured AI feedback with African cultural bridging intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Input panel */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-sand shadow-sm p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Scholarship selector */}
              <div>
                <label className="block text-sm font-medium text-bark mb-1.5">
                  Target scholarship <span className="text-bark/40 font-normal">(optional but recommended)</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedSchId}
                    onChange={(e) => setSelectedSchId(e.target.value)}
                    className="w-full border border-sand2 rounded-lg px-4 py-2.5 text-sm text-bark bg-cream focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra appearance-none"
                  >
                    <option value="">General feedback (no specific scholarship)</option>
                    {scholarships.map((s) => (
                      <option key={s.id} value={s.id}>{s.flag} {s.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-bark/40 pointer-events-none" />
                </div>
                {selectedSch && (
                  <div className="mt-2 flex items-start gap-2 bg-terra/5 border border-terra/20 rounded-lg px-3 py-2">
                    <Lightbulb size={13} className="text-terra mt-0.5 shrink-0" />
                    <p className="text-xs text-bark/70 leading-relaxed">
                      <span className="font-semibold text-terra">Insider tip loaded.</span>{" "}
                      The AI will tailor feedback specifically for {selectedSch.organisation} panels.
                    </p>
                  </div>
                )}
              </div>

              {/* Draft textarea */}
              <div>
                <label className="block text-sm font-medium text-bark mb-1.5">Your essay draft</label>
                <textarea
                  rows={12}
                  value={draft}
                  onChange={(e) => { setDraft(e.target.value); setCharCount(e.target.value.length); }}
                  placeholder="Paste your personal statement, motivation letter, or any essay draft here...

The AI will give you:
• What's working (specific phrases that land)
• What to strengthen (prioritised fixes)
• Cultural bridge (how to frame your African story)
• Rewritten opening paragraph
• 3 power phrases to use"
                  className="w-full border border-sand2 rounded-lg px-4 py-3 text-sm text-bark bg-cream focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra resize-none"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-bark/40">Minimum 100 characters</span>
                  <span className={`text-xs font-medium ${charCount >= 100 ? "text-sage" : "text-bark/40"}`}>
                    {charCount} chars
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">{error}</div>
              )}

              <Button type="submit" loading={loading} className="w-full" size="lg">
                {loading ? "Analysing your essay..." : "Get AI feedback →"}
              </Button>
              <p className="text-center text-xs text-bark/40">~$0.002 per review · 10 reviews/day limit</p>
            </form>
          </div>
        </div>

        {/* Tips panel */}
        <div className="md:col-span-2 space-y-3">
          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-4">
            <p className="font-semibold text-bark text-sm mb-2">💡 Before you submit</p>
            <ul className="space-y-2 text-xs text-bark/70 leading-relaxed">
              <li>• Paste at least one full paragraph — the more context, the better the feedback</li>
              <li>• Select the target scholarship for tailored panel insights</li>
              <li>• Your profile data is automatically included as context</li>
              <li>• The AI keeps your voice — it won&apos;t rewrite your whole essay</li>
            </ul>
          </div>
          <div className="bg-sage/10 border border-sage/20 rounded-2xl p-4">
            <p className="font-semibold text-bark text-sm mb-2">🌍 Cultural intelligence</p>
            <p className="text-xs text-bark/70 leading-relaxed">
              The Co-Pilot is trained to recognise when African students undersell their experience. It will flag moments where your story is stronger than you think.
            </p>
          </div>
        </div>
      </div>

      {/* Feedback output */}
      {loading && (
        <div className="mt-8 bg-white rounded-2xl border border-sand shadow-sm p-8 flex flex-col items-center gap-3">
          <Spinner className="h-8 w-8" />
          <p className="text-sm text-bark/60">Reading your essay and preparing feedback...</p>
          <p className="text-xs text-bark/40">Usually takes 10–20 seconds</p>
        </div>
      )}

      {feedback && !loading && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-bark">Your feedback</h2>
            {selectedSch && (
              <span className="text-xs bg-terra/10 text-terra border border-terra/20 rounded-full px-3 py-1 font-medium">
                {selectedSch.flag} Tailored for {selectedSch.name}
              </span>
            )}
          </div>
          <div className="space-y-3">{renderFeedback(feedback)}</div>
          <div className="mt-4 text-center">
            <button
              onClick={() => { setFeedback(""); setDraft(""); setCharCount(0); }}
              className="text-xs text-bark/50 hover:text-bark transition-colors underline underline-offset-2"
            >
              Start a new review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
