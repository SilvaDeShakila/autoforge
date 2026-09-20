import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VehicleForm } from "@/components/vehicles/vehicle-form";
import { createClient } from "@/lib/supabase/server";
import { getVehicleErrorMessage, getVehicleLookups, type VehicleLookup } from "@/lib/vehicles";

export default async function NewVehiclePage() {
  let lookups: { brands: VehicleLookup[]; categories: VehicleLookup[] } | null = null;
  let errorMessage = "";
  try { lookups = await getVehicleLookups(await createClient()); }
  catch (caughtError) { errorMessage = getVehicleErrorMessage(caughtError, "Unable to load vehicle options."); }
  if (!lookups) return <DatabaseError message={errorMessage} />;
  return <div className="mx-auto max-w-4xl space-y-6"><Link href="/dashboard/vehicles" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600"><ArrowLeft className="size-4" /> Back to vehicles</Link><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Vehicle management</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Add vehicle</h2><p className="mt-2 text-sm leading-6 text-slate-600">Create a vehicle record using the active brands, models, and categories in Supabase.</p></div><VehicleForm mode="create" {...lookups} /></div>;
}

function DatabaseError({ message }: { message: string }) { return <div className="rounded-2xl border border-red-200 bg-red-50 p-6"><h2 className="font-display text-xl font-bold text-red-900">Vehicle form unavailable</h2><p className="mt-2 text-sm leading-6 text-red-700">{message}</p><p className="mt-4 text-xs text-red-600">Check your Supabase environment variables, table names, and RLS policies.</p></div>; }
