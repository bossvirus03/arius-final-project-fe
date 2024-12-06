import { Modal, Form, Input, Button, message } from "antd";
import useCreateTag from "../hooks/tag/useCreateTag";

interface TagCreateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

function TagCreateModal({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: TagCreateModalProps) {
  const [form] = Form.useForm();
  const { createTag } = useCreateTag();

  const handleSubmit = (body: { name: string; description: string }) => {
    createTag(
      { body },
      {
        onSuccess: () => {
          message.success("Tag created successfully!");
          form.resetFields();
          setIsModalOpen(false);
          refetch();
        },
        onError: (error: any) => {
          message.error(`Failed to create tag: ${error.message}`);
        },
      }
    );
  };

  return (
    <Modal
      title="Create Tag"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the tag name" }]}
        >
          <Input placeholder="Enter tag name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter tag description" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

export default TagCreateModal;
