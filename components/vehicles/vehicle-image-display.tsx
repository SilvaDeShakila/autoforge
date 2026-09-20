"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getVehicleImageUrl } from "@/lib/vehicle-images";

interface VehicleImageDisplayProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export function VehicleImageDisplay({ imageUrl, alt, className }: VehicleImageDisplayProps) {
  const [resolvedUrl, setResolvedUrl] = useState("");

  useEffect(() => {
    let isCurrent = true;
    getVehicleImageUrl(createClient(), imageUrl).then((url) => { if (isCurrent) setResolvedUrl(url); }).catch(() => { if (isCurrent) setResolvedUrl(""); });
    return () => { isCurrent = false; };
  }, [imageUrl]);

  if (!resolvedUrl) return <div className={`${className ?? ""} animate-pulse bg-slate-100`} aria-label="Loading image" />;
  return <img src={resolvedUrl} alt={alt} className={className} />;
}
