import React from "react";
import { useParams } from "react-router-dom"; // Nếu bạn dùng react-router
import { Spin, Tag, Divider } from "antd";
import { useGetOrderDetail } from "../hooks/useGetOrderDetail";
import LeftArrow from "../../../../../components/Icons/LeftArrowIcon";
import ProgressTracker from "../../../../../components/ProgressTracker";

const OrderDetail = () => {
  const { id } = useParams();
  console.log("object", id);
  const { data: order, isLoading, isError, error } = useGetOrderDetail(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-red-500">Lỗi khi tải dữ liệu: {String(error)}</div>
    );
  }

  return (
    <div className="container p-6 mx-auto bg-white rounded-lg ">
      <ProgressTracker
        steps={[
          {
            label: "Đơn Hàng Đã Đặt",
            time: order.orderDate,
            icon: "📄",
            completed: !!order.orderDate,
          },
          {
            label: "Đã Xác Nhận Thông Tin Thanh Toán",
            time: "22:32 14-11-2024",
            icon: "💰",
            completed: true,
          },
          {
            label: "Đã Giao Cho ĐVVC",
            time: "18:53 15-11-2024",
            icon: "🚚",
            completed: true,
          },
          {
            label: "Đã Nhận Được Hàng",
            time: "08:04 20-11-2024",
            icon: "📦",
            completed: true,
          },
          { label: "Đánh Giá", time: "", icon: "⭐", completed: false },
        ]}
      />
      <div className="flex items-center justify-between my-6">
        <button className="flex items-center justify-center gap-4 text-2xl text-gold-500">
          <LeftArrow />
          Back
        </button>
        <div className="flex gap-3">
          <p className="text-gold-500 font-semibold after:rounded-full relative text-6 after:absolute after:content-[''] pr-3 after:w-[1px] after:h-6 after:top-0 after:right-0 after:bg-gray-400">
            Order ID: {order.orderId}
          </p>
          <Tag className="text-6" color={"purple"}>
            {order.status}
          </Tag>
        </div>
      </div>

      {/* Order Information */}
      <div className="mb-6">
        <p>Shipping Address: {order.shippingAddress}</p>
        <p>Shipping Fee: ${order.shippingFee}</p>
        <p>
          Estimated Delivery Date:{" "}
          {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
        </p>
      </div>

      <Divider />

      {/* Products */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Products</h2>
        <div className="flex flex-col gap-4">
          {order.orderDetails.map((detail: any) => (
            <div
              key={detail.product.id}
              className="flex items-start gap-4 pb-4 border-b"
            >
              {/* Product Image */}
              <img
                src={detail.product.thumbnail}
                alt={detail.product.name}
                className="object-cover w-20 h-20 rounded-lg"
              />

              {/* Product Info */}
              <div className="flex-1 ">
                <h3 className="text-lg font-semibold text-gold-500">
                  {detail.product.name}
                </h3>
                <p className="text-gray-600">{detail.product.description}</p>
                <p className="font-semibold">
                  {new Intl.NumberFormat("vi-VN").format(
                    detail.price.toFixed(2)
                  )}{" "}
                  VND × {detail.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {new Intl.NumberFormat("vi-VN").format(
                    detail.price * detail.quantity
                  )}{" "}
                  VND
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Order Total */}
      <div className="text-right">
        <h3 className="text-lg font-bold">
          Total Money:{" "}
          <p className="text-gold-500">
            {new Intl.NumberFormat("vi-VN").format(order.totalMoney)} VND
          </p>
        </h3>
      </div>
      <Divider />
      <div>
        <div className="flex text-[20px] font-semibold">
          <p className="flex-1 ">Payment Method:</p>{" "}
          <p className="flex-1">{order.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
