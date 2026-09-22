import React from "react";
import { AlertTriangle, Calendar, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicationWithDoses } from "../api/useMedications";

interface Props {
  medication: MedicationWithDoses;
}

export const MedicationCard: React.FC<Props> = ({ medication }) => {
  const isLowInventory = (medication.currentInventory || 0) <= 7;

  return (
    <Card className="hover:border-teal-500/40 transition-all flex flex-col justify-between">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className="h-3.5 w-3.5 rounded-full shrink-0 ring-2 ring-background"
              style={{ backgroundColor: medication.colorTag || "#0d9488" }}
            />
            <div>
              <CardTitle className="text-base font-bold truncate max-w-[200px]">
                {medication.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{medication.dosage}</p>
            </div>
          </div>
          {isLowInventory ? (
            <Badge variant="warning" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Sắp hết
            </Badge>
          ) : (
            <Badge variant="optimal">Đang dùng</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-border/60">
          <div>
            <span className="text-muted-foreground block text-[11px]">Tần suất:</span>
            <span className="font-bold text-foreground">
              {medication.frequencyPerDay} lần / ngày
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px]">Khung giờ:</span>
            <span className="font-bold text-foreground">
              {medication.scheduledTimes.join(", ")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Package className="h-3.5 w-3.5" />
            Tồn kho: <strong className="text-foreground">{medication.currentInventory || 0} {medication.unit}</strong>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Từ: {medication.startDate}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
