import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Moon,
  Sun,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/stores/useThemeStore";
import { useUIStore, DateRangeOption } from "@/stores/useUIStore";
import { useAuthStore } from "@/stores/useAuthStore";

export const Header: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const {
    isMobileSidebarOpen,
    setMobileSidebarOpen,
    openQuickAction,
    dateRange,
    setDateRange,
  } = useUIStore();
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const dateRangeLabels: Record<DateRangeOption, string> = {
    today: "Hôm nay",
    "7d": "7 ngày qua",
    "30d": "30 ngày qua",
    "90d": "3 tháng qua",
    all: "Toàn bộ",
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground hover:bg-muted lg:hidden"
            aria-label="Toggle Navigation"
          >
            {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5 animate-pulse-slow" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-sky-600 dark:from-teal-400 dark:to-sky-400 bg-clip-text text-transparent">
                VitalPulse
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-muted-foreground -mt-1">
                Health Monitor
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Date Range Selector */}
        <div className="hidden md:flex items-center bg-muted/60 p-1 rounded-xl border border-border/60">
          {(["today", "7d", "30d", "90d"] as DateRangeOption[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                dateRange === range
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {dateRangeLabels[range]}
            </button>
          ))}
        </div>

        {/* Right: Quick Action, Alerts, Theme & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Button */}
          <Button
            onClick={() => openQuickAction("vital")}
            size="sm"
            className="gap-1.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white rounded-xl shadow-sm shadow-teal-600/20 text-xs font-bold"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Ghi Nhanh</span>
          </Button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <Button
              onClick={() => setShowNotifications(!showNotifications)}
              variant="outline"
              size="icon"
              className="relative h-9 w-9 rounded-xl"
              aria-label="Thông báo sức khỏe"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white ring-2 ring-background">
                2
              </span>
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Cảnh Báo & Lời Nhắc
                  </h4>
                  <Badge variant="warning">2 mới</Badge>
                </div>
                <div className="space-y-2.5 py-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                    <p className="font-semibold text-amber-600 dark:text-amber-400">
                      Lịch khám Nha Khoa sắp tới
                    </p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      Thứ Sáu, 09:30 tại Peace Dentistry.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs">
                    <p className="font-semibold text-sky-600 dark:text-sky-400">
                      Nhắc uống nước chiều
                    </p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      Bạn cần bổ sung thêm 750ml nước để đạt mục tiêu 2.500ml.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
            aria-label="Đổi giao diện Dark/Light"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Profile Mini */}
          <Link
            to="/profile"
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-muted/80 transition-colors border border-transparent hover:border-border"
          >
            <img
              src={user?.avatarUrl}
              alt={user?.fullName}
              className="h-8 w-8 rounded-lg object-cover ring-1 ring-teal-500/30"
            />
            <div className="hidden xl:block text-left">
              <span className="block text-xs font-bold text-foreground leading-tight truncate max-w-[100px]">
                {user?.fullName.split(" ").slice(-2).join(" ")}
              </span>
              <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight">
                Nhóm {user?.bloodType}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
