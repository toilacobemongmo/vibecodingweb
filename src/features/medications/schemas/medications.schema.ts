import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(2, "Tên thuốc tối thiểu 2 ký tự").max(100),
  dosage: z.string().min(1, "Vui lòng nhập liều lượng (Ví dụ: 1 viên 500mg)"),
  unit: z.enum(["viên", "ml", "gói", "giọt", "lần xịt"]),
  frequencyPerDay: z.coerce.number().min(1, "Ít nhất 1 lần/ngày").max(6, "Tối đa 6 lần/ngày"),
  scheduledTimes: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 khung giờ uống thuốc"),
  instructions: z.enum(["BEFORE_MEAL", "AFTER_MEAL", "WITH_MEAL", "ANYTIME"]),
  startDate: z.string().default(() => new Date().toISOString().split("T")[0]),
  prescribedBy: z.string().max(100).optional(),
  currentInventory: z.coerce.number().min(0).default(30),
  colorTag: z.string().default("#0d9488"),
});

export type MedicationFormValues = z.infer<typeof medicationSchema>;
