import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageSquare, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — UmojaScholar",
  description: "Get in touch with the UmojaScholar team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1.5 kente-stripe w-full" />

      <nav className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1">
          <span className="font-serif text-xl text-bark">Umoja</span>
          <span className="font-serif text-xl text-terra">Scholar</span>
        </Link>
        <Link href="/signup" className="text-sm font-semibold bg-terra text-cream px-4 py-2 rounded-lg hover:bg-terra2 transition-colors">
          Get started free
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12 pb-20">
        <h1 className="font-serif text-4xl text-bark mb-3">Get in touch</h1>
        <p className="text-bark/60 mb-10 leading-relaxed">
          We&apos;re a small team building for African students. We read every message.
        </p>

        <div className="grid gap-4 mb-12">
          {[
            {
              icon: <Mail size={20} className="text-terra" />,
              title: "General enquiries",
              desc: "Questions about the platform, partnerships, or press.",
              contact: "hello@umojascholars.com",
              href: "mailto:hello@umojascholars.com",
            },
            {
              icon: <Mail size={20} className="text-sage" />,
              title: "Privacy & data",
              desc: "Data deletion requests, GDPR/POPIA enquiries.",
              contact: "privacy@umojascholars.com",
              href: "mailto:privacy@umojascholars.com",
            },
            {
              icon: <MessageSquare size={20} className="text-gold2" />,
              title: "Student support",
              desc: "Help with your account, matches, or essay feedback.",
              contact: "support@umojascholars.com",
              href: "mailto:support@umojascholars.com",
            },
          ].map((item) => (
            <a key={item.title} href={item.href}
              className="flex items-start gap-4 bg-white rounded-2xl border border-sand p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="w-10 h-10 bg-cream2 rounded-xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-bark text-sm">{item.title}</p>
                <p className="text-bark/60 text-xs mt-0.5">{item.desc}</p>
                <p className="text-terra text-xs font-medium mt-1.5 group-hover:text-terra2 transition-colors">
                  {item.contact}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-bark rounded-2xl p-6 text-center">
          <p className="font-serif text-xl text-cream mb-2">Are you a scholarship organisation?</p>
          <p className="text-cream/60 text-sm mb-4 leading-relaxed">
            We&apos;d love to feature your scholarship and help connect you with qualified African students.
          </p>
          <a href="mailto:partnerships@umojascholars.com"
            className="inline-flex items-center gap-2 bg-terra text-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-terra2 transition-colors">
            <Mail size={15} />
            partnerships@umojascholars.com
          </a>
        </div>
      </main>

      <footer className="bg-bark py-6 text-center">
        <div className="flex justify-center gap-6 text-xs text-cream/40">
          <Link href="/" className="hover:text-cream/70 transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-cream/70 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-cream/70 transition-colors">Terms</Link>
        </div>
        <p className="text-cream/30 text-xs mt-3">© 2026 UmojaScholar</p>
      </footer>
    </div>
  );
}
