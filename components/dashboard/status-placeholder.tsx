interface StatusPlaceholderProps {
  label: string;
}

export function StatusPlaceholder({ label }: StatusPlaceholderProps) {
  return <div className="rounded-xl border border-slate-100 bg-slate-50 p-3"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-700">{label}</span><span className="font-display text-lg font-bold text-slate-400">--</span></div><div className="mt-3 h-1.5 rounded-full bg-slate-200" /></div>;
}
