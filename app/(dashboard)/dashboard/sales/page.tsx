import { ShoppingCart } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function SalesPage() { return <DashboardModulePage eyebrow="Dealership operations" title="Sales" description="Manage vehicle sales workflows after the sales module is connected to Supabase data." icon={ShoppingCart} nextStep="Sales invoices" nextHref="/dashboard/sales-invoices" />; }
