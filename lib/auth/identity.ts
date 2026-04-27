"use client";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { createClient } from "@/lib/supabase/client";

/**
 * Returns the current user's Cognito sub (UUID) and a valid ID token.
 * Falls back to Supabase session for the transition period.
 */
export async function getIdentity(): Promise<{
  userId: string;
  token: string;
  email: string;
} | null> {
  // Try Cognito first
  try {
    const [user, session] = await Promise.all([
      getCurrentUser(),
      fetchAuthSession(),
    ]);
    const token = session.tokens?.idToken?.toString() ?? "";
    const email = user.signInDetails?.loginId ?? "";
    return { userId: user.userId, token, email };
  } catch {
    // Fall back to Supabase during transition
    const supabase = createClient();
    const { data: { user }, } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return {
      userId: user.id,
      token: session?.access_token ?? "",
      email: user.email ?? "",
    };
  }
}

/**
 * Ensures a Supabase profile row exists for the authenticated user.
 * Called once after sign-up and on first dashboard load.
 */
export async function ensureProfile(overrides?: {
  fullName?: string;
  country?: string;
  phone?: string;
}) {
  const identity = await getIdentity();
  if (!identity) return;

  const supabase = createClient();
  await supabase.from("profiles").upsert(
    {
      id: identity.userId,
      email: identity.email,
      ...(overrides?.fullName && { full_name: overrides.fullName }),
      ...(overrides?.country && { country: overrides.country }),
      ...(overrides?.phone && { phone: overrides.phone }),
    },
    { onConflict: "id", ignoreDuplicates: true }
  );
}
