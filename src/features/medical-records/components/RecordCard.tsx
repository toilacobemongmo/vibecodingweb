import React from "react";
import { FileText, Building2, User, Calendar, Download, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicalRecord } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  record: MedicalRecord;
}

export const RecordCard: React.FC<Props> = ({ record }) => {
  const getCategoryBadge = () => {
    switch (record.category) {
      case "LAB_TEST":
        return <Badge variant="optimal">Xét nghiệm</Badge>;
      case "PRESCRIPTION":
        return <Badge variant="pulse">Đơn thuốc</Badge>;
      case "VACCINATION":
        return <Badge variant="warning">Tiêm chủng</Badge>;
      case "IMAGING":
        return <Badge variant="purple">Chẩn đoán hình ảnh</Badge>;
      default:
        return <Badge variant="outline">Tổng kết ra viện</Badge>;
    }
  };

  return (
    <Card className="hover:border-teal-500/40 transition-all flex flex-col justify-between">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getCategoryBadge()}
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(record.recordDate, "dd/MM/yyyy")}
              </span>
            </div>
            <CardTitle className="text-base font-bold text-foreground">
              {record.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3">
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <Building2 className="h-3.5 w-3.5 text-teal-500 shrink-0" />
            {record.facilityName}
          </p>
          {record.doctorName && (
            <p className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {record.doctorName}
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-xl leading-relaxed">
          {record.summary}
        </p>

        {record.keyFindings && record.keyFindings.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Kết luận trọng yếu:
            </span>
            <ul className="space-y-1">
              {record.keyFindings.map((finding, idx) => (
                <li key={idx} className="text-xs flex items-center gap-1.5 text-foreground">
                  <CheckCircle className="h-3 w-3 text-teal-500 shrink-0" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {record.fileName && (
          <div className="pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-border/80 bg-background text-xs">
              <span className="font-semibold text-foreground truncate max-w-[200px] flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-teal-500" />
                {record.fileName}
              </span>
              <button
                onClick={() => alert("Tải xuống hồ sơ: " + record.fileName)}
                className="text-teal-600 dark:text-teal-400 hover:underline font-bold flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                Tải file
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
