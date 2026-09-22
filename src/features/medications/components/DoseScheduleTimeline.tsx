import React from "react";
import { Check, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicationWithDoses, useToggleDose } from "../api/useMedications";

interface Props {
  medications: MedicationWithDoses[];
}

export const DoseScheduleTimeline: React.FC<Props> = ({ medications }) => {
  const toggleDoseMutation = useToggleDose();

  // Flatten all doses for today
  const allDoses = medications.flatMap((med) =>
    med.doses.map((dose) => ({
      ...dose,
      medication: med,
    }))
  );

  // Sort by scheduled time
  allDoses.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  const totalDoses = allDoses.length;
  const takenDoses = allDoses.filter((d) => d.status === "TAKEN").length;
  const adherencePercent = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  return (
    <Card className="border-teal-500/30">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold">Lịch Uống Thuốc Hôm Nay</CardTitle>
          <p className="text-xs text-muted-foreground">Theo dõi và đánh dấu liều đã uống đúng giờ</p>
        </div>
        <Badge variant={adherencePercent >= 80 ? "optimal" : "warning"}>
          Tuân thủ: {takenDoses}/{totalDoses} liều ({adherencePercent}%)
        </Badge>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3">
        {allDoses.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground">
            Không có lịch uống thuốc nào hôm nay.
          </div>
        ) : (
          <div className="space-y-2.5">
            {allDoses.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-border/80 bg-card hover:border-teal-500/40 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs"
                    style={{
                      backgroundColor: `${item.medication.colorTag}15`,
                      color: item.medication.colorTag || "#0d9488",
                      border: `1px solid ${item.medication.colorTag}30`,
                    }}
                  >
                    {item.scheduledTime}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {item.medication.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Liều: <strong className="text-foreground">{item.medication.dosage}</strong> •{" "}
                      {item.medication.instructions === "AFTER_MEAL" ? "Sau bữa ăn" : "Trước bữa ăn"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === "TAKEN" ? (
                    <button
                      onClick={() =>
                        toggleDoseMutation.mutate({
                          doseId: item.id,
                          status: "PENDING",
                        })
                      }
                      disabled={toggleDoseMutation.isPending}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-xs hover:bg-emerald-600 transition-colors"
                      title="Bấm để hủy đánh dấu"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Đã uống</span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        toggleDoseMutation.mutate({
                          doseId: item.id,
                          status: "TAKEN",
                        })
                      }
                      disabled={toggleDoseMutation.isPending}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-teal-500/40 bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white text-xs font-bold transition-all"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>Uống thuốc</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
