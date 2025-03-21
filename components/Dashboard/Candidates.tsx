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
  Modal,
  Progress,
} from "antd";
import {
  updateCandidateStatus,
  fetchApplications,
  downloadResume,
  deleteCandidate,
} from "@/app/utils/api";
import {
  DeleteOutlined,
  DownOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { title } from "process";

const { Title } = Typography;
const { Option } = Select;

interface Candidate {
  jobTitle: string;
  candidateID: number;
  name: string;
  email: string;
  phoneNo: string;
  matchScore: number;
  cvPDF: string;
  availabilityDate: string;
  availabilityTime: string;
  jobID: number;
  createdAt: string;
  status: string;
}

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [deleteCandidateId, setDeleteCandidateId] = useState<number | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  // const [showScoreForCandidates, setShowScoreForCandidates] = useState<{
  //   [key: number]: boolean;
  // }>({});
  // const [loadingScores, setLoadingScores] = useState<{
  //   [key: number]: boolean;
  // }>({});
  // const [progressValues, setProgressValues] = useState<{
  //   [key: number]: number;
  // }>({});
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

  const handleDelete = async (candidateID: number) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setIsDeleting(true);
          await deleteCandidate(candidateID);
          setData((prevCandidates) =>
            prevCandidates.filter(
              (candidate) => candidate.candidateID !== candidateID
            )
          );
          message.success("Candidate deleted successfully!");
          fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
          message.error("Failed to delete candidate. Please try again.");
        } finally {
          setIsDeleting(false);
        }
      },
    });
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

  // const startLoadingScore = (candidateID: number) => {
  //   setLoadingScores((prev) => ({
  //     ...prev,
  //     [candidateID]: true,
  //   }));
  //   setProgressValues((prev) => ({
  //     ...prev,
  //     [candidateID]: 0,
  //   }));

  //   const interval = setInterval(() => {
  //     setProgressValues((prev) => {
  //       const currentValue = prev[candidateID] || 0;
  //       if (currentValue >= 100) {
  //         clearInterval(interval);

  //         // Show the score after the progress is complete
  //         setTimeout(() => {
  //           setLoadingScores((prev) => ({
  //             ...prev,
  //             [candidateID]: false,
  //           }));
  //           setShowScoreForCandidates((prev) => ({
  //             ...prev,
  //             [candidateID]: true,
  //           }));
  //         }, 200);

  //         return prev;
  //       }

  //       return {
  //         ...prev,
  //         [candidateID]: currentValue + 4, // Increment by 4 for faster animation
  //       };
  //     });
  //   }, 40); // Update approximately every 40ms for smooth animation
  // };

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-red-500";
    if (score < 50) return "text-yellow-500";
    return "text-green-500";
  };

  // const getProgressStrokeColor = (score: number) => {
  //   if (score < 30) return "#f5222d"; // Red
  //   if (score < 50) return "#faad14"; // Yellow
  //   return "#52c41a"; // Green
  // };

  const filteredCandidates = data.filter((candidate) => {
    if (filter === "all") return true;
    return candidate.status?.toLowerCase() === filter.toLowerCase();
  });

  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
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
      title: "Match Score",
      key: "matchScore",
      width: 150,
      render: (_: unknown, record: Candidate) => {
        return (
          <span className={`font-semibold ${getScoreColor(record.matchScore)}`}>
            {record.matchScore}%
          </span>
        );
      },
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
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Candidate) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          loading={isDeleting && deleteCandidateId === record.candidateID}
          onClick={() => handleDelete(record.candidateID)}
        >
          Delete
        </Button>
      ),
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
