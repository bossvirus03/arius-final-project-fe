import React, { useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { CategoryRecord } from "../../../types/backend";
import useQueryCategories from "../hooks/category/useQueryCategories";
import CategoryCreateModal from "../components/CategoryCreateModal";
import useDeleteCategory from "../hooks/category/useDeleteCategory";
import CategoryEditModal from "../components/CategoryEditModal";

function Category() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionCategory, setActionCategory] = useState<CategoryRecord | null>(
    null
  );

  const { data, isPending, refetch } = useQueryCategories();
  const { deleteCategory } = useDeleteCategory();

  const handleDeleteCategory = (categoryId: string) => {
    if (!categoryId) return;
    deleteCategory(categoryId, {
      onSuccess: () => {
        refetch();
        message.info("Category deleted successfully!");
      },
    });
  };

  const columns: TableProps<CategoryRecord>["columns"] = [
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
              setActionCategory(record);
              setIsEditModalOpen(true);
            }}
          ></Button>

          <Popconfirm
            title="Delete this category?"
            onConfirm={() => handleDeleteCategory(record.name)}
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
        <h1 className="text-xl font-bold">Category Management</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Category
        </Button>
        <CategoryCreateModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          refetch={refetch}
        />
      </div>
      <Table<CategoryRecord>
        columns={columns}
        dataSource={data || []}
        loading={isPending}
      />
      <CategoryEditModal
        key={actionCategory?.name}
        actionCategory={actionCategory}
        setActionCategory={setActionCategory}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        refetch={refetch}
      />
    </div>
  );
}

export default Category;
