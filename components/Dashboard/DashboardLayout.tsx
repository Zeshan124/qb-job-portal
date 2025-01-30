"use client";

import React, { useState, ReactNode } from "react";
import { Tooltip, Dropdown, MenuProps, message, Modal } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  FormOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext"; // Import UserContext

interface DashboardLayoutProps {
  children: (activeComponent: string) => ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { logout } = useUser(); // Use the logout function from UserContext

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      onOk: () => {
        logout(); // Use the logout function from UserContext
        message.success("You have successfully logged out.");
        router.push("/admin");
      },
    });
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
    { id: "users", label: "Users", icon: <UserOutlined /> },
    { id: "reports", label: "Reports", icon: <FileTextOutlined /> },
    { id: "candidates", label: "Candidates", icon: <TeamOutlined /> },
    { id: "jobPost", label: "Job Post", icon: <FormOutlined /> },
    { id: "jobs", label: "Jobs", icon: <UnorderedListOutlined /> },
  ];

  const settingsMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      onClick: () => setActiveComponent("settings"),
    },
    {
      key: "account",
      label: "Account Settings",
      onClick: () => setActiveComponent("settings"),
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4 text-2xl font-bold flex items-center justify-between">
          {!isCollapsed && <span>Portal</span>}
          <button
            onClick={toggleCollapse}
            className="text-white focus:outline-none"
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>
        <nav>
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

          {/* Settings Dropdown */}
          <Dropdown menu={{ items: settingsMenu }} trigger={["click"]}>
            <button className="w-full p-4 text-left hover:bg-gray-700 flex items-center space-x-2">
              <SettingOutlined />
              {!isCollapsed && <span>Settings</span>}
            </button>
          </Dropdown>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {children(activeComponent)}
      </div>
    </div>
  );
};

export default DashboardLayout;
