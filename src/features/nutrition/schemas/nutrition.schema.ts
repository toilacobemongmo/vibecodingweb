import { z } from "zod";

export const mealSchema = z.object({
  mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  name: z.string().min(2, "Tên món ăn ít nhất 2 ký tự").max(100),
  calories: z.coerce.number().min(1, "Calo phải lớn hơn 0").max(5000),
  proteinGrams: z.coerce.number().min(0).max(500).default(0),
  carbsGrams: z.coerce.number().min(0).max(1000).default(0),
  fatGrams: z.coerce.number().min(0).max(500).default(0),
  loggedAt: z.string().default(() => new Date().toISOString()),
});

export const waterSchema = z.object({
  amountMl: z.coerce.number().min(50, "Tối thiểu 50ml").max(3000),
  loggedAt: z.string().default(() => new Date().toISOString()),
});

export type MealFormValues = z.infer<typeof mealSchema>;
export type WaterFormValues = z.infer<typeof waterSchema>;
