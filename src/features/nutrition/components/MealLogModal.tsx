import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UtensilsCrossed } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { mealSchema, MealFormValues } from "../schemas/nutrition.schema";
import { useAddMeal } from "../api/useNutrition";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MealLogModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addMealMutation = useAddMeal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      mealType: "BREAKFAST",
      calories: 450,
      proteinGrams: 25,
      carbsGrams: 50,
      fatGrams: 15,
    },
  });

  const onSubmit = (data: MealFormValues) => {
    addMealMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-amber-500" />
            Ghi Nhận Món Ăn Mới
          </DialogTitle>
          <DialogDescription>
            Nhập chi tiết khẩu phần ăn và các thành phần dinh dưỡng ước tính.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Tên món ăn / Thực đơn"
            placeholder="Ví dụ: Bún bò huế, Salad ức gà..."
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Bữa ăn"
              {...register("mealType")}
              options={[
                { label: "Bữa Sáng (Breakfast)", value: "BREAKFAST" },
                { label: "Bữa Trưa (Lunch)", value: "LUNCH" },
                { label: "Bữa Tối (Dinner)", value: "DINNER" },
                { label: "Bữa Phụ (Snack)", value: "SNACK" },
              ]}
            />
            <Input
              label="Lượng Calo (kcal)"
              type="number"
              error={errors.calories?.message}
              {...register("calories")}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Input
              label="Đạm Protein (g)"
              type="number"
              {...register("proteinGrams")}
            />
            <Input
              label="Carbs (g)"
              type="number"
              {...register("carbsGrams")}
            />
            <Input
              label="Chất béo (g)"
              type="number"
              {...register("fatGrams")}
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting || addMealMutation.isPending}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
          >
            Lưu Bữa Ăn
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
