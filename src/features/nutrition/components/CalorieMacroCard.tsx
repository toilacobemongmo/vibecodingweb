import React from "react";
import { Flame } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DailyNutritionSummary } from "@/types";

interface Props {
  summary: DailyNutritionSummary;
}

export const CalorieMacroCard: React.FC<Props> = ({ summary }) => {
  const calPercent = Math.min(100, Math.round((summary.totalCalories / summary.targetCalories) * 100));
  const remainingCal = Math.max(0, summary.targetCalories - summary.totalCalories);

  // Suggested macro targets based on 2100 kcal diet (e.g. 130g Protein, 250g Carbs, 65g Fat)
  const targetProtein = 130;
  const targetCarbs = 250;
  const targetFat = 65;

  const pPercent = Math.min(100, Math.round((summary.totalProteinGrams / targetProtein) * 100));
  const cPercent = Math.min(100, Math.round((summary.totalCarbsGrams / targetCarbs) * 100));
  const fPercent = Math.min(100, Math.round((summary.totalFatGrams / targetFat) * 100));

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-card to-card">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Năng Lượng & Dinh Dưỡng Đa Lượng</CardTitle>
              <p className="text-xs text-muted-foreground">Mục tiêu khẩu phần hàng ngày</p>
            </div>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            Còn lại: <strong className="text-amber-500">{remainingCal} kcal</strong>
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-5">
        {/* Main Calorie Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-foreground">Tổng calo tiêu thụ</span>
            <span className="font-bold text-foreground">
              {summary.totalCalories} / {summary.targetCalories} kcal ({calPercent}%)
            </span>
          </div>
          <Progress
            value={calPercent}
            className="h-3"
            indicatorClassName={calPercent > 100 ? "bg-red-500" : "bg-gradient-to-r from-amber-500 to-teal-500"}
          />
        </div>

        {/* 3 Macro Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Protein */}
          <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Đạm (Protein)</span>
              <span className="font-bold text-foreground">{summary.totalProteinGrams} / {targetProtein}g</span>
            </div>
            <Progress value={pPercent} indicatorClassName="bg-emerald-500" />
            <p className="text-[10px] text-muted-foreground">Xây dựng cơ bắp & phục hồi mô</p>
          </div>

          {/* Carbs */}
          <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-sky-600 dark:text-sky-400">Carbs (Tinh bột)</span>
              <span className="font-bold text-foreground">{summary.totalCarbsGrams} / {targetCarbs}g</span>
            </div>
            <Progress value={cPercent} indicatorClassName="bg-sky-500" />
            <p className="text-[10px] text-muted-foreground">Nguồn cung cấp năng lượng chính</p>
          </div>

          {/* Fat */}
          <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400">Chất béo (Fat)</span>
              <span className="font-bold text-foreground">{summary.totalFatGrams} / {targetFat}g</span>
            </div>
            <Progress value={fPercent} indicatorClassName="bg-amber-500" />
            <p className="text-[10px] text-muted-foreground">Hấp thu vitamin & hormone</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
