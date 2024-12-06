import { useMutation } from "@tanstack/react-query";
import { onUpdateCategory } from "../../services/api";

const useUpdateCategory = () => {
  const mutation = useMutation({
    mutationFn: onUpdateCategory,
    onSuccess: () => {
      // Invalidate the roles query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    updateCategory: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useUpdateCategory;
