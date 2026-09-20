import { Users } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function CustomersPage() {
  return <DashboardModulePage eyebrow="Relationship management" title="Customers" description="Keep customer records, contact details, and dealership relationships organized in one place." icon={Users} nextStep="Service center" nextHref="/dashboard/service-center" />;
}
