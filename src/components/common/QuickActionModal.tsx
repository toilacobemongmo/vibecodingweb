import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  UtensilsCrossed,
  Droplets,
  Heart,
  CheckCircle2,
} from "lucide-react";
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
import { useUIStore } from "@/stores/useUIStore";
import { apiClient } from "@/lib/api-client";

// Zod Schemas for Quick Log
const quickVitalSchema = z.object({
  type: z.enum(["BLOOD_PRESSURE", "HEART_RATE", "BLOOD_GLUCOSE", "WEIGHT_BMI"]),
  systolic: z.string().optional(),
  diastolic: z.string().optional(),
  bpm: z.string().optional(),
  glucose: z.string().optional(),
  weightKg: z.string().optional(),
  notes: z.string().max(200).optional(),
});

type QuickVitalForm = z.infer<typeof quickVitalSchema>;

const quickMealSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập tên món ăn"),
  mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  calories: z.coerce.number().min(1, "Calo phải lớn hơn 0"),
  proteinGrams: z.coerce.number().min(0).default(0),
  carbsGrams: z.coerce.number().min(0).default(0),
  fatGrams: z.coerce.number().min(0).default(0),
});

type QuickMealForm = z.infer<typeof quickMealSchema>;

export const QuickActionModal: React.FC = () => {
  const { activeQuickAction, closeQuickAction } = useUIStore();
  const [tab, setTab] = useState<"vital" | "meal" | "water">("vital");
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Vital Form
  const {
    register: registerVital,
    handleSubmit: handleVitalSubmit,
    watch: watchVital,
    reset: resetVital,
    formState: { isSubmitting: isVitalSubmitting },
  } = useForm<QuickVitalForm>({
    resolver: zodResolver(quickVitalSchema),
    defaultValues: {
      type: "BLOOD_PRESSURE",
      systolic: "120",
      diastolic: "80",
      bpm: "72",
      glucose: "95",
      weightKg: "68.5",
    },
  });

  const selectedVitalType = watchVital("type");

  // Meal Form
  const {
    register: registerMeal,
    handleSubmit: handleMealSubmit,
    reset: resetMeal,
    formState: { errors: mealErrors, isSubmitting: isMealSubmitting },
  } = useForm<QuickMealForm>({
    resolver: zodResolver(quickMealSchema),
    defaultValues: {
      name: "",
      mealType: "BREAKFAST",
      calories: 350,
      proteinGrams: 20,
      carbsGrams: 40,
      fatGrams: 10,
    },
  });

  // Mutations
  const addVitalMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post("/vitals", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      setSuccessMessage("Đã ghi nhận chỉ số sức khỏe thành công!");
      resetVital();
      setTimeout(() => {
        setSuccessMessage(null);
        closeQuickAction();
      }, 1200);
    },
  });

  const addMealMutation = useMutation({
    mutationFn: (data: QuickMealForm) => apiClient.post("/nutrition/meals", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      setSuccessMessage("Đã ghi nhận bữa ăn thành công!");
      resetMeal();
      setTimeout(() => {
        setSuccessMessage(null);
        closeQuickAction();
      }, 1200);
    },
  });

  const addWaterMutation = useMutation({
    mutationFn: (amountMl: number) => apiClient.post("/nutrition/water", { amountMl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nutrition"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      setSuccessMessage("Đã cộng thêm nước uống!");
      setTimeout(() => {
        setSuccessMessage(null);
        closeQuickAction();
      }, 1000);
    },
  });

  const onVitalSubmit = (data: QuickVitalForm) => {
    let payload: Record<string, unknown> = {
      type: data.type,
      measuredAt: new Date().toISOString(),
      notes: data.notes,
    };

    if (data.type === "BLOOD_PRESSURE") {
      payload = {
        ...payload,
        systolic: Number(data.systolic) || 120,
        diastolic: Number(data.diastolic) || 80,
      };
    } else if (data.type === "HEART_RATE") {
      payload = {
        ...payload,
        bpm: Number(data.bpm) || 72,
        activityState: "RESTING",
      };
    } else if (data.type === "BLOOD_GLUCOSE") {
      payload = {
        ...payload,
        value: Number(data.glucose) || 95,
        context: "FASTING",
      };
    } else if (data.type === "WEIGHT_BMI") {
      payload = {
        ...payload,
        weightKg: Number(data.weightKg) || 68.5,
        heightCm: 175,
      };
    }

    addVitalMutation.mutate(payload);
  };

  const onMealSubmit = (data: QuickMealForm) => {
    addMealMutation.mutate(data);
  };

  const isOpen = activeQuickAction !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeQuickAction()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Ghi Nhanh Thông Tin Sức Khỏe
          </DialogTitle>
          <DialogDescription>
            Ghi nhận các chỉ số sinh tồn hoặc nhật ký dinh dưỡng trong ngày.
          </DialogDescription>
        </DialogHeader>

        {successMessage ? (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
            <h4 className="text-base font-bold text-foreground">{successMessage}</h4>
          </div>
        ) : (
          <div>
            {/* Quick Action Category Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-muted/60 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setTab("vital")}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === "vital"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className="h-3.5 w-3.5 text-red-500" />
                Chỉ số y tế
              </button>
              <button
                type="button"
                onClick={() => setTab("meal")}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === "meal"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UtensilsCrossed className="h-3.5 w-3.5 text-amber-500" />
                Bữa ăn
              </button>
              <button
                type="button"
                onClick={() => setTab("water")}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === "water"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Droplets className="h-3.5 w-3.5 text-sky-500" />
                Uống nước
              </button>
            </div>

            {/* TAB 1: Vitals Form */}
            {tab === "vital" && (
              <form onSubmit={handleVitalSubmit(onVitalSubmit)} className="space-y-4">
                <Select
                  label="Loại chỉ số"
                  {...registerVital("type")}
                  options={[
                    { label: "Huyết áp (mmHg)", value: "BLOOD_PRESSURE" },
                    { label: "Nhịp tim (BPM)", value: "HEART_RATE" },
                    { label: "Đường huyết (mg/dL)", value: "BLOOD_GLUCOSE" },
                    { label: "Cân nặng / BMI (kg)", value: "WEIGHT_BMI" },
                  ]}
                />

                {selectedVitalType === "BLOOD_PRESSURE" && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Tâm thu (Systolic)"
                      type="number"
                      placeholder="120"
                      {...registerVital("systolic")}
                      helperText="mmHg (Ví dụ: 120)"
                    />
                    <Input
                      label="Tâm trương (Diastolic)"
                      type="number"
                      placeholder="80"
                      {...registerVital("diastolic")}
                      helperText="mmHg (Ví dụ: 80)"
                    />
                  </div>
                )}

                {selectedVitalType === "HEART_RATE" && (
                  <Input
                    label="Nhịp tim lúc nghỉ"
                    type="number"
                    placeholder="72"
                    {...registerVital("bpm")}
                    helperText="bpm (nhịp/phút)"
                  />
                )}

                {selectedVitalType === "BLOOD_GLUCOSE" && (
                  <Input
                    label="Nồng độ đường huyết"
                    type="number"
                    placeholder="95"
                    {...registerVital("glucose")}
                    helperText="mg/dL (Đo lúc đói hoặc sau ăn)"
                  />
                )}

                {selectedVitalType === "WEIGHT_BMI" && (
                  <Input
                    label="Cân nặng hiện tại"
                    type="number"
                    step="0.1"
                    placeholder="68.5"
                    {...registerVital("weightKg")}
                    helperText="kg"
                  />
                )}

                <Input
                  label="Ghi chú thêm"
                  placeholder="Ví dụ: Cảm thấy hơi chóng mặt, đo sau khi tập..."
                  {...registerVital("notes")}
                />

                <Button
                  type="submit"
                  isLoading={isVitalSubmitting || addVitalMutation.isPending}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  Lưu Chỉ Số Y Tế
                </Button>
              </form>
            )}

            {/* TAB 2: Meal Form */}
            {tab === "meal" && (
              <form onSubmit={handleMealSubmit(onMealSubmit)} className="space-y-3.5">
                <Input
                  label="Tên món ăn / Thực đơn"
                  placeholder="Ví dụ: Bát phở bò tái, Cơm gà xé..."
                  error={mealErrors.name?.message}
                  {...registerMeal("name")}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Bữa ăn"
                    {...registerMeal("mealType")}
                    options={[
                      { label: "Bữa Sáng", value: "BREAKFAST" },
                      { label: "Bữa Trưa", value: "LUNCH" },
                      { label: "Bữa Tối", value: "DINNER" },
                      { label: "Bữa Phụ", value: "SNACK" },
                    ]}
                  />
                  <Input
                    label="Calo (kcal)"
                    type="number"
                    error={mealErrors.calories?.message}
                    {...registerMeal("calories")}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Input
                    label="Protein (g)"
                    type="number"
                    {...registerMeal("proteinGrams")}
                  />
                  <Input
                    label="Carbs (g)"
                    type="number"
                    {...registerMeal("carbsGrams")}
                  />
                  <Input
                    label="Chất béo (g)"
                    type="number"
                    {...registerMeal("fatGrams")}
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isMealSubmitting || addMealMutation.isPending}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold mt-2"
                >
                  Ghi Nhận Bữa Ăn
                </Button>
              </form>
            )}

            {/* TAB 3: Quick Water Tracker */}
            {tab === "water" && (
              <div className="space-y-4 text-center py-2">
                <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-sky-500/10 text-sky-500 mb-1">
                  <Droplets className="h-8 w-8 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Chọn lượng nước vừa bổ sung
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Uống đủ nước giúp duy trì huyết áp và trao đổi chất tối ưu.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[250, 350, 500].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => addWaterMutation.mutate(amount)}
                      disabled={addWaterMutation.isPending}
                      className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-card hover:bg-sky-500/10 hover:border-sky-500/40 transition-all group"
                    >
                      <Droplets className="h-5 w-5 text-sky-500 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-bold text-foreground">+{amount}ml</span>
                      <span className="text-[10px] text-muted-foreground">
                        {amount === 250 ? "1 Cốc nhỏ" : amount === 350 ? "1 Cốc lớn" : "1 Chai"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
