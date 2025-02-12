import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { addCategory } from "@/app/utils/api";

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
    const success = await addCategory(values.categoryName);
    if (success) {
      form.resetFields();
      refreshCategories(); // ✅ Ensures UI updates
      onClose();
    }
    setLoading(false);
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
