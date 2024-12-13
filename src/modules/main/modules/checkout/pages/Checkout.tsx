import React, { useEffect, useState } from "react";
import { useCheckoutStore } from "../../../../../store/checkout.store";
import { useAppStore } from "../../../../../store/app.store";
import { useNavigate } from "react-router";
import useCreateOrderFromCart from "../../order/hooks/useCreateOrderFromCart";
import { message } from "antd";
import { useCartStore } from "../../../../../store/cart.store";

function Checkout() {
  const { checkoutItem, totalPrice } = useCheckoutStore();
  const { removeItem } = useCartStore();
  const { userData } = useAppStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shippingMethod, setShippingMethod] = useState<string>("");

  const { createOrderFromCart, isPending, isError, isSuccess, error } =
    useCreateOrderFromCart();

  useEffect(() => {
    if (checkoutItem.length === 0) {
      navigate("/cart");
    }
  }, [checkoutItem, navigate]);

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      message.error("Please select a payment method!");
      return;
    }

    if (!shippingMethod) {
      message.error("Please select a shipping method!");
      return;
    }
    const orderData = {
      productIds: checkoutItem.map((item) => {
        removeItem(item.itemDetail.id);
        return item.itemDetail.id;
      }),
      // products: checkoutItem.map((item) => ({
      //   productId: item.itemDetail.id,
      //   quantity: item.quantity,
      // })),
      shippingAddress: userData?.streetAddress || "",
      paymentMethod,
      shippingMethod: shippingMethod,
    };

    createOrderFromCart(orderData);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Order placed successfully!");
      navigate("/order"); // Redirect to success page
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError && error) {
      console.error("Order creation failed:", error);
      message.error("Failed to place the order. Please try again.");
    }
  }, [isError, error]);

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-[105px]">
      <div className="flex-1">
        <h2 className="mb-6 text-2xl font-bold">Billing details</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={userData?.firstName || ""}
                className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={userData?.lastName || ""}
                className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                readOnly
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country / Region
            </label>
            <input
              type="text"
              id="country"
              value={userData?.country || ""}
              className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address
            </label>
            <input
              type="text"
              id="address"
              value={userData?.streetAddress || ""}
              className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Town / City
            </label>
            <input
              type="text"
              id="city"
              value={userData?.city || ""}
              className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              value={userData?.province || ""}
              className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={userData?.postalCode || ""}
                className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={userData?.phone || ""}
                className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
                readOnly
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={userData?.email || ""}
              className="mt-1 h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm"
              readOnly
            />
          </div>
        </form>
      </div>

      <div className="w-full lg:w-2/5">
        <h2 className="mb-6 text-2xl font-bold">Product</h2>
        <div className="py-4 space-y-2 border-t border-b">
          {checkoutItem.map((item, index) => (
            <p className="flex justify-between" key={index}>
              <span>
                {item.itemDetail.name} × {item.quantity}
              </span>
              <span>
                {new Intl.NumberFormat("vi-VN").format(item.itemDetail.price)}
              </span>
            </p>
          ))}
          <p className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-gold-500 text-[24px]">
              {new Intl.NumberFormat("vi-VN").format(totalPrice)}
            </span>
          </p>
        </div>

        <h2 className="mt-6 text-xl font-bold">Payment Method</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="bank_transfer"
                className="form-radio text-gold-500"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Direct Bank Transfer</span>
            </label>
            <p className="text-sm text-gray-600">
              Make your payment directly into our bank account. Your order will
              not be shipped until the funds have cleared.
            </p>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cash_on_delivery"
                className="form-radio text-gold-500"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>
        <h2 className="mt-6 text-xl font-bold">Shipping Method</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="express"
                className="form-radio text-gold-500"
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              <span>Express</span>
            </label>
            <p className="text-sm text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod,
              magni.
            </p>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="standard"
                className="form-radio text-gold-500"
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              <span>Standard</span>
            </label>
            <p className="text-sm text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod,
              magni.
            </p>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isPending}
          className={`w-full py-2 mt-6 text-white rounded-md shadow-sm ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gold-500 hover:bg-gold-600"
          }`}
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
