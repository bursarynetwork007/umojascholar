"use client";
import { useEffect } from "react";
import { configureAmplify } from "@/lib/amplify/config";

/**
 * Configures Amplify once on the client side.
 * Wrap the root layout with this so all pages have Cognito available.
 */
export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    configureAmplify();
  }, []);

  return <>{children}</>;
}
