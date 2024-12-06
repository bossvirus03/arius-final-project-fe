import { useMutation } from "@tanstack/react-query";
import { onDeleteTag } from "../../services/api";

const useDeleteTag = () => {
  const mutation = useMutation({
    mutationFn: onDeleteTag,
    onSuccess: () => {
      // Invalidate the tags query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    deleteTag: mutate,
    isPending,
    isDeleteTagError: isError,
    DeleteTagError: error,
  };
};

export default useDeleteTag;
