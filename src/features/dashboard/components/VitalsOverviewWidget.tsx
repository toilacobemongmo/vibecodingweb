import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Activity,
  Scale,
  Droplet,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardSummary } from "@/types";
import {
  getBloodPressureClassification,
  getBmiClassification,
  formatDate,
} from "@/lib/utils";

interface Props {
  vitals: DashboardSummary["latestVitals"];
}

export const VitalsOverviewWidget: React.FC<Props> = ({ vitals }) => {
  const bp = vitals.bloodPressure;
  const hr = vitals.heartRate;
  const glu = vitals.bloodGlucose;
  const bmi = vitals.bmi;

  const bpStatus = bp ? getBloodPressureClassification(bp.systolic, bp.diastolic) : null;
  const bmiStatus = bmi ? getBmiClassification(bmi.bmi) : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-teal-500" />
          Chỉ Số Sinh Tồn Trọng Yếu
        </h3>
        <Link
          to="/vitals"
          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-0.5"
        >
          Xem chi tiết <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Blood Pressure */}
        <Card className="hover:border-teal-500/40 transition-colors">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-teal-500" />
              Huyết Áp
            </span>
            {bpStatus && <Badge variant={bpStatus.variant}>{bpStatus.badgeText}</Badge>}
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-foreground">
                {bp ? `${bp.systolic}/${bp.diastolic}` : "--/--"}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">mmHg</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {bp ? `Đo: ${formatDate(bp.measuredAt, "HH:mm, dd/MM")}` : "Chưa có dữ liệu"}
            </p>
          </CardContent>
        </Card>

        {/* 2. Heart Rate */}
        <Card className="hover:border-red-500/40 transition-colors">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-red-500" />
              Nhịp Tim
            </span>
            <Badge variant="optimal">Ổn định</Badge>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-foreground">
                {hr ? hr.bpm : "--"}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">bpm</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {hr ? `${hr.activityState === "RESTING" ? "Lúc nghỉ" : "Vận động"} • ${formatDate(hr.measuredAt, "HH:mm")}` : "Chưa đo hôm nay"}
            </p>
          </CardContent>
        </Card>

        {/* 3. Blood Glucose */}
        <Card className="hover:border-amber-500/40 transition-colors">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              <Droplet className="h-4 w-4 text-amber-500" />
              Đường Huyết
            </span>
            <Badge variant="optimal">Bình thường</Badge>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-foreground">
                {glu ? glu.value : "--"}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">mg/dL</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {glu ? `${glu.context === "FASTING" ? "Khi đói" : "Sau ăn"} • ${formatDate(glu.measuredAt, "HH:mm")}` : "Chưa ghi nhận"}
            </p>
          </CardContent>
        </Card>

        {/* 4. BMI & Weight */}
        <Card className="hover:border-sky-500/40 transition-colors">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-sky-500" />
              Thể Trạng (BMI)
            </span>
            {bmiStatus && <Badge variant={bmiStatus.color}>{bmiStatus.category.split(" ")[0]}</Badge>}
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-foreground">
                {bmi ? bmi.bmi : "--"}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                ({bmi?.weightKg} kg)
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Mục tiêu: 65 kg (Cao 175cm)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
