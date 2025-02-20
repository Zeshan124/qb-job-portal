'use client'
import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Input, Modal } from "antd";
import AddCategoryModal from "./AddCategoryModal";
import { getCategories, deleteCategory, updateCategory } from "@/app/utils/api";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
}

interface Category {
  categoryID: number;
  categoryName: string;
  createdAt: string;
  jobs: Job[];
}

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
    <div>
      <Button
        type="primary"
        className="bg-[#8570C5]"
        onClick={() => setIsAddModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        + Add Category
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="categoryID"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <ul>
              {record.jobs.map((job) => (
                <li key={job.jobID}>
                  {job.jobTitle} - {job.location}
                </li>
              ))}
            </ul>
          ),
        }}
      />
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refreshCategories={loadCategories}
      />

      <Modal
        title="Edit Category"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleUpdateCategory}
        okText="Update"
      >
        <Input
          value={updatedCategoryName}
          onChange={(e) => setUpdatedCategoryName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Category;
