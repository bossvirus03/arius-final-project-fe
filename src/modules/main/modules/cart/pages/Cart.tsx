import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import BinIcon from "../../../../../components/Icons/BinIcon";
import { useCartStore } from "../../../../../store/cart.store";
import useRemoveProductFromCart from "../hooks/useDeleteProductFromCart";
import useUpdateProductQuantityInCart from "../hooks/useUpdateProductQuantityInCart";
import { useCheckoutStore } from "../../../../../store/checkout.store";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Cart() {
  const { cartItem } = useCartStore();
  const { setCheckoutItem } = useCheckoutStore();
  const navigate = useNavigate();
  const { mutate: removeProductFromCart } = useRemoveProductFromCart();
  const { mutate: updateProductQuantity } = useUpdateProductQuantityInCart();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const calculateSubtotal = (price: number, quantity: number) =>
    price * quantity;

  const handleCheckboxChange = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(cartItem.map((item) => item.itemDetail.id));
    } else {
      setSelectedItems([]);
    }
  };

  const isItemSelected = (productId: string) =>
    selectedItems.includes(productId);

  const areAllSelected =
    cartItem.length > 0 && selectedItems.length === cartItem.length;

  const selectedTotalPrice = cartItem
    .filter((item) => selectedItems.includes(item.itemDetail.id))
    .reduce(
      (total, item) =>
        total + calculateSubtotal(item.itemDetail.price, item.quantity),
      0
    );

  const handleCheckout = () => {
    const selectedItemsDetails = cartItem.filter((item) =>
      selectedItems.includes(item.itemDetail.id)
    );

    const itemCount = selectedItemsDetails.reduce(
      (count, item) => count + item.quantity,
      0
    );

    const totalPrice = selectedItemsDetails.reduce(
      (total, item) =>
        total + calculateSubtotal(item.itemDetail.price, item.quantity),
      0
    );

    setCheckoutItem(selectedItemsDetails, itemCount, totalPrice);
    navigate("/checkout");
  };

  // Debounced function to update the product quantity in the cart
  const debouncedUpdateQuantity = useCallback(
    debounce((productId: string, quantity: number) => {
      updateProductQuantity({ productId, quantity });
    }, 500), // 500ms debounce delay
    []
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      useCartStore.getState().updateQuantity(productId, newQuantity); // Update local state
      debouncedUpdateQuantity(productId, newQuantity); // Trigger debounced API call
    }
  };

  return (
    <>
      <div className="container flex flex-col gap-8 p-8 lg:flex-row lg:justify-between">
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-beige-100 bg-[#F9F1E7]">
              <tr>
                <th className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={areAllSelected}
                    onChange={handleSelectAll}
                    className="form-checkbox text-gold-500"
                  />
                </th>
                <th className="px-6 py-4 text-center">Product</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-center">Subtotal</th>
                <th className="px-6 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item) => (
                <tr key={item.itemDetail.id} className="border-b">
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={isItemSelected(item.itemDetail.id)}
                      onChange={() => handleCheckboxChange(item.itemDetail.id)}
                      className="form-checkbox text-gold-500"
                    />
                  </td>
                  <td className="flex items-center gap-4 px-6 py-4">
                    <LazyLoadImage
                      src={item.itemDetail.thumbnail}
                      alt={item.itemDetail.name}
                      className="w-16 h-16 rounded"
                    />
                    <span>{item.itemDetail.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.itemDetail.price
                    )}{" "}
                    VND
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        handleQuantityChange(item.itemDetail.id, newQuantity);
                      }}
                      className="w-12 text-center border rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {calculateSubtotal(
                      item.itemDetail.price,
                      item.quantity
                    ).toLocaleString()}{" "}
                    VND
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        removeProductFromCart({ productId: item.itemDetail.id })
                      }
                      className="text-gold-500 hover:text-red-500"
                    >
                      <BinIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-beige-100 px-[75px] rounded-md shadow-md max-w-[390px] lg:w-1/3 bg-[#F9F1E7] min-h-[390px] flex flex-col">
          <h2 className="text-[32px] font-bold mb-4 self-center mt-4">
            Cart Totals
          </h2>
          <div className="">
            <div className="flex justify-between mb-8 ">
              <span className="text-gray-600">Selected Total</span>
              <span>
                {new Intl.NumberFormat("vi-VN").format(selectedTotalPrice)} VND
              </span>
            </div>
            <div className="flex justify-between mb-8 ">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-[#B88E2F] text-[20px]">
                {new Intl.NumberFormat("vi-VN").format(selectedTotalPrice)} VND
              </span>
            </div>
          </div>
          <button
            disabled={selectedItems.length === 0}
            onClick={() => handleCheckout()}
            className={[
              `py-3 text-center border w-[222px] border-black bg-transparent text-black rounded-[15px] hover:bg-[#f8ecde] self-center`,
              selectedItems.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer",
            ].join(" ")}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
