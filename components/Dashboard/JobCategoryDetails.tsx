"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { getCategoryById } from "@/app/utils/api";

const JobCategoryDetails: React.FC = () => {
  const [jobID, setJobID] = useState<number | null>(null);
  const [category, setCategory] = useState<{
    categoryID: number;
    categoryName: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    if (!jobID) {
      message.error("Please enter a Job ID.");
      return;
    }

    setLoading(true);

    try {
      const fetchedCategory = await getCategoryById(jobID);
      setCategory(fetchedCategory); // Update state with fetched category
      message.success("Category fetched successfully!");
    } catch (error) {
      message.error(`Failed to fetch category: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form layout="inline" onFinish={fetchCategory}>
        <Form.Item label="Job ID">
          <Input
            type="number"
            placeholder="Enter Job ID"
            value={jobID || ""}
            onChange={(e) => setJobID(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Fetch Category
          </Button>
        </Form.Item>
      </Form>

      {/* Display Category Details */}
      {loading ? (
        <Spin />
      ) : (
        category && (
          <div style={{ marginTop: "20px" }}>
            <h3>Category Details</h3>
            <p>
              <strong>Category ID:</strong> {category.categoryID}
            </p>
            <p>
              <strong>Category Name:</strong> {category.categoryName}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default JobCategoryDetails;
