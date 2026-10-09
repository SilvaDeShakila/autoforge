"use client";

import { ImagePlus, LoaderCircle, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { deleteVehicleImage, getVehicleImageUrl, uploadVehicleImages, validateVehicleImage } from "@/lib/vehicle-images";
import type { VehicleImage } from "@/lib/vehicles";
import { VehicleImageDisplay } from "@/components/vehicles/vehicle-image-display";

interface VehicleImageManagerProps {
  vehicleId: string;
  initialImages: VehicleImage[];
}

export function VehicleImageManager({ vehicleId, initialImages }: VehicleImageManagerProps) {
  const [images, setImages] = useState(() => sortImages(initialImages));
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);

  function chooseFiles(selected: FileList | null) {
    if (!selected) return;
    const nextFiles: File[] = [];
    for (const file of Array.from(selected)) {
      const validationError = validateVehicleImage(file);
      if (validationError) { setError(validationError); return; }
      nextFiles.push(file);
    }
    setError(""); setMessage(""); setFiles((current) => [...current, ...nextFiles]);
  }

  async function uploadFiles() {
    if (files.length === 0) return;
    setIsBusy(true); setError(""); setMessage("");
    try {
      const supabase = createClient();
      const uploaded = await uploadVehicleImages(supabase, vehicleId, files, images.length, images.some((image) => image.is_primary));
      setImages((current) => sortImages([...current, ...uploaded.map((image, index) => ({ ...image, id: `new-${Date.now()}-${index}` }))] as VehicleImage[]));
      setFiles([]); setMessage("Images uploaded successfully.");
    } catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to upload images."); }
    finally { setIsBusy(false); }
  }

  async function removeImage(image: VehicleImage) {
    if (!window.confirm("Delete this vehicle image?")) return;
    setIsBusy(true); setError("");
    try { await deleteVehicleImage(createClient(), image); setImages((current) => current.filter((item) => item.id !== image.id)); setMessage("Image deleted."); }
    catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to delete this image."); }
    finally { setIsBusy(false); }
  }

  async function makePrimary(image: VehicleImage) {
    setIsBusy(true); setError("");
    try { const supabase = createClient(); const { error: updateError } = await supabase.from("vehicle_images").update({ is_primary: false }).eq("vehicle_id", vehicleId); if (updateError) throw updateError; const { error: primaryError } = await supabase.from("vehicle_images").update({ is_primary: true }).eq("id", image.id).eq("vehicle_id", vehicleId); if (primaryError) throw primaryError; setImages((current) => current.map((item) => ({ ...item, is_primary: item.id === image.id }))); setMessage("Primary image updated."); }
    catch (caughtError) { setError(caughtError instanceof Error ? caughtError.message : "Unable to set the primary image."); }
    finally { setIsBusy(false); }
  }

  return <div className="space-y-5"><div className="grid gap-3 sm:grid-cols-2">{images.map((image) => <div key={image.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="relative"><VehicleImageDisplay imageUrl={image.image_url} alt="Vehicle" className="aspect-[4/3] w-full object-cover" />{image.is_primary && <span className="absolute left-2 top-2 rounded-full bg-orange-600 px-2 py-1 text-[10px] font-bold text-white">Primary</span>}</div><div className="flex items-center justify-between gap-2 p-3"><button type="button" disabled={isBusy || Boolean(image.is_primary)} onClick={() => void makePrimary(image)} className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 disabled:text-slate-300"><Star className="size-3.5" /> {image.is_primary ? "Primary image" : "Make primary"}</button><button type="button" disabled={isBusy} onClick={() => void removeImage(image)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 disabled:text-slate-300" aria-label="Delete image"><Trash2 className="size-4" /></button></div></div>)}{images.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 sm:col-span-2">No images uploaded yet.</div>}</div><div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"><label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:border-orange-300"><ImagePlus className="size-4 text-orange-600" /> Select JPEG, PNG, or WebP images<input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => chooseFiles(event.target.files)} /></label>{previews.length > 0 && <div className="mt-4 grid grid-cols-3 gap-2">{previews.map(({ file, url }, index) => <div key={`${file.name}-${index}`} className="relative"><img src={url} alt={file.name} className="aspect-square w-full rounded-lg object-cover" /><button type="button" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 rounded-full bg-white/90 px-1.5 text-xs font-bold text-red-600" aria-label={`Remove ${file.name}`}>×</button></div>)}</div>}{files.length > 0 && <Button type="button" onClick={() => void uploadFiles()} disabled={isBusy} className="mt-4 w-full">{isBusy ? <><LoaderCircle className="size-4 animate-spin" /> Uploading...</> : `Upload ${files.length} image${files.length === 1 ? "" : "s"}`}</Button>}</div>{error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}{message && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">{message}</p>}</div>;
}

function sortImages(images: VehicleImage[]) {
  return [...images].sort(
    (a, b) =>
      Number(b.is_primary) - Number(a.is_primary) ||
      a.display_order - b.display_order
  );
}