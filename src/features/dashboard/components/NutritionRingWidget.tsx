import React from "react";
import { Link } from "react-router-dom";
import { Droplets, Flame, ArrowUpRight, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DashboardSummary } from "@/types";
import { useUIStore } from "@/stores/useUIStore";

interface Props {
  nutrition: DashboardSummary["todayNutrition"];
}

export const NutritionRingWidget: React.FC<Props> = ({ nutrition }) => {
  const { openQuickAction } = useUIStore();
  const calPercent = Math.min(100, Math.round((nutrition.consumedCalories / nutrition.targetCalories) * 100));
  const waterPercent = Math.min(100, Math.round((nutrition.consumedWaterMl / nutrition.targetWaterMl) * 100));

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Dinh Dưỡng Hôm Nay</CardTitle>
            <p className="text-xs text-muted-foreground">Calo nạp vào & nước uống</p>
          </div>
        </div>
        <Link
          to="/nutrition"
          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-0.5"
        >
          Chi tiết <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4">
        {/* Calories Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-foreground flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              Năng lượng nạp vào
            </span>
            <span className="font-bold text-foreground">
              {nutrition.consumedCalories} / {nutrition.targetCalories} kcal ({calPercent}%)
            </span>
          </div>
          <Progress
            value={calPercent}
            indicatorClassName={calPercent > 100 ? "bg-amber-500" : "bg-gradient-to-r from-teal-500 to-emerald-500"}
          />
        </div>

        {/* Macros Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-xl bg-muted/60">
            <span className="block text-[10px] uppercase font-bold text-muted-foreground">Đạm (Protein)</span>
            <span className="text-sm font-extrabold text-foreground">{nutrition.proteinGrams}g</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/60">
            <span className="block text-[10px] uppercase font-bold text-muted-foreground">Carbs (Tinh bột)</span>
            <span className="text-sm font-extrabold text-foreground">{nutrition.carbsGrams}g</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/60">
            <span className="block text-[10px] uppercase font-bold text-muted-foreground">Chất béo (Fat)</span>
            <span className="text-sm font-extrabold text-foreground">{nutrition.fatGrams}g</span>
          </div>
        </div>

        {/* Water Intake */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-foreground flex items-center gap-1">
              <Droplets className="h-3.5 w-3.5 text-sky-500" />
              Nước uống
            </span>
            <span className="font-bold text-foreground">
              {nutrition.consumedWaterMl} / {nutrition.targetWaterMl} ml ({waterPercent}%)
            </span>
          </div>
          <Progress value={waterPercent} indicatorClassName="bg-sky-500" />
        </div>

        <Button
          onClick={() => openQuickAction("meal")}
          variant="outline"
          size="sm"
          className="w-full gap-1.5 text-xs font-bold rounded-xl"
        >
          <Plus className="h-3.5 w-3.5" />
          Ghi nhận món ăn / Uống nước
        </Button>
      </CardContent>
    </Card>
  );
};
