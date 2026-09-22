import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { recordSchema, RecordFormValues } from "../schemas/records.schema";
import { useAddRecord } from "../api/useRecords";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRecordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addRecordMutation = useAddRecord();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      title: "",
      category: "LAB_TEST",
      facilityName: "",
      doctorName: "",
      recordDate: new Date().toISOString().split("T")[0],
      summary: "",
      fileName: "medical_report.pdf",
      keyFindings: [],
    },
  });

  const onSubmit = (data: RecordFormValues) => {
    addRecordMutation.mutate(data, {
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
            <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Lưu Trữ Hồ Sơ Y Bạ Mới
          </DialogTitle>
          <DialogDescription>
            Tải lên tài liệu khám bệnh, xét nghiệm hoặc đơn thuốc bác sĩ chỉ định.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Tiêu đề hồ sơ"
            placeholder="Ví dụ: Xét nghiệm máu tổng quát 2026..."
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Phân loại"
              {...register("category")}
              options={[
                { label: "Kết quả xét nghiệm", value: "LAB_TEST" },
                { label: "Đơn thuốc chỉ định", value: "PRESCRIPTION" },
                { label: "Tiêm chủng vaccine", value: "VACCINATION" },
                { label: "Chẩn đoán hình ảnh", value: "IMAGING" },
                { label: "Tóm tắt ra viện", value: "DISCHARGE_SUMMARY" },
              ]}
            />
            <Input
              label="Ngày thực hiện"
              type="date"
              {...register("recordDate")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Cơ sở y tế / Bệnh viện"
              placeholder="BV Vinmec, Bạch Mai..."
              error={errors.facilityName?.message}
              {...register("facilityName")}
            />
            <Input
              label="Bác sĩ phụ trách"
              placeholder="BS. Lê Hoàng Nam..."
              {...register("doctorName")}
            />
          </div>

          <Textarea
            label="Tóm tắt chẩn đoán & Kết luận"
            placeholder="Tóm tắt tình trạng sức khỏe theo lời dặn bác sĩ..."
            error={errors.summary?.message}
            {...register("summary")}
          />

          <Button
            type="submit"
            isLoading={isSubmitting || addRecordMutation.isPending}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold"
          >
            Lưu Hồ Sơ Y Bạ
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
