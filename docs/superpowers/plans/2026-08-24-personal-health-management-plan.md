# Kế Hoạch Triển Khai: Personal Health Management Frontend

- **Ngày lập**: 2026-08-24
- **Dựa trên Spec**: [2026-08-24-personal-health-management-design.md](file:///C:/Users/ghaob/Documents/vibecode/docs/superpowers/specs/2026-08-24-personal-health-management-design.md)
- **Mục tiêu**: Xây dựng toàn bộ mã nguồn Frontend theo chuẩn Feature-Driven, TypeScript Strict, Axios + TanStack Query, Zustand, React Hook Form + Zod, Tailwind CSS, Recharts và MSW Mocking.

---

## Danh Sách Các Giai Đoạn Triển Khai (Phases)

### Giai đoạn 1: Khởi tạo Project, Dependencies & Build Config
- [ ] Tạo `package.json` đầy đủ dependencies chuẩn.
- [ ] Cấu hình `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json` hỗ trợ `@/*` path alias.
- [ ] Cấu hình `tailwind.config.js`, `postcss.config.js`, `src/index.css` với bảng màu Modern Health & Dark/Light mode CSS variables.
- [ ] Cài đặt `node_modules` và kiểm tra lệnh build ban đầu.

### Giai đoạn 2: Utilities, HTTP Client (Axios), TanStack Query & Zustand Stores
- [ ] `src/lib/utils.ts`: `cn()` helper và hàm format thời gian / số liệu.
- [ ] `src/lib/api-client.ts`: Axios instance với Interceptors hoàn chỉnh.
- [ ] `src/lib/query-client.ts`: TanStack QueryClient với cấu hình staleTime và cache chuẩn.
- [ ] `src/stores/useThemeStore.ts`: Zustand store quản lý Dark/Light mode có persist.
- [ ] `src/stores/useAuthStore.ts`: Zustand store quản lý phiên đăng nhập user & token.
- [ ] `src/stores/useUIStore.ts`: Zustand store quản lý Sidebar, QuickModal, Filter Date Range.
- [ ] `src/types/index.ts`: Global API Types và Type definitions.

### Giai đoạn 3: Reusable UI Design System & Component Primitives (CVA + Radix UI)
- [ ] `src/components/ui/button.tsx`: Button CVA đa biến thể, hỗ trợ loading spinner.
- [ ] `src/components/ui/card.tsx`: Card, CardHeader, CardTitle, CardDescription, CardContent.
- [ ] `src/components/ui/badge.tsx`: Badge hiển thị trạng thái sức khỏe (Normal, Warning, Critical, v.v.).
- [ ] `src/components/ui/input.tsx`, `textarea.tsx`, `select.tsx`: Form inputs chuẩn a11y.
- [ ] `src/components/ui/dialog.tsx`: Radix UI Dialog / Modal.
- [ ] `src/components/ui/tabs.tsx`, `switch.tsx`, `progress.tsx`, `skeleton.tsx`.
- [ ] `src/components/feedback/ErrorBoundary.tsx`, `EmptyState.tsx`, `Toast.tsx`.

### Giai đoạn 4: MSW (Mock Service Worker) & Dữ Liệu Lâm Sàng Mẫu
- [ ] `src/mocks/mock-data/health-data.ts`: Dữ liệu mẫu chuẩn lâm sàng (Huyết áp, Tim mạch, Đường huyết, BMI, Bữa ăn, Thuốc, Lịch khám).
- [ ] `src/mocks/handlers/*.ts`: Handlers REST API với Axios interceptors tương thích.
- [ ] `src/mocks/browser.ts`: Khởi chạy MSW trong browser môi trường development.

### Giai đoạn 5: App Shell, Layout & Routing
- [ ] `src/components/common/Header.tsx`: Thanh điều hướng trên cùng, theme switch, quick action, thông báo.
- [ ] `src/components/common/Sidebar.tsx` & `BottomNav.tsx`: Điều hướng đa thiết bị (Desktop & Mobile).
- [ ] `src/components/common/QuickActionModal.tsx`: Hộp thoại ghi nhanh chỉ số/bữa ăn/thuốc từ bất cứ đâu.
- [ ] `src/app/layouts/DashboardLayout.tsx`: Khung giao diện responsive.
- [ ] `src/app/routes/AppRoutes.tsx`: Cấu hình React Router v6.

### Giai đoạn 6: Triển Khai 5 Features Nghiệp Vụ Cốt Lõi
- [ ] **Feature 1: Dashboard (`src/features/dashboard`)**:
  - `HealthScoreCard`, `VitalsOverviewWidget`, `NutritionRingWidget`, `UpcomingMedsWidget`, `HealthAlertsBanner`.
  - `DashboardPage.tsx`.
- [ ] **Feature 2: Vitals & Biometrics (`src/features/vitals`)**:
  - Zod schemas, API hooks (`useVitals`, `useAddVital`, `useVitalTrends`).
  - Biểu đồ `Recharts` theo dõi xu hướng huyết áp, đường huyết, nhịp tim, BMI.
  - `VitalLogModal` với React Hook Form + Zod.
  - `VitalsPage.tsx`.
- [ ] **Feature 3: Nutrition & Hydration (`src/features/nutrition`)**:
  - Zod schemas, API hooks (`useMeals`, `useAddMeal`, `useWaterIntake`).
  - `CalorieRingChart`, `MacroProgressBar` (Protein/Carbs/Fat), `WaterTrackerWidget`, `MealLogModal`.
  - `NutritionPage.tsx`.
- [ ] **Feature 4: Medications & Prescriptions (`src/features/medications`)**:
  - Zod schemas, API hooks (`useMedications`, `useToggleDose`, `useAddMedication`).
  - `DoseTimeline`, `MedicationCard`, `AddMedicationModal`, `AdherenceCard`.
  - `MedicationsPage.tsx`.
- [ ] **Feature 5: Medical Records & Appointments (`src/features/medical-records`)**:
  - Zod schemas, API hooks (`useRecords`, `useAppointments`, `useAddAppointment`).
  - `RecordList`, `AppointmentTimeline`, `LabResultsViewer`, `AddAppointmentModal`.
  - `MedicalRecordsPage.tsx`.
- [ ] **Feature 6: Profile & Emergency Card (`src/features/profile`)**:
  - `ProfilePage.tsx` hiển thị thẻ cấp cứu y tế (Nhóm máu, dị ứng, liên hệ khẩn cấp), cài đặt mục tiêu sức khỏe.

### Giai đoạn 7: Kiểm Thử, Type Check & Hoàn Thiện
- [ ] Chạy `npm run type-check` (hoặc `tsc --noEmit`) đảm bảo 0 lỗi TypeScript strict mode.
- [ ] Chạy `npm run build` xác minh bundle production build thành công.
- [ ] Kiểm tra tính tương thích Dark/Light mode, Responsive trên mobile và tương tác mượt mà với Mock API.
