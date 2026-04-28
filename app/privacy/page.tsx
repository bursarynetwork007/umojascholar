import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — UmojaScholar",
  description: "How UmojaScholar collects, uses, and protects your personal data.",
};

const LAST_UPDATED = "1 January 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1.5 kente-stripe w-full" />
      <nav className="max-w-3xl mx-auto px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-1">
          <span className="font-serif text-xl text-bark">Umoja</span>
          <span className="font-serif text-xl text-terra">Scholar</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10 pb-20">
        <h1 className="font-serif text-4xl text-bark mb-2">Privacy Policy</h1>
        <p className="text-bark/50 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-sm max-w-none space-y-8 text-bark/80 leading-relaxed">

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">Who we are</h2>
            <p>
              UmojaScholar is a scholarship matching and application support platform for African
              students seeking international scholarships. We are operated as an early-stage product.
              Questions about this policy can be sent to{" "}
              <a href="mailto:privacy@umojascholars.com" className="text-terra hover:text-terra2">
                privacy@umojascholars.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">What we collect and why</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-cream2">
                    <th className="text-left px-4 py-2.5 border border-sand font-semibold text-bark">Data</th>
                    <th className="text-left px-4 py-2.5 border border-sand font-semibold text-bark">Why we collect it</th>
                    <th className="text-left px-4 py-2.5 border border-sand font-semibold text-bark">Stored where</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Email address", "Account creation and login via AWS Cognito", "AWS Cognito (us-east-1)"],
                    ["Name, country, phone (optional)", "Personalise your profile and matches", "Supabase (PostgreSQL)"],
                    ["Academic details (GPA, field, institution)", "Power the scholarship matching algorithm", "Supabase (PostgreSQL)"],
                    ["Essay drafts", "Provide AI feedback via Claude Haiku. Stored for your review history.", "Supabase (PostgreSQL)"],
                    ["Application status", "Track your scholarship applications", "Supabase (PostgreSQL)"],
                    ["Usage analytics (page views, feature use)", "Improve the product. No personal identifiers.", "Not yet implemented"],
                  ].map(([data, why, where]) => (
                    <tr key={data} className="border-b border-sand">
                      <td className="px-4 py-2.5 border border-sand font-medium text-bark">{data}</td>
                      <td className="px-4 py-2.5 border border-sand">{why}</td>
                      <td className="px-4 py-2.5 border border-sand text-bark/60">{where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">What we do not do</h2>
            <ul className="space-y-2 list-none">
              {[
                "We do not sell your data to third parties.",
                "We do not share your essay drafts or profile with scholarship organisations.",
                "We do not use your data to train AI models.",
                "We do not send marketing emails without your explicit consent.",
                "We do not store payment information — there is no payment at MVP stage.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">Third-party services</h2>
            <p className="mb-3">We use the following third-party services to operate the platform:</p>
            <ul className="space-y-2">
              {[
                { name: "AWS Cognito", purpose: "Authentication and account management", link: "https://aws.amazon.com/privacy/" },
                { name: "Supabase", purpose: "Database (PostgreSQL) with row-level security", link: "https://supabase.com/privacy" },
                { name: "Anthropic (Claude)", purpose: "Essay Co-Pilot AI feedback. Your draft is sent to Anthropic's API and is subject to their usage policy.", link: "https://www.anthropic.com/privacy" },
                { name: "AWS Amplify Hosting", purpose: "Web hosting and deployment", link: "https://aws.amazon.com/privacy/" },
              ].map((s) => (
                <li key={s.name} className="flex items-start gap-2">
                  <span className="text-bark/40 mt-0.5">→</span>
                  <span>
                    <span className="font-medium text-bark">{s.name}</span>
                    {" — "}{s.purpose}{" "}
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-terra hover:text-terra2 text-xs">
                      Privacy policy ↗
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">Data retention</h2>
            <p>
              Your account data is retained for as long as your account is active. You can request
              deletion of your account and all associated data at any time by emailing{" "}
              <a href="mailto:privacy@umojascholars.com" className="text-terra hover:text-terra2">
                privacy@umojascholars.com
              </a>. We will process deletion requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">Your rights</h2>
            <p className="mb-3">
              Depending on your country of residence, you may have rights under GDPR, POPIA
              (South Africa), or other applicable data protection laws, including:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Access to the personal data we hold about you</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Portability of your data in a machine-readable format</li>
              <li>Objection to processing</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@umojascholars.com" className="text-terra hover:text-terra2">
                privacy@umojascholars.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">Changes to this policy</h2>
            <p>
              We will update this policy as the product evolves. Material changes will be notified
              by email to registered users at least 14 days before taking effect.
            </p>
          </section>

        </div>
      </main>

      <footer className="bg-bark py-6 text-center">
        <div className="flex justify-center gap-6 text-xs text-cream/40">
          <Link href="/" className="hover:text-cream/70 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-cream/70 transition-colors">Terms of Use</Link>
          <a href="mailto:privacy@umojascholars.com" className="hover:text-cream/70 transition-colors">Contact</a>
        </div>
        <p className="text-cream/30 text-xs mt-3">© 2026 UmojaScholar</p>
      </footer>
    </div>
  );
}
