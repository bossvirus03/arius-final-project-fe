import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import useUpdateTag from "../hooks/tag/useUpdateTag";
import { TagRecord } from "../../../types/backend";

interface TagEditModalProps {
  actionTag: TagRecord | null;
  setActionTag: (tag: TagRecord | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

function TagEditModal({
  actionTag,
  setActionTag,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: TagEditModalProps) {
  const [form] = Form.useForm();
  const { updateTag } = useUpdateTag();

  const handleSubmit = (values: { name: string; description: string }) => {
    if (!actionTag) return;

    updateTag(
      {
        tag: actionTag.name,
        updates: values,
      },
      {
        onSuccess: () => {
          message.success("Tag updated successfully!");
          setIsModalOpen(false);
          setActionTag(null);
          refetch();
        },
        onError: (error) => {
          message.error(`Failed to update tag: ${error.message}`);
        },
      }
    );
  };

  return (
    <Modal
      title="Edit Tag"
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setActionTag(null);
      }}
      footer={null}
      maskClosable={false}
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={actionTag || {}}
      >
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

export default TagEditModal;
