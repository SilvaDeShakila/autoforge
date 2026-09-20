import { BarChart3 } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function ReportsPage() {
  return <DashboardModulePage eyebrow="Business insights" title="Reports" description="Turn dealership activity into clear reports for better planning and decision-making." icon={BarChart3} nextStep="Workspace settings" nextHref="/dashboard/settings" />;
}
