"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: string[] = [];
    if (!form.fullName.trim()) nextErrors.push("Enter your full name.");
    if (!form.email.trim()) nextErrors.push("Enter your email address.");
    if (form.password.length < 8) nextErrors.push("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword) nextErrors.push("Passwords do not match.");
    if (!termsAccepted) nextErrors.push("Accept the terms and conditions to continue.");
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.fullName }, emailRedirectTo: `${window.location.origin}/auth/callback?next=/verify-email` } });
      if (signUpError) throw signUpError;
      if (data.session) router.push("/dashboard");
      else router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch (caughtError) {
      setErrors([caughtError instanceof Error ? caughtError.message : "Unable to create your account. Please try again."]);
      setIsLoading(false);
    }
  }

  return <AuthShell eyebrow="Get started" title="Create your account" description="Set up your AutoForge workspace and invite your team when you&apos;re ready."><form onSubmit={handleSubmit} className="space-y-4" noValidate><div className="space-y-2"><label htmlFor="fullName" className="text-sm font-semibold text-slate-800">Full name</label><input id="fullName" type="text" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Jordan Davis" autoComplete="name" className="auth-input" /></div><div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold text-slate-800">Email address</label><input id="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@dealership.com" autoComplete="email" className="auth-input" /></div><PasswordField id="password" label="Password" value={form.password} onChange={(event) => updateField("password", event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" /><PasswordField id="confirmPassword" label="Confirm password" value={form.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} placeholder="Repeat your password" autoComplete="new-password" />{errors.length > 0 && <div role="alert" className="space-y-1 rounded-lg bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-700">{errors.map((error) => <p key={error}>{error}</p>)}</div>}<label className="flex items-start gap-2 text-xs leading-5 text-slate-600"><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} className="mt-0.5 size-4 shrink-0 rounded border-slate-300 accent-orange-600" /> I agree to the <Link href="#terms" className="font-bold text-orange-600 hover:text-orange-700">terms and conditions</Link>.</label><Button type="submit" className="h-11 w-full" disabled={isLoading}>{isLoading ? <><LoaderCircle className="size-4 animate-spin" /> Creating account...</> : "Create account"}</Button><p className="text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="font-bold text-orange-600 hover:text-orange-700">Sign in</Link></p></form></AuthShell>;
}
