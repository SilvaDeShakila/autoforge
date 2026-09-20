"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { fuelTypes, formValuesToPayload, getModelsForBrand, getVehicleErrorMessage, transmissionTypes, validateVehicle, vehicleStatuses, type VehicleFormValues, type VehicleLookup } from "@/lib/vehicles";

interface VehicleFormProps {
  mode: "create" | "edit";
  vehicleId?: string;
  initialValues?: VehicleFormValues;
  brands: VehicleLookup[];
  categories: VehicleLookup[];
}

const emptyValues: VehicleFormValues = { stock_number: "", brand_id: "", model_id: "", category_id: "", registration_number: "", year: "", mileage: "", fuel_type: "petrol", transmission: "manual", body_type: "", color: "", engine_capacity: "", purchase_price: "", selling_price: "", status: "available", description: "" };
const inputClass = "auth-input";

export function VehicleForm({ mode, vehicleId, initialValues = emptyValues, brands, categories }: VehicleFormProps) {
  const [values, setValues] = useState(initialValues);
  const [models, setModels] = useState<VehicleLookup[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormValues, string>>>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isCurrent = true;
    async function loadModels() {
      if (!values.brand_id) { setModels([]); return; }
      setIsLoadingModels(true);
      try {
        const data = await getModelsForBrand(createClient(), values.brand_id);
        if (isCurrent) setModels(data);
      } catch (caughtError) {
        if (isCurrent) setFormError(getVehicleErrorMessage(caughtError, "Unable to load models for this brand."));
      } finally {
        if (isCurrent) setIsLoadingModels(false);
      }
    }
    void loadModels();
    return () => { isCurrent = false; };
  }, [values.brand_id]);

  function update(field: keyof VehicleFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value, ...(field === "brand_id" ? { model_id: "" } : {}) }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
  }

  function updateCategory(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    setValues((current) => ({ ...current, category_id: categoryId, body_type: category?.name ?? current.body_type }));
    setErrors((current) => ({ ...current, body_type: undefined }));
    setFormError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateVehicle(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSaving(true); setFormError(""); setSuccess("");
    try {
      const supabase = createClient();
      const payload = formValuesToPayload(values);
      const result = mode === "create" ? await supabase.from("vehicles").insert(payload).select("id").single() : await supabase.from("vehicles").update(payload).eq("id", vehicleId!).select("id").single();
      if (result.error) throw result.error;
      setSuccess(mode === "create" ? "Vehicle created successfully." : "Vehicle updated successfully.");
      const destination = mode === "create" ? `/dashboard/vehicles/${result.data.id}` : `/dashboard/vehicles/${vehicleId}`;
      window.setTimeout(() => router.push(destination), 600);
    } catch (caughtError) {
      setFormError(getVehicleErrorMessage(caughtError, "Unable to save this vehicle. Check your permissions and try again."));
      setIsSaving(false);
    }
  }

  return <form onSubmit={handleSubmit} className="space-y-6" noValidate><Card><CardHeader><CardTitle>Vehicle information</CardTitle><p className="text-sm text-slate-500">Add the identifying details for this vehicle.</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Stock number" id="stock_number" value={values.stock_number} error={errors.stock_number} onChange={update} required /><Field label="Registration number" id="registration_number" value={values.registration_number} error={errors.registration_number} onChange={update} /><SelectField label="Brand" id="brand_id" value={values.brand_id} error={errors.brand_id} options={brands} placeholder="Select brand" onChange={update} required /><SelectField label="Model" id="model_id" value={values.model_id} error={errors.model_id} options={models} placeholder={isLoadingModels ? "Loading models..." : "Select model"} onChange={update} required disabled={!values.brand_id || isLoadingModels} /><SelectField label="Category / body type" id="category_id" value={values.category_id} options={categories} placeholder="Select category" onChange={(_id, value) => updateCategory(value)} /><Field label="Year" id="year" type="number" value={values.year} error={errors.year} onChange={update} min="1886" max={String(new Date().getFullYear() + 1)} required /><Field label="Mileage" id="mileage" type="number" value={values.mileage} error={errors.mileage} onChange={update} min="0" required /><Field label="Body type / custom value" id="body_type" value={values.body_type} error={errors.body_type} onChange={update} placeholder="SUV, Sedan, Hatchback" /><Field label="Color" id="color" value={values.color} error={errors.color} onChange={update} /><Field label="Engine capacity" id="engine_capacity" type="number" value={values.engine_capacity} error={errors.engine_capacity} onChange={update} min="0" step="0.01" placeholder="e.g. 2.0" /><SelectField label="Fuel type" id="fuel_type" value={values.fuel_type} options={fuelTypes.map((value) => ({ id: value, name: value }))} onChange={update} /><SelectField label="Transmission" id="transmission" value={values.transmission} options={transmissionTypes.map((value) => ({ id: value, name: value }))} onChange={update} /></CardContent></Card><Card><CardHeader><CardTitle>Pricing and status</CardTitle><p className="text-sm text-slate-500">Prices are stored as database values and formatted when displayed.</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-3"><Field label="Purchase price" id="purchase_price" type="number" value={values.purchase_price} error={errors.purchase_price} onChange={update} min="0" step="0.01" /><Field label="Selling price" id="selling_price" type="number" value={values.selling_price} error={errors.selling_price} onChange={update} min="0" step="0.01" /><SelectField label="Status" id="status" value={values.status} options={vehicleStatuses.map((value) => ({ id: value, name: value.replace("_", " ") }))} onChange={update} /></CardContent></Card><Card><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent><textarea id="description" value={values.description} onChange={(event) => update("description", event.target.value)} rows={5} placeholder="Add notes about this vehicle..." className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15" /></CardContent></Card>{formError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{formError}</p>}{success && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button><Button type="submit" disabled={isSaving}>{isSaving ? "Saving..." : mode === "create" ? "Create vehicle" : "Save changes"}</Button></div></form>;
}

function Field({ label, id, value, error, onChange, required, type = "text", ...props }: { label: string; id: keyof VehicleFormValues; value: string; error?: string; onChange: (id: keyof VehicleFormValues, value: string) => void; required?: boolean; type?: string; [key: string]: unknown }) {
  return <div className="space-y-2"><label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}{required && <span className="ml-1 text-orange-600">*</span>}</label><input id={id} type={type} value={value} onChange={(event) => onChange(id, event.target.value)} className={inputClass} {...props} />{error && <p className="text-xs font-medium text-red-600">{error}</p>}</div>;
}

function SelectField({ label, id, value, error, options, placeholder, onChange, required, disabled }: { label: string; id: keyof VehicleFormValues; value: string; error?: string; options: VehicleLookup[]; placeholder?: string; onChange: (id: keyof VehicleFormValues, value: string) => void; required?: boolean; disabled?: boolean }) {
  return <div className="space-y-2"><label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}{required && <span className="ml-1 text-orange-600">*</span>}</label><select id={id} value={value} disabled={disabled} onChange={(event) => onChange(id, event.target.value)} className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-100`}><option value="">{placeholder ?? `Select ${label.toLowerCase()}`}</option>{options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select>{error && <p className="text-xs font-medium text-red-600">{error}</p>}</div>;
}
