import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Gauge,
  GitCommitHorizontal,
  GitPullRequestArrow,
  ListTodo,
  PackageCheck,
  ShieldAlert,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { KpiItem } from "../types";

const iconMap = {
  Gauge,
  CheckCircle2,
  ListTodo,
  ShieldAlert,
  Users,
  Activity,
  GitCommitHorizontal,
  GitPullRequestArrow,
  PackageCheck,
};

interface KpiHeroProps {
  isDark: boolean;
  isLoading: boolean;
  kpis: KpiItem[];
}

export function KpiHero({ isDark, isLoading, kpis }: KpiHeroProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))
        : kpis.map((kpi, idx) => {
            const KpiIcon = iconMap[kpi.icon as keyof typeof iconMap] ?? Gauge;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Card className={cn("h-full transition hover:-translate-y-0.5", isDark ? "bg-zinc-950/70" : "bg-white/90")}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-medium text-zinc-500">{kpi.label}</CardTitle>
                    <KpiIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="mb-1 text-2xl font-semibold">{kpi.value}</div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <Badge
                        variant={
                          kpi.tone === "success"
                            ? "success"
                            : kpi.tone === "warning"
                              ? "warning"
                              : "info"
                        }
                      >
                        {kpi.trend}
                      </Badge>
                      <span className={cn("line-clamp-1", isDark ? "text-zinc-400" : "text-zinc-600")}>{kpi.micro}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
    </section>
  );
}
