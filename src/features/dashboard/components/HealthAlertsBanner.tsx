import React from "react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { DashboardSummary } from "@/types";

interface Props {
  alerts: DashboardSummary["healthAlerts"];
}

export const HealthAlertsBanner: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {alerts.map((alert) => {
        const isWarning = alert.level === "warning";
        const isCritical = alert.level === "critical";

        return (
          <div
            key={alert.id}
            className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-colors ${
              isCritical
                ? "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
                : isWarning
                ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                : "bg-teal-500/10 border-teal-500/30 text-teal-700 dark:text-teal-400"
            }`}
          >
            <div className="p-1 rounded-lg shrink-0 mt-0.5">
              {isCritical ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : isWarning ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <Info className="h-5 w-5 text-teal-500" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground">{alert.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {alert.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
