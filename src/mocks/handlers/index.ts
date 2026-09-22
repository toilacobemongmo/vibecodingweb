import { http, HttpResponse, delay } from "msw";
import {
  initialBloodPressureData,
  initialHeartRateData,
  initialGlucoseData,
  initialSpO2Data,
  initialBodyMetricData,
  initialTempData,
  initialMealsData,
  initialWaterLogs,
  initialMedications,
  initialDoseStatuses,
  initialMedicalRecords,
  initialAppointments,
  getMockDashboardSummary,
} from "../mock-data/health-data";
import {
  BloodPressureMetric,
  HeartRateMetric,
  BloodGlucoseMetric,
  SpO2Metric,
  BodyMetric,
  MealItem,
  WaterLog,
  Medication,
  DoseStatus,
  MedicalRecord,
  Appointment,
} from "@/types";

// In-memory mutable collections with LocalStorage sync
const STORAGE_PREFIX = "vitalpulse_mock_";

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

let bloodPressureList = getStored<BloodPressureMetric[]>("bp", initialBloodPressureData);
let heartRateList = getStored<HeartRateMetric[]>("hr", initialHeartRateData);
let glucoseList = getStored<BloodGlucoseMetric[]>("glu", initialGlucoseData);
let spo2List = getStored<SpO2Metric[]>("spo2", initialSpO2Data);
let bodyMetricList = getStored<BodyMetric[]>("body", initialBodyMetricData);
let mealsList = getStored<MealItem[]>("meals", initialMealsData);
let waterLogsList = getStored<WaterLog[]>("water", initialWaterLogs);
let medicationsList = getStored<Medication[]>("meds", initialMedications);
let dosesList = getStored<DoseStatus[]>("doses", initialDoseStatuses);
let recordsList = getStored<MedicalRecord[]>("records", initialMedicalRecords);
let appointmentsList = getStored<Appointment[]>("appointments", initialAppointments);

export const handlers = [
  // 1. Dashboard Summary
  http.get("/api/dashboard/summary", async () => {
    await delay(250);
    const summary = getMockDashboardSummary();
    if (bloodPressureList.length > 0) summary.latestVitals.bloodPressure = bloodPressureList[0];
    if (heartRateList.length > 0) summary.latestVitals.heartRate = heartRateList[0];
    if (glucoseList.length > 0) summary.latestVitals.bloodGlucose = glucoseList[0];
    if (bodyMetricList.length > 0) summary.latestVitals.bmi = bodyMetricList[0];

    const todayMealsCal = mealsList.reduce((acc, m) => acc + m.calories, 0);
    const todayWater = waterLogsList.reduce((acc, w) => acc + w.amountMl, 0);
    summary.todayNutrition.consumedCalories = todayMealsCal;
    summary.todayNutrition.consumedWaterMl = todayWater;
    summary.todayNutrition.proteinGrams = mealsList.reduce((acc, m) => acc + m.proteinGrams, 0);
    summary.todayNutrition.carbsGrams = mealsList.reduce((acc, m) => acc + m.carbsGrams, 0);
    summary.todayNutrition.fatGrams = mealsList.reduce((acc, m) => acc + m.fatGrams, 0);

    summary.todayMedications = medicationsList.map((med) => ({
      medication: med,
      doses: dosesList.filter((d) => d.medicationId === med.id),
    }));
    summary.upcomingAppointments = appointmentsList.filter((a) => a.status === "UPCOMING");

    return HttpResponse.json({ success: true, data: summary, timestamp: new Date().toISOString() });
  }),

  // 2. Vitals Handlers
  http.get("/api/vitals", async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const type = url.searchParams.get("type");

    let data: unknown[] = [];
    switch (type) {
      case "BLOOD_PRESSURE":
        data = bloodPressureList;
        break;
      case "HEART_RATE":
        data = heartRateList;
        break;
      case "BLOOD_GLUCOSE":
        data = glucoseList;
        break;
      case "SPO2":
        data = spo2List;
        break;
      case "WEIGHT_BMI":
        data = bodyMetricList;
        break;
      case "BODY_TEMP":
        data = initialTempData;
        break;
      default:
        data = [
          ...bloodPressureList,
          ...heartRateList,
          ...glucoseList,
          ...spo2List,
          ...bodyMetricList,
        ];
    }
    return HttpResponse.json({ success: true, data, timestamp: new Date().toISOString() });
  }),

  http.post("/api/vitals", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Record<string, unknown>;
    const id = `vital-${Date.now()}`;
    const newRecord = { ...body, id, measuredAt: body.measuredAt || new Date().toISOString() };

    if (body.type === "BLOOD_PRESSURE") {
      bloodPressureList = [newRecord as unknown as BloodPressureMetric, ...bloodPressureList];
      setStored("bp", bloodPressureList);
    } else if (body.type === "HEART_RATE") {
      heartRateList = [newRecord as unknown as HeartRateMetric, ...heartRateList];
      setStored("hr", heartRateList);
    } else if (body.type === "BLOOD_GLUCOSE") {
      glucoseList = [newRecord as unknown as BloodGlucoseMetric, ...glucoseList];
      setStored("glu", glucoseList);
    } else if (body.type === "SPO2") {
      spo2List = [newRecord as unknown as SpO2Metric, ...spo2List];
      setStored("spo2", spo2List);
    } else if (body.type === "WEIGHT_BMI") {
      const weight = Number(body.weightKg);
      const height = Number(body.heightCm) || 175;
      const heightM = height / 100;
      const bmi = Number((weight / (heightM * heightM)).toFixed(2));
      const record = { ...newRecord, bmi, heightCm: height, weightKg: weight };
      bodyMetricList = [record as unknown as BodyMetric, ...bodyMetricList];
      setStored("body", bodyMetricList);
    }

    return HttpResponse.json({
      success: true,
      data: newRecord,
      message: "Đã ghi nhận chỉ số sức khỏe thành công!",
      timestamp: new Date().toISOString(),
    });
  }),

  // 3. Nutrition Handlers
  http.get("/api/nutrition/today", async () => {
    await delay(200);
    const totalCalories = mealsList.reduce((acc, m) => acc + m.calories, 0);
    const totalProtein = mealsList.reduce((acc, m) => acc + m.proteinGrams, 0);
    const totalCarbs = mealsList.reduce((acc, m) => acc + m.carbsGrams, 0);
    const totalFat = mealsList.reduce((acc, m) => acc + m.fatGrams, 0);
    const totalWater = waterLogsList.reduce((acc, w) => acc + w.amountMl, 0);

    return HttpResponse.json({
      success: true,
      data: {
        date: new Date().toISOString().split("T")[0],
        totalCalories,
        targetCalories: 2100,
        totalProteinGrams: totalProtein,
        totalCarbsGrams: totalCarbs,
        totalFatGrams: totalFat,
        totalWaterMl: totalWater,
        targetWaterMl: 2500,
        meals: mealsList,
        waterLogs: waterLogsList,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  http.post("/api/nutrition/meals", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<MealItem>;
    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      mealType: body.mealType || "BREAKFAST",
      name: body.name || "Món ăn",
      calories: Number(body.calories) || 0,
      proteinGrams: Number(body.proteinGrams) || 0,
      carbsGrams: Number(body.carbsGrams) || 0,
      fatGrams: Number(body.fatGrams) || 0,
      loggedAt: body.loggedAt || new Date().toISOString(),
    };
    mealsList = [newMeal, ...mealsList];
    setStored("meals", mealsList);

    return HttpResponse.json({
      success: true,
      data: newMeal,
      message: "Đã lưu bữa ăn thành công!",
      timestamp: new Date().toISOString(),
    });
  }),

  http.delete("/api/nutrition/meals/:id", async ({ params }) => {
    await delay(200);
    const id = params.id as string;
    mealsList = mealsList.filter((m) => m.id !== id);
    setStored("meals", mealsList);
    return HttpResponse.json({ success: true, message: "Đã xóa món ăn." });
  }),

  http.post("/api/nutrition/water", async ({ request }) => {
    await delay(200);
    const body = (await request.json()) as { amountMl: number };
    const newLog: WaterLog = {
      id: `w-${Date.now()}`,
      amountMl: Number(body.amountMl) || 250,
      loggedAt: new Date().toISOString(),
    };
    waterLogsList = [...waterLogsList, newLog];
    setStored("water", waterLogsList);

    return HttpResponse.json({
      success: true,
      data: newLog,
      message: `Đã cộng thêm ${newLog.amountMl}ml nước!`,
      timestamp: new Date().toISOString(),
    });
  }),

  // 4. Medication Handlers
  http.get("/api/medications", async () => {
    await delay(200);
    const data = medicationsList.map((med) => ({
      ...med,
      doses: dosesList.filter((d) => d.medicationId === med.id),
    }));
    return HttpResponse.json({ success: true, data, timestamp: new Date().toISOString() });
  }),

  http.post("/api/medications", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<Medication>;
    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: body.name || "Thuốc mới",
      dosage: body.dosage || "1 viên",
      unit: body.unit || "viên",
      frequencyPerDay: Number(body.frequencyPerDay) || 1,
      scheduledTimes: body.scheduledTimes || ["08:00"],
      instructions: body.instructions || "AFTER_MEAL",
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      currentInventory: Number(body.currentInventory) || 30,
      colorTag: body.colorTag || "#0d9488",
    };
    medicationsList = [...medicationsList, newMed];
    setStored("meds", medicationsList);

    // Generate dose statuses for today
    newMed.scheduledTimes.forEach((time) => {
      const dose: DoseStatus = {
        id: `dose-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        medicationId: newMed.id,
        scheduledTime: time,
        date: new Date().toISOString().split("T")[0],
        status: "PENDING",
      };
      dosesList.push(dose);
    });
    setStored("doses", dosesList);

    return HttpResponse.json({
      success: true,
      data: newMed,
      message: "Đã thêm đơn thuốc thành công!",
      timestamp: new Date().toISOString(),
    });
  }),

  http.patch("/api/medications/doses/:id", async ({ params, request }) => {
    await delay(200);
    const id = params.id as string;
    const body = (await request.json()) as { status: "TAKEN" | "SKIPPED" | "PENDING" };
    
    dosesList = dosesList.map((d) =>
      d.id === id
        ? {
            ...d,
            status: body.status,
            takenAt: body.status === "TAKEN" ? new Date().toISOString() : undefined,
          }
        : d
    );
    setStored("doses", dosesList);

    return HttpResponse.json({
      success: true,
      message: body.status === "TAKEN" ? "Đã check-in uống thuốc!" : "Đã cập nhật trạng thái.",
    });
  }),

  // 5. Medical Records & Appointments
  http.get("/api/records", async () => {
    await delay(200);
    return HttpResponse.json({ success: true, data: recordsList, timestamp: new Date().toISOString() });
  }),

  http.post("/api/records", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<MedicalRecord>;
    const newRecord: MedicalRecord = {
      id: `rec-${Date.now()}`,
      title: body.title || "Tài liệu y tế mới",
      category: body.category || "LAB_TEST",
      facilityName: body.facilityName || "Cơ sở y tế",
      doctorName: body.doctorName || "Bác sĩ phụ trách",
      recordDate: body.recordDate || new Date().toISOString().split("T")[0],
      summary: body.summary || "",
      fileName: body.fileName || "medical_record.pdf",
      keyFindings: body.keyFindings || [],
    };
    recordsList = [newRecord, ...recordsList];
    setStored("records", recordsList);

    return HttpResponse.json({
      success: true,
      data: newRecord,
      message: "Đã lưu hồ sơ y bạ thành công!",
    });
  }),

  http.get("/api/appointments", async () => {
    await delay(200);
    return HttpResponse.json({ success: true, data: appointmentsList, timestamp: new Date().toISOString() });
  }),

  http.post("/api/appointments", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<Appointment>;
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName: body.doctorName || "Bác sĩ",
      specialty: body.specialty || "Đa khoa",
      facilityName: body.facilityName || "Phòng khám",
      scheduledAt: body.scheduledAt || new Date().toISOString(),
      location: body.location || "TP.HCM",
      status: "UPCOMING",
      reason: body.reason || "Khám định kỳ",
      instructions: body.instructions || "",
    };
    appointmentsList = [newApt, ...appointmentsList];
    setStored("appointments", appointmentsList);

    return HttpResponse.json({
      success: true,
      data: newApt,
      message: "Đã lên lịch hẹn bác sĩ thành công!",
    });
  }),
];
