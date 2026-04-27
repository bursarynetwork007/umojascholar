import { Suspense } from "react";
import { AuthSkeleton } from "@/components/auth/AuthSkeleton";
import { SigninClient } from "./SigninClient";

export default function SigninPage() {
  return (
    <Suspense fallback={<AuthSkeleton mode="signin" />}>
      <SigninClient />
    </Suspense>
  );
}
