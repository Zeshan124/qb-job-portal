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
  InputNumber,
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
import TextArea from "antd/es/input/TextArea";

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

    const cleanDescription = job.jobDescription.replace(/<\/?[^>]+(>|$)/g, "");

    form.setFieldsValue({
      jobTitle: job.jobTitle,
      jobDescription: cleanDescription,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
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
        minSalary: values.minSalary,
        maxSalary: values.maxSalary,
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

  // console.log("hello", jobs);
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
            className="bg-indigo-600"
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-xl shadow-lg mx-auto max-w-[100%] sm:max-w-8xl">
      {/* Header Section */}
      <Title
        level={3}
        className="text-gray-800 mb-6 text-xl sm:text-2xl lg:text-3xl"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Posted Jobs
      </Title>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Input
          placeholder="Search jobs"
          prefix={<SearchOutlined className="text-gray-500" />}
          value={searchText}
          onChange={handleSearch}
          allowClear
          className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-full sm:max-w-[300px]"
        />
      </div>

      {/* Loading State or Table */}
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
              responsive: true,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              className: "px-2",
            }}
            className="custom-table min-w-full"
            scroll={{ x: "max-content" }}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <span className="text-lg font-semibold text-gray-800">
            Confirm Deletion
          </span>
        }
        open={deleteJobId !== null}
        onOk={handleDelete}
        onCancel={() => setDeleteJobId(null)}
        confirmLoading={isDeleting}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-red-600 hover:bg-red-700 rounded-md w-full sm:w-auto",
        }}
        cancelButtonProps={{ className: "rounded-md w-full sm:w-auto" }}
        width="90%"
        className="max-w-[400px]"
        centered
        footer={[
          <div
            key="footer"
            className="flex flex-col sm:flex-row gap-2 justify-end"
          >
            <Button
              key="cancel"
              onClick={() => setDeleteJobId(null)}
              className="rounded-md w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              key="delete"
              type="primary"
              danger
              onClick={handleDelete}
              loading={isDeleting}
              className="bg-red-600 hover:bg-red-700 rounded-md w-full sm:w-auto"
            >
              Delete
            </Button>
          </div>,
        ]}
      >
        <p className="text-gray-600">
          Are you sure you want to delete this job?
        </p>
      </Modal>

      {/* Edit Job Modal */}
      <Modal
        title={
          <span className="text-lg font-semibold text-gray-800">Edit Job</span>
        }
        open={editModalVisible}
        onOk={handleUpdateJob}
        onCancel={() => setEditModalVisible(false)}
        confirmLoading={editLoading}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          className:
            "bg-indigo-600 hover:bg-indigo-700 rounded-md w-full sm:w-auto",
        }}
        cancelButtonProps={{ className: "rounded-md w-full sm:w-auto" }}
        width="90%"
        className="max-w-[600px]"
        centered
        footer={[
          <div
            key="footer"
            className="flex flex-col sm:flex-row gap-2 justify-end"
          >
            <Button
              key="cancel"
              onClick={() => setEditModalVisible(false)}
              className="rounded-md w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={handleUpdateJob}
              loading={editLoading}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-md w-full sm:w-auto"
            >
              Update
            </Button>
          </div>,
        ]}
      >
        <Form form={form} layout="vertical" className="py-4 space-y-4">
          <Form.Item
            label={<span className="text-gray-700 font-medium">Job Title</span>}
            name="jobTitle"
            rules={[{ required: true, message: "Job title is required" }]}
          >
            <Input className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">Job Description</span>
            }
            name="jobDescription"
          >
            <TextArea
              rows={4}
              className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </Form.Item>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Min Salary</span>
              }
              name="minSalary"
              rules={[
                { required: true, message: "Minimum salary is required" },
                {
                  validator: (_, value) =>
                    value >= 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Salary must be a positive number")
                        ),
                },
              ]}
            >
              <InputNumber
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Max Salary</span>
              }
              name="maxSalary"
              rules={[
                { required: true, message: "Maximum salary is required" },
                {
                  validator: (_, value) =>
                    value >= 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Salary must be a positive number")
                        ),
                },
              ]}
            >
              <InputNumber
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                min={0}
              />
            </Form.Item>
          </div>
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">Job Status</span>
            }
            name="jobStatus"
          >
            <Select className="rounded-md">
              <Select.Option value="open">Open</Select.Option>
              <Select.Option value="close">Closed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span className="text-gray-700 font-medium">Category</span>}
            name="categoryID"
          >
            <Select className="rounded-md">
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

      {/* Custom Styles */}
      <style jsx>{`
        .custom-table :global(.ant-table) {
          border-radius: 8px;
          overflow: hidden;
        }
        .custom-table :global(.ant-table-thead > tr > th) {
          background-color: #f8f9fa;
          color: #374151;
          font-weight: 600;
          font-size: 14px;
          padding: 12px 8px;
        }
        .custom-table :global(.ant-table-tbody > tr > td) {
          padding: 12px 8px;
          font-size: 14px;
        }
        .custom-table :global(.ant-table-row) {
          transition: all 0.3s ease;
        }
        .custom-table :global(.ant-table-row:hover) {
          background-color: #f5f6ff;
        }
        @media (max-width: 640px) {
          .custom-table :global(.ant-table-thead > tr > th),
          .custom-table :global(.ant-table-tbody > tr > td) {
            font-size: 12px;
            padding: 8px 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default JobsTable;
