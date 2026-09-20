import { ClipboardList } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function ServiceBookingsPage() { return <DashboardModulePage eyebrow="Garage scheduling" title="Service Bookings" description="Schedule customer vehicles for future maintenance and repair appointments." icon={ClipboardList} nextStep="Service jobs" nextHref="/dashboard/service-jobs" />; }
