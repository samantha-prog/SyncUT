export type StatusTone = "completed" | "in-progress" | "blocked" | "delayed";

export interface KpiItem {
  label: string;
  value: string;
  trend: string;
  tone: "success" | "warning" | "info";
  icon: string;
  micro: string;
}

export interface ActivityItem {
  user: string;
  action: string;
  description: string;
  module: string;
  squad: string;
  sprint: string;
  date: string;
  time: string;
  status: string;
  impact: string;
}

export interface LiveExecutiveData {
  activity: ActivityItem[];
  profileCount: number;
  auditCount: number;
  hasLiveSource: boolean;
}
