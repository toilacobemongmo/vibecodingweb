import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, DashboardSummary } from "@/types";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
};

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<DashboardSummary>>("/dashboard/summary");
      return (res as unknown as ApiResponse<DashboardSummary>).data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
