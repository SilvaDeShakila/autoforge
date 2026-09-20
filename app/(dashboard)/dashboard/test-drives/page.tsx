import { Gauge } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function TestDrivesPage() { return <DashboardModulePage eyebrow="Dealership scheduling" title="Test Drives" description="Plan and manage customer test-drive appointments when the booking workflow is connected." icon={Gauge} nextStep="Sales workspace" nextHref="/dashboard/sales" />; }
