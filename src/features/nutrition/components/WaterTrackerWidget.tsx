import React from "react";
import { Droplets, Plus, Sparkles, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAddWater } from "../api/useNutrition";

interface Props {
  totalWaterMl: number;
  targetWaterMl: number;
}

export const WaterTrackerWidget: React.FC<Props> = ({ totalWaterMl, targetWaterMl }) => {
  const addWaterMutation = useAddWater();
  const percent = Math.min(100, Math.round((totalWaterMl / targetWaterMl) * 100));
  const isGoalReached = totalWaterMl >= targetWaterMl;

  // Calculate equivalent glasses (250ml per glass)
  const glasses = Math.floor(totalWaterMl / 250);
  const targetGlasses = Math.floor(targetWaterMl / 250);

  return (
    <Card className="border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-card">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Theo Dõi Lượng Nước Uống</CardTitle>
              <p className="text-xs text-muted-foreground">Mục tiêu 8-10 cốc nước mỗi ngày</p>
            </div>
          </div>
          {isGoalReached && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle className="h-3.5 w-3.5" />
              Đạt mục tiêu!
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4">
        {/* Progress Display */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-foreground">Đã uống: {totalWaterMl} ml</span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">{percent}% ({glasses}/{targetGlasses} cốc)</span>
          </div>
          <Progress value={percent} indicatorClassName="bg-gradient-to-r from-sky-400 to-teal-500" />
        </div>

        {/* Quick Increment Buttons */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {[250, 350, 500].map((amount) => (
            <Button
              key={amount}
              onClick={() => addWaterMutation.mutate(amount)}
              disabled={addWaterMutation.isPending}
              variant="outline"
              size="sm"
              className="rounded-xl border-sky-500/20 hover:bg-sky-500/15 hover:border-sky-500/50 text-xs font-bold gap-1 text-sky-600 dark:text-sky-400"
            >
              <Plus className="h-3 w-3" />
              {amount} ml
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
