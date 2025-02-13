"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
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

    setLoading(true);

    try {
      await postJob({ ...values, jobDescription });
      message.success("Job posted successfully!");
      form.resetFields();
      setJobDescription(""); // Reset description after posting
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
          controls={false} // Hides stepper controls
          onKeyDown={(e) => {
            if (
              !/[\d]/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete"
            ) {
              e.preventDefault(); // Prevents non-numeric input
            }
          }}
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
          controls={false} // Hides stepper controls
          onKeyDown={(e) => {
            if (
              !/[\d]/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete"
            ) {
              e.preventDefault(); // Prevents non-numeric input
            }
          }}
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

      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          block
          className="transition-transform duration-300 bg-[#8570C5] hover:bg-purple-500 px-6 py-2 font-semibold text-white rounded-lg w-[200px] ml-0"
          style={{ width: "200px" }}
        >
          Post Job
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JobPostForm;
