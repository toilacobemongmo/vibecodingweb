import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateInput: string | Date, formatStr: string = "dd/MM/yyyy HH:mm"): string {
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    return format(date, formatStr, { locale: vi });
  } catch {
    return String(dateInput);
  }
}

export function formatNumber(val: number, decimals: number = 1): string {
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(val);
}

// Medical Threshold Classification Helpers
export function getBmiClassification(bmi: number): {
  category: string;
  color: "optimal" | "normal" | "warning" | "critical";
  recommendation: string;
} {
  if (bmi < 18.5) {
    return {
      category: "Thiếu cân (Underweight)",
      color: "warning",
      recommendation: "Nên bổ sung dinh dưỡng và tăng cường năng lượng khẩu phần.",
    };
  }
  if (bmi < 23) {
    return {
      category: "Thể trạng chuẩn (Normal)",
      color: "optimal",
      recommendation: "Chỉ số tuyệt vời! Duy trì chế độ ăn và luyện tập đều đặn.",
    };
  }
  if (bmi < 25) {
    return {
      category: "Tiền béo phì (Overweight)",
      color: "warning",
      recommendation: "Cần chú ý lượng calo nạp vào và tăng cường vận động cardio.",
    };
  }
  return {
    category: "Béo phì (Obese)",
    color: "critical",
    recommendation: "Khuyến nghị tư vấn bác sĩ dinh dưỡng và điều chỉnh lối sống.",
  };
}

export function getBloodPressureClassification(systolic: number, diastolic: number): {
  label: string;
  variant: "optimal" | "normal" | "warning" | "critical";
  badgeText: string;
} {
  if (systolic < 120 && diastolic < 80) {
    return {
      label: "Huyết áp tối ưu",
      variant: "optimal",
      badgeText: "Tối ưu",
    };
  }
  if (systolic <= 129 && diastolic < 80) {
    return {
      label: "Huyết áp bình thường",
      variant: "normal",
      badgeText: "Bình thường",
    };
  }
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return {
      label: "Tiền cao huyết áp (Độ 1)",
      variant: "warning",
      badgeText: "Cảnh báo",
    };
  }
  return {
    label: "Cao huyết áp (Độ 2/Khẩn cấp)",
    variant: "critical",
    badgeText: "Nguy cơ cao",
  };
}

export function getGlucoseClassification(
  value: number,
  context: "FASTING" | "BEFORE_MEAL" | "AFTER_MEAL" | "BEDTIME"
): {
  label: string;
  variant: "optimal" | "normal" | "warning" | "critical";
} {
  if (context === "FASTING" || context === "BEFORE_MEAL") {
    if (value < 70) return { label: "Hạ đường huyết", variant: "critical" };
    if (value <= 99) return { label: "Bình thường", variant: "optimal" };
    if (value <= 125) return { label: "Tiền tiểu đường", variant: "warning" };
    return { label: "Đường huyết cao", variant: "critical" };
  } else {
    if (value < 70) return { label: "Hạ đường huyết", variant: "critical" };
    if (value < 140) return { label: "Bình thường", variant: "optimal" };
    if (value <= 199) return { label: "Tiền tiểu đường", variant: "warning" };
    return { label: "Đường huyết cao", variant: "critical" };
  }
}
