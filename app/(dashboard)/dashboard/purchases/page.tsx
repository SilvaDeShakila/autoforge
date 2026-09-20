import { Receipt } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function PurchasesPage() { return <DashboardModulePage eyebrow="Parts procurement" title="Purchases" description="Review future purchase orders and incoming spare-parts stock in one place." icon={Receipt} nextStep="Spare parts" nextHref="/dashboard/spare-parts" />; }
