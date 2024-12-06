import { useMutation } from "@tanstack/react-query";
import { onCreateCategory } from "../../services/api";

const useCreateCategory = () => {
  const mutation = useMutation({
    mutationFn: onCreateCategory,
    onSuccess: () => {
      // Invalidate the categorys query to refetch the created list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    createCategory: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useCreateCategory;
