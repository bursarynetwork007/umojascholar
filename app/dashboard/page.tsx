"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { NudgeBanner } from "@/components/ui/NudgeBanner";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { getNudgesForProfile } from "@/lib/nudges/engine";
import { scoreProfile } from "@/lib/scholarships/matcher";
import { User, Globe, PenLine, ClipboardList, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Works with both Cognito (primary) and Supabase auth (fallback)
      let userId: string | null = null;
      try {
        const { getCurrentUser } = await import("aws-amplify/auth");
        const u = await getCurrentUser();
        userId = u.userId;
      } catch {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/signin"); return; }
        userId = user.id;
      }
      if (!userId) { router.push("/signin"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
      setProfile(data || { id: userId, profile_completeness: 0 });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-8 w-8 border-2 border-terra border-t-transparent rounded-full" />
    </div>
  );

  const nudges = getNudgesForProfile({
    profile_completeness: profile?.profile_completeness ?? 0,
    fieldOfStudy: profile?.field_of_study,
    country: profile?.country,
  });

  const topMatches = scoreProfile({
    fieldOfStudy: profile?.field_of_study,
    studyLevel: profile?.study_level,
    gpa: profile?.gpa,
    achievements: profile?.achievements,
    communityInvolvement: profile?.community_involvement,
    careerGoals: profile?.career_goals,
  }).slice(0, 3);

  const quickActions = [
    { href: "/dashboard/profile", icon: User,          label: "Complete profile",    desc: "Unlock all matches",          color: "bg-terra/10 text-terra" },
    { href: "/dashboard/matches", icon: Globe,          label: "View matches",        desc: `${topMatches.length} scholarships found`, color: "bg-sage/10 text-sage" },
    { href: "/dashboard/essay",   icon: PenLine,        label: "Essay Co-Pilot",      desc: "AI feedback in 30 seconds",   color: "bg-gold/10 text-gold2" },
    { href: "/dashboard/tracker", icon: ClipboardList,  label: "Track applications",  desc: "Stay on top of deadlines",    color: "bg-bark/10 text-bark" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-bark">
          Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-bark/60 mt-1 text-sm">Here&apos;s where your scholarship journey stands today.</p>
      </div>

      {/* Nudge banner */}
      <NudgeBanner nudges={nudges} onCtaClick={(tab) => router.push(`/dashboard/${tab === "profile" ? "profile" : tab}`)} />

      {/* Profile ring + stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-sand p-6 flex items-center gap-5 shadow-sm">
          <ProgressRing pct={profile?.profile_completeness ?? 0} size={80} label="complete" />
          <div>
            <p className="font-semibold text-bark text-sm">Profile strength</p>
            <p className="text-bark/60 text-xs mt-1 leading-relaxed">
              {(profile?.profile_completeness ?? 0) < 60
                ? "Add more details to unlock better matches"
                : "Strong profile — keep going!"}
            </p>
            <Link href="/dashboard/profile" className="text-xs text-terra font-semibold mt-2 inline-block hover:text-terra2">
              Improve →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sand p-6 shadow-sm">
          <p className="text-xs text-bark/50 font-medium uppercase tracking-wide mb-1">Top match</p>
          {topMatches[0] ? (
            <>
              <p className="font-serif text-lg text-bark leading-tight">{topMatches[0].scholarship.name}</p>
              <p className="text-xs text-bark/50 mt-0.5">{topMatches[0].scholarship.hostCountry} {topMatches[0].scholarship.flag}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden">
                  <div className="h-full bg-sage rounded-full" style={{ width: `${topMatches[0].score}%` }} />
                </div>
                <span className="text-xs font-bold text-sage">{topMatches[0].score}%</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-bark/50">Complete your profile to see matches</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-sand p-6 shadow-sm">
          <p className="text-xs text-bark/50 font-medium uppercase tracking-wide mb-1">Scholarships matched</p>
          <p className="font-serif text-4xl text-bark">{topMatches.filter(m => m.score >= 60).length}</p>
          <p className="text-xs text-bark/50 mt-1">with 60%+ compatibility</p>
          <Link href="/dashboard/matches" className="text-xs text-terra font-semibold mt-3 inline-block hover:text-terra2">
            View all matches →
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="font-serif text-xl text-bark mb-4">Quick actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {quickActions.map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href}
            className="bg-white rounded-2xl border border-sand p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <p className="font-semibold text-bark text-sm">{label}</p>
            <p className="text-bark/50 text-xs mt-0.5">{desc}</p>
            <ArrowRight size={14} className="text-bark/30 mt-3 group-hover:text-terra transition-colors" />
          </Link>
        ))}
      </div>

      {/* Live match preview */}
      <div className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-sand flex items-center justify-between">
          <h2 className="font-serif text-lg text-bark">Your top matches</h2>
          <Link href="/dashboard/matches" className="text-xs text-terra font-semibold hover:text-terra2">
            See all →
          </Link>
        </div>
        <div className="divide-y divide-sand">
          {topMatches.map(({ scholarship: s, score, reasons }) => (
            <div key={s.id} className="px-6 py-4 flex items-center gap-4">
              <span className="text-2xl">{s.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-bark text-sm truncate">{s.name}</p>
                <p className="text-xs text-bark/50 mt-0.5">{reasons[0] || "Good match"}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-sm font-bold ${score >= 80 ? "text-sage" : score >= 60 ? "text-gold2" : "text-terra"}`}>
                  {score}%
                </span>
              </div>
            </div>
          ))}
          {topMatches.length === 0 && (
            <div className="px-6 py-8 text-center text-bark/50 text-sm">
              Complete your profile to see personalised matches
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
