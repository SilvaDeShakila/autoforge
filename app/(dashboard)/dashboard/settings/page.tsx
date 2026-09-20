import { Settings } from "lucide-react";
import { DashboardModulePage } from "@/components/dashboard-module-page";

export default function SettingsPage() {
  return <DashboardModulePage eyebrow="Workspace preferences" title="Settings" description="Configure your AutoForge workspace and prepare the preferences your team will use as the system grows." icon={Settings} nextStep="Return to workspace overview" nextHref="/dashboard" />;
}
