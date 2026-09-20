import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return <AuthShell eyebrow="Access restricted" title="You can&apos;t access this area" description="Your account does not currently have permission to view the requested workspace area."><div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-slate-100 text-slate-600"><LockKeyhole className="size-8" /></div><h2 className="mt-6 font-display text-xl font-bold text-slate-950">Permission required</h2><p className="mt-3 text-sm leading-6 text-slate-600">If you think you should have access, contact your AutoForge administrator and ask them to review your role.</p><div className="mt-7 grid gap-3"><Button asChild className="h-11 w-full"><Link href="/dashboard">Return to dashboard</Link></Button><Button asChild variant="outline" className="h-11 w-full"><Link href="/"><ArrowLeft className="size-4" /> Back to home</Link></Button></div></div></AuthShell>;
}
