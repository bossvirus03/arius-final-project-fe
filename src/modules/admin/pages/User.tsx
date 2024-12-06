import React, { useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, Upload, message } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import UserEditModal from "../components/UserEditModal";
import useQueryUsers from "../hooks/user/useQueryUsers";
import useDeleteUser from "../hooks/user/useDeleteUser";
import UserCreateModal from "../components/UserCreateModal";
import { UserResponse } from "../../../types/backend";
import useImportUsers from "../hooks/user/useImportUsers";
import useExportUsers from "../hooks/user/useExportUsers";

function User() {
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionUser, setActionUser] = useState<UserResponse | null>(null);

  const { data, isLoading, refetch } = useQueryUsers(sortField, sortOrder);
  const { deleteUser } = useDeleteUser();
  const { importUsers, isImporting } = useImportUsers();
  const { exportUsers, isExporting } = useExportUsers();

  const handleTableChange: TableProps<UserResponse>["onChange"] = (
    _pagination,
    _filters,
    sorter
  ) => {
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field as string);
      setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!userId) return;
    deleteUser(userId, {
      onSuccess: () => {
        refetch();
        message.info("User deleted successfully!");
      },
    });
  };

  const handleExportUsers = () => {
    exportUsers();
  };

  const columns: TableProps<UserResponse>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      sorter: true,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      sorter: true,
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active",
      key: "active",
      dataIndex: "active",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "volcano"}>
          {isActive ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setActionUser(record); // Set the user to edit
              setIsEditModalOpen(true); // Open the modal
            }}
          ></Button>
          <Popconfirm
            title="Delete the user"
            onConfirm={() => handleDeleteUser(record.id)}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <div className="flex gap-3">
          <Upload
            customRequest={({ file }) => {
              importUsers(
                { file: file as File },
                {
                  onSuccess: () => {
                    message.success("Users imported successfully!");
                    refetch();
                  },
                  onError: (error) => {
                    message.error(`Failed to import users: ${error.message}`);
                  },
                }
              );
            }}
            accept=".csv,.xlsx"
            showUploadList={false}
          >
            <Button
              icon={<ImportOutlined />}
              type="primary"
              loading={isImporting}
            >
              Import
            </Button>
          </Upload>

          <Button
            icon={<ExportOutlined />}
            type="primary"
            loading={isExporting}
            onClick={handleExportUsers}
          >
            Export
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create User
          </Button>
          <UserCreateModal
            isModalOpen={isCreateModalOpen}
            setIsModalOpen={setIsCreateModalOpen}
            refetch={refetch}
          />
        </div>
      </div>

      <Table<UserResponse>
        columns={columns}
        dataSource={data || []}
        onChange={handleTableChange}
        loading={isLoading}
      />

      {actionUser && (
        <UserEditModal
          actionUser={actionUser}
          setActionUser={setActionUser}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default User;
