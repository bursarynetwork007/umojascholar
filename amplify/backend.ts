import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";

/**
 * UmojaScholar Amplify Gen 2 backend.
 * Auth only — database stays on Supabase (PostgreSQL + RLS).
 * Hosting via Amplify Hosting (see amplify.yml).
 */
defineBackend({ auth });
