"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Dropdown,
  Menu,
  Button,
  Spin,
  message,
  Typography,
  Select,
} from "antd";
import {
  updateCandidateStatus,
  fetchApplications,
  downloadResume,
} from "@/app/utils/api";
import { DownOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

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
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const { applications, totalApplications } = await fetchApplications(
        page,
        pageSize
      );
      setData(applications);
      setPagination((prev) => ({
        ...prev,
        total: totalApplications,
      }));
    } catch (error) {
      message.error("Failed to load applications. Please check the API.");
    }
    setLoading(false);
  };

  const handleStatusChange = async (candidateID: number, newStatus: string) => {
    try {
      await updateCandidateStatus(candidateID, newStatus);

      setData((prevData) =>
        prevData.map((candidate) =>
          candidate.candidateID === candidateID
            ? { ...candidate, status: newStatus }
            : candidate
        )
      );

      const candidate = data.find((c) => c.candidateID === candidateID);
      const candidateName = candidate
        ? candidate.name
        : `Candidate #${candidateID}`;

      message.success(`${candidateName}'s status updated to "${newStatus}"`);
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

  const filteredCandidates = data.filter((candidate) => {
    if (filter === "all") return true;
    return candidate.status?.toLowerCase() === filter.toLowerCase();
  });

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
      title: "Phone",
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

        const getStatusLabel = (status: string) => {
          switch (status.toLowerCase()) {
            case "shortlist":
              return "Approved";
            case "reject":
              return "Rejected";
            case "hold":
              return "On Hold";
            default:
              return status;
          }
        };

        const getStatusClass = (status: string) => {
          switch (status.toLowerCase()) {
            case "shortlist":
              return "bg-green-500 hover:bg-green-600 text-white";
            case "reject":
              return "bg-red-500 hover:bg-red-600 text-white";
            case "hold":
              return "bg-yellow-400 hover:bg-yellow-500 text-black";
            default:
              return "bg-gray-300 hover:bg-gray-400 text-black";
          }
        };

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              className={`flex items-center space-x-2 ${getStatusClass(
                record.status
              )}`}
            >
              {getStatusLabel(record.status)} <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Title level={3} className="text-center sm:text-left">
          Applied Candidates
        </Title>

        <Select
          value={filter}
          onChange={(value) => setFilter(value)}
          className="w-52"
          size="large"
        >
          <Option value="all">All Candidates</Option>
          <Option value="shortlist">Shortlisted</Option>
          <Option value="reject">Rejected</Option>
          <Option value="hold">On Hold</Option>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredCandidates}
            rowKey={(record) => record.candidateID.toString()}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              onChange: (page, pageSize) =>
                setPagination({ ...pagination, current: page, pageSize }),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Candidates;
