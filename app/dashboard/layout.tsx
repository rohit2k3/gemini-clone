import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemini Frontend Clone - Kuvaka Tech",
  description: "A conversational AI chat application",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex h-screen overflow-hidden ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar params={Promise.resolve({ id: "some-chat-id" })} />
        </ThemeProvider>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
