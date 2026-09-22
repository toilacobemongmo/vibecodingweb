import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pill } from "lucide-react";
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
import { medicationSchema, MedicationFormValues } from "../schemas/medications.schema";
import { useAddMedication } from "../api/useMedications";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMedicationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addMedMutation = useAddMedication();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      dosage: "1 viên",
      unit: "viên",
      frequencyPerDay: 2,
      scheduledTimes: ["08:00", "20:00"],
      instructions: "AFTER_MEAL",
      currentInventory: 30,
      colorTag: "#0d9488",
    },
  });

  const onSubmit = (data: MedicationFormValues) => {
    addMedMutation.mutate(data, {
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
            <Pill className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Thêm Đơn Thuốc / Thực Phẩm Bổ Sung
          </DialogTitle>
          <DialogDescription>
            Thiết lập liều lượng, khung giờ nhắc nhở và quản lý số lượng tồn kho.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Tên biệt dược / Tên thuốc"
            placeholder="Ví dụ: Amlodipine 5mg, Omega-3..."
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Liều lượng mỗi lần"
              placeholder="1 viên"
              error={errors.dosage?.message}
              {...register("dosage")}
            />
            <Select
              label="Đơn vị"
              {...register("unit")}
              options={[
                { label: "Viên", value: "viên" },
                { label: "ml (Xi-rô)", value: "ml" },
                { label: "Gói bột", value: "gói" },
                { label: "Giọt", value: "giọt" },
                { label: "Lần xịt", value: "lần xịt" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Hướng dẫn uống"
              {...register("instructions")}
              options={[
                { label: "Sau bữa ăn", value: "AFTER_MEAL" },
                { label: "Trước bữa ăn", value: "BEFORE_MEAL" },
                { label: "Cùng bữa ăn", value: "WITH_MEAL" },
                { label: "Bất kỳ lúc nào", value: "ANYTIME" },
              ]}
            />
            <Input
              label="Số lượng trong hộp (tồn kho)"
              type="number"
              error={errors.currentInventory?.message}
              {...register("currentInventory")}
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting || addMedMutation.isPending}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
          >
            Lưu Đơn Thuốc
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
