import { useMutation } from "@tanstack/react-query";
import { onCreateProduct } from "../../services/api";

const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: onCreateProduct,
    onSuccess: () => {
      // Invalidate the products query to refetch the created list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    createProduct: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useCreateProduct;
