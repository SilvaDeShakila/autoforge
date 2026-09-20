import Link from "next/link";
import { ArrowLeft, CarFront, Pencil, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteVehicleButton } from "@/components/vehicles/delete-vehicle-button";
import { VehicleStatusBadge } from "@/components/vehicles/vehicle-status-badge";
import { createClient } from "@/lib/supabase/server";
import { getPrimaryImage, getVehicle, getVehicleErrorMessage, type Vehicle } from "@/lib/vehicles";

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let vehicle: Vehicle | null = null;
  let errorMessage = "";

  try {
    vehicle = await getVehicle(await createClient(), id);
  } catch (caughtError) {
    errorMessage = getVehicleErrorMessage(caughtError, "The vehicle could not be loaded.");
  }

  if (!vehicle) {
    if (errorMessage.toLowerCase().includes("no rows")) notFound();
    return <DatabaseError message={errorMessage} />;
  }

  return <VehicleDetailContent vehicle={vehicle} />;
}

function VehicleDetailContent({ vehicle }: { vehicle: Vehicle }) {
  const primaryImage = getPrimaryImage(vehicle);
  const details = [
    ["Registration number", vehicle.registration_number],
    ["Year", vehicle.year],
    ["Mileage", `${new Intl.NumberFormat().format(vehicle.mileage)} km`],
    ["Fuel type", vehicle.fuel_type],
    ["Transmission", vehicle.transmission],
    ["Body type", vehicle.body_type],
    ["Color", vehicle.color],
    ["Engine capacity", vehicle.engine_capacity],
    ["Purchase price", formatAmount(vehicle.purchase_price)],
    ["Selling price", formatAmount(vehicle.selling_price)],
  ];

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <Link href="/dashboard/vehicles" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600"><ArrowLeft className="size-4" /> Back to vehicles</Link>
      <div className="flex gap-3"><Button asChild variant="outline"><Link href={`/dashboard/vehicles/${vehicle.id}/edit`}><Pencil className="size-4" /> Edit vehicle</Link></Button><DeleteVehicleButton vehicleId={vehicle.id} /></div>
    </div>
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Vehicle details</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">{vehicle.brand?.name ?? "Unknown brand"} {vehicle.model?.name ?? "Unknown model"}</h2><p className="mt-2 text-sm text-slate-500">Stock number: {vehicle.stock_number}</p></div><VehicleStatusBadge status={vehicle.status} /></div>
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card><CardContent className="p-4"><VehicleImageGallery vehicle={vehicle} primaryImage={primaryImage} /></CardContent></Card>
      <Card><CardHeader><CardTitle>Vehicle information</CardTitle></CardHeader><CardContent><dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{details.map(([label, value]) => <div key={label}><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 text-sm font-semibold capitalize text-slate-800">{value == null || value === "" ? "—" : String(value)}</dd></div>)}</dl><div className="mt-8 border-t border-slate-100 pt-6"><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</dt><dd className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{vehicle.description || "No description added."}</dd></div><div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400"><p>Created {new Date(vehicle.created_at).toLocaleString()}</p><p className="mt-1">Updated {new Date(vehicle.updated_at).toLocaleString()}</p></div></CardContent></Card>
    </div>
  </div>;
}

function formatAmount(value: number | null) { return value == null ? "—" : new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value); }
function DatabaseError({ message }: { message: string }) { return <div className="rounded-2xl border border-red-200 bg-red-50 p-6"><h2 className="font-display text-xl font-bold text-red-900">Unable to load vehicle</h2><p className="mt-2 text-sm text-red-700">{message}</p></div>; }

function VehicleImageGallery({ vehicle, primaryImage }: { vehicle: Vehicle; primaryImage?: string }) {
  const images = [...(vehicle.images ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.display_order - b.display_order);
  return <><div>{primaryImage ? <img src={primaryImage} alt={`${vehicle.brand?.name ?? "Vehicle"} ${vehicle.model?.name ?? ""}`} className="aspect-4/3 w-full rounded-xl object-cover" /> : <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><CarFront className="size-16" /></div>}</div><div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>{images.length} image{images.length === 1 ? "" : "s"}</span><span className="inline-flex items-center gap-1"><Plus className="size-3" /> Uploads can be added later</span></div>{images.length > 1 && <div className="mt-4 grid grid-cols-4 gap-2">{images.map((image) => <img key={image.id} src={image.image_url} alt="" className="aspect-square w-full rounded-lg object-cover" />)}</div>}</>;
}
