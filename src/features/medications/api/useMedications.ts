import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Medication, DoseStatus } from "@/types";
import { MedicationFormValues } from "../schemas/medications.schema";
import { dashboardKeys } from "@/features/dashboard/api/useDashboardSummary";

export interface MedicationWithDoses extends Medication {
  doses: DoseStatus[];
}

export const medicationKeys = {
  all: ["medications"] as const,
  list: () => [...medicationKeys.all, "list"] as const,
};

export const useMedications = () => {
  return useQuery({
    queryKey: medicationKeys.list(),
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<MedicationWithDoses[]>>("/medications");
      return (res as unknown as ApiResponse<MedicationWithDoses[]>).data;
    },
  });
};

export const useAddMedication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MedicationFormValues) => apiClient.post("/medications", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};

export const useToggleDose = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ doseId, status }: { doseId: string; status: "TAKEN" | "SKIPPED" | "PENDING" }) =>
      apiClient.patch(`/medications/doses/${doseId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
