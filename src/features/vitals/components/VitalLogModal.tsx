import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAddVital } from "../api/useAddVital";
import { VitalType } from "@/types";

const vitalFormSchema = z.object({
  type: z.enum(["BLOOD_PRESSURE", "HEART_RATE", "BLOOD_GLUCOSE", "SPO2", "WEIGHT_BMI", "BODY_TEMP"]),
  systolic: z.coerce.number().optional(),
  diastolic: z.coerce.number().optional(),
  pulse: z.coerce.number().optional(),
  bpm: z.coerce.number().optional(),
  glucose: z.coerce.number().optional(),
  glucoseContext: z.enum(["FASTING", "BEFORE_MEAL", "AFTER_MEAL", "BEDTIME"]).optional(),
  spo2: z.coerce.number().optional(),
  weightKg: z.coerce.number().optional(),
  heightCm: z.coerce.number().optional(),
  tempCelsius: z.coerce.number().optional(),
  notes: z.string().max(200).optional(),
});

type VitalFormData = z.infer<typeof vitalFormSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: VitalType;
}

export const VitalLogModal: React.FC<Props> = ({ isOpen, onClose, defaultType = "BLOOD_PRESSURE" }) => {
  const addVitalMutation = useAddVital();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VitalFormData>({
    resolver: zodResolver(vitalFormSchema),
    defaultValues: {
      type: defaultType,
      systolic: 120,
      diastolic: 80,
      pulse: 72,
      bpm: 72,
      glucose: 95,
      glucoseContext: "FASTING",
      spo2: 99,
      weightKg: 68.5,
      heightCm: 175,
      tempCelsius: 36.6,
      notes: "",
    },
  });

  const selectedType = watch("type");

  const onSubmit = (data: VitalFormData) => {
    let payload: Record<string, unknown> = {
      type: data.type,
      measuredAt: new Date().toISOString(),
      notes: data.notes,
    };

    if (data.type === "BLOOD_PRESSURE") {
      payload = { ...payload, systolic: data.systolic, diastolic: data.diastolic, pulse: data.pulse };
    } else if (data.type === "HEART_RATE") {
      payload = { ...payload, bpm: data.bpm, activityState: "RESTING" };
    } else if (data.type === "BLOOD_GLUCOSE") {
      payload = { ...payload, value: data.glucose, context: data.glucoseContext || "FASTING" };
    } else if (data.type === "SPO2") {
      payload = { ...payload, percentage: data.spo2 };
    } else if (data.type === "WEIGHT_BMI") {
      payload = { ...payload, weightKg: data.weightKg, heightCm: data.heightCm };
    } else if (data.type === "BODY_TEMP") {
      payload = { ...payload, celsius: data.tempCelsius };
    }

    addVitalMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Ghi Nhận Chỉ Số Sức Khỏe
          </DialogTitle>
          <DialogDescription>
            Nhập kết quả đo lường lâm sàng để cập nhật hồ sơ theo dõi.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Loại chỉ số sinh tồn"
            {...register("type")}
            options={[
              { label: "Huyết áp (mmHg)", value: "BLOOD_PRESSURE" },
              { label: "Nhịp tim (BPM)", value: "HEART_RATE" },
              { label: "Đường huyết (mg/dL)", value: "BLOOD_GLUCOSE" },
              { label: "Nồng độ oxy SpO2 (%)", value: "SPO2" },
              { label: "Cân nặng & Thể trạng (kg)", value: "WEIGHT_BMI" },
              { label: "Thân nhiệt (°C)", value: "BODY_TEMP" },
            ]}
          />

          {selectedType === "BLOOD_PRESSURE" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Tâm thu (Systolic)"
                  type="number"
                  placeholder="120"
                  {...register("systolic")}
                  helperText="Ngưỡng chuẩn < 120"
                />
                <Input
                  label="Tâm trương (Diastolic)"
                  type="number"
                  placeholder="80"
                  {...register("diastolic")}
                  helperText="Ngưỡng chuẩn < 80"
                />
              </div>
              <Input
                label="Nhịp tim khi đo (Pulse bpm)"
                type="number"
                placeholder="72"
                {...register("pulse")}
              />
            </div>
          )}

          {selectedType === "HEART_RATE" && (
            <Input
              label="Nhịp tim (bpm)"
              type="number"
              placeholder="72"
              {...register("bpm")}
              helperText="Nhịp tim lúc nghỉ tiêu chuẩn: 60-100 bpm"
            />
          )}

          {selectedType === "BLOOD_GLUCOSE" && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Chỉ số đường huyết (mg/dL)"
                type="number"
                placeholder="95"
                {...register("glucose")}
              />
              <Select
                label="Thời điểm đo"
                {...register("glucoseContext")}
                options={[
                  { label: "Bụng đói / Sáng sớm", value: "FASTING" },
                  { label: "Trước bữa ăn", value: "BEFORE_MEAL" },
                  { label: "2h sau bữa ăn", value: "AFTER_MEAL" },
                  { label: "Trước khi đi ngủ", value: "BEDTIME" },
                ]}
              />
            </div>
          )}

          {selectedType === "SPO2" && (
            <Input
              label="Độ bão hòa oxy máu SpO2 (%)"
              type="number"
              placeholder="99"
              {...register("spo2")}
              helperText="Ngưỡng tối ưu >= 95%"
            />
          )}

          {selectedType === "WEIGHT_BMI" && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Cân nặng (kg)"
                type="number"
                step="0.1"
                placeholder="68.5"
                {...register("weightKg")}
              />
              <Input
                label="Chiều cao (cm)"
                type="number"
                placeholder="175"
                {...register("heightCm")}
              />
            </div>
          )}

          {selectedType === "BODY_TEMP" && (
            <Input
              label="Thân nhiệt (°C)"
              type="number"
              step="0.1"
              placeholder="36.6"
              {...register("tempCelsius")}
              helperText="Nhiệt độ bình thường: 36.5 - 37.2°C"
            />
          )}

          <Input
            label="Ghi chú hoàn cảnh đo"
            placeholder="Ví dụ: Đo sau khi uống thuốc huyết áp 30 phút..."
            {...register("notes")}
          />

          <Button
            type="submit"
            isLoading={isSubmitting || addVitalMutation.isPending}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
          >
            Lưu Kết Quả Đo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
