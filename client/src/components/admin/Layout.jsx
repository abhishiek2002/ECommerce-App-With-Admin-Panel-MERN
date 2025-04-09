import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin-sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        {/* admin-header */}
        <AdminHeader setOpen={setOpen} />
        <main className="flex flex-col flex-1 bg-muted p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
