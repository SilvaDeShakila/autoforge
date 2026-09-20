"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) { setError("Enter your email and password to continue."); return; }
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        if (signInError.code === "email_not_confirmed" || signInError.message.toLowerCase().includes("email not confirmed")) {
          throw new Error("Please verify your email address before signing in.");
        }
        throw signInError;
      }
      // Supabase persists sessions by default. The checkbox remains ready for a future preference.
      void rememberMe;
      router.push("/dashboard");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to sign in. Please try again.");
      setIsLoading(false);
    }
  }

  return <AuthShell eyebrow="Welcome back" title="Sign in to AutoForge" description="Access your dealership workspace and keep your team moving forward."><form onSubmit={handleSubmit} className="space-y-5" noValidate><div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold text-slate-800">Email address</label><input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@dealership.com" autoComplete="email" className="auth-input" /></div><PasswordField id="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" />{error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-700">{error}</p>}<div className="flex items-center justify-between gap-4"><label className="flex items-center gap-2 text-xs font-medium text-slate-600"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="size-4 rounded border-slate-300 accent-orange-600" /> Remember me</label><Link href="/forgot-password" className="text-xs font-bold text-orange-600 hover:text-orange-700">Forgot password?</Link></div><Button type="submit" className="h-11 w-full" disabled={isLoading}>{isLoading ? <><LoaderCircle className="size-4 animate-spin" /> Signing in...</> : "Sign in"}</Button><p className="text-center text-sm text-slate-500">New to AutoForge? <Link href="/signup" className="font-bold text-orange-600 hover:text-orange-700">Create an account</Link></p></form></AuthShell>;
}
