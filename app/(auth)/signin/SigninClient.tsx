"use client";
import { useRouter } from "next/navigation";
import { UmojaAuthenticator } from "@/components/auth/UmojaAuthenticator";
import { AuthSkeleton } from "@/components/auth/AuthSkeleton";

export function SigninClient() {
  const router = useRouter();

  return (
    <UmojaAuthenticator initialState="signIn" skeleton={<AuthSkeleton mode="signin" />}>
      {({ user }) => {
        if (user) router.push("/dashboard");
        return <div className="text-center text-sm text-bark/60 p-4">Redirecting…</div>;
      }}
    </UmojaAuthenticator>
  );
}
