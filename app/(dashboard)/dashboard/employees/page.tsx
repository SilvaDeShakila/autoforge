import { Users } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function EmployeesPage() { return <DashboardModulePage eyebrow="Management" title="Employees" description="Prepare a workspace for dealership staff and future team management features." icon={Users} nextStep="Workspace settings" nextHref="/dashboard/settings" />; }
