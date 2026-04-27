"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { CheckCircle2, Info } from "lucide-react";

const STEPS = [
  { id: 1, label: "Basic info",   icon: "👤" },
  { id: 2, label: "Academic",     icon: "🎓" },
  { id: 3, label: "Your story",   icon: "✨" },
  { id: 4, label: "Goals",        icon: "🎯" },
];

const STUDY_LEVELS = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "masters",       label: "Masters" },
  { value: "phd",           label: "PhD" },
  { value: "postdoc",       label: "Postdoc" },
];

const FIELDS = [
  "Engineering","Computer Science","Medicine","Public Health","Agriculture",
  "Economics","Business","Law","Education","Social Sciences","Arts & Humanities",
  "Natural Sciences","Environmental Science","Architecture","Other",
];

const DESTINATIONS = ["Any","United Kingdom","United States","Germany","China","Australia","Canada","South Korea","France"];

const AFRICAN_COUNTRIES = [
  "Nigeria","South Africa","Kenya","Ghana","Ethiopia","Tanzania","Uganda","Rwanda",
  "Senegal","Côte d'Ivoire","Cameroon","Zimbabwe","Zambia","Mozambique","Angola",
  "Sudan","Egypt","Morocco","Tunisia","Algeria","Other African country",
];

function Hint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-gold/10 border border-gold/20 rounded-lg px-3 py-2 mt-2">
      <Info size={13} className="text-gold2 mt-0.5 shrink-0" />
      <p className="text-xs text-bark/70 leading-relaxed">{text}</p>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-bark mb-1.5">{label}</label>
      {children}
      {hint && <Hint text={hint} />}
    </div>
  );
}

const inputCls = "w-full border border-sand2 rounded-lg px-4 py-2.5 text-sm text-bark bg-cream focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra";
const textareaCls = `${inputCls} resize-none`;

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "", phone: "", country: "Nigeria", destination_preference: "Any",
    study_level: "", field_of_study: "", institution: "", gpa: "",
    achievements: "", community_involvement: "", career_goals: "", career_vision: "",
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signin"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) setProfile((p) => ({ ...p, ...data }));
    }
    load();
  }, []);

  const completeness = Math.min(100, [
    profile.full_name, profile.field_of_study, profile.study_level,
    profile.institution, profile.gpa,
    profile.achievements?.length > 50 ? "ok" : "",
    profile.community_involvement?.length > 30 ? "ok" : "",
    profile.career_goals?.length > 30 ? "ok" : "",
    profile.career_vision?.length > 30 ? "ok" : "",
    profile.phone,
  ].filter(Boolean).length * 10);

  async function save() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("profiles").upsert({ id: user.id, ...profile });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  }

  async function saveAndNext() {
    await save();
    if (step < 4) setStep(step + 1);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-bark">Build your profile</h1>
          <p className="text-bark/60 text-sm mt-1">The stronger your profile, the better your matches.</p>
        </div>
        <ProgressRing pct={completeness} size={72} label="done" />
      </div>

      {/* Step tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {STEPS.map((s) => (
          <button key={s.id} onClick={() => setStep(s.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              step === s.id ? "bg-terra text-cream" : completeness >= s.id * 25 ? "bg-sage/15 text-sage" : "bg-cream2 text-bark/60 hover:text-bark"
            }`}>
            <span>{s.icon}</span>
            {s.label}
            {completeness >= s.id * 25 && step !== s.id && <CheckCircle2 size={13} className="text-sage" />}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-sand shadow-sm p-6 space-y-5">
        {/* Step 1: Basic info */}
        {step === 1 && (
          <>
            <Field label="Full name">
              <input type="text" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Amara Diallo" className={inputCls} />
            </Field>
            <Field label="Country of origin">
              <select value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} className={inputCls}>
                {AFRICAN_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Preferred destination" hint="Choosing 'Any' shows you the most scholarships. You can filter later.">
              <select value={profile.destination_preference} onChange={(e) => setProfile({ ...profile, destination_preference: e.target.value })} className={inputCls}>
                {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="WhatsApp number (optional)" hint="We'll use this for deadline reminders in Phase 2. Zero spam.">
              <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+234 800 000 0000" className={inputCls} />
            </Field>
          </>
        )}

        {/* Step 2: Academic */}
        {step === 2 && (
          <>
            <Field label="Study level">
              <div className="grid grid-cols-2 gap-2">
                {STUDY_LEVELS.map((l) => (
                  <button key={l.value} onClick={() => setProfile({ ...profile, study_level: l.value })}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      profile.study_level === l.value ? "bg-terra text-cream border-terra" : "bg-cream border-sand2 text-bark hover:border-terra/50"
                    }`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Field of study" hint="Be specific — 'Electrical Engineering' beats 'Engineering'. Panels notice.">
              <select value={profile.field_of_study} onChange={(e) => setProfile({ ...profile, field_of_study: e.target.value })} className={inputCls}>
                <option value="">Select your field</option>
                {FIELDS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Institution / University">
              <input type="text" value={profile.institution} onChange={(e) => setProfile({ ...profile, institution: e.target.value })} placeholder="University of Lagos" className={inputCls} />
            </Field>
            <Field label="GPA / Grade" hint="Use your local scale — 3.8/4.0, 75%, First Class, etc. We normalise it.">
              <input type="text" value={profile.gpa} onChange={(e) => setProfile({ ...profile, gpa: e.target.value })} placeholder="e.g. 3.8/4.0 or 78%" className={inputCls} />
            </Field>
          </>
        )}

        {/* Step 3: Story */}
        {step === 3 && (
          <>
            <Field label="Leadership & achievements" hint="Specific numbers beat vague claims every time. '40 students' beats 'many students'. '3× increase' beats 'significant improvement'.">
              <textarea rows={4} value={profile.achievements} onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
                placeholder="Founded a coding club with 40 members. Led a community health campaign that reached 500 households. Won national mathematics olympiad 2022..."
                className={textareaCls} />
              <p className="text-xs text-bark/40 mt-1">{profile.achievements?.length || 0} chars — aim for 150+</p>
            </Field>
            <Field label="Community involvement" hint="Scholarship panels — especially Mastercard Foundation and Commonwealth — weight community impact heavily. What ripple effects have you created?">
              <textarea rows={3} value={profile.community_involvement} onChange={(e) => setProfile({ ...profile, community_involvement: e.target.value })}
                placeholder="Volunteer teacher at rural school, mentored 12 students who passed national exams. Organised clean water campaign..."
                className={textareaCls} />
            </Field>
          </>
        )}

        {/* Step 4: Goals */}
        {step === 4 && (
          <>
            <Field label="Career goals" hint="Name the specific problem you want to solve. 'I want to improve healthcare in Nigeria' is weak. 'I want to build diagnostic tools for rural clinics in northern Nigeria' is strong.">
              <textarea rows={3} value={profile.career_goals} onChange={(e) => setProfile({ ...profile, career_goals: e.target.value })}
                placeholder="I want to build affordable diagnostic tools for rural clinics in northern Nigeria, reducing misdiagnosis rates by 60%..."
                className={textareaCls} />
            </Field>
            <Field label="Long-term vision" hint="Chevening, Fulbright, and Commonwealth all ask about your return plan. Write it here once — we'll use it across applications.">
              <textarea rows={3} value={profile.career_vision} onChange={(e) => setProfile({ ...profile, career_vision: e.target.value })}
                placeholder="In 10 years, I see myself leading a health-tech startup that has deployed in 5 African countries, with a team of 50 local engineers..."
                className={textareaCls} />
            </Field>
          </>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>← Back</Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs text-sage font-medium flex items-center gap-1"><CheckCircle2 size={13} /> Saved</span>}
            <Button variant="secondary" onClick={save} loading={saving}>Save</Button>
            {step < 4
              ? <Button onClick={saveAndNext} loading={saving}>Next step →</Button>
              : <Button onClick={save} loading={saving}>Save profile ✓</Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
