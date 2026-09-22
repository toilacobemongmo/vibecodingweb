import {
  BloodPressureMetric,
  HeartRateMetric,
  BloodGlucoseMetric,
  SpO2Metric,
  BodyMetric,
  BodyTempMetric,
  MealItem,
  WaterLog,
  Medication,
  DoseStatus,
  MedicalRecord,
  Appointment,
  DashboardSummary,
} from "@/types";

export const initialBloodPressureData: BloodPressureMetric[] = [
  {
    id: "bp-1",
    type: "BLOOD_PRESSURE",
    systolic: 118,
    diastolic: 78,
    pulse: 72,
    measuredAt: "2026-08-24T07:30:00Z",
    notes: "Đo buổi sáng sau khi thức dậy 15 phút.",
  },
  {
    id: "bp-2",
    type: "BLOOD_PRESSURE",
    systolic: 122,
    diastolic: 81,
    pulse: 76,
    measuredAt: "2026-08-23T20:45:00Z",
    notes: "Sau khi đi bộ buổi tối về.",
  },
  {
    id: "bp-3",
    type: "BLOOD_PRESSURE",
    systolic: 116,
    diastolic: 76,
    pulse: 70,
    measuredAt: "2026-08-23T07:15:00Z",
    notes: "Huyết áp ổn định.",
  },
  {
    id: "bp-4",
    type: "BLOOD_PRESSURE",
    systolic: 124,
    diastolic: 82,
    pulse: 78,
    measuredAt: "2026-08-22T08:00:00Z",
    notes: "Hơi căng thẳng do công việc.",
  },
  {
    id: "bp-5",
    type: "BLOOD_PRESSURE",
    systolic: 119,
    diastolic: 77,
    pulse: 74,
    measuredAt: "2026-08-21T07:30:00Z",
    notes: "Bình thường.",
  },
  {
    id: "bp-6",
    type: "BLOOD_PRESSURE",
    systolic: 121,
    diastolic: 79,
    pulse: 75,
    measuredAt: "2026-08-20T07:45:00Z",
    notes: "Bình thường.",
  },
];

export const initialHeartRateData: HeartRateMetric[] = [
  {
    id: "hr-1",
    type: "HEART_RATE",
    bpm: 72,
    activityState: "RESTING",
    measuredAt: "2026-08-24T08:00:00Z",
    notes: "Lúc nghỉ ngơi.",
  },
  {
    id: "hr-2",
    type: "HEART_RATE",
    bpm: 128,
    activityState: "ACTIVE",
    measuredAt: "2026-08-23T18:30:00Z",
    notes: "Chạy bộ 3km.",
  },
  {
    id: "hr-3",
    type: "HEART_RATE",
    bpm: 68,
    activityState: "RESTING",
    measuredAt: "2026-08-22T08:00:00Z",
    notes: "Lúc nghỉ.",
  },
  {
    id: "hr-4",
    type: "HEART_RATE",
    bpm: 62,
    activityState: "SLEEP",
    measuredAt: "2026-08-22T03:00:00Z",
    notes: "Giấc ngủ sâu.",
  },
];

export const initialGlucoseData: BloodGlucoseMetric[] = [
  {
    id: "glu-1",
    type: "BLOOD_GLUCOSE",
    value: 92,
    context: "FASTING",
    measuredAt: "2026-08-24T06:30:00Z",
    notes: "Đo sáng sớm khi bụng đói.",
  },
  {
    id: "glu-2",
    type: "BLOOD_GLUCOSE",
    value: 124,
    context: "AFTER_MEAL",
    measuredAt: "2026-08-23T13:30:00Z",
    notes: "2 tiếng sau bữa trưa.",
  },
  {
    id: "glu-3",
    type: "BLOOD_GLUCOSE",
    value: 95,
    context: "FASTING",
    measuredAt: "2026-08-23T06:45:00Z",
    notes: "Ổn định.",
  },
  {
    id: "glu-4",
    type: "BLOOD_GLUCOSE",
    value: 110,
    context: "BEDTIME",
    measuredAt: "2026-08-22T22:00:00Z",
    notes: "Trước khi ngủ.",
  },
];

export const initialSpO2Data: SpO2Metric[] = [
  {
    id: "spo2-1",
    type: "SPO2",
    percentage: 99,
    measuredAt: "2026-08-24T08:00:00Z",
    notes: "Bão hòa oxy tối ưu.",
  },
  {
    id: "spo2-2",
    type: "SPO2",
    percentage: 98,
    measuredAt: "2026-08-23T08:00:00Z",
    notes: "Bình thường.",
  },
];

export const initialBodyMetricData: BodyMetric[] = [
  {
    id: "body-1",
    type: "WEIGHT_BMI",
    weightKg: 68.5,
    heightCm: 175,
    bmi: 22.37,
    bodyFatPercentage: 17.2,
    measuredAt: "2026-08-24T07:00:00Z",
    notes: "Cân sáng sớm trước khi ăn.",
  },
  {
    id: "body-2",
    type: "WEIGHT_BMI",
    weightKg: 68.8,
    heightCm: 175,
    bmi: 22.46,
    bodyFatPercentage: 17.5,
    measuredAt: "2026-08-17T07:00:00Z",
    notes: "Kiểm tra tuần trước.",
  },
  {
    id: "body-3",
    type: "WEIGHT_BMI",
    weightKg: 69.2,
    heightCm: 175,
    bmi: 22.60,
    bodyFatPercentage: 17.9,
    measuredAt: "2026-08-10T07:00:00Z",
    notes: "Kiểm tra 2 tuần trước.",
  },
];

export const initialTempData: BodyTempMetric[] = [
  {
    id: "temp-1",
    type: "BODY_TEMP",
    celsius: 36.6,
    measuredAt: "2026-08-24T07:30:00Z",
    notes: "Thân nhiệt bình thường.",
  },
];

export const initialMealsData: MealItem[] = [
  {
    id: "meal-1",
    mealType: "BREAKFAST",
    name: "Yến mạch sữa chua Hy Lạp + Hạt chia & Quả việt quất",
    calories: 420,
    proteinGrams: 24,
    carbsGrams: 52,
    fatGrams: 12,
    loggedAt: "2026-08-24T07:45:00Z",
  },
  {
    id: "meal-2",
    mealType: "LUNCH",
    name: "Ức gà áp chảo + Cơm gạo lứt + Bông cải xanh luộc",
    calories: 650,
    proteinGrams: 48,
    carbsGrams: 68,
    fatGrams: 16,
    loggedAt: "2026-08-24T12:15:00Z",
  },
  {
    id: "meal-3",
    mealType: "SNACK",
    name: "1 Quả táo xanh + 10 hạt hạnh nhân rang mộc",
    calories: 180,
    proteinGrams: 4,
    carbsGrams: 26,
    fatGrams: 9,
    loggedAt: "2026-08-24T16:00:00Z",
  },
  {
    id: "meal-4",
    mealType: "DINNER",
    name: "Cá hồi nướng muối tiêu + Salad rau củ dầu ô liu",
    calories: 520,
    proteinGrams: 38,
    carbsGrams: 18,
    fatGrams: 28,
    loggedAt: "2026-08-23T19:00:00Z",
  },
];

export const initialWaterLogs: WaterLog[] = [
  { id: "w-1", amountMl: 500, loggedAt: "2026-08-24T07:00:00Z" },
  { id: "w-2", amountMl: 350, loggedAt: "2026-08-24T09:30:00Z" },
  { id: "w-3", amountMl: 500, loggedAt: "2026-08-24T12:00:00Z" },
  { id: "w-4", amountMl: 400, loggedAt: "2026-08-24T15:30:00Z" },
];

export const initialMedications: Medication[] = [
  {
    id: "med-1",
    name: "Omega-3 Fish Oil 1000mg",
    dosage: "1 viên",
    unit: "viên",
    frequencyPerDay: 2,
    scheduledTimes: ["08:00", "20:00"],
    instructions: "AFTER_MEAL",
    startDate: "2026-01-01",
    prescribedBy: "Thực phẩm bổ sung tim mạch",
    currentInventory: 45,
    colorTag: "#0284c7",
  },
  {
    id: "med-2",
    name: "Vitamin D3 + K2 2000IU",
    dosage: "1 viên",
    unit: "viên",
    frequencyPerDay: 1,
    scheduledTimes: ["08:00"],
    instructions: "WITH_MEAL",
    startDate: "2026-03-01",
    prescribedBy: "Tăng cường miễn dịch",
    currentInventory: 60,
    colorTag: "#f59e0b",
  },
  {
    id: "med-3",
    name: "Men vi sinh Probiotics 10B CFU",
    dosage: "1 gói",
    unit: "gói",
    frequencyPerDay: 1,
    scheduledTimes: ["21:30"],
    instructions: "BEFORE_MEAL",
    startDate: "2026-08-01",
    prescribedBy: "Hỗ trợ tiêu hóa",
    currentInventory: 20,
    colorTag: "#10b981",
  },
];

export const initialDoseStatuses: DoseStatus[] = [
  {
    id: "dose-1",
    medicationId: "med-1",
    scheduledTime: "08:00",
    date: "2026-08-24",
    status: "TAKEN",
    takenAt: "2026-08-24T08:15:00Z",
  },
  {
    id: "dose-2",
    medicationId: "med-1",
    scheduledTime: "20:00",
    date: "2026-08-24",
    status: "PENDING",
  },
  {
    id: "dose-3",
    medicationId: "med-2",
    scheduledTime: "08:00",
    date: "2026-08-24",
    status: "TAKEN",
    takenAt: "2026-08-24T08:15:00Z",
  },
  {
    id: "dose-4",
    medicationId: "med-3",
    scheduledTime: "21:30",
    date: "2026-08-24",
    status: "PENDING",
  },
];

export const initialMedicalRecords: MedicalRecord[] = [
  {
    id: "rec-1",
    title: "Kết quả Khám Sức Khỏe Định Kỳ Tổng Quát 2026",
    category: "LAB_TEST",
    facilityName: "Bệnh viện Đa khoa Quốc tế Vinmec",
    doctorName: "BS. CKI Lê Hoàng Nam",
    recordDate: "2026-06-15",
    summary: "Sức khỏe thể chất tổng quát tốt. Chức năng gan, thận và mỡ máu nằm trong giới hạn tối ưu. Huyết áp bình thường.",
    fileName: "Vinmec_General_Health_Report_2026.pdf",
    keyFindings: [
      "Cholesterol toàn phần: 4.6 mmol/L (Bình thường)",
      "Đường huyết đói HbA1c: 5.2% (Tối ưu)",
      "Men gan ALT/AST: 22/24 U/L (Bình thường)",
    ],
  },
  {
    id: "rec-2",
    title: "Xét nghiệm Định lượng Kháng thể & Dị ứng Miễn dịch",
    category: "LAB_TEST",
    facilityName: "Phòng khám Đa khoa Medlatec",
    doctorName: "BS. Trần Thu Hà",
    recordDate: "2026-02-10",
    summary: "Xác nhận dị ứng nhóm Penicillin và dị ứng nhẹ với đạm protein động vật giáp xác (Tôm, Cua).",
    fileName: "Medlatec_Allergy_Panel.pdf",
    keyFindings: ["IgE đặc hiệu Penicillin: Dương tính", "IgE Tôm/Cua: Mức độ 1 nhẹ"],
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: "apt-1",
    doctorName: "BS. CKI Trần Minh Đức",
    specialty: "Nha khoa & Răng Hàm Mặt",
    facilityName: "Nha khoa Quốc tế Peace Dentistry",
    scheduledAt: "2026-08-28T09:30:00Z",
    location: "147 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
    status: "UPCOMING",
    reason: "Lấy cao răng định kỳ & kiểm tra răng số 8",
    instructions: "Đến trước giờ hẹn 10 phút để điền phiếu thông tin y tế.",
  },
  {
    id: "apt-2",
    doctorName: "ThS. BS Nguyễn Quỳnh Trang",
    specialty: "Chuyên khoa Mắt & Khúc xạ",
    facilityName: "Bệnh viện Mắt TP.HCM",
    scheduledAt: "2026-09-15T14:00:00Z",
    location: "280 Điện Biên Phủ, Quận 3, TP.HCM",
    status: "UPCOMING",
    reason: "Kiểm tra độ cận thị & đo nhãn áp định kỳ 6 tháng",
    instructions: "Không đeo kính áp tròng 24h trước khi đo thị lực.",
  },
];

export const getMockDashboardSummary = (): DashboardSummary => {
  return {
    overallHealthScore: 88,
    scoreGrade: "GOOD",
    latestVitals: {
      bloodPressure: initialBloodPressureData[0],
      heartRate: initialHeartRateData[0],
      bloodGlucose: initialGlucoseData[0],
      bmi: initialBodyMetricData[0],
      spo2: initialSpO2Data[0],
    },
    todayNutrition: {
      consumedCalories: 1250,
      targetCalories: 2100,
      consumedWaterMl: 1750,
      targetWaterMl: 2500,
      proteinGrams: 76,
      carbsGrams: 146,
      fatGrams: 47,
    },
    todayMedications: initialMedications.map((med) => ({
      medication: med,
      doses: initialDoseStatuses.filter((d) => d.medicationId === med.id),
    })),
    upcomingAppointments: initialAppointments,
    healthAlerts: [
      {
        id: "alert-1",
        level: "info",
        title: "Duy trì uống nước đều đặn",
        message: "Bạn đã hoàn thành 70% mục tiêu nước uống hôm nay (1.750 / 2.500 ml). Còn 750ml nữa!",
      },
      {
        id: "alert-2",
        level: "warning",
        title: "Lịch khám nha khoa sắp tới",
        message: "Bạn có lịch hẹn lấy cao răng với BS. Trần Minh Đức vào Thứ Sáu tuần này lúc 09:30.",
      },
    ],
  };
};
