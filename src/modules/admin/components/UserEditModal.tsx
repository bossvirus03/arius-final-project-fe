import {
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Switch,
  Select,
  message,
} from "antd";
import React, { useState } from "react";
import { UserResponse } from "../../../types/backend";
import useUpdateUser from "../hooks/user/useUpdateUser";
import moment from "moment";
import dayjs from "dayjs";

const { Option } = Select;

function UserEditModal({
  isModalOpen,
  setIsModalOpen,
  actionUser,
  setActionUser,
  refetch,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  actionUser: UserResponse | null;
  setActionUser: (value: UserResponse | null) => void;
  refetch: () => void;
}) {
  const { updateUser, isPending } = useUpdateUser();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (actionUser) {
        updateUser(
          { userId: actionUser.id, updates: values },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setActionUser(null);
              refetch();
              message.info("Update user successfully!");
            },
          }
        );
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setActionUser(null);
  };

  return (
    <div>
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isPending} // Show loading state while updating
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: actionUser?.name || "",
            username: actionUser?.username || "",
            email: actionUser?.email || "",
            active: actionUser?.active || false,
            phone: actionUser?.phone || "",
            // dob: actionUser?.dob
            //   ? dayjs(actionUser?.dob).format("YYYY-MM-DD")
            //   : null,
            address: actionUser?.address || "",
            roles: actionUser?.roles?.map((role) => role.name) || ["USER"], // Initialize with roles array
          }}
        >
          <div className="flex justify-between gap-3">
            <Form.Item className="w-full" label="Name" name="name">
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="Enter email" disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { type: "string", message: "Please enter a valid phone" },
              ]}
            >
              <Input placeholder="Enter phone" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { type: "string", message: "Please enter a valid username" },
              ]}
            >
              <Input disabled placeholder="Enter username" />
            </Form.Item>
          </div>
          <div className="flex gap-5">
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { type: "date", message: "Please enter a valid date of birth" },
              ]}
            >
              <DatePicker
                defaultValue={dayjs(actionUser?.dob, "YYYY-MM-DD")}
                format={"YYYY-MM-DD"}
              />
            </Form.Item>

            <Form.Item
              name="active"
              label="Active"
              valuePropName={actionUser?.active ? "checked" : "unchecked"}
            >
              <Switch
                disabled={
                  actionUser?.roles?.some((role) => role.name == "ADMIN")
                    ? true
                    : false
                }
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { type: "string", message: "Please enter a valid address" },
            ]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ type: "array", message: "Please select roles" }]}
          >
            <Select
              disabled={
                actionUser?.roles?.some((role) => role.name == "ADMIN")
                  ? true
                  : false
              }
              mode="tags"
              placeholder="Add roles"
              style={{ width: "100%" }}
              // defaultValue={actionUser?.roles?.map((role) => role.name) || []}
            >
              <Option value="USER">USER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserEditModal;
