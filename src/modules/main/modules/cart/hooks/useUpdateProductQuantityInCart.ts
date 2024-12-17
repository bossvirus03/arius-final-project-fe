import { useMutation } from "@tanstack/react-query";
import { onUpdateProductQuantityInCart } from "../services/api";

const useUpdateProductQuantityInCart = () => {
  const muatation = useMutation({
    mutationFn: onUpdateProductQuantityInCart,
    onError: (error: any) => {
      console.error(
        "Failed to update product quantity",
        error.response?.data || error.message
      );
    },
  });
  const { data, mutate, isPending, isError, error } = muatation;
  return { data, mutate, isPending, isError, error };
};

export default useUpdateProductQuantityInCart;
