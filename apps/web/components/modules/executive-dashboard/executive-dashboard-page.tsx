"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Clock3,
  LayoutGrid,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@plataforma/sdk/client";

import {
  chartData,
  executiveHeader,
  globalActivity,
  improvements,
  kpis,
  modules,
  owners,
  risks,
  roadmap,
  sprints,
} from "./data";
import { fetchExecutiveLiveData, mapRealtimeAuditToActivity, toCsvReport } from "./live-data";
import { ActivityFeedSection } from "./sections/activity-feed";
import { ExecutiveHeader } from "./sections/executive-header";
import { KpiHero } from "./sections/kpi-hero";
import type { ActivityItem, KpiItem, StatusTone } from "./types";

const statusToneClasses: Record<StatusTone, string> = {
  completed: "bg-emerald-500",
  "in-progress": "bg-blue-500",
  blocked: "bg-red-500",
  delayed: "bg-amber-500",
};

const statusBadgeVariant: Record<StatusTone, "success" | "info" | "danger" | "warning"> = {
  completed: "success",
  "in-progress": "info",
  blocked: "danger",
  delayed: "warning",
};

const teamStatusColor: Record<string, "success" | "warning" | "danger" | "info"> = {
  activo: "success",
  revision: "warning",
  bloqueado: "danger",
  pendiente: "info",
};

export function ExecutiveDashboardPage() {
  const [isDark, setIsDark] = useState(true);
  const [search, setSearch] = useState("");
  const [squadFilter, setSquadFilter] = useState("Todos");
  const [sprintFilter, setSprintFilter] = useState("Todos");
  const [moduleFilter, setModuleFilter] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(globalActivity);
  const [liveStats, setLiveStats] = useState({ profileCount: 0, auditCount: 0, hasLiveSource: false });
  const [lastSyncLabel, setLastSyncLabel] = useState("--:--");
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 850);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadLiveData = async () => {
      const live = await fetchExecutiveLiveData(globalActivity);
      if (!mounted) {
        return;
      }
      setActivityFeed(live.activity);
      setLiveStats({
        profileCount: live.profileCount,
        auditCount: live.auditCount,
        hasLiveSource: live.hasLiveSource,
      });
      setLastSyncLabel(
        new Date().toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    void loadLiveData();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("executive-audit-stream")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "audit_logs",
        },
        (payload) => {
          const activity = mapRealtimeAuditToActivity({
            action: String(payload.new.action ?? "change"),
            table_name: String(payload.new.table_name ?? "audit_logs"),
            created_at: String(payload.new.created_at ?? new Date().toISOString()),
            user_id: typeof payload.new.user_id === "string" ? payload.new.user_id : null,
          });
          setActivityFeed((prev) => [activity, ...prev].slice(0, 120));
          setNotifications((prev) => [
            `${activity.user}: ${activity.action} en ${activity.module}`,
            ...prev,
          ].slice(0, 4));
          setLastSyncLabel(
            new Date().toLocaleTimeString("es-MX", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          );
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const kpiItems = useMemo<KpiItem[]>(() => {
    return kpis.map((kpi) => {
      if (kpi.label === "Commits semana") {
        const liveCommits = activityFeed.filter((item) =>
          ["merge", "hotfix", "validation"].includes(item.action)
        ).length;
        return { ...kpi, value: String(Math.max(liveCommits, Number(kpi.value) || 0)) };
      }
      if (kpi.label === "PRs aprobados") {
        const approved = activityFeed.filter((item) => item.action === "approval").length;
        return { ...kpi, value: String(Math.max(approved, Number(kpi.value) || 0)) };
      }
      if (kpi.label === "Squads trabajando" && liveStats.profileCount > 0) {
        return { ...kpi, micro: `${liveStats.profileCount} perfiles sincronizados` };
      }
      return kpi;
    });
  }, [activityFeed, liveStats.profileCount]);

  const filteredActivity = useMemo(() => {
    return activityFeed.filter((item) => {
      const matchesSearch =
        item.user.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.module.toLowerCase().includes(search.toLowerCase());
      const matchesSquad = squadFilter === "Todos" || item.squad === squadFilter;
      const matchesSprint = sprintFilter === "Todos" || item.sprint === sprintFilter;
      const matchesModule = moduleFilter === "Todos" || item.module === moduleFilter;
      return matchesSearch && matchesSquad && matchesSprint && matchesModule;
    });
  }, [activityFeed, moduleFilter, search, sprintFilter, squadFilter]);

  const exportReport = () => {
    const csv = toCsvReport({
      generatedAt: new Date().toISOString(),
      kpis: kpiItems.map((kpi) => ({ label: kpi.label, value: kpi.value, trend: kpi.trend })),
      activity: filteredActivity,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "centro-ejecutivo-avance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const healthScore = 78;

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300",
        isDark
          ? "bg-[radial-gradient(circle_at_top_right,_#1f2937_0%,_#09090b_40%,_#020617_100%)] text-zinc-100"
          : "bg-[radial-gradient(circle_at_top_right,_#f8fafc_0%,_#f1f5f9_30%,_#ffffff_100%)] text-zinc-900"
      )}
    >
      <div className="mx-auto max-w-[1580px] space-y-6 p-4 md:p-7 lg:p-10">
        <ExecutiveHeader
          isDark={isDark}
          setIsDark={setIsDark}
          onExport={exportReport}
          hasLiveSource={liveStats.hasLiveSource}
          syncLabel={lastSyncLabel}
          header={executiveHeader}
        />

        <KpiHero isDark={isDark} isLoading={isLoading} kpis={kpiItems} />

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className={cn("xl:col-span-2", isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" /> Salud general del proyecto
              </CardTitle>
              <CardDescription>Progreso principal de MVP y estabilidad operacional.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Barra principal MVP Fase 1</span>
                <span className="font-semibold">74%</span>
              </div>
              <Progress value={74} className="h-3" indicatorClassName="bg-emerald-500" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className={cn("rounded-xl border p-4", isDark ? "border-zinc-800" : "border-zinc-200")}>
                  <p className={cn("mb-2 text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>Progreso circular</p>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Completado", value: 74 },
                            { name: "Restante", value: 26 },
                          ]}
                          innerRadius={55}
                          outerRadius={80}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill={isDark ? "#27272a" : "#e4e4e7"} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className={cn("rounded-xl border p-4", isDark ? "border-zinc-800" : "border-zinc-200")}>
                  <p className={cn("mb-2 text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>Health score ejecutivo</p>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={chartData.healthScore}>
                        <PolarGrid stroke={isDark ? "#3f3f46" : "#d4d4d8"} />
                        <PolarAngleAxis dataKey="name" tick={{ fill: isDark ? "#a1a1aa" : "#52525b", fontSize: 11 }} />
                        <Radar dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <Badge variant={healthScore > 75 ? "success" : "warning"}>Score: {healthScore}/100</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Comandos rapidos</CardTitle>
              <CardDescription>Command palette y acciones ejecutivas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <Input placeholder="Buscar modulo, riesgo o responsable..." className="pl-9" />
              </div>
              <Button variant="secondary" className="w-full justify-start">
                <LayoutGrid className="h-4 w-4" /> Abrir command palette
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4" /> Configurar notificaciones ejecutivas
              </Button>
              <div className={cn("rounded-xl border p-3 text-sm", isDark ? "border-zinc-800" : "border-zinc-200")}>
                <p className="font-medium">Alertas recientes</p>
                {notifications.length === 0 ? (
                  <p className={cn("mt-1 text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
                    2 bloqueos criticos y 1 dependencia externa pendiente de aprobacion.
                  </p>
                ) : (
                  <ul className={cn("mt-1 space-y-1 text-xs", isDark ? "text-zinc-300" : "text-zinc-700")}>
                    {notifications.map((alert) => (
                      <li key={alert} className="truncate">• {alert}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Roadmap y siguientes pasos</CardTitle>
              <CardDescription>Objetivos inmediatos, dependencias criticas y entregables proximos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {roadmap.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-xl border p-3",
                    isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50"
                  )}
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{item.title}</p>
                    <Badge variant={statusBadgeVariant[item.status]}>{item.status}</Badge>
                  </div>
                  <div className="grid gap-2 text-xs text-zinc-500 md:grid-cols-2">
                    <p>Prioridad: {item.priority}</p>
                    <p>Responsable: {item.owner}</p>
                    <p>ETA: {item.eta}</p>
                    <p>Sprint: {item.sprint}</p>
                    <p className="md:col-span-2">Dependencia: {item.dependency}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Progreso por sprints</CardTitle>
              <CardDescription>Timeline ejecutivo horizontal con estado y dependencias.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="flex min-w-[880px] gap-3 pb-2">
                  {sprints.map((sprint) => (
                    <div
                      key={sprint.name}
                      className={cn(
                        "w-[280px] rounded-xl border p-3",
                        isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50"
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{sprint.name}</p>
                        <span className={cn("h-2.5 w-2.5 rounded-full", statusToneClasses[sprint.status])} />
                      </div>
                      <Progress value={sprint.progress} className="mb-2" />
                      <div className="space-y-1 text-xs text-zinc-500">
                        <p>{sprint.done}/{sprint.total} tareas</p>
                        <p>Responsables: {sprint.owners}</p>
                        <p>Riesgos: {sprint.risks}</p>
                        <p>Deadline: {sprint.deadline}</p>
                        <p>Dependencias: {sprint.dependencies}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Dashboard de modulos</CardTitle>
              <CardDescription>
                Vista enterprise de avance por modulo con responsable, roadmap y trazabilidad de cambios.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => (
                <details
                  key={module.name}
                  className={cn(
                    "group rounded-xl border p-4 transition",
                    isDark
                      ? "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                      : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                  )}
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{module.name}</p>
                        <p className={cn("mt-1 text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
                          {module.description}
                        </p>
                      </div>
                      <Badge variant={module.risk === "Alto" ? "danger" : module.risk === "Medio" ? "warning" : "success"}>
                        Riesgo {module.risk}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Progreso</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} indicatorClassName="bg-blue-500" />
                    </div>
                  </summary>

                  <div className="mt-4 space-y-4 text-xs">
                    <div>
                      <p className="mb-1 font-semibold">Informacion general</p>
                      <p>Objetivo: {module.objective}</p>
                      <p>Impacto: {module.impact}</p>
                      <p>Prioridad MVP: {module.mvpPriority}</p>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold">Metricas</p>
                      <p>Completadas: {module.tasksDone}</p>
                      <p>Pendientes: {module.tasksPending}</p>
                      <p>Commits: {module.commits}</p>
                      <p>PRs abiertos: {module.prsOpen}</p>
                      <p>Bugs activos: {module.bugs}</p>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold">Responsables</p>
                      <p>Lead: {module.techLead}</p>
                      <p>Squad: {module.squad}</p>
                      <p>Integrantes: {module.assignees.join(", ")}</p>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold">Roadmap</p>
                      <p>Pasos: {module.nextSteps.join(" · ")}</p>
                      <p>Entregables: {module.deliverables.join(" · ")}</p>
                      <p>Mejoras: {module.improvements.join(" · ")}</p>
                      <p>Dependencias: {module.dependencies.join(" · ")}</p>
                      <p>Bloqueos: {module.blockers.join(" · ")}</p>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold">Historial</p>
                      <div className="space-y-1">
                        {module.history.map((h) => (
                          <div key={`${h.by}-${h.date}-${h.type}`} className="rounded-md border border-zinc-700/20 px-2 py-1">
                            <p>{h.detail}</p>
                            <p className="text-zinc-500">
                              {h.by} · {h.date} · {h.type} · {h.approval}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-5">
          <ActivityFeedSection
            isDark={isDark}
            search={search}
            onSearchChange={setSearch}
            squadFilter={squadFilter}
            onSquadFilterChange={setSquadFilter}
            sprintFilter={sprintFilter}
            onSprintFilterChange={setSprintFilter}
            moduleFilter={moduleFilter}
            onModuleFilterChange={setModuleFilter}
            filteredActivity={filteredActivity}
            allActivity={activityFeed}
          />

          <Card className={cn("xl:col-span-2", isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Panel de responsables</CardTitle>
              <CardDescription>Estado individual, actividad semanal y carga actual.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead className={cn("text-xs", isDark ? "text-zinc-400" : "text-zinc-600")}>
                  <tr>
                    <th className="pb-2">Integrante</th>
                    <th className="pb-2">Squad</th>
                    <th className="pb-2">Rol</th>
                    <th className="pb-2">Tareas</th>
                    <th className="pb-2">Progreso</th>
                    <th className="pb-2">Actividad</th>
                    <th className="pb-2">PRs</th>
                    <th className="pb-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {owners.map((person) => (
                    <tr key={person.name} className="border-t border-zinc-700/20">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                          {person.name}
                        </div>
                      </td>
                      <td className="py-2">{person.squad}</td>
                      <td className="py-2">{person.role}</td>
                      <td className="py-2">{person.tasks}</td>
                      <td className="py-2">{person.progress}%</td>
                      <td className="py-2">{person.weekly}</td>
                      <td className="py-2">{person.prs}</td>
                      <td className="py-2">
                        <Badge variant={teamStatusColor[person.status] ?? "info"}>{person.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Areas de mejora</CardTitle>
              <CardDescription>Engineering Health orientado a optimizacion operativa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {improvements.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-xl border p-3",
                    isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50"
                  )}
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{item.title}</p>
                    <Badge variant={item.priority === "Alta" ? "danger" : "warning"}>{item.priority}</Badge>
                  </div>
                  <p className="text-xs text-zinc-500">Impacto: {item.impact} · Responsable: {item.owner} · Esfuerzo: {item.effort}</p>
                  <p className="mt-2 text-sm">{item.recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" /> Riesgos y bloqueos
              </CardTitle>
              <CardDescription>Panel critico ejecutivo con accion correctiva y ETA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {risks.map((item) => {
                const variant = item.severity === "Critico" ? "danger" : item.severity === "Medio" ? "warning" : "success";
                return (
                  <div key={item.risk} className="rounded-xl border border-zinc-700/20 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="font-medium">{item.risk}</p>
                      <Badge variant={variant}>{item.severity}</Badge>
                    </div>
                    <p className="text-xs text-zinc-500">Impacto tecnico: {item.technicalImpact}</p>
                    <p className="text-xs text-zinc-500">Impacto operativo: {item.operationalImpact}</p>
                    <p className="mt-1 text-xs">Responsable: {item.owner}</p>
                    <p className="text-xs">Accion correctiva: {item.action}</p>
                    <p className="text-xs">ETA: {item.eta}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className={cn(isDark ? "bg-zinc-950/70" : "bg-white/90")}>
            <CardHeader>
              <CardTitle>Graficas ejecutivas</CardTitle>
              <CardDescription>Analitica de progreso, productividad, calidad y distribucion del MVP.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <ChartCard title="Progreso por squad">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.squadProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#d4d4d8"} />
                    <XAxis dataKey="squad" stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <YAxis stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <Tooltip />
                    <Bar dataKey="progreso" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Commits por semana">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.commitsByWeek}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#d4d4d8"} />
                    <XAxis dataKey="week" stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <YAxis stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <Tooltip />
                    <Line dataKey="commits" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Tareas completadas">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.tasksDone}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#d4d4d8"} />
                    <XAxis dataKey="sprint" stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <YAxis stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <Tooltip />
                    <Area dataKey="completadas" stroke="#0ea5e9" fill="#0ea5e933" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Distribucion de modulos">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData.moduleDistribution} dataKey="value" innerRadius={35} outerRadius={58}>
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Avance MVP por frente">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.mvpAdvance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#d4d4d8"} />
                    <XAxis type="number" stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <YAxis type="category" dataKey="name" stroke={isDark ? "#a1a1aa" : "#52525b"} width={70} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Productividad semanal">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.productivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#d4d4d8"} />
                    <XAxis dataKey="day" stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <YAxis stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <Tooltip />
                    <Line dataKey="valor" stroke="#f59e0b" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Bugs por sprint">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.bugsBySprint}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#d4d4d8"} />
                    <XAxis dataKey="sprint" stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <YAxis stroke={isDark ? "#a1a1aa" : "#52525b"} />
                    <Tooltip />
                    <Bar dataKey="bugs" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Health score radar">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData.healthScore}>
                    <PolarGrid stroke={isDark ? "#3f3f46" : "#d4d4d8"} />
                    <PolarAngleAxis dataKey="name" tick={{ fill: isDark ? "#a1a1aa" : "#52525b", fontSize: 10 }} />
                    <Radar dataKey="score" stroke="#22c55e" fill="#22c55e" fillOpacity={0.35} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>
            </CardContent>
          </Card>
        </section>

        <footer
          className={cn(
            "rounded-2xl border px-4 py-4 text-xs",
            isDark ? "border-zinc-800 bg-zinc-950/70 text-zinc-400" : "border-zinc-200 bg-white/85 text-zinc-600"
          )}
        >
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            <p>Entorno: Production</p>
            <p>Supabase: {liveStats.hasLiveSource ? "Conectado" : "Sin conexion"}</p>
            <p>Vercel: Operativo</p>
            <p>Version sistema: v1.0.0-mvp1</p>
            <p>Ultima sincronizacion: {lastSyncLabel}</p>
            <p>Region cloud: us-central</p>
            <p>Uptime: 99.93%</p>
            <p className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" /> Estado: Estable
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-zinc-500">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Centro Ejecutivo de Avance · Plataforma universitaria lista para presentacion directiva.
          </div>
        </footer>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-700/20 p-3">
      <p className="mb-2 text-xs font-medium text-zinc-500">{title}</p>
      <div className="h-[180px]">{children}</div>
    </div>
  );
}
