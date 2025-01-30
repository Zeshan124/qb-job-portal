// components/Dashboard/JobsTable.tsx
"use client";

import React, { useState } from "react";
import { Table, Button, Modal, message, Input } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";

interface Job {
  id: number;
  title: string;
  description: string;
  postedDate: string;
}

const JobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Software Engineer",
      description: "Develop and maintain web applications.",
      postedDate: "2025-01-01",
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Oversee product development lifecycle.",
      postedDate: "2025-01-15",
    },
    {
      id: 3,
      title: "Data Scientist",
      description: "Analyze and interpret complex data.",
      postedDate: "2025-02-01",
    },
    // Add more mock data here...
  ]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  // Handle Delete
  const handleDelete = (id: number) => {
    setIsDeleting(true);
    setTimeout(() => {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      setIsDeleting(false);
      setDeleteJobId(null);
      message.success("Job deleted successfully!");
    }, 1000);
  };

  // Open Delete Confirmation Modal
  const confirmDelete = (id: number) => {
    setDeleteJobId(id);
  };

  // Close Delete Modal
  const closeModal = () => {
    setDeleteJobId(null);
  };

  // Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filter jobs based on search text
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Job, b: Job) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true, // Truncate long descriptions
    },
    {
      title: "Posted Date",
      dataIndex: "postedDate",
      key: "postedDate",
      sorter: (a: Job, b: Job) =>
        new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Job) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => message.info(`Editing job: ${record.title}`)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => confirmDelete(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Job Postings</h2>
        {/* <Button
          type="primary"
          onClick={() => message.info("Add Job functionality coming soon!")}
        >
          Add Job
        </Button> */}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search jobs by title or description"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          allowClear
          style={{ width: 300 }}
        />
      </div>

      {/* Jobs Table */}
      <Table
        columns={columns}
        dataSource={filteredJobs}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={deleteJobId !== null}
        onOk={() => deleteJobId && handleDelete(deleteJobId)}
        onCancel={closeModal}
        confirmLoading={isDeleting}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>
    </div>
  );
};

export default JobsTable;