// components/Dashboard/Candidates.tsx
import React, { useState } from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import "antd/dist/reset.css"; // For newer versions

const Candidates = () => {
  // State to manage the status of each candidate
  const [status, setStatus] = useState<Record<string, string>>({});

  // Handle status change
  const handleStatusChange = (key: string, newStatus: string) => {
    setStatus((prev) => ({
      ...prev,
      [key]: newStatus,
    }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
    },
    {
      title: "Cover Letter",
      dataIndex: "coverLetter",
      key: "coverLetter",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
    },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: { key: string }) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleStatusChange(record.key, key)}
            items={[
              { key: "Approved", label: "Approved" },
              { key: "Rejected", label: "Rejected" },
              { key: "On Hold", label: "On Hold" },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              {status[record.key] || "Select Status"}{" "}
              {/* Show selected status or default text */}
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      resume: "Resume.pdf",
      coverLetter: "CoverLetter.docx",
      availability: "2025-02-01 10:00 AM",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      resume: "Resume.pdf",
      coverLetter: "CoverLetter.docx",
      availability: "2025-03-01 02:00 PM",
    },
    // Add more data here
  ];

  return (
    <div className="p-5">
      <h1>Applied Candidates</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Candidates;
