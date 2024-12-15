import { useMutation } from "@tanstack/react-query";
import { onUpdateProduct } from "../../services/api";

const useUpdateProduct = () => {
  const mutation = useMutation({
    mutationFn: onUpdateProduct,
    onSuccess: () => {},
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    updateProduct: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useUpdateProduct;
