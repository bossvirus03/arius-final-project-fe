import { useMutation } from "@tanstack/react-query";
import { onUpdateTag } from "../../services/api";

const useUpdateTag = () => {
  const mutation = useMutation({
    mutationFn: onUpdateTag,
    onSuccess: () => {
      // Invalidate the roles query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    updateTag: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useUpdateTag;
