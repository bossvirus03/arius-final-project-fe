import React, { useCallback, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, Upload, message } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ImportOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { ProductRecord } from "../../../types/backend";
import useQueryProducts from "../hooks/product/useQueryProducts";
import useDeleteProduct from "../hooks/product/useDeleteProduct";
import useImportProducts from "../hooks/product/useImportProducts";
import ProductCreateModal from "../components/ProductCreateModal";
import ProductEditModal from "../components/ProductEditModal";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Product() {
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // Default page size
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [actionProduct, setActionProduct] = useState<ProductRecord | null>(
    null
  );

  const handlesetIsEditModalOpen = useCallback(
    (value: boolean) => setIsEditModalOpen(value),
    []
  );
  const HandleSetIsCreateModalOpen = useCallback(
    (value: boolean) => setIsCreateModalOpen(value),
    []
  );

  const handleSetActionProduct = useCallback(
    (value: ProductRecord | null) => setActionProduct(value),
    []
  );

  const { data, isPending, refetch } = useQueryProducts({
    sortField,
    sortOrder,
    page: currentPage,
    size: pageSize,
  });
  const { deleteProduct } = useDeleteProduct();
  const { importProducts, isImporting } = useImportProducts();

  const handleTableChange: TableProps<ProductRecord>["onChange"] = (
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

  const handleDeleteProduct = (productId: string) => {
    if (!productId) return;
    deleteProduct(productId, {
      onSuccess: () => {
        refetch();
        message.info("Product deleted successfully!");
      },
    });
  };

  const columns: TableProps<ProductRecord>["columns"] = [
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
        <LazyLoadImage
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
            setIsModalOpen={HandleSetIsCreateModalOpen}
            refetch={refetch}
          />
        </div>
      </div>

      <Table<ProductRecord>
        columns={columns}
        dataSource={data?.result || []}
        onChange={handleTableChange}
        loading={isPending}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.meta.total || 0,
          showSizeChanger: true,
        }}
      />

      {actionProduct && (
        <ProductEditModal
          actionProduct={actionProduct}
          setActionProduct={handleSetActionProduct}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={handlesetIsEditModalOpen}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default Product;
