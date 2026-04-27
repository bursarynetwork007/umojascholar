import type { Metadata } from "next";
import "./globals.css";
import { AmplifyProvider } from "@/components/auth/AmplifyProvider";

export const metadata: Metadata = {
  title: "UmojaScholar — Scholarships for African Students",
  description:
    "AI-powered scholarship matching and application support for African students seeking international opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-bark antialiased">
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
