// app/portal/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import Dashboard from "@/components/Dashboard/Dashboard";
import Users from "@/components/Dashboard/Users";
import Settings from "@/components/Dashboard/Settings";
import Reports from "@/components/Dashboard/Reports";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Candidates from "@/components/Dashboard/Candidates";
import JobPostForm from "@/components/Dashboard/JobPostForm";
import Jobs from "@/components/Dashboard/Jobs";

const PortalPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     Modal.error({
  //       title: "Unauthorized Access",
  //       content:
  //         "You are not authorized to access this page. Redirecting to login...",
  //       onOk: () => router.push("/admin"),
  //     });
  //   }
  // }, [router]);

  const renderComponent = (activeComponent: string) => {
    const user = localStorage.getItem("user");
    if (!user) {
      return null;
    }

    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "settings":
        return <Settings />;
      case "reports":
        return <Reports />;
      case "candidates":
        return <Candidates />;
      case "jobPost":
        return <JobPostForm />;
      case "jobs":
        return <Jobs />;
      default:
        return <Dashboard />;
    }
  };

  // // Check if the user is logged in before rendering the layout
  // const user = localStorage.getItem("user");
  // if (!user) {
  //   return null; // Don't render anything if the user is not logged in
  // }

  return <DashboardLayout>{renderComponent}</DashboardLayout>;
};

export default PortalPage;
