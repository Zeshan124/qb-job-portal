"use client";

import React, { useState, useEffect } from "react";
import { Tooltip, Dropdown, MenuProps, message, Modal } from "antd";
import {
  SettingOutlined,
  TeamOutlined,
  FormOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Candidates from "@/components/Dashboard/Candidates";
import JobPostForm from "@/components/Dashboard/JobPostForm";
import JobsTable from "@/components/Dashboard/Jobs";
import Category from "@/components/Dashboard/Category";

const DashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState("candidates");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { logout } = useUser();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      onOk: () => {
        logout();
        message.success("You have successfully logged out.");
        router.push("/admin");
      },
    });
  };

  const back = () => {
    router.push("/");
  };

  const menuItems = [
    { id: "candidates", label: "Candidates", icon: <TeamOutlined /> },
    { id: "jobPost", label: "Job Post", icon: <FormOutlined /> },
    { id: "jobs", label: "Jobs", icon: <UnorderedListOutlined /> },
    { id: "category", label: "Categories", icon: <TagsOutlined /> },
  ];

  const settingsMenu: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
    { key: "back", label: "Back", icon: <ArrowLeftOutlined />, onClick: back },
  ];

  const renderComponent = (activeComponent: string) => {
    switch (activeComponent) {
      case "candidates":
        return <Candidates />;
      case "jobPost":
        return <JobPostForm />;
      case "jobs":
        return <JobsTable />;
      case "category":
        return <Category />;
      default:
        return <Candidates />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-700 text-white transition-all duration-300 shadow-lg 
        ${isCollapsed ? "w-16" : "w-64"} min-h-screen flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-600">
          {!isCollapsed && <span className="text-xl font-bold">HR Portal</span>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white focus:outline-none transition-transform transform hover:scale-110"
          >
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>

        <nav className="mt-4 flex-1">
          {menuItems.map((item) => (
            <Tooltip
              key={item.id}
              title={isCollapsed ? item.label : ""}
              placement="right"
            >
              <button
                onClick={() => setActiveComponent(item.id)}
                className={`w-full p-4 text-left hover:bg-gray-600 flex items-center space-x-2 transition-all 
                ${activeComponent === item.id ? "bg-gray-800" : ""}`}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </button>
            </Tooltip>
          ))}
        </nav>

        <div className="border-t border-gray-600">
          <Dropdown menu={{ items: settingsMenu }} trigger={["click"]}>
            <button className="w-full p-4 text-left hover:bg-gray-600 flex items-center space-x-2 transition-all">
              <SettingOutlined />
              {!isCollapsed && <span>Settings</span>}
            </button>
          </Dropdown>
        </div>
      </div>

      <div className={`flex-1 p-4 overflow-y-auto`}>
        {renderComponent(activeComponent)} {/* Render the active component */}
      </div>
    </div>
  );
};

export default DashboardLayout;
