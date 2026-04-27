"use client";
import { useRouter } from "next/navigation";
import { UmojaAuthenticator } from "@/components/auth/UmojaAuthenticator";
import { createClient } from "@/lib/supabase/client";
import { AuthSkeleton } from "@/components/auth/AuthSkeleton";

export function SignupClient() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <UmojaAuthenticator initialState="signUp" skeleton={<AuthSkeleton mode="signup" />}>
      {({ user }) => {
        if (user) {
          supabase.from("profiles").upsert({
            id: user.userId,
            email: user.signInDetails?.loginId ?? "",
          }).then(() => router.push("/dashboard"));
        }
        return <div className="text-center text-sm text-bark/60 p-4">Redirecting…</div>;
      }}
    </UmojaAuthenticator>
  );
}
