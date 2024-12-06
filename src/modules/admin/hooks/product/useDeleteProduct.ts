import { useMutation } from "@tanstack/react-query";
import { onDeleteProduct } from "../../services/api";

const useDeleteProduct = () => {
  const mutation = useMutation({
    mutationFn: onDeleteProduct,
    onSuccess: () => {
      // Invalidate the products query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    deleteProduct: mutate,
    isPending,
    isDeleteProductError: isError,
    DeleteProductError: error,
  };
};

export default useDeleteProduct;
