import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, MedicalRecord, Appointment } from "@/types";
import { RecordFormValues, AppointmentFormValues } from "../schemas/records.schema";
import { dashboardKeys } from "@/features/dashboard/api/useDashboardSummary";

export const recordKeys = {
  all: ["records"] as const,
  appointments: ["appointments"] as const,
};

export const useRecords = () => {
  return useQuery({
    queryKey: recordKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<MedicalRecord[]>>("/records");
      return (res as unknown as ApiResponse<MedicalRecord[]>).data;
    },
  });
};

export const useAddRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RecordFormValues) => apiClient.post("/records", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recordKeys.all });
    },
  });
};

export const useAppointments = () => {
  return useQuery({
    queryKey: recordKeys.appointments,
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Appointment[]>>("/appointments");
      return (res as unknown as ApiResponse<Appointment[]>).data;
    },
  });
};

export const useAddAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppointmentFormValues) => apiClient.post("/appointments", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recordKeys.appointments });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
};
