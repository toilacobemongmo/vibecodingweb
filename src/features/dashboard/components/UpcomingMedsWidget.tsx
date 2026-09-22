import React from "react";
import { Link } from "react-router-dom";
import { Pill, Check, Clock, ArrowUpRight } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DashboardSummary } from "@/types";
import { apiClient } from "@/lib/api-client";

interface Props {
  medications: DashboardSummary["todayMedications"];
}

export const UpcomingMedsWidget: React.FC<Props> = ({ medications }) => {
  const queryClient = useQueryClient();

  const toggleDoseMutation = useMutation({
    mutationFn: ({ doseId, status }: { doseId: string; status: "TAKEN" | "PENDING" }) =>
      apiClient.patch(`/medications/doses/${doseId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Pill className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Lịch Uống Thuốc Hôm Nay</CardTitle>
            <p className="text-xs text-muted-foreground">Tuân thủ điều trị định kỳ</p>
          </div>
        </div>
        <Link
          to="/medications"
          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-0.5"
        >
          Đơn thuốc <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-2.5">
        {medications.length === 0 ? (
          <p className="text-xs text-muted-foreground py-6 text-center">
            Hôm nay bạn không có lịch uống thuốc nào.
          </p>
        ) : (
          medications.map(({ medication, doses }) => (
            <div
              key={medication.id}
              className="p-3 rounded-xl border border-border/80 bg-muted/30 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: medication.colorTag || "#0d9488" }}
                  />
                  <h4 className="text-xs font-bold text-foreground truncate">
                    {medication.name}
                  </h4>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {medication.dosage} • {medication.instructions === "AFTER_MEAL" ? "Sau ăn" : "Trước ăn"}
                </p>
              </div>

              {/* Doses Check-in Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                {doses.map((dose) => (
                  <button
                    key={dose.id}
                    onClick={() =>
                      toggleDoseMutation.mutate({
                        doseId: dose.id,
                        status: dose.status === "TAKEN" ? "PENDING" : "TAKEN",
                      })
                    }
                    disabled={toggleDoseMutation.isPending}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      dose.status === "TAKEN"
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-teal-500"
                    }`}
                    title={dose.status === "TAKEN" ? "Đã uống lúc " + dose.takenAt : "Bấm để đánh dấu đã uống"}
                  >
                    {dose.status === "TAKEN" ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>{dose.scheduledTime}</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{dose.scheduledTime}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
