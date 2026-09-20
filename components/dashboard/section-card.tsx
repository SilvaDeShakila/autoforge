import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SectionCard({ title, description, children, action, className }: SectionCardProps) {
  return <Card className={className}><CardHeader className="flex-row items-start justify-between gap-4"><div><CardTitle>{title}</CardTitle><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action}</CardHeader><CardContent>{children}</CardContent></Card>;
}
