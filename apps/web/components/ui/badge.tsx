import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-zinc-700/10 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200",
        success: "border-emerald-700/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        warning: "border-amber-700/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        danger: "border-red-700/20 bg-red-500/10 text-red-700 dark:text-red-300",
        info: "border-blue-700/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
        outline: "border-zinc-400/40 bg-transparent text-zinc-700 dark:text-zinc-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
