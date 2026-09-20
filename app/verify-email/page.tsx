"use client";

import Link from "next/link";
import { CheckCircle2, LoaderCircle, MailCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleResend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) { setError("Enter the email address you signed up with."); return; }
    setError(""); setMessage(""); setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({ type: "signup", email });
      if (resendError) throw resendError;
      setMessage("A new verification email has been sent.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to resend the verification email.");
    } finally { setIsLoading(false); }
  }

  return <AuthShell eyebrow="One more step" title="Check your inbox" description="Verify your email address before you continue to your AutoForge workspace."><div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-orange-50 text-orange-600"><MailCheck className="size-8" /></div><h2 className="mt-6 font-display text-xl font-bold text-slate-950">Verify your email address</h2><p className="mt-3 text-sm leading-6 text-slate-600">Open the verification link in your email to confirm your address.</p><form onSubmit={handleResend} className="mt-6 space-y-3 text-left"><label htmlFor="email" className="text-sm font-semibold text-slate-800">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@dealership.com" autoComplete="email" className="auth-input" />{message && <p role="status" className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700"><CheckCircle2 className="size-4" />{message}</p>}{error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">{error}</p>}<Button type="submit" variant="outline" className="h-11 w-full" disabled={isLoading}>{isLoading ? <><LoaderCircle className="size-4 animate-spin" /> Resending...</> : "Resend verification email"}</Button></form><Link href="/login" className="mt-6 inline-block text-sm font-bold text-orange-600 hover:text-orange-700">Back to login</Link></div></AuthShell>;
}
