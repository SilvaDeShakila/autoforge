import { BriefcaseBusiness } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function MechanicsPage() { return <DashboardModulePage eyebrow="Garage team" title="Mechanics" description="Organize mechanic profiles and assignments when garage staff management is connected." icon={BriefcaseBusiness} nextStep="Service bookings" nextHref="/dashboard/service-bookings" />; }
