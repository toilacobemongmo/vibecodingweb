import React, { useState } from "react";
import { UtensilsCrossed, Plus, Flame, Droplets } from "lucide-react";
import { useNutritionToday } from "../api/useNutrition";
import { CalorieMacroCard } from "../components/CalorieMacroCard";
import { WaterTrackerWidget } from "../components/WaterTrackerWidget";
import { MealHistoryList } from "../components/MealHistoryList";
import { MealLogModal } from "../components/MealLogModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const NutritionPage: React.FC = () => {
  const { data: nutrition, isLoading, isError } = useNutritionToday();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !nutrition) {
    return (
      <div className="p-8 text-center rounded-2xl border border-border bg-card">
        <p className="text-sm text-destructive font-medium">
          Không thể tải dữ liệu dinh dưỡng hôm nay. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-amber-500" />
            Quản Lý Dinh Dưỡng & Nước Uống
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Theo dõi năng lượng calo nạp vào, tỷ lệ đạm/carbs/chất béo và lượng nước hàng ngày.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Thêm Món Ăn Mới
        </Button>
      </div>

      {/* Calories & Macro Breakdown */}
      <CalorieMacroCard summary={nutrition} />

      {/* Water Tracker */}
      <WaterTrackerWidget
        totalWaterMl={nutrition.totalWaterMl}
        targetWaterMl={nutrition.targetWaterMl}
      />

      {/* Meals History */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Thực Đơn Đã Dùng Hôm Nay ({nutrition.meals.length} món)
        </h3>
        <MealHistoryList meals={nutrition.meals} />
      </div>

      {/* Meal Modal */}
      <MealLogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
