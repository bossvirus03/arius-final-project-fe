import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import useUpdateCategory from "../hooks/category/useUpdateCategory";
import { CategoryRecord } from "../../../types/backend";

interface CategoryEditModalProps {
  actionCategory: CategoryRecord | null;
  setActionCategory: (category: CategoryRecord | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

function CategoryEditModal({
  actionCategory,
  setActionCategory,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: CategoryEditModalProps) {
  const [form] = Form.useForm();
  const { updateCategory } = useUpdateCategory();

  const handleSubmit = (values: { name: string; description: string }) => {
    if (!actionCategory) return;

    updateCategory(
      {
        category: actionCategory.name,
        updates: values,
      },
      {
        onSuccess: () => {
          message.success("Category updated successfully!");
          setIsModalOpen(false);
          setActionCategory(null);
          refetch();
        },
        onError: (error) => {
          message.error(`Failed to update category: ${error.message}`);
        },
      }
    );
  };

  return (
    <Modal
      title="Edit Category"
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setActionCategory(null);
      }}
      footer={null}
      maskClosable={false}
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={actionCategory || {}}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter category description" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

export default CategoryEditModal;
