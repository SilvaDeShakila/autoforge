import { CreditCard } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function PaymentsPage() { return <DashboardModulePage eyebrow="Finance" title="Payments" description="Review future payment records from sales and service invoices." icon={CreditCard} nextStep="Expenses" nextHref="/dashboard/expenses" />; }
