import { create } from "zustand";

export type DateRangeOption = "today" | "7d" | "30d" | "90d" | "all";
export type QuickActionType = "vital" | "meal" | "water" | "medication" | "appointment" | null;

interface UIState {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  dateRange: DateRangeOption;
  activeQuickAction: QuickActionType;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  setDateRange: (range: DateRangeOption) => void;
  openQuickAction: (action: QuickActionType) => void;
  closeQuickAction: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isMobileSidebarOpen: false,
  dateRange: "7d",
  activeQuickAction: null,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setMobileSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),
  setDateRange: (dateRange) => set({ dateRange }),
  openQuickAction: (action) => set({ activeQuickAction: action }),
  closeQuickAction: () => set({ activeQuickAction: null }),
}));
