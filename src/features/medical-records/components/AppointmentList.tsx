import React from "react";
import { Calendar, MapPin, Stethoscope } from "lucide-react";
import { Appointment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Props {
  appointments: Appointment[];
}

export const AppointmentList: React.FC<Props> = ({ appointments }) => {
  return (
    <div className="space-y-3">
      {appointments.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-border bg-card/40 text-xs text-muted-foreground">
          Chưa có lịch hẹn khám bác sĩ nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 rounded-2xl border border-border/80 bg-card hover:border-sky-500/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {apt.doctorName}
                    </h4>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                      {apt.specialty} • {apt.facilityName}
                    </p>
                  </div>
                </div>
                <Badge variant={apt.status === "UPCOMING" ? "warning" : "optimal"}>
                  {apt.status === "UPCOMING" ? "Sắp tới" : "Đã khám"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-muted/40 text-muted-foreground">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Calendar className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                  {formatDate(apt.scheduledAt, "dd/MM/yyyy HH:mm")}
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{apt.location}</span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <p className="text-muted-foreground">
                  Lý do khám: <strong className="text-foreground">{apt.reason}</strong>
                </p>
                {apt.instructions && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                    Lưu ý: {apt.instructions}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
