import { motion } from "framer-motion";
import { ChevronRight, Download, Moon, Sun, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExecutiveHeaderProps {
  isDark: boolean;
  setIsDark: (next: boolean) => void;
  onExport: () => void;
  hasLiveSource: boolean;
  syncLabel: string;
  header: {
    projectName: string;
    status: string;
    version: string;
    updatedAt: string;
    environment: string;
    leader: string;
    leaderRole: string;
    online: boolean;
  };
}

export function ExecutiveHeader({
  isDark,
  setIsDark,
  onExport,
  hasLiveSource,
  syncLabel,
  header,
}: ExecutiveHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border px-4 py-4 md:px-6 md:py-5",
        isDark ? "border-zinc-800 bg-zinc-950/70" : "border-zinc-200 bg-white/85"
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className={cn("flex items-center gap-2", isDark ? "text-zinc-400" : "text-zinc-600")}>
          <span>Inicio</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Centro Ejecutivo</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={cn(isDark ? "text-zinc-200" : "text-zinc-900")}>Avance Proyecto</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">{header.environment}</Badge>
          <Badge variant={header.online ? "success" : "danger"}>
            {header.online ? "Sistema online" : "Sistema degradado"}
          </Badge>
          <Badge variant={hasLiveSource ? "success" : "warning"}>
            {hasLiveSource ? `Sync Supabase ${syncLabel}` : "Mock fallback"}
          </Badge>
          <Button variant="outline" size="icon" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{header.projectName}</h1>
          <p className={cn("mt-1 text-sm", isDark ? "text-zinc-400" : "text-zinc-600")}>
            Estado global {header.status} · Version {header.version} · Actualizacion {header.updatedAt}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4" /> Exportar reporte
          </Button>
          <Button variant="secondary">
            <Target className="h-4 w-4" /> Ver roadmap
          </Button>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2",
              isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              DO
            </div>
            <div className="text-xs leading-tight">
              <p className="font-medium">{header.leader}</p>
              <p className={cn(isDark ? "text-zinc-400" : "text-zinc-600")}>{header.leaderRole}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
