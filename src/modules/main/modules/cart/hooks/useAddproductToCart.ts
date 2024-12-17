import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartStore, useCartStore } from "../../../../../store/cart.store";
import { onAddProductToCart } from "../services/api";

const useAddProductToCart = () => {
  const { setCartInfo }: CartStore = useCartStore();
  const muatation = useMutation({
    mutationFn: onAddProductToCart,
    onSuccess: (newCartItem) => {
      setCartInfo(
        newCartItem.items,
        newCartItem.itemCount,
        newCartItem.totalPrice
      );
    },
    onError: (error: any) => {
      console.error(
        "Failed to add product to cart:",
        error.response?.data || error.message
      );
    },
  });
  const { data, mutate, isPending, isError, error } = muatation;
  return { data, mutate, isPending, isError, error };
};

export default useAddProductToCart;
