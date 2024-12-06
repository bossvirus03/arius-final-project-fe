import { useMutation } from "@tanstack/react-query";
import { onUpdateRole } from "../../services/api";

const useUpdateRole = () => {
  const mutation = useMutation({
    mutationFn: onUpdateRole,
    onSuccess: () => {
      // Invalidate the roles query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    updateRole: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useUpdateRole;
