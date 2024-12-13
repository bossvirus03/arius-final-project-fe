import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { CartInfoProductResponse, ProductRecord } from "../types/backend";
export type CartStore = {
  cartItem: CartInfoProductResponse[];
  totalItem: number;
  totalPrice: number;
  setCartInfo: (
    cartItem: CartInfoProductResponse[],
    itemCount: number,
    totalPrice: number
  ) => void;
  addToCart: (product: ProductRecord, quantity: number) => void;
  removeItem: (productId: string) => void;
};
export const useCartStore = create<CartStore>()(
  devtools((set, get) => ({
    cartItem: [] as CartInfoProductResponse[],
    totalItem: 0,
    totalPrice: 0,

    setCartInfo: (
      cartItem: CartInfoProductResponse[],
      itemCount: number,
      totalPrice: number
    ) => {
      set({ cartItem, totalItem: itemCount, totalPrice });
    },

    addToCart: (product: ProductRecord, quantity: number) => {
      const existingCart = get().cartItem;
      const updatedCart = [...existingCart];

      const productIndex = updatedCart.findIndex(
        (item) => item.itemDetail.id === product.id
      );

      if (productIndex > -1) {
        updatedCart[productIndex].quantity += quantity;
      } else {
        updatedCart.push({ quantity, itemDetail: product });
      }

      const totalItem = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalPrice = updatedCart.reduce(
        (sum, item) => sum + item.itemDetail.price * item.quantity,
        0
      );

      set({ cartItem: updatedCart, totalItem, totalPrice });
    },
    removeItem: (productId: string) => {
      set((state) => {
        const updatedItems = state.cartItem.filter(
          (item) => item.itemDetail.id !== productId
        );
        const totalItem = updatedItems.length;
        const itemCount = updatedItems.reduce(
          (total, item) => total + item.itemDetail.quantity,
          0
        );

        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.itemDetail.price * item.quantity,
          0
        );
        return {
          items: updatedItems,
          totalItem: totalItem,
          itemCount,
          totalPrice,
        };
      });
    },
  }))
);
