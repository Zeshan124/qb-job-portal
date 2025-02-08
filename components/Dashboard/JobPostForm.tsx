"use client";

import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { postJob } from "@/app/utils/api";

const { TextArea } = Input;
const { Option } = Select;

const JobPostForm: React.FC = () => {
  const [form] = Form.useForm(); // ✅ Create Form instance
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    jobTitle: string;
    jobDescription: string;
    location: string;
    minSalary: number;
    maxSalary: number;
    categoryID: number;
  }) => {
    setLoading(true);

    try {
      await postJob(values); // Call API
      message.success("Job posted successfully!");
      form.resetFields(); // ✅ Clear the form fields
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
        name="jobDescription"
        rules={[{ required: true, message: "Please enter the job description" }]}
      >
        <TextArea rows={4} placeholder="Enter job description" />
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
          { type: "number", min: 0, message: "Salary must be a positive number" },
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
          { type: "number", min: 0, message: "Salary must be a positive number" },
        ]}
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
        <Select placeholder="Select category">
          <Option value={1}>Software Engineer</Option>
          <Option value={2}>Product Manager</Option>
          <Option value={3}>Sales</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Post Job
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JobPostForm;
