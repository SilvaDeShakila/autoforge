import { UserRound } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function LeadsPage() { return <DashboardModulePage eyebrow="Dealership relationships" title="Leads" description="Follow up with prospective customers and keep dealership opportunities organized." icon={UserRound} nextStep="Customers workspace" nextHref="/dashboard/customers" />; }
