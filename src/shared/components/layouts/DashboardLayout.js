"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useNotificationStore } from "@/store/notificationStore";
import Sidebar from "../Sidebar";
import Header from "../Header";
import PageHeader from "../PageHeader";

function getToastStyle(type) {
  if (type === "success") {
    return { wrapper: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400", icon: "check_circle" };
  }
  if (type === "error") {
    return { wrapper: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400", icon: "error" };
  }
  if (type === "warning") {
    return { wrapper: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400", icon: "warning" };
  }
  return { wrapper: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400", icon: "info" };
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#f4f8fc]">
      {/* Top Navbar */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* Toasts */}
      <div className="fixed top-20 right-4 z-[80] flex w-[min(92vw,380px)] flex-col gap-2">
        {notifications.map((n) => {
          const style = getToastStyle(n.type);
          return (
            <div key={n.id} className={`rounded-lg border px-3 py-2 shadow-lg backdrop-blur-sm ${style.wrapper}`}>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] leading-5">{style.icon}</span>
                <div className="min-w-0 flex-1">
                  {n.title ? <p className="text-xs font-semibold mb-0.5">{n.title}</p> : null}
                  <p className="text-xs whitespace-pre-wrap break-words">{n.message}</p>
                </div>
                {n.dismissible ? (
                  <button type="button" onClick={() => removeNotification(n.id)} className="text-current/70 hover:text-current">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop: shrink-0 prevents it from being compressed */}
        <div className="hidden lg:flex shrink-0">
          <Sidebar />
        </div>

        {/* Sidebar - Mobile */}
        <div className={`fixed inset-y-0 left-0 z-50 transform lg:hidden transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content: min-w-0 prevents flex child from overflowing sidebar */}
        <main className="flex flex-col flex-1 min-w-0 overflow-x-hidden relative bg-[#f4f8fc]" style={{ maxWidth: "100%" }}>
          <PageHeader />
          <div className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${pathname === "/dashboard/basic-chat" ? "" : "px-4 md:px-6 lg:px-8 pb-10 pt-2"}`}>
            <div className={`${pathname === "/dashboard/basic-chat" ? "flex-1 w-full h-full flex flex-col" : "max-w-6xl mx-auto w-full"}`}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
