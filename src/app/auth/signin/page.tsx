"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roles = [
  {
    value: "trader",
    label: "Trader",
    description: "Track CC price, DeFi yields, and token analytics",
  },
  {
    value: "developer",
    label: "Developer",
    description: "DAML smart contracts, APIs, and Canton tooling",
  },
  {
    value: "institutional",
    label: "Institutional",
    description: "Compliance, validator economics, and governance",
  },
  {
    value: "validator",
    label: "Validator",
    description: "Node operations, staking, and network health",
  },
  {
    value: "researcher",
    label: "Researcher",
    description: "On-chain analytics, protocol research, and data",
  },
] as const;

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
          <div className="size-8 animate-pulse rounded-full bg-canton/20" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("trader");
  const [loading, setLoading] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, callbackUrl });
    setLoading(false);
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-canton font-mono text-lg font-black text-canton-foreground">
              CC
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Sign in to{" "}
              <span className="text-canton">cnews</span>
              <span className="text-muted-foreground">.cc</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Canton Network intelligence, personalized for you
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error === "CredentialsSignin"
                ? "Invalid email or password."
                : "Something went wrong. Please try again."}
            </div>
          )}

          {/* OAuth buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-center gap-3 border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => signIn("github", { callbackUrl })}
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center gap-3 border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          {/* Credentials form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-white/10 bg-white/5 placeholder:text-muted-foreground/60"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-white/10 bg-white/5 placeholder:text-muted-foreground/60"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-canton text-canton-foreground hover:bg-canton/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Email"}
            </Button>
          </form>

          {/* Role selector toggle */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowRoles(!showRoles)}
              className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {showRoles ? "Hide role selector" : "Choose your profile type"}
            </button>

            {showRoles && (
              <div className="mt-3 grid gap-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      selectedRole === role.value
                        ? "border-canton/50 bg-canton/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="text-sm font-medium">{role.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {role.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            New users are auto-registered on first sign-in.
            <br />
            By signing in you agree to our{" "}
            <Link href="/terms" className="text-canton hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-canton hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
