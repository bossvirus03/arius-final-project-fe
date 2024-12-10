import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onAddProductToCart } from "../../services/api";

const useAddProductToCart = () => {
  const muatation = useMutation({
    mutationFn: onAddProductToCart,
    onSuccess: () => {},
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
