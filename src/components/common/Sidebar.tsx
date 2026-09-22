import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  UtensilsCrossed,
  Pill,
  FileText,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Flame,
} from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    path: "/",
    label: "Tổng Quan Sức Khỏe",
    shortLabel: "Tổng quan",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    path: "/vitals",
    label: "Chỉ Số Sinh Tồn",
    shortLabel: "Chỉ số",
    icon: Activity,
    badge: "5 chỉ số",
  },
  {
    path: "/nutrition",
    label: "Dinh Dưỡng & Calo",
    shortLabel: "Dinh dưỡng",
    icon: UtensilsCrossed,
    badge: null,
  },
  {
    path: "/medications",
    label: "Đơn Thuốc & Lịch Uống",
    shortLabel: "Thuốc",
    icon: Pill,
    badge: "3 loại",
  },
  {
    path: "/records",
    label: "Hồ Sơ Y Bạ & Lịch Khám",
    shortLabel: "Y bạ",
    icon: FileText,
    badge: null,
  },
  {
    path: "/profile",
    label: "Hồ Sơ Y Tế & Cấp Cứu",
    shortLabel: "Cấp cứu",
    icon: ShieldAlert,
    badge: "Khẩn cấp",
  },
];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, isMobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { user } = useAuthStore();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex flex-col border-r border-border/80 bg-card/60 backdrop-blur-md transition-all duration-300 ${
          isMobileSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${isSidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="px-3 pb-2 hidden lg:block">
            {isSidebarOpen ? (
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Quản Lý Sức Khỏe
              </span>
            ) : (
              <span className="block text-center text-[10px] font-bold uppercase text-muted-foreground">
                Menu
              </span>
            )}
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  } ${!isSidebarOpen && "lg:justify-center lg:px-2"}`
                }
                title={!isSidebarOpen ? item.label : undefined}
              >
                <div className="flex items-center justify-center">
                  <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
                </div>
                {isSidebarOpen && (
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={item.path === "/profile" ? "critical" : "optimal"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Profile Summary Card (when expanded) */}
        {isSidebarOpen && (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-teal-500/10 via-sky-500/5 to-transparent border border-teal-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <HeartPulse className="h-4 w-4 text-teal-500" />
                Thể trạng
              </span>
              <Badge variant="optimal">BMI 22.4</Badge>
            </div>
            <div className="space-y-1 text-[11px] text-muted-foreground">
              <div className="flex justify-between">
                <span>Cân nặng:</span>
                <span className="font-semibold text-foreground">{user?.currentWeightKg} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Mục tiêu calo:</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Flame className="h-3 w-3 text-amber-500" />
                  {user?.targetDailyCalories} kcal
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle Button (Desktop Only) */}
        <div className="hidden lg:flex p-3 border-t border-border/60 justify-end">
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={isSidebarOpen ? "Thu gọn sidebar" : "Mở rộng sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
