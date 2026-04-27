/**
 * Server-rendered skeleton for auth pages.
 * Visible immediately — before any JS loads.
 * Replaced by the real Authenticator once hydration completes.
 * Ensures usability on low-bandwidth connections where JS is slow.
 */
export function AuthSkeleton({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="h-1.5 kente-stripe w-full" />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1 mb-6">
              <span className="font-serif text-2xl text-bark">Umoja</span>
              <span className="font-serif text-2xl text-terra">Scholar</span>
            </div>
            <h1 className="font-serif text-3xl text-bark mb-2">
              {isSignup ? "Start your scholarship journey" : "Welcome back"}
            </h1>
            <p className="text-bark/60 text-sm">
              {isSignup
                ? "Free forever · No credit card required"
                : "Sign in to continue your scholarship journey"}
            </p>
          </div>

          {/* Form skeleton card */}
          <div className="bg-white rounded-2xl border border-sand shadow-sm p-8 space-y-4">
            {isSignup && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="h-4 w-20 bg-sand rounded mb-1.5" />
                  <div className="h-10 bg-cream2 border border-sand2 rounded-lg" />
                </div>
                <div>
                  <div className="h-4 w-20 bg-sand rounded mb-1.5" />
                  <div className="h-10 bg-cream2 border border-sand2 rounded-lg" />
                </div>
              </div>
            )}
            <div>
              <div className="h-4 w-28 bg-sand rounded mb-1.5" />
              <div className="h-10 bg-cream2 border border-sand2 rounded-lg" />
            </div>
            <div>
              <div className="h-4 w-20 bg-sand rounded mb-1.5" />
              <div className="h-10 bg-cream2 border border-sand2 rounded-lg" />
            </div>
            {isSignup && (
              <div>
                <div className="h-4 w-32 bg-sand rounded mb-1.5" />
                <div className="h-10 bg-cream2 border border-sand2 rounded-lg" />
              </div>
            )}
            {/* CTA button skeleton */}
            <div className="h-12 bg-terra/80 rounded-lg animate-pulse mt-2" />
            <p className="text-center text-sm text-bark/50">
              {isSignup ? (
                <>Already have an account?{" "}
                  <a href="/signin" className="text-terra font-medium hover:text-terra2">Sign in</a>
                </>
              ) : (
                <>No account yet?{" "}
                  <a href="/signup" className="text-terra font-medium hover:text-terra2">Create one free</a>
                </>
              )}
            </p>
          </div>

          {/* JS-disabled fallback message */}
          <noscript>
            <div className="mt-4 bg-gold/15 border border-gold/30 rounded-xl px-4 py-3 text-sm text-bark/80 text-center">
              Please enable JavaScript to use the sign-{isSignup ? "up" : "in"} form.
              <br />
              <a href="mailto:hello@umojascholars.com" className="text-terra font-medium">
                Contact us
              </a>{" "}
              if you need help accessing your account.
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
}
