"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Input, Spin, Alert, Form } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getJobs, deleteJob, updateJob } from "@/app/utils/api";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
}

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
}

const JobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const [deleteJobId, setDeleteJobId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (error) {
        setError("Failed to fetch job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle Delete Job
  // ✅ Handle Delete Job
  const handleDelete = async () => {
    if (!deleteJobId) return;

    try {
      setIsDeleting(true);
      await deleteJob(deleteJobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.jobID !== deleteJobId));
      message.success("Job deleted successfully!");
    } catch (error) {
      message.error("Failed to delete job. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteJobId(null);
    }
  };

   // ✅ Open Delete Confirmation Modal
   const confirmDelete = (id: number) => {
    setDeleteJobId(id);
  };

  // ✅ Close Delete Modal
  const closeModal = () => {
    setDeleteJobId(null);
  };

  // Handle Edit Job Click
  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setEditModalVisible(true);
    form.setFieldsValue(job);
  };

  // Handle Job Update
  const handleUpdateJob = async () => {
    if (!editingJob) return;

    try {
      setEditLoading(true);
      const values = form.getFieldsValue();
      await updateJob(editingJob.jobID, values);

      // Update job list
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobID === editingJob.jobID ? { ...job, ...values } : job
        )
      );

      message.success("Job updated successfully!");
      setEditModalVisible(false);
      setEditingJob(null);
    } catch (error) {
      message.error("Failed to update job. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filter jobs based on search text
  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      job.jobDescription.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a: Job, b: Job) => a.jobTitle.localeCompare(b.jobTitle),
    },
    {
      title: "Description",
      dataIndex: "jobDescription",
      key: "jobDescription",
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
        title: "Actions",
        key: "actions",
        render: (_: any, record: Job) => (
          <div className="flex space-x-2">
            <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditClick(record)}>
              Edit
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => confirmDelete(record.jobID)}>
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
        rowKey="jobID"
        pagination={{ pageSize: 5 }}
        bordered
      />

       {/* ✅ Delete Confirmation Modal */}
       <Modal
        title="Confirm Deletion"
        open={deleteJobId !== null}
        onOk={handleDelete}  // ✅ Call handleDelete when user clicks "OK"
        onCancel={closeModal}
        confirmLoading={isDeleting}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>

      {/* Edit Job Modal */}
      <Modal
        title="Edit Job"
        open={editModalVisible}
        onOk={handleUpdateJob}
        onCancel={() => setEditModalVisible(false)}
        confirmLoading={editLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: "Job title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Job Description" name="jobDescription">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobsTable;
