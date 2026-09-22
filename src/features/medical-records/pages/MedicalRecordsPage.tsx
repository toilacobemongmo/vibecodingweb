import React, { useState } from "react";
import { FileText, Calendar, FolderPlus, CalendarPlus } from "lucide-react";
import { useRecords, useAppointments } from "../api/useRecords";
import { RecordCard } from "../components/RecordCard";
import { AppointmentList } from "../components/AppointmentList";
import { AddRecordModal } from "../components/AddRecordModal";
import { AddAppointmentModal } from "../components/AddAppointmentModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const MedicalRecordsPage: React.FC = () => {
  const { data: records = [], isLoading: isRecordsLoading } = useRecords();
  const { data: appointments = [], isLoading: isAptLoading } = useAppointments();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Hồ Sơ Y Bạ & Lịch Khám Bác Sĩ
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Lưu trữ tập trung kết quả xét nghiệm lâm sàng, đơn thuốc chỉ định và lịch hẹn khám chuyên khoa.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAptModalOpen(true)}
            variant="outline"
            className="gap-1.5 rounded-xl font-bold text-xs"
          >
            <CalendarPlus className="h-4 w-4 text-sky-500" />
            Đặt Lịch Hẹn
          </Button>
          <Button
            onClick={() => setIsRecordModalOpen(true)}
            className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm text-xs"
          >
            <FolderPlus className="h-4 w-4" />
            Thêm Hồ Sơ Y Bạ
          </Button>
        </div>
      </div>

      {/* Section 1: Upcoming Appointments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-sky-500" />
            Lịch Hẹn Khám Bác Sĩ & Tái Khám ({appointments.length})
          </h3>
        </div>
        {isAptLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        ) : (
          <AppointmentList appointments={appointments} />
        )}
      </div>

      {/* Section 2: Medical Records */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-teal-500" />
            Hồ Sơ Bệnh Án & Kết Quả Xét Nghiệm ({records.length})
          </h3>
        </div>
        {isRecordsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.map((rec) => (
              <RecordCard key={rec.id} record={rec} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddRecordModal isOpen={isRecordModalOpen} onClose={() => setIsRecordModalOpen(false)} />
      <AddAppointmentModal isOpen={isAptModalOpen} onClose={() => setIsAptModalOpen(false)} />
    </div>
  );
};
