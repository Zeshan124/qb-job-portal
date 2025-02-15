"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { postJob, getCategories } from "@/app/utils/api";

const { Option } = Select;
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const JobPostForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [categories, setCategories] = useState<
    { categoryID: number; categoryName: string }[]
  >([]);
  const [fetching, setFetching] = useState(true);
  const [jobPostImage, setJobPostImage] = useState<File | null>(null);

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

  const handleFileChange = (info: any) => {
    const file = info.fileList[0]?.originFileObj || null;
    setJobPostImage(file);
  };

  const onFinish = async (values: {
    jobTitle: string;
    location: string;
    minSalary: number;
    maxSalary: number;
    categoryID: number;
  }) => {
    if (!jobDescription.trim()) {
      message.error("Please enter the job description.");
      return;
    }

    if (!jobPostImage) {
      message.error("Please upload a job post image.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Ensure we use FormData to match `multipart/form-data`
      const formData = new FormData();
      formData.append("jobTitle", values.jobTitle);
      formData.append("jobDescription", jobDescription);
      formData.append("location", values.location);
      formData.append("minSalary", values.minSalary.toString());
      formData.append("maxSalary", values.maxSalary.toString());
      formData.append("categoryID", values.categoryID.toString());
      formData.append("jobPostImage", jobPostImage);

      await postJob(formData);
      message.success("Job posted successfully!");

      form.resetFields();
      setJobDescription("");
      setJobPostImage(null);
    } catch (error) {
      message.error(`Failed to post job: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Job Title"
        name="jobTitle"
        rules={[{ required: true, message: "Please enter the job title" }]}
      >
        <Input placeholder="Enter job title" />
      </Form.Item>

      <Form.Item
        label="Job Description"
        layout="vertical"
        required
        rules={[
          {
            validator: (_, value) =>
              jobDescription.trim()
                ? Promise.resolve()
                : Promise.reject(new Error("Please enter the job description")),
          },
        ]}
      >
        <ReactQuill
          value={jobDescription}
          onChange={setJobDescription}
          theme="snow"
          placeholder="Enter job description..."
        />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please enter the job location" }]}
      >
        <Input placeholder="Enter location" />
      </Form.Item>

      <Form.Item
        label="Minimum Salary"
        name="minSalary"
        rules={[{ required: true, message: "Please enter the minimum salary" }]}
      >
        <InputNumber
          placeholder="Enter minimum salary"
          style={{ width: "100%" }}
          min={0}
        />
      </Form.Item>

      <Form.Item
        label="Maximum Salary"
        name="maxSalary"
        rules={[{ required: true, message: "Please enter the maximum salary" }]}
      >
        <InputNumber
          placeholder="Enter maximum salary"
          style={{ width: "100%" }}
          min={0}
        />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryID"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Select category" loading={fetching}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </Option>
            ))
          ) : (
            <Option disabled value="">
              No categories available
            </Option>
          )}
        </Select>
      </Form.Item>

      {/* 🔹 File Upload for Job Image */}
      <Form.Item label="Job Post Image">
        <Upload
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleFileChange} // Handle file selection
          showUploadList={true}
          maxCount={1}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          block
        >
          Post Job
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JobPostForm;
