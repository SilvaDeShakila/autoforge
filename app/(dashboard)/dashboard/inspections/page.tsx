import { ClipboardCheck } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function InspectionsPage() { return <DashboardModulePage eyebrow="Garage quality" title="Inspections" description="Record vehicle inspections and make inspection results easy for the team to review." icon={ClipboardCheck} nextStep="Mechanics" nextHref="/dashboard/mechanics" />; }
