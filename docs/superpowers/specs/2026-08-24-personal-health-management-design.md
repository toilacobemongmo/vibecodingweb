# Đặc Tả Thiết Kế Kiến Trúc Frontend: Personal Health Management Dashboard

- **Ngày tạo**: 2026-08-24
- **Trạng thái**: Đã phê duyệt (Approved)
- **Tác giả**: Antigravity Assistant & Developer
- **Phạm vi**: 100% Frontend Architecture, UI/UX, State Management, API Client, Form Validation & MSW Mocking

---

## 1. Tổng Quan Dự Án & Mục Tiêu (Executive Summary & Goals)

Hệ thống **Personal Health Management Dashboard (HealthTrack / VitalPulse)** là ứng dụng web frontend chuyên nghiệp, cung cấp trải nghiệm theo dõi, phân tích và quản lý sức khỏe cá nhân toàn diện. 

### Mục tiêu cốt lõi:
1. **Kiến trúc Module hóa (Feature-Driven)**: Tách biệt tuyệt đối giữa các miền nghiệp vụ sức khỏe, dễ dàng mở rộng và bảo trì.
2. **Type-Safe 100%**: TypeScript Strict Mode kết hợp Zod Runtime Validation để đảm bảo an toàn dữ liệu từ API đến Form nhập liệu.
3. **HTTP Client & State Management chuẩn mực**: Sử dụng **Axios** kết hợp **TanStack Query v5** cho Server State và **Zustand** cho Client UI State.
4. **Trải nghiệm độc lập (Standalone Ready)**: Tích hợp **MSW (Mock Service Worker)** cùng kho dữ liệu mẫu lâm sàng giúp frontend chạy đầy đủ tính năng trước khi kết nối Backend thực tế.
5. **Giao diện Modern Health & Accessibility**: Tông màu Xanh Ngọc (Teal/Emerald) + Xanh Lam (Sky Blue), hỗ trợ Dark/Light mode, đạt chuẩn tiếp cận WCAG 2.1 AA.

---

## 2. Danh Mục Công Nghệ & Thư Viện Cốt Lõi (Tech Stack)

| Hạng mục | Công nghệ / Thư viện | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Nền tảng & Build** | `Vite` + `React 18/19` + `TypeScript` | Khởi chạy SPA tốc độ cao, type check nghiêm ngặt |
| **Định tuyến** | `React Router v6` | Quản lý nested routes, layouts, error boundary routes |
| **Styling & Design System** | `Tailwind CSS` + `CVA` + `clsx` + `tailwind-merge` | Hệ thống component UI linh hoạt, tokens đồng nhất |
| **UI Primitives & Icons** | `Radix UI` + `Lucide React` + `Framer Motion` | Dialog, Dropdown, Tabs, Tooltip, animation mượt mà |
| **HTTP Client** | `Axios` | Custom instance, request/response interceptors, error handler |
| **Server State** | `@tanstack/react-query v5` | Caching, deduplication, optimistic updates, query key factories |
| **Client UI State** | `Zustand` (với `persist` middleware) | Lưu trạng thái Theme, Sidebar, Active Profile, Date Range |
| **Form & Validation** | `react-hook-form` + `@hookform/resolvers/zod` + `zod` | Xử lý form hiệu năng cao, schema validation thời gian thực |
| **Trực quan hóa Dữ liệu** | `Recharts` | Biểu đồ sinh tồn (huyết áp, tim mạch, đường huyết, calo) |
| **Mocking & Dev API** | `MSW (Mock Service Worker)` | Mock REST API chuẩn xác với Service Worker trong browser |
| **Testing & QA** | `Vitest` + `React Testing Library` | Unit tests cho hooks, components và schema |

---

## 3. Cấu Trúc Thư Mục Dự Án (Feature-Driven Architecture)

```text
src/
├── app/                              # Khởi tạo App, Router, Providers
│   ├── routes/                       # AppRoutes.tsx, ProtectedRoute.tsx
│   ├── layouts/                      # DashboardLayout.tsx, AuthLayout.tsx
│   └── App.tsx                       # Root Component bọc Providers
├── assets/                           # Vector icons, sample avatars, health badges
├── components/                       # Shared UI Components dùng chung
│   ├── ui/                           # UI Primitives theo CVA
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── switch.tsx
│   │   ├── skeleton.tsx
│   │   └── progress.tsx
│   ├── common/                       # Layout components & widgets
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── HealthScoreCard.tsx
│   │   ├── DateRangePicker.tsx
│   │   └── QuickActionModal.tsx
│   └── feedback/                     # Phản hồi trạng thái
│       ├── ErrorBoundary.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       └── ToastContainer.tsx
├── features/                         # 5 Miền nghiệp vụ sức khỏe chính
│   ├── dashboard/                    # Trang tổng quan sức khỏe
│   │   ├── api/useDashboardSummary.ts
│   │   ├── components/VitalsOverviewWidget.tsx, NutritionRingWidget.tsx, MedsAdherenceWidget.tsx
│   │   └── types/dashboard.types.ts
│   ├── vitals/                       # Quản lý Chỉ số sinh tồn
│   │   ├── api/useVitals.ts, useAddVital.ts, useVitalTrends.ts
│   │   ├── components/VitalLogModal.tsx, VitalCard.tsx, VitalTrendChart.tsx, VitalHistoryTable.tsx
│   │   ├── schemas/vitals.schema.ts
│   │   └── types/vitals.types.ts
│   ├── nutrition/                    # Quản lý Dinh dưỡng & Calo
│   │   ├── api/useMeals.ts, useAddMeal.ts, useWaterIntake.ts
│   │   ├── components/MealLogModal.tsx, MacroBreakdownChart.tsx, WaterTracker.tsx, MealList.tsx
│   │   ├── schemas/nutrition.schema.ts
│   │   └── types/nutrition.types.ts
│   ├── medications/                  # Quản lý Đơn thuốc & Lịch uống
│   │   ├── api/useMedications.ts, useToggleDose.ts, useAddMedication.ts
│   │   ├── components/MedicationCard.tsx, DoseTimeline.tsx, AddMedicationModal.tsx
│   │   ├── schemas/medications.schema.ts
│   │   └── types/medications.types.ts
│   ├── medical-records/              # Sổ tay Y bạ & Lịch khám bác sĩ
│   │   ├── api/useMedicalRecords.ts, useAppointments.ts, useAddAppointment.ts
│   │   ├── components/RecordList.tsx, AppointmentCalendar.tsx, LabResultViewer.tsx
│   │   ├── schemas/records.schema.ts
│   │   └── types/records.types.ts
│   └── profile/                      # Hồ sơ y tế cá nhân & Cài đặt mục tiêu
│       ├── api/useProfile.ts, useUpdateProfile.ts
│       ├── components/EmergencyInfoCard.tsx, HealthGoalsForm.tsx
│       └── schemas/profile.schema.ts
├── hooks/                            # Custom hooks tái sử dụng (useTheme, useDebounce, useMediaQuery)
├── lib/                              # Cấu hình lõi
│   ├── api-client.ts                 # Axios instance + Interceptors + Error handler
│   ├── query-client.ts               # TanStack Query configuration
│   └── utils.ts                      # Class merge (cn), date-fns, number formatters
├── mocks/                            # Mock Service Worker & Mock Data
│   ├── browser.ts
│   ├── handlers/                     # Handlers REST API
│   │   ├── index.ts
│   │   ├── vitals.handlers.ts
│   │   ├── nutrition.handlers.ts
│   │   ├── medications.handlers.ts
│   │   └── records.handlers.ts
│   └── mock-data/                    # Dữ liệu chuẩn lâm sàng
├── stores/                           # Global Zustand Stores
│   ├── useThemeStore.ts
│   ├── useAuthStore.ts
│   └── useUIStore.ts
└── types/                            # Global Interfaces (API Responses, Filters)
```

---

## 4. Chi Tiết Miền Nghiệp Vụ & Schema Dữ Liệu (Domain Models & Zod Schemas)

### 4.1 Miền Chỉ Số Sinh Tồn (Vitals & Biometrics)
- **Các chỉ số theo dõi**:
  - Huyết áp (`systolic`, `diastolic` - mmHg): Phân loại chuẩn lâm sàng (Bình thường, Tiền cao huyết áp, Cao huyết áp độ 1/2).
  - Nhịp tim (`bpm`): Đo lường lúc nghỉ và sau vận động.
  - Đường huyết (`glucose` - mg/dL hoặc mmol/L): Trước ăn, Sau ăn, Khi đói.
  - SpO2 (`percentage` - %): Đo độ bão hòa oxy máu.
  - Cân nặng & Chiều cao: Tự động tính chỉ số BMI (`weight / (height/100)^2`) và hiển thị thang phân loại thể trạng WHO/Châu Á.
  - Thân nhiệt (`celsius` - °C).

```ts
// src/features/vitals/schemas/vitals.schema.ts
import { z } from "zod";

export const vitalTypeEnum = z.enum([
  "BLOOD_PRESSURE",
  "HEART_RATE",
  "BLOOD_GLUCOSE",
  "SPO2",
  "WEIGHT_BMI",
  "BODY_TEMP",
]);

export const bloodPressureLogSchema = z.object({
  type: z.literal("BLOOD_PRESSURE"),
  systolic: z.number().min(50, "Tối thiểu 50 mmHg").max(250, "Tối đa 250 mmHg"),
  diastolic: z.number().min(30, "Tối thiểu 30 mmHg").max(160, "Tối đa 160 mmHg"),
  pulse: z.number().min(30).max(220).optional(),
  measuredAt: z.string().datetime(),
  notes: z.string().max(200).optional(),
});

export const bloodGlucoseLogSchema = z.object({
  type: z.literal("BLOOD_GLUCOSE"),
  value: z.number().min(20, "Tối thiểu 20 mg/dL").max(600, "Tối đa 600 mg/dL"),
  context: z.enum(["FASTING", "BEFORE_MEAL", "AFTER_MEAL", "BEDTIME"]),
  measuredAt: z.string().datetime(),
  notes: z.string().max(200).optional(),
});
```

---

### 4.2 Miền Dinh Dưỡng & Nước Uống (Nutrition & Hydration)
- **Quản lý Calo & Macro**:
  - Tính toán tổng lượng calo mục tiêu hàng ngày (TDEE/BMR).
  - Tỷ lệ dinh dưỡng đa lượng (Protein, Carbs, Fat) với thanh tiến độ trực quan.
  - Nhật ký bữa ăn theo 4 bữa: Sáng (Breakfast), Trưa (Lunch), Tối (Dinner), Phụ (Snacks).
- **Theo dõi Lượng Nước**:
  - Ghi nhận lượng nước (cốc 250ml, 500ml), thanh tiến độ hoàn thành mục tiêu (ví dụ 2000ml/ngày).

```ts
// src/features/nutrition/schemas/nutrition.schema.ts
import { z } from "zod";

export const mealLogSchema = z.object({
  mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  name: z.string().min(2, "Tên món ăn ít nhất 2 ký tự"),
  calories: z.number().min(0, "Calo không được âm").max(5000),
  proteinGrams: z.number().min(0).default(0),
  carbsGrams: z.number().min(0).default(0),
  fatGrams: z.number().min(0).default(0),
  loggedAt: z.string().datetime(),
});

export const waterLogSchema = z.object({
  amountMl: z.number().min(50).max(2000),
  loggedAt: z.string().datetime(),
});
```

---

### 4.3 Miền Đơn Thuốc & Lịch Uống (Medications & Adherence)
- **Theo dõi Đơn thuốc**:
  - Tên thuốc, liều lượng, đơn vị (viên, ml, gói), tần suất uống (ví dụ 2 lần/ngày sau ăn).
  - Khung giờ uống trong ngày (ví dụ 08:00, 20:00).
  - Trạng thái Check-in uống thuốc (Đã uống, Bỏ lỡ, Hoãn lại) với tỷ lệ tuân thủ điều trị (Adherence Rate %).

```ts
// src/features/medications/schemas/medications.schema.ts
import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(2, "Tên thuốc tối thiểu 2 ký tự"),
  dosage: z.string().min(1, "Vui lòng nhập liều lượng"),
  unit: z.enum(["viên", "ml", "gói", "giọt", "lần xịt"]),
  frequencyPerDay: z.number().min(1).max(6),
  scheduledTimes: z.array(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Định dạng giờ HH:mm")),
  instructions: z.enum(["BEFORE_MEAL", "AFTER_MEAL", "WITH_MEAL", "ANYTIME"]),
  startDate: z.string(),
  endDate: z.string().optional(),
  currentInventory: z.number().min(0).optional(),
});
```

---

### 4.4 Miền Sổ Y Bạ & Lịch Hẹn Bác Sĩ (Medical Records & Appointments)
- **Hồ sơ bệnh án & Kết quả xét nghiệm**:
  - Lưu trữ tài liệu khám bệnh, tóm tắt kết quả xét nghiệm máu/nước tiểu, chẩn đoán hình ảnh.
- **Lịch hẹn y tế**:
  - Ngày giờ khám, tên bác sĩ/chuyên khoa, cơ sở y tế/bệnh viện, lý do khám, ghi chú chuẩn bị (nhịn ăn, mang hồ sơ cũ).

---

## 5. Thiết Kế HTTP Client với Axios (`src/lib/api-client.ts`)

```ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "Đã xảy ra lỗi không xác định";

    if (status === 401) {
      localStorage.removeItem("auth_token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(new Error(message));
  }
);
```

---

## 6. Thiết Kế UI/UX & Design System

### 6.1 Bảng màu & Design Tokens (Modern Clinical & Fresh)
- **Primary / Health Active**: `#0D9488` (Teal-600) / `#14B8A6` (Teal-500) - Tượng trưng cho sự cân bằng, phục hồi và tin cậy y tế.
- **Secondary / Vital Pulse**: `#0284C7` (Sky-600) / `#38BDF8` (Sky-400) - Tượng trưng cho sinh lực và nước.
- **Success / Optimal**: `#10B981` (Emerald-500) - Chỉ số bình thường, an toàn.
- **Warning / Alert**: `#F59E0B` (Amber-500) - Chỉ số tiệm cận ngưỡng nguy cơ, cần chú ý.
- **Destructive / Danger**: `#EF4444` (Red-500) - Chỉ số vượt ngưỡng nguy hiểm, cần can thiệp y tế.
- **Surface & Dark Mode**:
  - Light: `bg-slate-50`, card `bg-white border-slate-200 text-slate-900`.
  - Dark: `bg-slate-950`, card `bg-slate-900/90 border-slate-800 text-slate-100`.

### 6.2 Chuẩn Accessible & Micro-interactions
- **Tương tác**: Focus ring `focus-visible:ring-2 focus-visible:ring-teal-500`, hiệu ứng click `active:scale-[0.98]`.
- **Skeleton loading**: Tạo khung xương tải trang đồng dạng để triệt tiêu CLS (Cumulative Layout Shift).
- **Responsive Mobile-First**: Tối ưu trên di động với thanh điều hướng dưới đáy (Bottom Navigation Bar) và bảng điều khiển rộng trên Desktop (Sidebar + Multi-column Grid).

---

## 7. Môi Trường Giả Lập (MSW) & Chiến Lược Kiểm Thử (QA)

- **Mock Service Worker**: Cung cấp đầy đủ REST endpoints (`/api/vitals`, `/api/nutrition`, `/api/medications`, `/api/records`, `/api/dashboard/summary`) với độ trễ nhân tạo 300ms và khả năng lưu trữ trạng thái vào LocalStorage trong phiên dev.
- **Vitest & React Testing Library**: Kiểm thử tính chính xác của:
  1. Các hàm tính toán y tế (tính BMI, phân loại huyết áp, tỷ lệ tuân thủ đơn thuốc).
  2. Zod Schema Validation đối với dữ liệu không hợp lệ.
  3. Tương tác form ghi nhận chỉ số (VitalLogModal) và xử lý lỗi mạng.

---

Tài liệu thiết kế trên đóng vai trò là kim chỉ nam kiến trúc và giao diện toàn diện cho hệ thống.
