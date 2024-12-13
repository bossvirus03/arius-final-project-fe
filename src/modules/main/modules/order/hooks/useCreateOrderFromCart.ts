import { useMutation } from "@tanstack/react-query";
import { onCreateOrderFromCart } from "../../../../../services/api";

const useCreateOrderFromCart = () => {
  const mutation = useMutation({
    mutationFn: onCreateOrderFromCart,
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    createOrderFromCart: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useCreateOrderFromCart;
