"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Spin } from "antd";
import Dashboard from "@/components/Dashboard/Dashboard";
import Users from "@/components/Dashboard/Users";
import Settings from "@/components/Dashboard/Settings";
import Reports from "@/components/Dashboard/Reports";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Candidates from "@/components/Dashboard/Candidates";
import JobPostForm from "@/components/Dashboard/JobPostForm";
import JobsTable from "@/components/Dashboard/Jobs";

const PortalPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      Modal.error({
        title: "Unauthorized Access",
        content:
          "You are not authorized to access this page. Redirecting to login...",
        onOk: () => router.push("/admin"), // Redirect to login
      });
    } else {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, [router]);

  // Render a loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // If user or token is missing, do not render the dashboard
  if (!user || !token) {
    return null;
  }

  // Function to render components
  const renderComponent = (activeComponent: string) => {
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
        return <JobsTable />;
      default:
        return <Dashboard />;
    }
  };

  return <DashboardLayout>{renderComponent}</DashboardLayout>;
};

export default PortalPage;
