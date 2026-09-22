import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  PlusCircle,
  UtensilsCrossed,
  Pill,
} from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";

export const BottomNav: React.FC = () => {
  const { openQuickAction } = useUIStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border/80 bg-background/90 backdrop-blur-lg px-2 lg:hidden">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            isActive ? "text-teal-500" : "text-muted-foreground"
          }`
        }
      >
        <LayoutDashboard className="h-5 w-5 mb-0.5" />
        <span>Tổng quan</span>
      </NavLink>

      <NavLink
        to="/vitals"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            isActive ? "text-teal-500" : "text-muted-foreground"
          }`
        }
      >
        <Activity className="h-5 w-5 mb-0.5" />
        <span>Chỉ số</span>
      </NavLink>

      {/* Floating Center Action */}
      <button
        onClick={() => openQuickAction("vital")}
        className="flex flex-col items-center justify-center -mt-5 h-12 w-12 rounded-full bg-gradient-to-tr from-teal-600 to-sky-500 text-white shadow-lg shadow-teal-500/30 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Thêm nhanh chỉ số"
      >
        <PlusCircle className="h-6 w-6" />
      </button>

      <NavLink
        to="/nutrition"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            isActive ? "text-teal-500" : "text-muted-foreground"
          }`
        }
      >
        <UtensilsCrossed className="h-5 w-5 mb-0.5" />
        <span>Dinh dưỡng</span>
      </NavLink>

      <NavLink
        to="/medications"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-semibold transition-colors ${
            isActive ? "text-teal-500" : "text-muted-foreground"
          }`
        }
      >
        <Pill className="h-5 w-5 mb-0.5" />
        <span>Đơn thuốc</span>
      </NavLink>
    </nav>
  );
};
