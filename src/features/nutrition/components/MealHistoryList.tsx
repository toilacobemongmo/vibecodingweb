import React from "react";
import { Trash2 } from "lucide-react";
import { MealItem, MealType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useDeleteMeal } from "../api/useNutrition";

interface Props {
  meals: MealItem[];
}

export const MealHistoryList: React.FC<Props> = ({ meals }) => {
  const deleteMealMutation = useDeleteMeal();

  const getMealTypeBadge = (type: MealType) => {
    switch (type) {
      case "BREAKFAST":
        return <Badge variant="optimal">Bữa Sáng</Badge>;
      case "LUNCH":
        return <Badge variant="warning">Bữa Trưa</Badge>;
      case "DINNER":
        return <Badge variant="pulse">Bữa Tối</Badge>;
      case "SNACK":
        return <Badge variant="outline">Bữa Phụ</Badge>;
    }
  };

  return (
    <div className="space-y-3">
      {meals.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-border bg-card/40 text-muted-foreground text-xs">
          Chưa có món ăn nào được ghi nhận hôm nay.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="p-4 rounded-2xl border border-border/80 bg-card hover:border-teal-500/30 transition-all flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {getMealTypeBadge(meal.mealType)}
                  <span className="text-[11px] text-muted-foreground">
                    {formatDate(meal.loggedAt, "HH:mm")}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground truncate">
                  {meal.name}
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                  <span className="font-bold text-amber-500">{meal.calories} kcal</span>
                  <span>• P: {meal.proteinGrams}g</span>
                  <span>• C: {meal.carbsGrams}g</span>
                  <span>• F: {meal.fatGrams}g</span>
                </div>
              </div>

              <button
                onClick={() => deleteMealMutation.mutate(meal.id)}
                disabled={deleteMealMutation.isPending}
                className="p-2 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Xóa món ăn"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
