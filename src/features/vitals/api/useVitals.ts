import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, VitalRecord, VitalType } from "@/types";

export const vitalsKeys = {
  all: ["vitals"] as const,
  byType: (type?: VitalType) => [...vitalsKeys.all, { type }] as const,
};

export const useVitals = (type?: VitalType) => {
  return useQuery({
    queryKey: vitalsKeys.byType(type),
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<VitalRecord[]>>("/vitals", {
        params: type ? { type } : undefined,
      });
      return (res as unknown as ApiResponse<VitalRecord[]>).data;
    },
  });
};
