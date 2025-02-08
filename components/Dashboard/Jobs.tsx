"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  message,
  Input,
  Spin,
  Form,
  Select,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getJobs, deleteJob, updateJob } from "@/app/utils/api";

const { Title } = Typography;

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
  jobStatus: string;
}

const JobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        message.error("Failed to fetch job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async () => {
    if (!deleteJobId) return;

    try {
      setIsDeleting(true);
      await deleteJob(deleteJobId);
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.jobID !== deleteJobId)
      );

      message.success("Job deleted successfully!");
    } catch (error) {
      message.error("Failed to delete job. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteJobId(null);
    }
  };

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setEditModalVisible(true);

    form.setFieldsValue({
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      jobStatus: job.jobStatus || "open",
    });
  };

  const handleUpdateJob = async () => {
    if (!editingJob) return;

    try {
      setEditLoading(true);
      const values = form.getFieldsValue();

      const updatedData = {
        jobTitle: values.jobTitle,
        jobDescription: values.jobDescription,
        jobStatus: values.jobStatus ?? editingJob.jobStatus,
      };

      await updateJob(editingJob.jobID, updatedData);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobID === editingJob.jobID ? { ...job, ...updatedData } : job
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

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
      render: (text: string) => {
        const truncatedText =
          text.length > 70 ? text.slice(0, 70) + "..." : text;
        return <span>{truncatedText}</span>;
      },
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
      title: "Min Salary",
      dataIndex: "minSalary",
      key: "minSalary",
      render: (salary: number | null) =>
        salary ? salary.toLocaleString() : "N/A",
    },
    {
      title: "Max Salary",
      dataIndex: "maxSalary",
      key: "maxSalary",
      render: (salary: number | null) =>
        salary ? salary.toLocaleString() : "N/A",
    },

    {
      title: "Status",
      dataIndex: "jobStatus",
      key: "jobStatus",
      filters: [
        { text: "Open", value: "open" },
        { text: "Closed", value: "close" },
      ],
      onFilter: (value: any, record: Job) => record.jobStatus === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Job) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => setDeleteJobId(record.jobID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <Title level={3} className="text-center sm:text-left">
        Posted Jobs
      </Title>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <Input
          placeholder="Search jobs"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          allowClear
          style={{ maxWidth: "300px" }}
        />
      </div>
      {loading ? (
        <div className="flex justify-center mt-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredJobs.map((job) => ({ ...job, key: job.jobID }))}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
      <Modal
        title="Confirm Deletion"
        open={deleteJobId !== null}
        onOk={handleDelete}
        onCancel={() => setDeleteJobId(null)}
        confirmLoading={isDeleting}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>
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
          <Form.Item label="Job Status" name="jobStatus">
            <Select>
              <Select.Option value="open">Open</Select.Option>
              <Select.Option value="close">Closed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobsTable;
