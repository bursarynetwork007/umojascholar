import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — UmojaScholar",
  description: "Terms governing your use of the UmojaScholar platform.",
};

const LAST_UPDATED = "1 January 2026";

export default function TermsPage() {
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
        <h1 className="font-serif text-4xl text-bark mb-2">Terms of Use</h1>
        <p className="text-bark/50 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-bark/80 leading-relaxed text-sm">

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">1. Acceptance</h2>
            <p>
              By creating an account or using UmojaScholar, you agree to these terms. If you do not
              agree, do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">2. What UmojaScholar provides</h2>
            <p className="mb-3">UmojaScholar provides:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>A curated database of international scholarships</li>
              <li>An AI-powered matching algorithm based on your profile</li>
              <li>An essay feedback tool powered by Anthropic&apos;s Claude AI</li>
              <li>An application tracking tool</li>
            </ul>
            <p className="mt-3">
              UmojaScholar is an <strong>information and support tool</strong>. We do not apply to
              scholarships on your behalf, guarantee any scholarship outcome, or have any affiliation
              with the scholarship organisations listed on the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">3. Accuracy of information</h2>
            <p>
              Scholarship details (deadlines, amounts, eligibility) are curated manually and may
              become outdated. Always verify information directly with the scholarship organisation
              before applying. UmojaScholar is not liable for decisions made based on information
              on this platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">4. AI-generated content</h2>
            <p>
              The Essay Co-Pilot uses Anthropic&apos;s Claude AI to generate feedback. AI-generated
              feedback is a starting point, not a guarantee of success. You are responsible for the
              final content of any application you submit. Do not submit AI-generated text as your
              own original work without substantial revision — scholarship panels detect it, and it
              may disqualify your application.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">5. Your account</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>You must be 16 or older to create an account.</li>
              <li>You are responsible for keeping your credentials secure.</li>
              <li>One account per person. Do not create accounts on behalf of others.</li>
              <li>
                You may not use the platform to scrape scholarship data, reverse-engineer the
                matching algorithm, or build competing products using our curated data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">6. Intellectual property</h2>
            <p>
              The UmojaScholar platform, design, and curated scholarship data are owned by
              UmojaScholar. The insider knowledge content in scholarship panels represents original
              editorial work and may not be reproduced without permission.
            </p>
            <p className="mt-2">
              Your profile data, essay drafts, and application notes remain yours. We do not claim
              ownership of content you create on the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">7. Limitation of liability</h2>
            <p>
              UmojaScholar is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable
              for missed scholarship deadlines, rejected applications, or any loss arising from use
              of the platform. Our total liability to you for any claim is limited to the amount you
              paid us in the 12 months preceding the claim (which at MVP stage is zero).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">8. Termination</h2>
            <p>
              You may delete your account at any time. We may suspend or terminate accounts that
              violate these terms, abuse the AI Co-Pilot (e.g. automated bulk requests), or engage
              in fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">9. Changes to these terms</h2>
            <p>
              We will notify registered users by email at least 14 days before material changes
              take effect. Continued use after that date constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark mb-3">10. Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:hello@umojascholars.com" className="text-terra hover:text-terra2">
                hello@umojascholars.com
              </a>
            </p>
          </section>

        </div>
      </main>

      <footer className="bg-bark py-6 text-center">
        <div className="flex justify-center gap-6 text-xs text-cream/40">
          <Link href="/" className="hover:text-cream/70 transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-cream/70 transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-cream/70 transition-colors">Contact</Link>
        </div>
        <p className="text-cream/30 text-xs mt-3">© 2026 UmojaScholar</p>
      </footer>
    </div>
  );
}
