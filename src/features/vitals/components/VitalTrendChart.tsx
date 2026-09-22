import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VitalRecord, VitalType } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  type: VitalType;
  records: VitalRecord[];
}

export const VitalTrendChart: React.FC<Props> = ({ type, records }) => {
  // Sort records chronologically ascending for chart
  const sortedRecords = [...records].reverse();

  const chartData = sortedRecords.map((r) => {
    const timeLabel = formatDate(r.measuredAt, "dd/MM HH:mm");
    if (r.type === "BLOOD_PRESSURE") {
      return {
        time: timeLabel,
        "Tâm thu (Systolic)": r.systolic,
        "Tâm trương (Diastolic)": r.diastolic,
        "Nhịp tim": r.pulse,
      };
    }
    if (r.type === "HEART_RATE") {
      return {
        time: timeLabel,
        "Nhịp tim (bpm)": r.bpm,
      };
    }
    if (r.type === "BLOOD_GLUCOSE") {
      return {
        time: timeLabel,
        "Đường huyết (mg/dL)": r.value,
      };
    }
    if (r.type === "WEIGHT_BMI") {
      return {
        time: timeLabel,
        "Cân nặng (kg)": r.weightKg,
        BMI: r.bmi,
      };
    }
    return { time: timeLabel };
  });

  return (
    <Card>
      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-base font-bold">Biểu Đồ Xu Hướng Lâm Sàng</CardTitle>
        <p className="text-xs text-muted-foreground">
          Theo dõi diễn biến chỉ số theo thời gian để phát hiện sớm các bất thường
        </p>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="h-[280px] w-full">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
              Chưa có đủ dữ liệu để vẽ biểu đồ.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {type === "BLOOD_PRESSURE" ? (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis domain={[50, 160]} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <ReferenceLine y={120} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Ngưỡng 120", fontSize: 10, fill: "#f59e0b" }} />
                  <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" label={{ value: "Ngưỡng 80", fontSize: 10, fill: "#10b981" }} />
                  <Area type="monotone" dataKey="Tâm thu (Systolic)" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorSys)" />
                  <Area type="monotone" dataKey="Tâm trương (Diastolic)" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorDia)" />
                </AreaChart>
              ) : type === "HEART_RATE" ? (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis domain={[40, 160]} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" />
                  <ReferenceLine y={60} stroke="#10b981" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="Nhịp tim (bpm)" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorHr)" />
                </AreaChart>
              ) : type === "BLOOD_GLUCOSE" ? (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGlu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis domain={[60, 180]} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: "Đói chuẩn", fontSize: 10, fill: "#10b981" }} />
                  <ReferenceLine y={140} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Sau ăn", fontSize: 10, fill: "#f59e0b" }} />
                  <Area type="monotone" dataKey="Đường huyết (mg/dL)" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorGlu)" />
                </AreaChart>
              ) : (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis domain={[50, 90]} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="Cân nặng (kg)" stroke="#0284c7" strokeWidth={2} fill="#0284c7" fillOpacity={0.2} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
