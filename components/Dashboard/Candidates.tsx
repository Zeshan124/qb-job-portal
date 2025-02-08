"use client";

import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Spin, message, Typography } from "antd";
import "antd/dist/reset.css";
import {
  updateCandidateStatus,
  getCandidates,
  downloadResume,
} from "@/app/utils/api";
import { DownOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface Candidate {
  candidateID: number;
  name: string;
  email: string;
  phoneNo: string;
  cvPDF: string;
  availabilityDate: string;
  availabilityTime: string;
  jobID: number;
  createdAt: string;
  status: string;
}

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const candidatesData = await getCandidates();
        setCandidates(candidatesData);
      } catch (error) {
        message.error("Failed to fetch candidates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleStatusChange = async (candidateID: number, newStatus: string) => {
    try {
      await updateCandidateStatus(candidateID, newStatus);
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.candidateID === candidateID
            ? { ...candidate, status: newStatus }
            : candidate
        )
      );

      message.success(
        `Candidate #${candidateID}'s status updated to "${newStatus}"`
      );
    } catch (error) {
      message.error("Failed to update status. Please try again.");
    }
  };

  const handleDownloadResume = async (candidateID: number) => {
    try {
      const resumeBlob = await downloadResume(candidateID);
      const blob = new Blob([resumeBlob], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `resume_${candidateID}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      message.error("Failed to download the resume. Please try again.");
    }
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
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Resume",
      key: "resume",
      render: (_: unknown, record: Candidate) => (
        <Button
          type="link"
          onClick={() => handleDownloadResume(record.candidateID)}
        >
          Download
        </Button>
      ),
    },
    {
      title: "Availability",
      key: "availability",
      render: (_: unknown, record: Candidate) => (
        <span>
          {new Date(record.availabilityDate).toLocaleDateString()}{" "}
          {record.availabilityTime}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: Candidate) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleStatusChange(record.candidateID, key)}
            items={[
              { key: "shortlist", label: "Approved" },
              { key: "reject", label: "Rejected" },
              { key: "hold", label: "On Hold" },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button className="flex items-center space-x-2">
              {record.status} <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <Title level={3} className="text-center sm:text-left">
        Applied Candidates
      </Title>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={candidates.map((candidate) => ({
              ...candidate,
              key: candidate.candidateID,
            }))}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
    </div>
  );
};

export default Candidates;
