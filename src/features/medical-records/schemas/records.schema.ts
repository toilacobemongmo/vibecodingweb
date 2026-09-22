import { z } from "zod";

export const recordSchema = z.object({
  title: z.string().min(3, "Tiêu đề hồ sơ tối thiểu 3 ký tự").max(120),
  category: z.enum(["LAB_TEST", "PRESCRIPTION", "VACCINATION", "DISCHARGE_SUMMARY", "IMAGING"]),
  facilityName: z.string().min(2, "Vui lòng nhập tên bệnh viện / phòng khám"),
  doctorName: z.string().optional(),
  recordDate: z.string().default(() => new Date().toISOString().split("T")[0]),
  summary: z.string().min(5, "Tóm tắt chẩn đoán tối thiểu 5 ký tự"),
  fileName: z.string().default("medical_document.pdf"),
  keyFindings: z.array(z.string()).default([]),
});

export const appointmentSchema = z.object({
  doctorName: z.string().min(2, "Vui lòng nhập tên bác sĩ"),
  specialty: z.string().min(2, "Vui lòng nhập chuyên khoa"),
  facilityName: z.string().min(2, "Vui lòng nhập cơ sở y tế"),
  scheduledAt: z.string().min(5, "Vui lòng chọn ngày giờ khám"),
  location: z.string().min(3, "Vui lòng nhập địa chỉ khám"),
  reason: z.string().min(3, "Vui lòng nhập lý do khám"),
  instructions: z.string().optional(),
});

export type RecordFormValues = z.infer<typeof recordSchema>;
export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
