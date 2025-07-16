"use client"

import type React from "react";
import { useState, createContext, useContext } from "react";
import { Inter } from "next/font/google";
import Sidebar from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// Create a context for sidebar toggle
const SidebarContext = createContext<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
} | null>(null);

export const useSidebarToggle = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarToggle must be used within DashboardLayout");
  }
  return context;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Extract chat ID from pathname like /dashboard/chat/[id]
  const chatId = pathname.includes('/chat/') ? pathname.split('/chat/')[1] : '';
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
      <div className={`flex h-screen overflow-hidden ${inter.className}`}>
        <Sidebar params={Promise.resolve({ id: chatId })} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarContext.Provider>
  );
}
