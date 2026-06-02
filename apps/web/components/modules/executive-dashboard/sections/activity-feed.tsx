import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { ActivityItem } from "../types";

const activityColor: Record<string, string> = {
  merge: "bg-blue-500",
  deploy: "bg-emerald-500",
  validation: "bg-amber-500",
  hotfix: "bg-red-500",
  test: "bg-zinc-500",
  approval: "bg-indigo-500",
};

interface ActivityFeedSectionProps {
  isDark: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  squadFilter: string;
  onSquadFilterChange: (value: string) => void;
  sprintFilter: string;
  onSprintFilterChange: (value: string) => void;
  moduleFilter: string;
  onModuleFilterChange: (value: string) => void;
  filteredActivity: ActivityItem[];
  allActivity: ActivityItem[];
}

export function ActivityFeedSection({
  isDark,
  search,
  onSearchChange,
  squadFilter,
  onSquadFilterChange,
  sprintFilter,
  onSprintFilterChange,
  moduleFilter,
  onModuleFilterChange,
  filteredActivity,
  allActivity,
}: ActivityFeedSectionProps) {
  return (
    <Card className={cn("xl:col-span-3", isDark ? "bg-zinc-950/70" : "bg-white/90")}>
      <CardHeader>
        <CardTitle>Historial global de cambios</CardTitle>
        <CardDescription>Feed profesional tipo GitHub Activity + Jira Timeline + Azure DevOps.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2 md:grid-cols-4">
          <Input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Buscar actividad..." />
          <select
            className="h-10 rounded-lg border border-zinc-700/20 bg-transparent px-3 text-sm"
            value={squadFilter}
            onChange={(e) => onSquadFilterChange(e.target.value)}
          >
            {["Todos", ...new Set(allActivity.map((i) => i.squad))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="h-10 rounded-lg border border-zinc-700/20 bg-transparent px-3 text-sm"
            value={sprintFilter}
            onChange={(e) => onSprintFilterChange(e.target.value)}
          >
            {["Todos", ...new Set(allActivity.map((i) => i.sprint))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="h-10 rounded-lg border border-zinc-700/20 bg-transparent px-3 text-sm"
            value={moduleFilter}
            onChange={(e) => onModuleFilterChange(e.target.value)}
          >
            {["Todos", ...new Set(allActivity.map((i) => i.module))].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {filteredActivity.map((item) => (
            <div
              key={`${item.user}-${item.time}-${item.action}-${item.module}`}
              className={cn(
                "flex flex-wrap items-start gap-3 rounded-xl border p-3",
                isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50"
              )}
            >
              <span className={cn("mt-1 h-2.5 w-2.5 rounded-full", activityColor[item.action] ?? "bg-zinc-500")} />
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">{item.user}</span>
                  <Badge variant="outline">{item.action}</Badge>
                  <span className={cn(isDark ? "text-zinc-400" : "text-zinc-600")}>
                    {item.date} · {item.time}
                  </span>
                </div>
                <p className="text-sm">{item.description}</p>
                <p className={cn("text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
                  Modulo: {item.module} · Sprint: {item.sprint} · Estado: {item.status} · Impacto: {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
