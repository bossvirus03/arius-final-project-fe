import { useMutation } from "@tanstack/react-query";
import { onDeleteCategory } from "../../services/api";

const useDeleteCategory = () => {
  const mutation = useMutation({
    mutationFn: onDeleteCategory,
    onSuccess: () => {
      // Invalidate the categorys query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    deleteCategory: mutate,
    isPending,
    isDeleteCategoryError: isError,
    DeleteCategoryError: error,
  };
};

export default useDeleteCategory;
