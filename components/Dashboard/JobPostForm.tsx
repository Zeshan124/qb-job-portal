"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { postJob } from "@/app/utils/api";

interface Category {
  id: number;
  name: string;
}

const { Option } = Select;
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const JobPostForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://192.168.18.47:4000/apis/categories/getAll"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");

        const result: {
          message: string;
          data: { categoryID: number; categoryName: string }[];
        } = await response.json();

        console.log("Fetched Categories:", result); // Debugging log 🚀

        // Ensure correct type assignment
        const formattedCategories: Category[] = result.data.map((category) => ({
          id: category.categoryID, // Use correct key from API
          name: category.categoryName, // Use correct key from API
        }));

        setCategories(formattedCategories); // Update state correctly
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Failed to load categories");
        setCategories([]);
      } finally {
        setFetching(false);
      }
    };

    fetchCategories();
  }, []);

  const onFinish = async (values: {
    jobTitle: string;
    location: string;
    minSalary: number;
    maxSalary: number;
    categoryID: number;
  }) => {
    setLoading(true);

    try {
      await postJob({ ...values, jobDescription }); // Send jobDescription separately
      message.success("Job posted successfully!");
      form.resetFields();
      setJobDescription(""); // Clear editor after submission
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

      {/* HTML Editor for Job Description */}
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
        rules={[
          { required: true, message: "Please enter the minimum salary" },
          {
            type: "number",
            min: 0,
            message: "Salary must be a positive number",
          },
        ]}
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
        rules={[
          { required: true, message: "Please enter the maximum salary" },
          {
            type: "number",
            min: 0,
            message: "Salary must be a positive number",
          },
        ]}
      >
        <InputNumber
          placeholder="Enter maximum salary"
          style={{ width: "100%" }}
          min={0}
        />
      </Form.Item>

      {/* Dynamic Category Select */}
      <Form.Item
        label="Category"
        name="categoryID"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Select category" loading={fetching}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
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
