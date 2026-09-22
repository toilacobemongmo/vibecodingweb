import React from "react";
import { VitalRecord } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  getBloodPressureClassification,
  getBmiClassification,
} from "@/lib/utils";

interface Props {
  records: VitalRecord[];
}

export const VitalHistoryTable: React.FC<Props> = ({ records }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-border bg-muted/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="p-3.5 pl-5">Thời Gian Đo</th>
            <th className="p-3.5">Chỉ Số / Kết Quả</th>
            <th className="p-3.5">Đánh Giá Lâm Sàng</th>
            <th className="p-3.5 pr-5">Ghi Chú</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {records.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-8 text-center text-muted-foreground">
                Chưa có dữ liệu đo nào được ghi nhận.
              </td>
            </tr>
          ) : (
            records.map((r) => {
              let valueDisplay = "";
              let badge = <Badge variant="outline">Ghi nhận</Badge>;

              if (r.type === "BLOOD_PRESSURE") {
                valueDisplay = `${r.systolic}/${r.diastolic} mmHg (Mạch ${r.pulse || "--"} bpm)`;
                const status = getBloodPressureClassification(r.systolic, r.diastolic);
                badge = <Badge variant={status.variant}>{status.label}</Badge>;
              } else if (r.type === "HEART_RATE") {
                valueDisplay = `${r.bpm} bpm`;
                badge = <Badge variant="optimal">Nhịp tim đều</Badge>;
              } else if (r.type === "BLOOD_GLUCOSE") {
                valueDisplay = `${r.value} mg/dL (${r.context === "FASTING" ? "Khi đói" : "Sau ăn"})`;
                badge = <Badge variant={r.value > 140 ? "warning" : "optimal"}>{r.value > 140 ? "Đường huyết cao" : "Bình thường"}</Badge>;
              } else if (r.type === "WEIGHT_BMI") {
                valueDisplay = `${r.weightKg} kg (BMI: ${r.bmi})`;
                const bmiStatus = getBmiClassification(r.bmi);
                badge = <Badge variant={bmiStatus.color}>{bmiStatus.category.split(" ")[0]}</Badge>;
              } else if (r.type === "SPO2") {
                valueDisplay = `${r.percentage}%`;
                badge = <Badge variant={r.percentage >= 95 ? "optimal" : "critical"}>{r.percentage >= 95 ? "Tối ưu" : "Thiếu oxy"}</Badge>;
              }

              return (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 pl-5 font-semibold text-foreground whitespace-nowrap">
                    {formatDate(r.measuredAt, "dd/MM/yyyy HH:mm")}
                  </td>
                  <td className="p-3.5 font-bold text-foreground">{valueDisplay}</td>
                  <td className="p-3.5">{badge}</td>
                  <td className="p-3.5 pr-5 text-muted-foreground italic">
                    {r.notes || "—"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
