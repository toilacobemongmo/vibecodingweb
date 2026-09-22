import React, { useState } from "react";
import { Plus, Activity, Heart, Droplet, Scale, Wind, Thermometer } from "lucide-react";
import { useVitals } from "../api/useVitals";
import { VitalTrendChart } from "../components/VitalTrendChart";
import { VitalHistoryTable } from "../components/VitalHistoryTable";
import { VitalLogModal } from "../components/VitalLogModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VitalType } from "@/types";

export const VitalsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<VitalType>("BLOOD_PRESSURE");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: records = [], isLoading } = useVitals(selectedType);

  const tabs: Array<{ type: VitalType; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { type: "BLOOD_PRESSURE", label: "Huyết Áp", icon: Activity },
    { type: "HEART_RATE", label: "Nhịp Tim", icon: Heart },
    { type: "BLOOD_GLUCOSE", label: "Đường Huyết", icon: Droplet },
    { type: "WEIGHT_BMI", label: "Cân Nặng & BMI", icon: Scale },
    { type: "SPO2", label: "Oxy SpO2", icon: Wind },
    { type: "BODY_TEMP", label: "Thân Nhiệt", icon: Thermometer },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Activity className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Theo Dõi Chỉ Số Sinh Tồn
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Phân tích số đo lâm sàng, huyết áp, tim mạch và các chỉ số sinh hóa.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Ghi Nhận Kết Quả Mới
        </Button>
      </div>

      {/* Metric Type Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedType === tab.type;
          return (
            <button
              key={tab.type}
              onClick={() => setSelectedType(tab.type)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                isSelected
                  ? "bg-teal-500/15 border-teal-500 text-teal-600 dark:text-teal-400 font-bold shadow-xs scale-[1.02]"
                  : "bg-card border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chart & History Content */}
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-[320px] w-full rounded-2xl" />
          <Skeleton className="h-[200px] w-full rounded-2xl" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Trend Chart */}
          <VitalTrendChart type={selectedType} records={records} />

          {/* History Data Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Lịch Sử Đo & Nhật Ký Ghi Nhận
            </h3>
            <VitalHistoryTable records={records} />
          </div>
        </div>
      )}

      {/* Log Modal */}
      <VitalLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultType={selectedType}
      />
    </div>
  );
};
