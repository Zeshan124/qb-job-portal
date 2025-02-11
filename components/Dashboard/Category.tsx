import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Input, Modal } from "antd";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";

const API_BASE_URL = "http://192.168.18.47:4000/apis/categories";

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

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔄 Fetch Categories from API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      setCategories([...response.data.data]);
    } catch (error) {
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete Category
  const handleDelete = async (categoryId: number) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      message.error("Authentication token is missing! Please log in.");
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/delete`, {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        data: { categoryId },
      });

      console.log("DELETE API Response:", response.data);
      if (response.status === 200 || response.status === 201) {
        message.success("Category deleted successfully");
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.categoryID !== categoryId
          )
        );
      } else {
        message.error("Failed to delete category");
      }
    } catch (error: any) {
      console.error("DELETE API Error:", error.response || error.message);
      message.error(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  };

  // ✏️ Handle Edit Click
  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setUpdatedCategoryName(category.categoryName);
    setIsEditModalOpen(true);
  };

  // 🔄 Handle Update Category
  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      message.error("Authentication token is missing! Please log in.");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/update`,
        {
          categoryId: editingCategory.categoryID,
          categoryName: updatedCategoryName,
        },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("PATCH API Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        message.success("Category updated successfully");
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.categoryID === editingCategory.categoryID
              ? { ...cat, categoryName: updatedCategoryName }
              : cat
          )
        );
        setIsEditModalOpen(false);
      } else {
        message.error("Failed to update category");
      }
    } catch (error: any) {
      console.error("PATCH API Error:", error.response || error.message);
      message.error(
        error.response?.data?.message || "Failed to update category"
      );
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
        refreshCategories={fetchCategories}
      />

      {/* Edit Category Modal */}
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
