"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function DeleteVehicleButton({ vehicleId }: { vehicleId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true); setError("");
    const { error: deleteError } = await createClient().from("vehicles").delete().eq("id", vehicleId);
    if (deleteError) { setError(deleteError.message.includes("foreign") ? "This vehicle cannot be deleted because another record references it." : deleteError.message); setIsDeleting(false); return; }
    router.push("/dashboard/vehicles");
    router.refresh();
  }

  return <><Button type="button" variant="outline" onClick={() => setIsOpen(true)} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">Delete vehicle</Button>{isOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-5" role="presentation"><div role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><h2 id="delete-title" className="font-display text-xl font-bold text-slate-950">Delete this vehicle?</h2><p className="mt-2 text-sm leading-6 text-slate-600">This action will be sent to Supabase and may be rejected by row-level security or related records.</p>{error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}<div className="mt-6 flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>Cancel</Button><Button type="button" onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">{isDeleting ? "Deleting..." : "Delete vehicle"}</Button></div></div></div>}</>;
}
