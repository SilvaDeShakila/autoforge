import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-orange-600 text-white shadow-sm hover:bg-orange-700",
  outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
} as const;

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-lg px-3 text-xs",
  lg: "h-12 rounded-xl px-6",
  icon: "size-10",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ className, variant = "default", size = "default", asChild, children, ...props }: ButtonProps) {
  const classes = cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className);

  if (asChild) {
    if (!React.isValidElement<{ className?: string }>(children)) {
      return null;
    }

    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
    });
  }

  return <button className={classes} {...props}>{children}</button>;
}
