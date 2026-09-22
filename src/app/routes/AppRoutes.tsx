import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { VitalsPage } from "@/features/vitals/pages/VitalsPage";
import { NutritionPage } from "@/features/nutrition/pages/NutritionPage";
import { MedicationsPage } from "@/features/medications/pages/MedicationsPage";
import { MedicalRecordsPage } from "@/features/medical-records/pages/MedicalRecordsPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="vitals" element={<VitalsPage />} />
        <Route path="nutrition" element={<NutritionPage />} />
        <Route path="medications" element={<MedicationsPage />} />
        <Route path="records" element={<MedicalRecordsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
