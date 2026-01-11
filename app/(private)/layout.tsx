"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidenav from "@/components/side-nav/page";
import TopNav from "@/components/top-nav/page";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ProtectedRoute>
      <div
        className={`flex h-screen transition-colors duration-300`}
        style={{
          backgroundColor: "var(--background-900)",
          color: "var(--text-900)",
        }}
      >
        <Sidenav />
        <div className="flex-1 flex flex-col px-5">
          <TopNav />
          <main
            className="flex-1 overflow-y-auto py-5"
          >
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
