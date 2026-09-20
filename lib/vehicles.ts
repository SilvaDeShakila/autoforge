import type { SupabaseClient } from "@supabase/supabase-js";

export const vehicleStatuses = ["available", "reserved", "sold", "in_service", "inactive"] as const;
export const fuelTypes = ["petrol", "diesel", "hybrid", "electric", "other"] as const;
export const transmissionTypes = ["manual", "automatic", "cvt", "other"] as const;

export type VehicleStatus = (typeof vehicleStatuses)[number];
export type FuelType = (typeof fuelTypes)[number];
export type TransmissionType = (typeof transmissionTypes)[number];

export function getVehicleErrorMessage(error: unknown, fallback = "Unable to load vehicles.") {
  const message = typeof error === "object" && error !== null && "message" in error && typeof error.message === "string" ? error.message : error instanceof Error ? error.message : fallback;
  if (message.toLowerCase().includes("permission denied") || message.includes("42501")) {
    return "Supabase denied access to the vehicle tables. Run supabase/vehicle-policies.sql in the Supabase SQL Editor, then try again.";
  }
  return message;
}

export interface VehicleLookup {
  id: string;
  name: string;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  is_primary: boolean | null;
  display_order: number;
}

export interface Vehicle {
  id: string;
  stock_number: string;
  brand_id: string;
  model_id: string;
  registration_number: string | null;
  year: number;
  mileage: number;
  fuel_type: FuelType;
  transmission: TransmissionType;
  body_type: string | null;
  color: string | null;
  engine_capacity: number | null;
  purchase_price: number | null;
  selling_price: number | null;
  status: VehicleStatus;
  description: string | null;
  created_at: string;
  updated_at: string;
  brand: VehicleLookup | null;
  model: VehicleLookup | null;
  images: VehicleImage[];
}

export interface VehicleFormValues {
  stock_number: string;
  brand_id: string;
  model_id: string;
  category_id: string;
  registration_number: string;
  year: string;
  mileage: string;
  fuel_type: FuelType;
  transmission: TransmissionType;
  body_type: string;
  color: string;
  engine_capacity: string;
  purchase_price: string;
  selling_price: string;
  status: VehicleStatus;
  description: string;
}

const vehicleSelect = "id,stock_number,brand_id,model_id,registration_number,year,mileage,fuel_type,transmission,body_type,color,engine_capacity,purchase_price,selling_price,status,description,created_at,updated_at,brand:car_brands(id,name),model:car_models(id,name),images:vehicle_images(id,vehicle_id,image_url,is_primary,display_order,created_at)";

export async function getVehicleLookups(supabase: SupabaseClient) {
  const [brands, categories] = await Promise.all([
    supabase.from("car_brands").select("id,name").eq("is_active", true).order("name"),
    supabase.from("car_categories").select("id,name").eq("is_active", true).order("name"),
  ]);
  if (brands.error) throw brands.error;
  if (categories.error) throw categories.error;
  return { brands: brands.data as VehicleLookup[], categories: categories.data as VehicleLookup[] };
}

export async function getModelsForBrand(supabase: SupabaseClient, brandId: string) {
  const { data, error } = await supabase.from("car_models").select("id,name").eq("brand_id", brandId).eq("is_active", true).order("name");
  if (error) throw error;
  return data as VehicleLookup[];
}

export async function getVehicleFilterLookups(supabase: SupabaseClient) {
  const [brands, models] = await Promise.all([
    supabase.from("car_brands").select("id,name").eq("is_active", true).order("name"),
    supabase.from("car_models").select("id,name,brand_id").eq("is_active", true).order("name"),
  ]);
  if (brands.error) throw brands.error;
  if (models.error) throw models.error;
  return { brands: brands.data as VehicleLookup[], models: models.data as (VehicleLookup & { brand_id: string })[] };
}

export async function getVehicles(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("vehicles").select(vehicleSelect).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as Vehicle[];
}

export async function getVehicle(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("vehicles").select(vehicleSelect).eq("id", id).single();
  if (error) throw error;
  return data as unknown as Vehicle;
}

export function vehicleToFormValues(vehicle: Vehicle, categories: VehicleLookup[] = []): VehicleFormValues {
  const matchingCategory = categories.find((category) => category.name.toLowerCase() === (vehicle.body_type ?? "").toLowerCase());
  return {
    stock_number: vehicle.stock_number,
    brand_id: vehicle.brand_id,
    model_id: vehicle.model_id,
    category_id: matchingCategory?.id ?? "",
    registration_number: vehicle.registration_number ?? "",
    year: String(vehicle.year),
    mileage: String(vehicle.mileage),
    fuel_type: vehicle.fuel_type,
    transmission: vehicle.transmission,
    body_type: vehicle.body_type ?? "",
    color: vehicle.color ?? "",
    engine_capacity: vehicle.engine_capacity == null ? "" : String(vehicle.engine_capacity),
    purchase_price: vehicle.purchase_price == null ? "" : String(vehicle.purchase_price),
    selling_price: vehicle.selling_price == null ? "" : String(vehicle.selling_price),
    status: vehicle.status,
    description: vehicle.description ?? "",
  };
}

export function formValuesToPayload(values: VehicleFormValues) {
  return {
    stock_number: values.stock_number.trim(),
    brand_id: values.brand_id,
    model_id: values.model_id,
    registration_number: values.registration_number.trim() || null,
    year: Number(values.year),
    mileage: Number(values.mileage),
    fuel_type: values.fuel_type,
    transmission: values.transmission,
    body_type: values.body_type.trim() || null,
    color: values.color.trim() || null,
    engine_capacity: values.engine_capacity ? Number(values.engine_capacity) : null,
    purchase_price: values.purchase_price ? Number(values.purchase_price) : null,
    selling_price: values.selling_price ? Number(values.selling_price) : null,
    status: values.status,
    description: values.description.trim() || null,
  };
}

export function validateVehicle(values: VehicleFormValues) {
  const errors: Partial<Record<keyof VehicleFormValues, string>> = {};
  const currentYear = new Date().getFullYear();
  if (!values.stock_number.trim()) errors.stock_number = "Stock number is required.";
  if (!values.brand_id) errors.brand_id = "Select a brand.";
  if (!values.model_id) errors.model_id = "Select a model.";
  if (!values.year || Number(values.year) < 1886 || Number(values.year) > currentYear + 1) errors.year = `Enter a year between 1886 and ${currentYear + 1}.`;
  if (values.mileage === "" || Number(values.mileage) < 0) errors.mileage = "Mileage cannot be negative.";
  if (values.purchase_price && Number(values.purchase_price) < 0) errors.purchase_price = "Purchase price cannot be negative.";
  if (values.selling_price && Number(values.selling_price) < 0) errors.selling_price = "Selling price cannot be negative.";
  if (values.engine_capacity && Number(values.engine_capacity) < 0) errors.engine_capacity = "Engine capacity cannot be negative.";
  return errors;
}

export function getPrimaryImage(vehicle: Vehicle) {
  return [...(vehicle.images ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.display_order - b.display_order)[0]?.image_url;
}
