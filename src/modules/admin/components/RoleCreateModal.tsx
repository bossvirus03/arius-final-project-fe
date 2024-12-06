import { Modal, Form, Input, Button, message } from "antd";
import useCreateRole from "../hooks/role/useCreateRole";

interface RoleCreateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

function RoleCreateModal({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: RoleCreateModalProps) {
  const [form] = Form.useForm();
  const { createRole } = useCreateRole();

  const handleSubmit = (body: { name: string; description: string }) => {
    createRole(
      { body },
      {
        onSuccess: () => {
          message.success("Role created successfully!");
          form.resetFields();
          setIsModalOpen(false);
          refetch();
        },
        onError: (error: any) => {
          message.error(`Failed to create role: ${error.message}`);
        },
      }
    );
  };

  return (
    <Modal
      title="Create Role"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

export default RoleCreateModal;
