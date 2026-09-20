import { Wrench } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function ServiceJobsPage() { return <DashboardModulePage eyebrow="Garage operations" title="Service Jobs" description="Track repair work, job status, assigned mechanics, and vehicle service history." icon={Wrench} nextStep="Inspections" nextHref="/dashboard/inspections" />; }
