import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function PortalPage() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const token = cookieStore.get("token");

  if (!user || !token) {
    return redirect("/admin");
  }

  return <DashboardLayout />;
}
