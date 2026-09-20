import { Truck } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function SuppliersPage() { return <DashboardModulePage eyebrow="Parts procurement" title="Suppliers" description="Keep supplier contacts and purchasing relationships organized as inventory grows." icon={Truck} nextStep="Purchases" nextHref="/dashboard/purchases" />; }
