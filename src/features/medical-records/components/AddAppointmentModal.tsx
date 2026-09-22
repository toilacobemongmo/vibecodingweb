import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { appointmentSchema, AppointmentFormValues } from "../schemas/records.schema";
import { useAddAppointment } from "../api/useRecords";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAppointmentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addAptMutation = useAddAppointment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      doctorName: "",
      specialty: "",
      facilityName: "",
      scheduledAt: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
      location: "",
      reason: "",
      instructions: "",
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    addAptMutation.mutate(
      {
        ...data,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-sky-500" />
            Lên Lịch Hẹn Bác Sĩ
          </DialogTitle>
          <DialogDescription>
            Đặt lịch khám chuyên khoa, tái khám hoặc kiểm tra nha khoa/mắt định kỳ.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tên bác sĩ"
              placeholder="BS. Trần Minh Đức..."
              error={errors.doctorName?.message}
              {...register("doctorName")}
            />
            <Input
              label="Chuyên khoa"
              placeholder="Tim mạch, Nha khoa..."
              error={errors.specialty?.message}
              {...register("specialty")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Cơ sở y tế"
              placeholder="Bệnh viện, Phòng khám..."
              error={errors.facilityName?.message}
              {...register("facilityName")}
            />
            <Input
              label="Thời gian khám"
              type="datetime-local"
              error={errors.scheduledAt?.message}
              {...register("scheduledAt")}
            />
          </div>

          <Input
            label="Địa chỉ phòng khám"
            placeholder="147 Nguyễn Đình Chiểu, Quận 3..."
            error={errors.location?.message}
            {...register("location")}
          />

          <Input
            label="Lý do khám / Triệu chứng"
            placeholder="Khám định kỳ, kiểm tra huyết áp..."
            error={errors.reason?.message}
            {...register("reason")}
          />

          <Textarea
            label="Lưu ý chuẩn bị"
            placeholder="Ví dụ: Nhịn ăn sáng, mang theo kết quả xét nghiệm cũ..."
            {...register("instructions")}
          />

          <Button
            type="submit"
            isLoading={isSubmitting || addAptMutation.isPending}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
          >
            Lên Lịch Hẹn Khám
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
