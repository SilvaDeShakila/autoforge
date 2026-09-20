import { Wrench } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function ServiceCenterPage() {
  return <DashboardModulePage eyebrow="Garage operations" title="Service center" description="Organize repair orders, service appointments, mechanics, and vehicle maintenance workflows." icon={Wrench} nextStep="Reports and insights" nextHref="/dashboard/reports" />;
}
