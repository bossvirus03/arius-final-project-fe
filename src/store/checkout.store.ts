import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { CheckoutItemProductResponse } from "../types/backend";
export type CheckoutStore = {
  checkoutItem: CheckoutItemProductResponse[];
  totalItem: number;
  totalPrice: number;
  setCheckoutItem: (
    checkoutItem: CheckoutItemProductResponse[],
    itemCount: number,
    totalPrice: number
  ) => void;
};
export const useCheckoutStore = create<CheckoutStore>()(
  devtools((set, get) => ({
    checkoutItem: [] as CheckoutItemProductResponse[],
    totalItem: 0,
    totalPrice: 0,
    setCheckoutItem: (
      checkoutItem: CheckoutItemProductResponse[],
      itemCount: number,
      totalPrice: number
    ) => {
      set({ checkoutItem, totalItem: itemCount, totalPrice });
    },
  }))
);
