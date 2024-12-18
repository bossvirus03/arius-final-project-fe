import React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Switch,
  Select,
  message,
  DatePicker,
} from "antd";
import useCreateUser from "../hooks/user/useCreateUser";
import { AxiosError } from "axios";

const { Option } = Select;

function UserCreateModal({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
}) {
  const [form] = Form.useForm();
  const { createUser, isPending } = useCreateUser();

  const handleOk = async () => {
    try {
      const body = await form.validateFields();
      createUser(
        { body },
        {
          onSuccess: () => {
            refetch(); // Refresh user list
            setIsModalOpen(false);
            form.resetFields();
            message.info("Create user successfully!");
          },
          onError: (err: any) => {
            message.error(err.response.data.message);
          },
        }
      );
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Create New User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isPending}
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter the user's name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter the user's name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please enter the user's username" },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter a valid password",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            { type: "date", message: "Please enter a valid date of birth" },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Enter address" />
        </Form.Item>
        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            { required: true, type: "array", message: "Please select roles" },
          ]}
        >
          <Select mode="tags" placeholder="Add roles" style={{ width: "100%" }}>
            <Option value="USER">USER</Option>
            <Option value="ADMIN">ADMIN</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserCreateModal;
