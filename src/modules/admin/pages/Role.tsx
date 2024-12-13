import React, { useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import useDeleteRole from "../hooks/role/useDeleteRole";
import { RoleRecord } from "../../../types/backend";
import useQueryRoles from "../hooks/role/useQueryRoles";
import RoleCreateModal from "../components/RoleCreateModal";
import RoleEditModal from "../components/RoleEditModal";

function Role() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionRole, setActionRole] = useState<RoleRecord | null>(null);

  const { data, isPending, refetch } = useQueryRoles();
  const { deleteRole } = useDeleteRole();

  const handleDeleteRole = (roleId: string) => {
    if (!roleId) return;
    deleteRole(roleId, {
      onSuccess: () => {
        refetch();
        message.info("Role deleted successfully!");
      },
    });
  };

  const columns: TableProps<RoleRecord>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setActionRole(record);
              setIsEditModalOpen(true);
            }}
          ></Button>

          <Popconfirm
            title="Delete this role?"
            onConfirm={() => handleDeleteRole(record.name)}
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
        <h1 className="text-xl font-bold">Role Management</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Role
        </Button>
        <RoleCreateModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          refetch={refetch}
        />
      </div>

      <Table<RoleRecord>
        columns={columns}
        dataSource={data || []}
        loading={isPending}
      />
      <RoleEditModal
        key={actionRole?.name}
        actionRole={actionRole}
        setActionRole={setActionRole}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        refetch={refetch}
      />
    </div>
  );
}

export default Role;
