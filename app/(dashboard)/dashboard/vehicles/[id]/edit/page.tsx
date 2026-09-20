import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VehicleForm } from "@/components/vehicles/vehicle-form";
import { createClient } from "@/lib/supabase/server";
import { getVehicle, getVehicleErrorMessage, getVehicleLookups, vehicleToFormValues, type Vehicle, type VehicleLookup } from "@/lib/vehicles";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let data: { vehicle: Vehicle; brands: VehicleLookup[]; categories: VehicleLookup[] } | null = null;
  let errorMessage = "";
  try { const supabase = await createClient(); const [vehicle, lookups] = await Promise.all([getVehicle(supabase, id), getVehicleLookups(supabase)]); data = { vehicle, ...lookups }; }
  catch (caughtError) { errorMessage = getVehicleErrorMessage(caughtError, "The vehicle could not be loaded."); }
  if (!data) return <DatabaseError message={errorMessage} />;
  return <div className="mx-auto max-w-4xl space-y-6"><Link href={`/dashboard/vehicles/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600"><ArrowLeft className="size-4" /> Back to vehicle</Link><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Vehicle management</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Edit vehicle</h2><p className="mt-2 text-sm leading-6 text-slate-600">Update the vehicle details and save them back to Supabase.</p></div><VehicleForm mode="edit" vehicleId={id} initialValues={vehicleToFormValues(data.vehicle, data.categories)} brands={data.brands} categories={data.categories} /></div>;
}

function DatabaseError({ message }: { message: string }) { return <div className="rounded-2xl border border-red-200 bg-red-50 p-6"><h2 className="font-display text-xl font-bold text-red-900">Unable to load vehicle</h2><p className="mt-2 text-sm text-red-700">{message}</p></div>; }
