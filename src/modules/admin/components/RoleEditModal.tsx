import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import useUpdateRole from "../hooks/role/useUpdateRole";
import { RoleResponse } from "../../../types/backend";

interface RoleEditModalProps {
  actionRole: RoleResponse | null;
  setActionRole: (role: RoleResponse | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

function RoleEditModal({
  actionRole,
  setActionRole,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: RoleEditModalProps) {
  const [form] = Form.useForm();
  const { updateRole } = useUpdateRole();

  const handleSubmit = (values: { name: string; description: string }) => {
    if (!actionRole) return;

    updateRole(
      {
        role: actionRole.name,
        updates: values,
      },
      {
        onSuccess: () => {
          message.success("Role updated successfully!");
          setIsModalOpen(false);
          setActionRole(null);
          refetch();
        },
        onError: (error) => {
          message.error(`Failed to update role: ${error.message}`);
        },
      }
    );
  };

  return (
    <Modal
      title="Edit Role"
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setActionRole(null);
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={actionRole || {}}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the role name" }]}
        >
          <Input placeholder="Enter role name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter role description" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

export default RoleEditModal;
