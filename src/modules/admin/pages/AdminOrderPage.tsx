import React, { useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, message, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { OrderRecord } from "../../../types/backend";
import useQueryOrders from "../hooks/order/useQueryOrders";
import { useUpdateShippingStatus } from "../hooks/order/useUpdateShippingStatus";
import { useUpdateOrderStatus } from "../hooks/order/useUpdateOrderStatus";

const { Option } = Select;

const AdminOrderPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [selectedShippingStatus, setSelectedShippingStatus] = useState<
    string | null
  >(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string | null>(
    null
  );

  const { data, isPending, refetch } = useQueryOrders();
  const { mutate: updateShippingStatus, isPending: isUpdatingShipping } =
    useUpdateShippingStatus();
  const { mutate: updateOrderStatus, isPending: isUpdatingOrder } =
    useUpdateOrderStatus();

  // Handle updating the shipping status
  const handleUpdateShippingStatus = (orderId: string) => {
    if (!selectedShippingStatus) {
      message.warning("Please select a shipping status!");
      return;
    }

    updateShippingStatus(
      { orderId, newShippingStatus: selectedShippingStatus },
      {
        onSuccess: () => {
          message.success("Shipping status updated successfully");
          refetch();
        },
        onError: (error: any) => {
          message.error(`Failed to update shipping status: ${error.message}`);
        },
      }
    );
  };

  // Handle updating the order status
  const handleUpdateOrderStatus = (orderId: string) => {
    if (!selectedOrderStatus) {
      message.warning("Please select an order status!");
      return;
    }

    updateOrderStatus(
      { orderId, newStatus: selectedOrderStatus },
      {
        onSuccess: () => {
          message.success("Order status updated successfully");
          refetch();
        },
        onError: (error: any) => {
          message.error(`Failed to update order status: ${error.message}`);
        },
      }
    );
  };

  // Table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: (shippingStatus: string, record: OrderRecord) => (
        <div>
          <Tag color="blue">{shippingStatus}</Tag>
          <Select
            style={{ width: 150 }}
            placeholder="Select new status"
            onChange={(value) => setSelectedShippingStatus(value)}
          >
            <Option value="Đang giao hàng">Đang giao hàng</Option>
            <Option value="Đã giao hàng">Đã giao hàng</Option>
            <Option value="Hủy">Hủy</Option>
          </Select>
          <Button
            icon={<SyncOutlined />}
            size="small"
            onClick={() => handleUpdateShippingStatus(record.orderId)}
            loading={isUpdatingShipping}
            style={{ marginLeft: 8 }}
          >
            Update
          </Button>
        </div>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: OrderRecord) => (
        <div>
          <Tag color={status === "Đã Điều phối lấy hàng" ? "green" : "volcano"}>
            {status}
          </Tag>
          <Select
            style={{ width: 150 }}
            placeholder="Select new status"
            onChange={(value) => setSelectedOrderStatus(value)}
          >
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đã Điều phối lấy hàng">Đã Điều phối lấy hàng</Option>
            <Option value="Đã hủy">Đã hủy</Option>
          </Select>
          <Button
            icon={<SyncOutlined />}
            size="small"
            onClick={() => handleUpdateOrderStatus(record.orderId)}
            loading={isUpdatingOrder}
            style={{ marginLeft: 8 }}
          >
            Update
          </Button>
        </div>
      ),
    },
    {
      title: "Total Money",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney: number) => `$${totalMoney.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: OrderRecord) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => console.log("Delete order:", record.orderId)}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Order Management</h1>
      <Table
        columns={columns}
        dataSource={data || []}
        rowKey="orderId"
        loading={isPending}
        // pagination={{
        //   current: currentPage,
        //   pageSize,
        //   total: data?.meta.total || 0,
        //   onChange: (page, size) => {
        //     setCurrentPage(page);
        //     setPageSize(size);
        //     refetch();
        //   },
        // }}
      />
    </div>
  );
};

export default AdminOrderPage;
