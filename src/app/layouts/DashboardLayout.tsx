import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { BottomNav } from "@/components/common/BottomNav";
import { QuickActionModal } from "@/components/common/QuickActionModal";
import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";
import { useUIStore } from "@/stores/useUIStore";
import { useThemeStore } from "@/stores/useThemeStore";

export const DashboardLayout: React.FC = () => {
  const { isSidebarOpen } = useUIStore();
  const { applyThemeToDom } = useThemeStore();

  useEffect(() => {
    applyThemeToDom();
  }, [applyThemeToDom]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Fixed Header */}
      <Header />

      <div className="flex flex-1 relative">
        {/* Responsive Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main
          className={`flex-1 transition-all duration-300 pb-20 lg:pb-8 pt-4 px-4 sm:px-6 lg:px-8 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Quick Action Modal */}
      <QuickActionModal />
    </div>
  );
};
