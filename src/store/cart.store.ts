import { devtools } from "zustand/middleware";
import { ProductRecord } from "../types/backend";
import { create } from "zustand";

export const useCartStore = create(
  devtools((set: any, get: any) => {
    const initUserData: {
      cartItem: ProductRecord[];
      totalItem: number;
      totalPrice: number;
    } = {
      cartItem: [],
      totalItem: 0,
      totalPrice: 0,
    };
    return {
      totalItem: initUserData.totalItem,
      totalPrice: initUserData.totalPrice,
      setCartInfo: (
        cartItem: ProductRecord[],
        itemCount: any,
        totalPrice: any
      ) => set({ itemCount, totalPrice, cartItem }),
    };
  })
);
