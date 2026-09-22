import { z } from "zod";

export const bloodPressureSchema = z.object({
  type: z.literal("BLOOD_PRESSURE"),
  systolic: z.coerce.number().min(50, "Huyết áp tâm thu tối thiểu 50 mmHg").max(250, "Tối đa 250 mmHg"),
  diastolic: z.coerce.number().min(30, "Huyết áp tâm trương tối thiểu 30 mmHg").max(160, "Tối đa 160 mmHg"),
  pulse: z.coerce.number().min(30).max(220).optional(),
  measuredAt: z.string().default(() => new Date().toISOString()),
  notes: z.string().max(200, "Ghi chú không quá 200 ký tự").optional(),
});

export const heartRateSchema = z.object({
  type: z.literal("HEART_RATE"),
  bpm: z.coerce.number().min(30, "Nhịp tim tối thiểu 30 bpm").max(240, "Tối đa 240 bpm"),
  activityState: z.enum(["RESTING", "ACTIVE", "POST_EXERCISE", "SLEEP"]),
  measuredAt: z.string().default(() => new Date().toISOString()),
  notes: z.string().max(200).optional(),
});

export const bloodGlucoseSchema = z.object({
  type: z.literal("BLOOD_GLUCOSE"),
  value: z.coerce.number().min(20, "Tối thiểu 20 mg/dL").max(600, "Tối đa 600 mg/dL"),
  context: z.enum(["FASTING", "BEFORE_MEAL", "AFTER_MEAL", "BEDTIME"]),
  measuredAt: z.string().default(() => new Date().toISOString()),
  notes: z.string().max(200).optional(),
});

export const spo2Schema = z.object({
  type: z.literal("SPO2"),
  percentage: z.coerce.number().min(50, "Tối thiểu 50%").max(100, "Tối đa 100%"),
  measuredAt: z.string().default(() => new Date().toISOString()),
  notes: z.string().max(200).optional(),
});

export const weightBmiSchema = z.object({
  type: z.literal("WEIGHT_BMI"),
  weightKg: z.coerce.number().min(20, "Cân nặng tối thiểu 20 kg").max(300, "Tối đa 300 kg"),
  heightCm: z.coerce.number().min(50, "Chiều cao tối thiểu 50 cm").max(250, "Tối đa 250 cm"),
  bodyFatPercentage: z.coerce.number().min(1).max(60).optional(),
  measuredAt: z.string().default(() => new Date().toISOString()),
  notes: z.string().max(200).optional(),
});

export type BloodPressureInput = z.infer<typeof bloodPressureSchema>;
export type HeartRateInput = z.infer<typeof heartRateSchema>;
export type BloodGlucoseInput = z.infer<typeof bloodGlucoseSchema>;
export type SpO2Input = z.infer<typeof spo2Schema>;
export type WeightBmiInput = z.infer<typeof weightBmiSchema>;
