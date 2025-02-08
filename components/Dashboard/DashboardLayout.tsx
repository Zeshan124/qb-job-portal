"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { Tooltip, Dropdown, MenuProps, message, Modal } from "antd";
import {
  SettingOutlined,
  TeamOutlined,
  FormOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

interface DashboardLayoutProps {
  children: (activeComponent: string) => ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { logout } = useUser();

  // ✅ Collapse sidebar automatically on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Run once on mount
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ✅ Sidebar: Auto-Collapses on Small Screens */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4 text-2xl font-bold flex items-center justify-between">
          {!isCollapsed && <span>Portal</span>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white focus:outline-none hidden md:block"
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Tooltip
              key={item.id}
              title={isCollapsed ? item.label : ""}
              placement="right"
            >
              <button
                onClick={() => setActiveComponent(item.id)}
                className={`w-full p-4 text-left hover:bg-gray-700 flex items-center space-x-2 ${
                  activeComponent === item.id ? "bg-gray-900" : ""
                }`}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </Tooltip>
          ))}

          <Dropdown menu={{ items: settingsMenu }} trigger={["click"]}>
            <button className="w-full p-4 text-left hover:bg-gray-700 flex items-center space-x-2">
              <SettingOutlined />
              {!isCollapsed && <span>Settings</span>}
            </button>
          </Dropdown>
        </nav>
      </div>

      {/* ✅ Main Content: Adjusts Based on Sidebar */}
      <div
        className={`flex-1 p-2 overflow-y-auto ${
          isCollapsed ? "ml-0" : "ml-0"
        }`}
      >
        {children(activeComponent)}
      </div>
    </div>
  );
};

export default DashboardLayout;
