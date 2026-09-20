import { FileText } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function SalesInvoicesPage() { return <DashboardModulePage eyebrow="Finance" title="Sales Invoices" description="Prepare a clear home for invoices created from completed vehicle sales." icon={FileText} nextStep="Payments" nextHref="/dashboard/payments" />; }
