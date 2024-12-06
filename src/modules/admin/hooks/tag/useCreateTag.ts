import { useMutation } from "@tanstack/react-query";
import { onCreateTag } from "../../services/api";

const useCreateTag = () => {
  const mutation = useMutation({
    mutationFn: onCreateTag,
    onSuccess: () => {
      // Invalidate the tags query to refetch the created list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    createTag: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useCreateTag;
