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
} from "@ant-design/icons";
import UserEditModal from "../components/UserEditModal";
import useQueryUsers from "../hooks/user/useQueryUsers";
import useDeleteUser from "../hooks/user/useDeleteUser";
import UserCreateModal from "../components/UserCreateModal";
import { RoleRecord, UserRecord } from "../../../types/backend";
import useImportUsers from "../hooks/user/useImportUsers";
import useExportUsers from "../hooks/user/useExportUsers";

function User() {
  const [sortField, setSortField] = useState<string>("lastName");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionUser, setActionUser] = useState<UserRecord | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // Default page size

  const { data, isLoading, refetch } = useQueryUsers(
    sortField,
    sortOrder,
    currentPage,
    pageSize
  );
  const { deleteUser } = useDeleteUser();
  const { importUsers, isImporting } = useImportUsers();
  const { exportUsers, isExporting } = useExportUsers();

  const handleTableChange: TableProps<UserRecord>["onChange"] = (
    pagination,
    _filters,
    sorter
  ) => {
    if (pagination) {
      setCurrentPage(pagination.current || 1); // Update current page
      setPageSize(pagination.pageSize || 10); // Update page size
    }
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

  const columns: TableProps<UserRecord>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      sorter: true,
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      sorter: true,
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      render: (roles: RoleRecord[]) =>
        roles.map((role) => (
          <Tag color={role.name == "USER" ? "blue" : "gold"}>{role.name}</Tag>
        )),
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

      <Table<UserRecord>
        columns={columns}
        dataSource={data?.result || []}
        onChange={handleTableChange}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.meta.total || 0,
          showSizeChanger: true,
        }}
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
