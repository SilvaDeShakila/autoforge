"use client";

import Link from "next/link";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { type FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setError(""); setUpdated(false); setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setUpdated(true);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to update your password. Please try again.");
    } finally { setIsLoading(false); }
  }

  return <AuthShell eyebrow="New password" title="Create a new password" description="Choose a strong password you can use for your AutoForge workspace."><form onSubmit={handleSubmit} className="space-y-5" noValidate><PasswordField id="password" label="New password" value={password} onChange={(event) => { setPassword(event.target.value); setUpdated(false); }} placeholder="At least 8 characters" autoComplete="new-password" /><PasswordField id="confirmPassword" label="Confirm new password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); setUpdated(false); }} placeholder="Repeat your password" autoComplete="new-password" error={error} />{updated && <p role="status" className="flex gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs font-medium leading-5 text-emerald-700"><CheckCircle2 className="size-4 shrink-0" />Password updated successfully.</p>}<Button type="submit" className="h-11 w-full" disabled={isLoading}>{isLoading ? <><LoaderCircle className="size-4 animate-spin" /> Updating...</> : "Update password"}</Button><p className="text-center text-sm text-slate-500">Remembered it? <Link href="/login" className="font-bold text-orange-600 hover:text-orange-700">Back to login</Link></p></form></AuthShell>;
}
