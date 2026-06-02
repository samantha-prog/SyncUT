import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({ value, className, indicatorClassName }: ProgressProps) {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500",
          indicatorClassName
        )}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
