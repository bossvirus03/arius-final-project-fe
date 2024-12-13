import React from "react";
import { useGetOrders } from "../hooks/useGetOrders";
import { Tag } from "antd";

function Order() {
  const { data: orders, isPending, isError, error, isFetched } = useGetOrders();

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>

      {isPending && (
        <div className="text-center text-gray-600">Loading orders...</div>
      )}

      {isError && (
        <div className="text-center text-red-600">
          An error occurred: {error?.message || "Failed to fetch orders"}
        </div>
      )}

      {isFetched && (
        <>
          {orders && orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order: any) => (
                <div
                  key={order.orderId}
                  className="flex flex-col gap-4 p-6 border rounded-lg shadow-md"
                >
                  <div className="flex justify-end ">
                    <div>
                      <p>Status: </p>
                      <Tag color="purple">
                        {order.status == "PENDING"
                          ? "Đang chờ xác nhận"
                          : "Đang vận chuyển"}
                      </Tag>
                    </div>
                    <div>
                      <p>Shipping status: </p>
                      <Tag color="green">
                        {order.shippingStatus == "PENDING"
                          ? "Đang chờ xác nhận"
                          : "Đã lấy hàng"}
                      </Tag>
                    </div>
                  </div>

                  <div>
                    <ul className="space-y-4">
                      {order.orderDetails.map((detail: any) => (
                        <li
                          key={detail.product.id}
                          className="flex items-center gap-4 p-4 border-t rounded-lg cursor-pointer bg-gray-50"
                          onClick={() => {
                            window.location.href = `/order/${order.orderId}`;
                          }}
                        >
                          <img
                            src={detail.product.thumbnail}
                            alt={detail.product.name}
                            className="object-cover w-16 h-16 rounded-md"
                          />

                          <div className="flex-1">
                            <p className="text-[20px] text-gold-500">
                              {detail.product.name}
                            </p>
                            <p className="text-gray-600">
                              {detail.product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <p>× {detail.quantity}</p>
                              <p>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(detail.price || 0)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between p-4">
                    <h3 className="font-medium">Shipping fee:</h3>
                    <h2>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.shippingFee || 0)}
                    </h2>
                  </div>
                  <div className="flex justify-between ">
                    <h3 className="font-medium">Total Money:</h3>
                    <h3 className="text-xl text-gold-500">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalMoney || 0)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No orders found.</div>
          )}
        </>
      )}
    </div>
  );
}
export default Order;
