import { Modal, Form, Input, Button, message } from "antd";
import useCreateCategory from "../hooks/category/useCreateCategory";

interface CategoryCreateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

function CategoryCreateModal({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: CategoryCreateModalProps) {
  const [form] = Form.useForm();
  const { createCategory } = useCreateCategory();

  const handleSubmit = (body: { name: string; description: string }) => {
    createCategory(
      { body },
      {
        onSuccess: () => {
          message.success("Category created successfully!");
          form.resetFields();
          setIsModalOpen(false);
          refetch();
        },
        onError: (error: any) => {
          message.error(`Failed to create category: ${error.message}`);
        },
      }
    );
  };

  return (
    <Modal
      title="Create Category"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

export default CategoryCreateModal;
