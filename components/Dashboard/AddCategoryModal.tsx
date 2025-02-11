import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const API_BASE_URL = "http://192.168.18.47:4000/apis/categories";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshCategories: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  refreshCategories,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleAddCategory = async (values: { categoryName: string }) => {
    setLoading(true);

    // 🔑 Get token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // 📌 Define headers properly
    const headers = token
      ? { "x-access-token": token, "Content-Type": "application/json" }
      : {};

    if (!token) {
      message.error("Authentication token is missing! Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.18.47:4000/apis/categories/add",
        values,
        { headers }
      );

      console.log("API Response:", response.data); // ✅ Debugging
      if (response.status === 200 || response.status === 201) {
        message.success("Category added successfully");
        form.resetFields();
        refreshCategories();
        onClose();
      } else {
        message.error("Failed to add category");
      }
    } catch (error: any) {
      console.error("POST API Error:", error.response || error.message);
      message.error(error.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Category"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Add
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleAddCategory} layout="vertical">
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
