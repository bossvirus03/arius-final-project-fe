import React, { useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { TagResponse } from "../../../types/backend";
import useQueryCategories from "../hooks/tag/useQueryTags";
import TagCreateModal from "../components/TagCreateModal";
import useDeleteTag from "../hooks/tag/useDeleteTag";
import TagEditModal from "../components/TagEditModal";

function Tag() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionTag, setActionTag] = useState<TagResponse | null>(null);

  const { data, isPending, refetch } = useQueryCategories();
  const { deleteTag } = useDeleteTag();

  const handleDeleteTag = (tagId: string) => {
    if (!tagId) return;
    deleteTag(tagId, {
      onSuccess: () => {
        refetch();
        message.info("Tag deleted successfully!");
      },
    });
  };

  const columns: TableProps<TagResponse>["columns"] = [
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
              setActionTag(record);
              setIsEditModalOpen(true);
            }}
          ></Button>

          <Popconfirm
            title="Delete this tag?"
            onConfirm={() => handleDeleteTag(record.name)}
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
        <h1 className="text-xl font-bold">Tag Management</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Tag
        </Button>
        <TagCreateModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          refetch={refetch}
        />
      </div>

      <Table<TagResponse>
        columns={columns}
        dataSource={data || []}
        loading={isPending}
      />
      <TagEditModal
        key={actionTag?.name}
        actionTag={actionTag}
        setActionTag={setActionTag}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        refetch={refetch}
      />
    </div>
  );
}

export default Tag;
