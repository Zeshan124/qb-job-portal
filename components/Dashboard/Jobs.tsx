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
import {
  fetchJobs,
  deleteJob,
  updateJob,
  getCategories,
} from "@/app/utils/api";

const { Title } = Typography;

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
  categoryID: number;
  jobStatus: string;
}

const JobsTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [deleteJobId, setDeleteJobId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [categories, setCategories] = useState<
    { categoryID: number; categoryName: string }[]
  >([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [pagination.current, pagination.pageSize, searchText]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(
          categoriesData.map((c) => ({
            categoryID: c.categoryID,
            categoryName: c.categoryName,
          }))
        );
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  const fetchData = async (
    page: number,
    pageSize: number,
    jobTitle: string
  ) => {
    setLoading(true);
    try {
      const { jobs, totalJobs } = await fetchJobs(page, pageSize, jobTitle);
      setJobs(jobs);
      setPagination((prev) => ({
        ...prev,
        total: totalJobs,
      }));
    } catch (error) {
      message.error("Failed to load jobs. Please try again.");
    }
    setLoading(false);
  };

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
      categoryID: job.categoryID,
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
        categoryID: values.categoryID,
      };

      console.log("📤 Updating Job ID:", editingJob.jobID);
      console.log("📝 Updated Data:", updatedData);

      const response = await updateJob(editingJob.jobID, updatedData);

      console.log("✅ Update Response:", response);
      const updatedCategory = categories.find(
        (category) => category.categoryID === updatedData.categoryID
      )?.categoryName;

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobID === editingJob.jobID
            ? {
                ...job,
                ...updatedData,
                categoryName: updatedCategory || "Unknown Category",
              }
            : job
        )
      );

      message.success("Job updated successfully!");
      setEditModalVisible(false);
      setEditingJob(null);
    } catch (error) {
      console.error("❌ Error updating job:", error);
      message.error("Failed to update job. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  console.log("hello", jobs);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

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
        const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
        const truncatedText =
          plainText.length > 70 ? plainText.slice(0, 70) + "..." : plainText;

        return <span dangerouslySetInnerHTML={{ __html: truncatedText }} />;
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
        <div className="flex gap-2">
          <Button
            type="primary"
            className="bg-[#8570C5]"
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
            dataSource={jobs}
            rowKey={(record) => record.jobID.toString()}
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
          <Form.Item label="Category" name="categoryID">
            <Select>
              {categories.map((category) => (
                <Select.Option
                  key={category.categoryID}
                  value={category.categoryID}
                >
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobsTable;
