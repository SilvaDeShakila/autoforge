import {
  BarChart3,
  BriefcaseBusiness,
  CarFront,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  Gauge,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Truck,
  UserRound,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardNavSection {
  label: string;
  items: DashboardNavItem[];
}

export const dashboardNavSections: DashboardNavSection[] = [
  { label: "Main", items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }] },
  {
    label: "Dealership",
    items: [
      { label: "Vehicles", href: "/dashboard/vehicles", icon: CarFront },
      { label: "Customers", href: "/dashboard/customers", icon: Users },
      { label: "Test Drives", href: "/dashboard/test-drives", icon: Gauge },
      { label: "Sales", href: "/dashboard/sales", icon: ShoppingCart },
      { label: "Leads", href: "/dashboard/leads", icon: UserRound },
    ],
  },
  {
    label: "Garage",
    items: [
      { label: "Service Bookings", href: "/dashboard/service-bookings", icon: ClipboardList },
      { label: "Service Jobs", href: "/dashboard/service-jobs", icon: Wrench },
      { label: "Inspections", href: "/dashboard/inspections", icon: ClipboardCheck },
      { label: "Mechanics", href: "/dashboard/mechanics", icon: BriefcaseBusiness },
    ],
  },
  {
    label: "Inventory",
    items: [
      { label: "Spare Parts", href: "/dashboard/spare-parts", icon: Package },
      { label: "Suppliers", href: "/dashboard/suppliers", icon: Truck },
      { label: "Purchases", href: "/dashboard/purchases", icon: Receipt },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Sales Invoices", href: "/dashboard/sales-invoices", icon: FileText },
      { label: "Service Invoices", href: "/dashboard/service-invoices", icon: FileText },
      { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { label: "Expenses", href: "/dashboard/expenses", icon: Receipt },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Employees", href: "/dashboard/employees", icon: Users },
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export const dashboardNavItems = dashboardNavSections.flatMap((section) => section.items);
export const dashboardSettingsItem = dashboardNavItems.find((item) => item.label === "Settings") ?? dashboardNavItems[dashboardNavItems.length - 1];

export function getDashboardPageTitle(pathname: string) {
  return dashboardNavItems.find((item) => item.href === pathname)?.label ?? "Dashboard";
}
