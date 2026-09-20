import { Receipt } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function ExpensesPage() { return <DashboardModulePage eyebrow="Finance" title="Expenses" description="Create a clear workspace for dealership and garage expenses when finance data is available." icon={Receipt} nextStep="Reports" nextHref="/dashboard/reports" />; }
