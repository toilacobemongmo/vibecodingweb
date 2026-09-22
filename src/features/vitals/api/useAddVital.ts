import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { vitalsKeys } from "./useVitals";
import { dashboardKeys } from "@/features/dashboard/api/useDashboardSummary";

export const useAddVital = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post("/vitals", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vitalsKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
