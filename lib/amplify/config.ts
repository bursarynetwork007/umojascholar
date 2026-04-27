import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Called once at app startup (in layout.tsx or a client provider)
export function configureAmplify() {
  Amplify.configure(outputs, { ssr: true });
}
