"use client"

import type React from "react";
import { Inter } from "next/font/google";
import Sidebar from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Extract chat ID from pathname like /dashboard/chat/[id]
  const chatId = pathname.includes('/chat/') ? pathname.split('/chat/')[1] : '';
  
  return (
    <div className={`flex h-screen overflow-hidden ${inter.className}`}>
      <Sidebar params={Promise.resolve({ id: chatId })} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
