"use client";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import useOpenSidebar from "@/hooks/useOpenSidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const openSidebar = useOpenSidebar();
  return (
    <div>
      <AdminSidebar />
      <div
        className={`md:ml-auto ${
          openSidebar.isOpen && "md:w-[calc(100%_-_288px)]"
        } w-full min-h-screen`}
      >
        <AdminNavbar />
        <div className="p-4 mt-16 mb-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
