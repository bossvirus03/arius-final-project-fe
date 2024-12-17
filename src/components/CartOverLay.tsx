import React, { memo, useEffect, useState } from "react";
import CartCloseIcon from "./Icons/CartCloseIcon";
import CloseIcon from "./Icons/CloseIcon";
import { CartInfoProductResponse } from "../types/backend";
import useRemoveProductFromCart from "../modules/main/modules/cart/hooks/useDeleteProductFromCart";
import { message } from "antd";
import { Link } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CartOverLay({
  cartItem,
  onClose,
}: {
  cartItem: CartInfoProductResponse[];
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { mutate: removeProductFromCart } = useRemoveProductFromCart();

  return (
    <div
      className={`fixed inset-0 bg-black transition-all duration-300 ${
        isVisible ? "bg-opacity-30" : "bg-opacity-0"
      } flex justify-end z-50`}
      onClick={handleClose}
    >
      <div
        className={`transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } w-[417px] h-[746px] rounded-sm bg-white relative`}
        onClick={handleOverlayClick}
      >
        {/* Your content remains unchanged */}
        <div className="p-7">
          <div className="flex items-center justify-between p-6 mb-5 border-b">
            <h2 className="text-[24px] font-bold">Shopping Cart</h2>
            <button
              onClick={handleClose}
              className="flex items-center justify-center rounded-full size-7 hover:bg-gray-200"
            >
              <CartCloseIcon />
            </button>
          </div>
          <div className="max-h-[500px] flex flex-col overflow-scroll">
            {cartItem &&
              cartItem.map((product) => (
                <div
                  key={product.itemDetail.id}
                  className="flex items-center justify-between gap-8 p-4 py-5 rounded-md hover:bg-gray-100"
                >
                  <div className="size-[105px]">
                    <LazyLoadImage
                      className="object-contain w-full h-full"
                      src={product.itemDetail.thumbnail}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.itemDetail.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{product.quantity}</p>
                      <p className="font-light">×</p>
                      <p className="text-[12px] text-[#B88E2F] font-semibold">
                        {new Intl.NumberFormat("vi-VN").format(
                          product.itemDetail.price
                        )}
                        VND
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      removeProductFromCart(
                        {
                          productId: product.itemDetail.id,
                        },
                        {
                          onSuccess: () => {
                            message.success("Product removed successfully");
                          },
                        }
                      )
                    }
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
          </div>
          <div className="absolute bottom-0 left-0 flex justify-around w-full border-t p-7">
            <Link
              to={"/cart"}
              className="bg-white border border-black rounded-full h-7 w-[87px] font-semibold hover:bg-gray-100 flex justify-center items-center"
              onClick={handleClose}
            >
              Cart
            </Link>
            <Link
              to={"/checkout"}
              className="bg-white border border-black rounded-full h-7 w-[110px] font-semibold hover:bg-gray-100 flex justify-center items-center"
              onClick={handleClose}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartOverLay);
