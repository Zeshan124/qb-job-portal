import React from "react";
import { redirect } from "next/navigation";
import ClientPortal from "@/components/Dashboard/ClientPortal";

const PortalPage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      redirect("/admin");
      return null;
    }
  }

  return <ClientPortal />;
};

export default PortalPage;
