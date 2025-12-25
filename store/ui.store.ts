import { useState } from "react";

export function useUiStore() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  return { sidebarOpen, toggleSidebar } as const;
}
