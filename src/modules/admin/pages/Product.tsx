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
import { ProductResponse } from "../../../types/backend";
import useQueryProducts from "../hooks/product/useQueryProducts";
import useDeleteProduct from "../hooks/product/useDeleteProduct";
import useImportProducts from "../hooks/product/useImportProducts";
import ProductCreateModal from "../components/ProductCreateModal";
import ProductEditModal from "../components/ProductEditModal";
import useCreateProduct from "../hooks/product/useCreateProduct";
import useUpdateProduct from "../hooks/product/useUpdateProduct";

function Product() {
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionProduct, setActionProduct] = useState<ProductResponse | null>(
    null
  );

  const { data, isPending, refetch } = useQueryProducts(sortField, sortOrder);
  const { deleteProduct } = useDeleteProduct();
  const { importProducts, isImporting } = useImportProducts();
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();

  const handleTableChange: TableProps<ProductResponse>["onChange"] = (
    _pagination,
    _filters,
    sorter
  ) => {
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field as string);
      setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (!productId) return;
    deleteProduct(productId, {
      onSuccess: () => {
        refetch();
        message.info("Product deleted successfully!");
      },
    });
  };

  const columns: TableProps<ProductResponse>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="Thumbnail"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      sorter: true,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      sorter: true,
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        `${new Intl.NumberFormat("vi-VN").format(price)} VND`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status ? "green" : "volcano"}>
          {status ? "AVAILABLE" : "OUT OF STOCK"}
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
              setActionProduct(record); // Set the product to edit
              setIsEditModalOpen(true); // Open the modal
            }}
          ></Button>
          <Popconfirm
            title="Delete the product"
            onConfirm={() => handleDeleteProduct(record.id)}
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
        <h1 className="text-xl font-bold">Product Dashboard</h1>
        <div className="flex gap-3">
          <Upload
            customRequest={({ file }) => {
              importProducts(
                { file: file as File },
                {
                  onSuccess: () => {
                    message.success("Products imported successfully!");
                    refetch();
                  },
                  onError: (error) => {
                    message.error(
                      `Failed to import products: ${error.message}`
                    );
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
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Product
          </Button>
          <ProductCreateModal
            isModalOpen={isCreateModalOpen}
            setIsModalOpen={setIsCreateModalOpen}
            refetch={refetch}
            createProduct={createProduct}
          />
        </div>
      </div>

      <Table<ProductResponse>
        columns={columns}
        dataSource={data || []}
        onChange={handleTableChange}
        loading={isPending}
      />

      {/* Render the Edit Modal outside the table */}
      {actionProduct && (
        <ProductEditModal
          actionProduct={actionProduct}
          setActionProduct={setActionProduct}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          refetch={refetch}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
}

export default Product;
