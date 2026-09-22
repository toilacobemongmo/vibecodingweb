import React, { useState } from "react";
import { Pill, Plus } from "lucide-react";
import { useMedications } from "../api/useMedications";
import { DoseScheduleTimeline } from "../components/DoseScheduleTimeline";
import { MedicationCard } from "../components/MedicationCard";
import { AddMedicationModal } from "../components/AddMedicationModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const MedicationsPage: React.FC = () => {
  const { data: medications = [], isLoading, isError } = useMedications();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center rounded-2xl border border-border bg-card">
        <p className="text-sm text-destructive font-medium">
          Không thể tải danh sách đơn thuốc. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Pill className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Đơn Thuốc & Lịch Uống Thuốc
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Quản lý liều lượng, giờ uống trong ngày và theo dõi tỷ lệ tuân thủ điều trị.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Thêm Đơn Thuốc Mới
        </Button>
      </div>

      {/* Today Dose Timeline */}
      <DoseScheduleTimeline medications={medications} />

      {/* Medications Catalog */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Danh Mục Thuốc Đang Sử Dụng ({medications.length} loại)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medications.map((med) => (
            <MedicationCard key={med.id} medication={med} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddMedicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
