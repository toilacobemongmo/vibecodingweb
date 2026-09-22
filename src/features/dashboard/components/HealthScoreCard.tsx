import React from "react";
import { Sparkles, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthScoreCardProps {
  score: number;
  grade: "EXCELLENT" | "GOOD" | "ATTENTION" | "CRITICAL";
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, grade }) => {
  const getGradeInfo = () => {
    switch (grade) {
      case "EXCELLENT":
        return {
          title: "Tình trạng Thể chất Xuất Sắc",
          desc: "Tất cả các chỉ số sinh tồn và mức độ vận động của bạn đang ở ngưỡng lý tưởng.",
          badgeVariant: "optimal" as const,
          badgeText: "Tối ưu",
          strokeColor: "#10b981",
        };
      case "GOOD":
        return {
          title: "Sức Khỏe Đang Ổn Định",
          desc: "Chỉ số huyết áp và dinh dưỡng đều đặn. Hãy duy trì uống đủ nước và ngủ đủ giấc.",
          badgeVariant: "optimal" as const,
          badgeText: "Tốt",
          strokeColor: "#0d9488",
        };
      case "ATTENTION":
        return {
          title: "Cần Chú Ý Một Số Chỉ Số",
          desc: "Có dấu hiệu tăng nhẹ ở huyết áp hoặc lượng calo nạp vào vượt mức mục tiêu.",
          badgeVariant: "warning" as const,
          badgeText: "Cần lưu ý",
          strokeColor: "#f59e0b",
        };
      default:
        return {
          title: "Cần Can Thiệp Y Tế",
          desc: "Một số chỉ số vượt ngưỡng cảnh báo an toàn. Khuyến nghị kiểm tra với bác sĩ.",
          badgeVariant: "critical" as const,
          badgeText: "Cảnh báo",
          strokeColor: "#ef4444",
        };
    }
  };

  const info = getGradeInfo();
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="relative overflow-hidden border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-card to-card">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circular SVG Gauge */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="h-28 w-28 -rotate-90 transform">
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="text-muted/40 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke={info.strokeColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-foreground tracking-tight">
                {score}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                / 100 Điểm
              </span>
            </div>
          </div>

          {/* Details & Recommendation */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Chỉ Số Sức Khỏe Tổng Hợp
              </span>
              <Badge variant={info.badgeVariant}>{info.badgeText}</Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground">{info.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              {info.desc}
            </p>

            <div className="pt-1 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground justify-center sm:justify-start">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                Huyết áp ổn định
              </span>
              <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                <TrendingUp className="h-4 w-4" />
                Dinh dưỡng: 60%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
