export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// User & Profile Types
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  age: number;
  gender: "male" | "female" | "other";
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  targetDailyCalories: number;
  targetDailyWaterMl: number;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

// Vitals Types
export type VitalType =
  | "BLOOD_PRESSURE"
  | "HEART_RATE"
  | "BLOOD_GLUCOSE"
  | "SPO2"
  | "WEIGHT_BMI"
  | "BODY_TEMP";

export interface BloodPressureMetric {
  id: string;
  type: "BLOOD_PRESSURE";
  systolic: number; // mmHg
  diastolic: number; // mmHg
  pulse?: number; // bpm
  measuredAt: string;
  notes?: string;
}

export interface HeartRateMetric {
  id: string;
  type: "HEART_RATE";
  bpm: number;
  activityState: "RESTING" | "ACTIVE" | "POST_EXERCISE" | "SLEEP";
  measuredAt: string;
  notes?: string;
}

export interface BloodGlucoseMetric {
  id: string;
  type: "BLOOD_GLUCOSE";
  value: number; // mg/dL
  context: "FASTING" | "BEFORE_MEAL" | "AFTER_MEAL" | "BEDTIME";
  measuredAt: string;
  notes?: string;
}

export interface SpO2Metric {
  id: string;
  type: "SPO2";
  percentage: number; // %
  measuredAt: string;
  notes?: string;
}

export interface BodyMetric {
  id: string;
  type: "WEIGHT_BMI";
  weightKg: number;
  heightCm: number;
  bmi: number;
  bodyFatPercentage?: number;
  measuredAt: string;
  notes?: string;
}

export interface BodyTempMetric {
  id: string;
  type: "BODY_TEMP";
  celsius: number;
  measuredAt: string;
  notes?: string;
}

export type VitalRecord =
  | BloodPressureMetric
  | HeartRateMetric
  | BloodGlucoseMetric
  | SpO2Metric
  | BodyMetric
  | BodyTempMetric;

// Nutrition Types
export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

export interface MealItem {
  id: string;
  mealType: MealType;
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  loggedAt: string;
  imageUrl?: string;
}

export interface WaterLog {
  id: string;
  amountMl: number;
  loggedAt: string;
}

export interface DailyNutritionSummary {
  date: string;
  totalCalories: number;
  targetCalories: number;
  totalProteinGrams: number;
  totalCarbsGrams: number;
  totalFatGrams: number;
  totalWaterMl: number;
  targetWaterMl: number;
  meals: MealItem[];
  waterLogs: WaterLog[];
}

// Medication Types
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  unit: "viên" | "ml" | "gói" | "giọt" | "lần xịt";
  frequencyPerDay: number;
  scheduledTimes: string[]; // e.g. ["08:00", "20:00"]
  instructions: "BEFORE_MEAL" | "AFTER_MEAL" | "WITH_MEAL" | "ANYTIME";
  startDate: string;
  endDate?: string;
  prescribedBy?: string;
  currentInventory?: number;
  colorTag?: string;
}

export interface DoseStatus {
  id: string;
  medicationId: string;
  scheduledTime: string; // HH:mm
  date: string; // YYYY-MM-DD
  status: "TAKEN" | "SKIPPED" | "PENDING";
  takenAt?: string;
}

// Medical Records Types
export interface MedicalRecord {
  id: string;
  title: string;
  category: "LAB_TEST" | "PRESCRIPTION" | "VACCINATION" | "DISCHARGE_SUMMARY" | "IMAGING";
  facilityName: string;
  doctorName?: string;
  recordDate: string;
  summary: string;
  fileUrl?: string;
  fileName?: string;
  keyFindings?: string[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  facilityName: string;
  scheduledAt: string;
  location: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  reason: string;
  instructions?: string;
}

// Dashboard Summary Type
export interface DashboardSummary {
  overallHealthScore: number; // 0 - 100
  scoreGrade: "EXCELLENT" | "GOOD" | "ATTENTION" | "CRITICAL";
  latestVitals: {
    bloodPressure?: BloodPressureMetric;
    heartRate?: HeartRateMetric;
    bloodGlucose?: BloodGlucoseMetric;
    bmi?: BodyMetric;
    spo2?: SpO2Metric;
  };
  todayNutrition: {
    consumedCalories: number;
    targetCalories: number;
    consumedWaterMl: number;
    targetWaterMl: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
  todayMedications: Array<{
    medication: Medication;
    doses: DoseStatus[];
  }>;
  upcomingAppointments: Appointment[];
  healthAlerts: Array<{
    id: string;
    level: "info" | "warning" | "critical";
    title: string;
    message: string;
    actionLink?: string;
  }>;
}
