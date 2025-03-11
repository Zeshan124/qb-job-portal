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
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { postJob, getCategories, getCities } from "@/app/utils/api";
import { Heading } from "@/paths";
import { City } from "../types";

const { Option } = Select;
const { Title } = Typography;
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const JobPostForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<
    { categoryID: number; categoryName: string }[]
  >([]);
  const [fetching, setFetching] = useState(true);
  const [jobPostImage, setJobPostImage] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryData, cityData] = await Promise.all([
          getCategories(),
          getCities(),
        ]);
        setCategories(categoryData);
        setCities(cityData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleFileChange = (info: any) => {
    const file = info.fileList[0]?.originFileObj || null;
    setJobPostImage(file);
  };

  const onFinish = async (values: {
    jobTitle: string;
    location: string;
    cityID: number;
    cityName: string;
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
    location;
    const [cityName, cityID] = values.location.split("-");
    try {
      const formData = new FormData();
      formData.append("jobTitle", values.jobTitle);
      formData.append("jobDescription", jobDescription);
      formData.append("location", cityName);
      formData.append("cityID", cityID);
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
    <div className="max-w-8xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        {/* Header */}
        <Title
          level={3}
          className=" text-gray-800 mb-6 !important"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Create Job Posting
        </Title>

        {/* Job Title */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Job Title</span>}
          name="jobTitle"
          rules={[{ required: true, message: "Please enter the job title" }]}
        >
          <Input
            placeholder="Enter job title"
            className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </Form.Item>

        {/* Job Description */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">Job Description</span>
          }
          required
          rules={[
            {
              validator: (_, value) =>
                jobDescription.trim()
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Please enter the job description")
                    ),
            },
          ]}
        >
          <ReactQuill
            value={jobDescription}
            onChange={setJobDescription}
            theme="snow"
            placeholder="Enter job description..."
            className="border-gray-300 rounded-md"
          />
        </Form.Item>

        {/* City Selection */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Location</span>}
          name="location"
          rules={[{ required: true, message: "Please select a city" }]}
        >
          <Select
            placeholder="Select city"
            className="rounded-md"
            dropdownClassName="border-gray-300 rounded-md"
          >
            {cities.map((city) => (
              <Select.Option
                key={city.cityID}
                value={`${city.cityName}-${city.cityID}`}
              >
                {city.cityName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Salary Range */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">Minimum Salary</span>
            }
            name="minSalary"
            rules={[
              { required: true, message: "Please enter the minimum salary" },
            ]}
          >
            <InputNumber
              placeholder="Enter minimum salary"
              className="w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              min={0}
              controls={false}
              onKeyDown={(e) => {
                if (
                  !/[\d]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 font-medium">Maximum Salary</span>
            }
            name="maxSalary"
            rules={[
              { required: true, message: "Please enter the maximum salary" },
            ]}
          >
            <InputNumber
              placeholder="Enter maximum salary"
              className="w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              min={0}
              controls={false}
              onKeyDown={(e) => {
                if (
                  !/[\d]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
        </div>

        {/* Category */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Category</span>}
          name="categoryID"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select category"
            loading={fetching}
            className="rounded-md"
            dropdownClassName="border-gray-300 rounded-md"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <Select.Option
                  key={category.categoryID}
                  value={category.categoryID}
                >
                  {category.categoryName}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled value="">
                No categories available
              </Select.Option>
            )}
          </Select>
        </Form.Item>

        {/* File Upload */}
        <Form.Item
          label={
            <span className="text-gray-700 font-medium">Job Post Image</span>
          }
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            showUploadList={true}
            maxCount={1}
            accept="image/*"
            className="w-full"
          >
            <Button
              icon={<UploadOutlined />}
              className="w-full border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500 rounded-md"
            >
              Upload Image
            </Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            className="w-[200px] bg-indigo-600 hover:to-indigo-700 !important text-white font-semibold rounded-md transition-all duration-300 transform"
          >
            Post Job
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JobPostForm;
