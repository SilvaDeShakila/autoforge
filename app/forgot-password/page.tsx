"use client";

import Link from "next/link";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) { setError("Enter your email address to continue."); setMessage(""); return; }
    setError(""); setMessage(""); setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` });
      if (resetError) throw resetError;
      setMessage("If an account exists for this email, a password reset link has been sent.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to send the reset link. Please try again.");
    } finally { setIsLoading(false); }
  }

  return <AuthShell eyebrow="Account recovery" title="Forgot your password?" description="Enter your email and we&apos;ll send a secure reset link."><form onSubmit={handleSubmit} className="space-y-5" noValidate><div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold text-slate-800">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@dealership.com" autoComplete="email" className="auth-input" /></div>{message && <p role="status" className="flex gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs font-medium leading-5 text-emerald-700"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{message}</p>}{error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">{error}</p>}<Button type="submit" className="h-11 w-full" disabled={isLoading}>{isLoading ? <><LoaderCircle className="size-4 animate-spin" /> Sending...</> : "Send reset link"}</Button><p className="text-center"><Link href="/login" className="text-sm font-bold text-orange-600 hover:text-orange-700">Back to login</Link></p></form></AuthShell>;
}
