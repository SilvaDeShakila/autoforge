import { FileText } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function ServiceInvoicesPage() { return <DashboardModulePage eyebrow="Finance" title="Service Invoices" description="Keep service billing organized when garage invoice data is connected." icon={FileText} nextStep="Payments" nextHref="/dashboard/payments" />; }
