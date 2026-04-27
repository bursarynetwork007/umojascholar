"use client";
import { Suspense } from "react";
import { Authenticator, useTheme, View, Text, Heading, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";

/**
 * Cognito Authenticator themed to UmojaScholar's warm African earth palette.
 *
 * Covers: sign-up, sign-in, forgot password, email verification, MFA setup.
 * Zero custom auth logic needed — Cognito handles all flows.
 *
 * Usage:
 *   <UmojaAuthenticator>
 *     {({ signOut, user }) => <YourApp user={user} signOut={signOut} />}
 *   </UmojaAuthenticator>
 */

// ── Custom slot components ────────────────────────────────────
const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large} paddingBottom="0">
        <Link href="/" className="inline-flex items-center gap-1 justify-center">
          <span
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "1.75rem",
              color: "#1E2D1A",
              lineHeight: 1,
            }}
          >
            Umoja
          </span>
          <span
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "1.75rem",
              color: "#C4622D",
              lineHeight: 1,
            }}
          >
            Scholar
          </span>
        </Link>
        {/* Kente stripe accent */}
        <div
          style={{
            height: "3px",
            width: "48px",
            margin: "12px auto 0",
            borderRadius: "9999px",
            background:
              "repeating-linear-gradient(90deg,#C4622D 0px,#C4622D 6px,#D4A843 6px,#D4A843 12px,#4A7C59 12px,#4A7C59 18px,#1E2D1A 18px,#1E2D1A 24px)",
          }}
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.medium}>
        <Text color={tokens.colors.neutral[60]} fontSize={tokens.fontSizes.small}>
          © 2024 UmojaScholar · Built for African students
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} ${tokens.space.xl} 0`}
          level={4}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "#1E2D1A" }}
        >
          Welcome back
        </Heading>
      );
    },
    Footer() {
      return (
        <View textAlign="center" paddingBottom="1rem">
          <Text fontSize="0.8rem" color="#6B7280">
            New to UmojaScholar?{" "}
            <span style={{ color: "#C4622D", fontWeight: 600, cursor: "pointer" }}>
              Create a free account above
            </span>
          </Text>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} ${tokens.space.xl} 0`}
          level={4}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "#1E2D1A" }}
        >
          Start your scholarship journey
        </Heading>
      );
    },
    Footer() {
      return (
        <View textAlign="center" paddingBottom="1rem">
          <Text fontSize="0.75rem" color="#9CA3AF">
            Free forever · No credit card required
          </Text>
        </View>
      );
    },
  },

  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} ${tokens.space.xl} 0`}
          level={4}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "#1E2D1A" }}
        >
          Check your email
        </Heading>
      );
    },
    Footer() {
      return (
        <View textAlign="center" paddingBottom="1rem">
          <Text fontSize="0.75rem" color="#9CA3AF">
            Didn&apos;t receive it? Check your spam folder.
          </Text>
        </View>
      );
    },
  },

  ForgotPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} ${tokens.space.xl} 0`}
          level={4}
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "#1E2D1A" }}
        >
          Reset your password
        </Heading>
      );
    },
  },
};

// ── Cognito form field config ─────────────────────────────────
const formFields = {
  signIn: {
    username: {
      label: "Email address",
      placeholder: "amara@example.com",
    },
  },
  signUp: {
    given_name: {
      label: "First name",
      placeholder: "Amara",
      order: 1,
    },
    family_name: {
      label: "Last name",
      placeholder: "Diallo",
      order: 2,
    },
    username: {
      label: "Email address",
      placeholder: "amara@example.com",
      order: 3,
    },
    password: {
      label: "Password",
      placeholder: "At least 8 characters",
      order: 4,
    },
    confirm_password: {
      label: "Confirm password",
      placeholder: "Repeat your password",
      order: 5,
    },
  },
  forgotPassword: {
    username: {
      label: "Email address",
      placeholder: "amara@example.com",
    },
  },
};

// ── Amplify UI theme tokens mapped to UmojaScholar palette ────
export const umojaTheme = {
  name: "umoja-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          10:  { value: "#FAF6EF" },
          20:  { value: "#F3EDE0" },
          40:  { value: "#E8D5B0" },
          60:  { value: "#C4622D" },
          80:  { value: "#A8501F" },
          90:  { value: "#8B3F18" },
          100: { value: "#1E2D1A" },
        },
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: { value: "1px" },
          borderColor: { value: "#E8D5B0" },
          borderRadius: { value: "1rem" },
          boxShadow: { value: "0 1px 3px 0 rgb(0 0 0 / 0.07)" },
        },
        form: {
          padding: { value: "1.5rem" },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: "#C4622D" },
          color: { value: "#FAF6EF" },
          _hover: {
            backgroundColor: { value: "#A8501F" },
          },
          _focus: {
            backgroundColor: { value: "#A8501F" },
          },
          _active: {
            backgroundColor: { value: "#8B3F18" },
          },
        },
        link: {
          color: { value: "#C4622D" },
          _hover: {
            color: { value: "#A8501F" },
            backgroundColor: { value: "transparent" },
          },
        },
      },
      fieldcontrol: {
        borderColor: { value: "#D4BC8A" },
        _focus: {
          borderColor: { value: "#C4622D" },
          boxShadow: { value: "0 0 0 2px rgb(196 98 45 / 0.2)" },
        },
      },
      tabs: {
        item: {
          color: { value: "#6B7280" },
          _active: {
            color: { value: "#C4622D" },
            borderColor: { value: "#C4622D" },
          },
          _hover: {
            color: { value: "#1E2D1A" },
          },
        },
      },
    },
    fonts: {
      default: {
        variable: { value: "Inter, system-ui, sans-serif" },
        static: { value: "Inter, system-ui, sans-serif" },
      },
    },
  },
};

// ── Main export ───────────────────────────────────────────────
interface UmojaAuthenticatorProps {
  children: (props: { signOut?: () => void; user?: any }) => React.ReactNode;
  initialState?: "signIn" | "signUp" | "forgotPassword";
  /** Shown while the Authenticator JS is loading — prevents blank-page flash */
  skeleton?: React.ReactNode;
}

export function UmojaAuthenticator({
  children,
  initialState = "signIn",
  skeleton,
}: UmojaAuthenticatorProps) {
  return (
    <Authenticator.Provider>
      <Suspense fallback={skeleton ?? null}>
        <div className="min-h-screen bg-cream flex flex-col">
          <div className="h-1.5 kente-stripe w-full" />
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              <Authenticator
                components={components}
                formFields={formFields}
                initialState={initialState}
                variation="default"
              >
                {({ signOut, user }) => <>{children({ signOut, user })}</>}
              </Authenticator>
            </div>
          </div>
        </div>
      </Suspense>
    </Authenticator.Provider>
  );
}
