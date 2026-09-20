import type { SupabaseClient } from "@supabase/supabase-js";
import type { VehicleImage } from "@/lib/vehicles";

export const VEHICLE_IMAGE_BUCKET = "vehicle-images";
export const allowedVehicleImageTypes = ["image/jpeg", "image/png", "image/webp"] as const;

export function validateVehicleImage(file: File) {
  if (!allowedVehicleImageTypes.includes(file.type as (typeof allowedVehicleImageTypes)[number])) {
    return "Only JPEG, PNG, and WebP images are supported.";
  }
  return "";
}

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-").replace(/^-+|-+$/g, "") || "vehicle-image";
}

export async function uploadVehicleImages(supabase: SupabaseClient, vehicleId: string, files: File[], startOrder = 0, hasPrimaryImage = false) {
  const uploadedPaths: string[] = [];
  const imageRows: Omit<VehicleImage, "id">[] = [];

  try {
    for (const [index, file] of files.entries()) {
      const validationError = validateVehicleImage(file);
      if (validationError) throw new Error(validationError);
      const path = `${vehicleId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const { error } = await supabase.storage.from(VEHICLE_IMAGE_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      uploadedPaths.push(path);
      imageRows.push({ vehicle_id: vehicleId, image_url: path, display_order: startOrder + index, is_primary: !hasPrimaryImage && index === 0, created_at: new Date().toISOString() } as Omit<VehicleImage, "id">);
    }

    if (imageRows.length > 0) {
      const { error } = await supabase.from("vehicle_images").insert(imageRows);
      if (error) throw error;
    }
    return imageRows;
  } catch (error) {
    if (uploadedPaths.length > 0) await supabase.storage.from(VEHICLE_IMAGE_BUCKET).remove(uploadedPaths);
    throw error;
  }
}

export function storagePathFromImageUrl(imageUrl: string) {
  if (!imageUrl.startsWith("http")) return imageUrl;
  const marker = `/${VEHICLE_IMAGE_BUCKET}/`;
  const markerIndex = imageUrl.indexOf(marker);
  return markerIndex >= 0 ? decodeURIComponent(imageUrl.slice(markerIndex + marker.length).split("?")[0]) : imageUrl;
}

export async function getVehicleImageUrl(supabase: SupabaseClient, imageUrl: string) {
  if (imageUrl.startsWith("http")) return imageUrl;
  const { data, error } = await supabase.storage.from(VEHICLE_IMAGE_BUCKET).createSignedUrl(imageUrl, 3600);
  if (error) throw error;
  return data.signedUrl;
}

export async function deleteVehicleImage(supabase: SupabaseClient, image: VehicleImage) {
  const storagePath = storagePathFromImageUrl(image.image_url);
  if (storagePath !== image.image_url || !image.image_url.startsWith("http")) {
    const { error } = await supabase.storage.from(VEHICLE_IMAGE_BUCKET).remove([storagePath]);
    if (error) throw error;
  }
  const { error } = await supabase.from("vehicle_images").delete().eq("id", image.id).eq("vehicle_id", image.vehicle_id);
  if (error) throw error;
}
