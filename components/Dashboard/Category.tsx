"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Popconfirm,
  Input,
  Modal,
  Typography,
} from "antd";
import AddCategoryModal from "./AddCategoryModal";
import { getCategories, deleteCategory, updateCategory } from "@/app/utils/api";
import type { Category } from "../types";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (categoryId: number) => {
    const success = await deleteCategory(categoryId);
    if (success) {
      setCategories((prev) =>
        prev.filter((category) => category.categoryID !== categoryId)
      );
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setUpdatedCategoryName(category.categoryName);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    const success = await updateCategory(
      editingCategory.categoryID,
      updatedCategoryName
    );
    if (success) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.categoryID === editingCategory.categoryID
            ? { ...cat, categoryName: updatedCategoryName }
            : cat
        )
      );
      setIsEditModalOpen(false);
    }
  };

  const columns = [
    {
      title: "Category ID",
      dataIndex: "categoryID",
      key: "categoryID",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <div className="flex gap-2">
          <Button
            className="bg-[#8570C5]"
            type="primary"
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.categoryID)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-xl shadow-lg mx-auto max-w-[100%] sm:max-w-8xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Title
          level={3}
          className="text-gray-800 m-0 text-xl sm:text-2xl lg:text-3xl"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Category Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
        >
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="categoryID"
          loading={loading}
          className="custom-table min-w-full"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            responsive: true,
            className: "px-2",
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div className="p-4 bg-gray-50 rounded-md">
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                  {record.jobs.map((job) => (
                    <li key={job.jobID} className="text-gray-700">
                      <span className="font-medium">{job.jobTitle}</span>
                      <span className="text-gray-500"> - {job.location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
            rowExpandable: (record) => record.jobs?.length > 0,
          }}
          scroll={{ x: "max-content" }} // Ensures horizontal scrolling on small screens
        />
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refreshCategories={loadCategories}
      />

      {/* Edit Category Modal */}
      <Modal
        title={
          <span className="text-lg font-semibold text-gray-800">
            Edit Category
          </span>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleUpdateCategory}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          className:
            "bg-indigo-600 hover:bg-indigo-700 rounded-md w-full sm:w-auto",
        }}
        cancelButtonProps={{
          className: "rounded-md w-full sm:w-auto",
        }}
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
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-md w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={handleUpdateCategory}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-md w-full sm:w-auto"
            >
              Update
            </Button>
          </div>,
        ]}
      >
        <div className="space-y-4 py-4">
          <Input
            value={updatedCategoryName}
            onChange={(e) => setUpdatedCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-full"
          />
        </div>
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

export default Category;
