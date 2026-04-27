import { Suspense } from "react";
import { AuthSkeleton } from "@/components/auth/AuthSkeleton";
import { SignupClient } from "./SignupClient";

/**
 * Server component — renders the full skeleton immediately (SEO + low-bandwidth).
 * The Cognito Authenticator hydrates on top via SignupClient.
 */
export default function SignupPage() {
  return (
    <Suspense fallback={<AuthSkeleton mode="signup" />}>
      <SignupClient />
    </Suspense>
  );
}
