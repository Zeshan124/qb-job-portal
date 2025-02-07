"use client";

import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Spin, message } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import {
  updateCandidateStatus,
  getCandidateByID,
  downloadResume,
  getCandidates,
} from "@/app/utils/api"; // Import necessary APIs

const API_URL = process.env.NEXT_PUBLIC_URL_API || "http://192.168.18.47:4000";

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
      console.error("Error updating candidate status:", error);
      message.error("Failed to update status. Please try again.");
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
        <div className="flex space-x-4">
          {/* View Resume */}
          {/* <a
            href={`${API_URL}${record.cvPDF}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View
          </a> */}

          {/* Download Resume */}
          <button
            onClick={() => handleDownloadResume(record.candidateID)}
            className="text-green-600 hover:underline"
          >
            Download
          </button>
        </div>
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
            <Button>{record.status} </Button>
          </Dropdown>
        );
      },
    },
  ];

  const handleDownloadResume = async (candidateID: number) => {
    try {
      const resumeBlob = await downloadResume(candidateID);

      // Create a blob from the response
      const blob = new Blob([resumeBlob], { type: "application/pdf" });

      // Generate a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `resume_${candidateID}.pdf`); // Set download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Cleanup
    } catch (error) {
      console.error("Error downloading resume:", error);
      message.error("Failed to download the resume. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h1>Applied Candidates</h1>
      {loading ? (
        <div className="text-center mt-20">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={candidates.map((candidate) => ({
            ...candidate,
            key: candidate.candidateID,
          }))}
        />
      )}
    </div>
  );
};

export default Candidates;
