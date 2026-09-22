import React from "react";
import { useDashboardSummary } from "../api/useDashboardSummary";
import { HealthScoreCard } from "../components/HealthScoreCard";
import { VitalsOverviewWidget } from "../components/VitalsOverviewWidget";
import { NutritionRingWidget } from "../components/NutritionRingWidget";
import { UpcomingMedsWidget } from "../components/UpcomingMedsWidget";
import { HealthAlertsBanner } from "../components/HealthAlertsBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatDate } from "@/lib/utils";

export const DashboardPage: React.FC = () => {
  const { data: summary, isLoading, isError } = useDashboardSummary();
  const { user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-36 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="p-8 text-center rounded-2xl border border-border bg-card">
        <p className="text-sm text-destructive font-medium">
          Không thể tải dữ liệu bảng điều khiển sức khỏe. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Xin chào, {user?.fullName}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Báo cáo sức khỏe tổng hợp ngày {formatDate(new Date(), "EEEE, dd/MM/yyyy")}.
          </p>
        </div>
      </div>

      {/* Health Alerts */}
      <HealthAlertsBanner alerts={summary.healthAlerts} />

      {/* Health Score Gauge */}
      <HealthScoreCard score={summary.overallHealthScore} grade={summary.scoreGrade} />

      {/* Vitals Overview */}
      <VitalsOverviewWidget vitals={summary.latestVitals} />

      {/* Grid: Nutrition & Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionRingWidget nutrition={summary.todayNutrition} />
        <UpcomingMedsWidget medications={summary.todayMedications} />
      </div>
    </div>
  );
};
