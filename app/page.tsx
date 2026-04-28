import Link from "next/link";
import { ArrowRight, Star, Globe, BookOpen, Users } from "lucide-react";

const testimonials = [
  {
    name: "Amara Diallo",
    country: "🇸🇳 Senegal",
    scholarship: "Chevening Scholar, LSE",
    quote:
      "UmojaScholar showed me I was underselling my community work. The essay feedback helped me reframe my story — I got Chevening on my first try.",
  },
  {
    name: "Kwame Asante",
    country: "🇬🇭 Ghana",
    scholarship: "DAAD Scholar, TU Berlin",
    quote:
      "The insider knowledge panel told me to email a specific professor before applying. That one tip changed everything. I had a response within 48 hours.",
  },
  {
    name: "Fatima Nkosi",
    country: "🇿🇦 South Africa",
    scholarship: "Mastercard Foundation Scholar",
    quote:
      "I almost didn't apply because I thought my GPA wasn't good enough. The matching score showed me I was wrong. Now I'm at University of Toronto.",
  },
];

const destinations = [
  { flag: "🇬🇧", country: "United Kingdom", count: "12 scholarships" },
  { flag: "🇺🇸", country: "United States", count: "8 scholarships" },
  { flag: "🇩🇪", country: "Germany", count: "6 scholarships" },
  { flag: "🇨🇳", country: "China", count: "5 scholarships" },
  { flag: "🇦🇺", country: "Australia", count: "4 scholarships" },
  { flag: "🇨🇦", country: "Canada", count: "4 scholarships" },
  { flag: "🇰🇷", country: "South Korea", count: "3 scholarships" },
  { flag: "🇫🇷", country: "France / EU", count: "3 scholarships" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1.5 kente-stripe w-full" />
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-serif text-bark">Umoja</span>
          <span className="text-2xl font-serif text-terra">Scholar</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="text-sm font-medium text-bark/70 hover:text-bark transition-colors px-4 py-2">Sign in</Link>
          <Link href="/signup" className="text-sm font-semibold bg-terra text-cream px-5 py-2.5 rounded-lg hover:bg-terra2 transition-colors shadow-sm">Get started free</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
          <span className="text-xs font-semibold text-gold2">🌍 Built for African students, by Africans</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-bark leading-tight mb-6">
          Your scholarship is{" "}
          <span className="text-terra italic">waiting.</span>
          <br />
          Let&apos;s find it together.
        </h1>
        <p className="text-lg md:text-xl text-bark/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered matching across 40+ international scholarships. Essay coaching that understands your African story. Insider knowledge panels that tell you what the website won&apos;t.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup" className="flex items-center gap-2 bg-terra text-cream px-8 py-4 rounded-xl font-semibold text-base hover:bg-terra2 transition-all shadow-md hover:shadow-lg">
            Find my scholarships <ArrowRight size={18} />
          </Link>
          <Link href="/demo" className="flex items-center gap-2 bg-white border border-sand2 text-bark px-8 py-4 rounded-xl font-semibold text-base hover:bg-cream2 transition-all shadow-sm">
            Try the demo first →
          </Link>
        </div>
        <p className="mt-4 text-xs text-bark/40">No account needed for the demo · Free to sign up</p>


        {/* Low-bandwidth callout */}
        <div className="mt-8 inline-flex items-center gap-2.5 bg-sage/10 border border-sage/25 rounded-xl px-4 py-2.5 text-sm text-bark/70">
          <span className="text-base">⚡</span>
          <span>
            <span className="font-semibold text-bark">Works during load-shedding.</span>{" "}
            Matches and tracker load offline. Essay Co-Pilot queues when you reconnect.
          </span>
        </div>
      </section>

      <section className="bg-bark text-cream py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "40+", label: "Curated scholarships" },
            { value: "8", label: "Destination countries" },
            { value: "$2M+", label: "Available in funding" },
            { value: "4 min", label: "Avg. to first match" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl text-gold mb-1">{s.value}</div>
              <div className="text-sm text-cream/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl text-bark text-center mb-4">From profile to application in 3 steps</h2>
        <p className="text-bark/60 text-center mb-14 max-w-xl mx-auto">Most students spend weeks researching scholarships they&apos;re not eligible for. We fix that in minutes.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: <Users size={24} className="text-terra" />, title: "Build your profile", desc: "A 4-step wizard that collects your academic background, achievements, and story. Contextual hints teach you what panels actually look for." },
            { step: "02", icon: <Globe size={24} className="text-sage" />, title: "Get matched instantly", desc: "Our scoring engine ranks every scholarship against your profile with reasons. See exactly why you match — and what would improve your score." },
            { step: "03", icon: <BookOpen size={24} className="text-gold2" />, title: "Write with AI coaching", desc: "Paste your essay draft. Get structured feedback with cultural bridging intelligence — how to frame your African story for Western panels." },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="absolute -top-3 -left-3 font-serif text-6xl text-sand2/60 select-none">{item.step}</div>
              <div className="bg-white rounded-2xl border border-sand p-6 pt-8 shadow-sm">
                <div className="w-10 h-10 bg-cream2 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl text-bark mb-2">{item.title}</h3>
                <p className="text-bark/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream2 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-bark text-center mb-10">Scholarships across 8 countries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {destinations.map((d) => (
              <div key={d.country} className="bg-white rounded-xl border border-sand p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">{d.flag}</div>
                <div className="font-semibold text-bark text-sm">{d.country}</div>
                <div className="text-xs text-bark/50 mt-0.5">{d.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl text-bark text-center mb-4">African students winning globally</h2>
        <p className="text-bark/60 text-center mb-14">Real stories from students who used UmojaScholar to win their scholarships.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-sand p-6 shadow-sm">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (<Star key={i} size={14} className="fill-gold text-gold" />))}
              </div>
              <p className="text-bark/80 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-sand pt-4">
                <div className="font-semibold text-bark text-sm">{t.name}</div>
                <div className="text-xs text-bark/50 mt-0.5">{t.country}</div>
                <div className="text-xs text-terra font-medium mt-1">{t.scholarship}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bark py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="h-1 kente-stripe w-24 mx-auto mb-8 rounded-full" />
          <h2 className="font-serif text-4xl text-cream mb-4">Your story deserves to be heard.</h2>
          <p className="text-cream/60 mb-8 leading-relaxed">Thousands of African students are qualified for international scholarships they never apply for — because no one told them they were eligible. We&apos;re changing that.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-terra text-cream px-8 py-4 rounded-xl font-semibold hover:bg-terra2 transition-all shadow-lg">
            Start for free — takes 2 minutes <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="bg-bark border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="font-serif text-cream">Umoja</span>
            <span className="font-serif text-terra">Scholar</span>
          </div>
          <p className="text-cream/40 text-xs">© 2026 UmojaScholar. Built with ❤️ for African students.</p>
          <div className="flex gap-6 text-xs text-cream/40">
            <Link href="/privacy" className="hover:text-cream/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream/70 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-cream/70 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
