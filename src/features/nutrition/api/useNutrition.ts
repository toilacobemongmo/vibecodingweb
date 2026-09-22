import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, DailyNutritionSummary } from "@/types";
import { MealFormValues } from "../schemas/nutrition.schema";
import { dashboardKeys } from "@/features/dashboard/api/useDashboardSummary";

export const nutritionKeys = {
  all: ["nutrition"] as const,
  today: () => [...nutritionKeys.all, "today"] as const,
};

export const useNutritionToday = () => {
  return useQuery({
    queryKey: nutritionKeys.today(),
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<DailyNutritionSummary>>("/nutrition/today");
      return (res as unknown as ApiResponse<DailyNutritionSummary>).data;
    },
  });
};

export const useAddMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MealFormValues) => apiClient.post("/nutrition/meals", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nutritionKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mealId: string) => apiClient.delete(`/nutrition/meals/${mealId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nutritionKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};

export const useAddWater = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amountMl: number) => apiClient.post("/nutrition/water", { amountMl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nutritionKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
