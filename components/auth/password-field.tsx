"use client";

import { Eye, EyeOff } from "lucide-react";
import { type ChangeEvent, useState } from "react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordField({ id, label, value, placeholder, autoComplete, error, onChange }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}</label>
      <div className="relative">
        <input id={id} name={id} type={isVisible ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`h-11 w-full rounded-xl border bg-white px-3.5 pr-11 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${error ? "border-red-400" : "border-slate-200"}`} />
        <button type="button" onClick={() => setIsVisible(!isVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700" aria-label={isVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}>
          {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <p id={`${id}-error`} className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
