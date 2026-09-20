import { Package } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function SparePartsPage() { return <DashboardModulePage eyebrow="Parts inventory" title="Spare Parts" description="Track spare-part availability and low-stock alerts from your future inventory workspace." icon={Package} nextStep="Suppliers" nextHref="/dashboard/suppliers" />; }
