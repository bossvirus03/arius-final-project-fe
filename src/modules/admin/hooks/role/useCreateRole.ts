import { useMutation } from "@tanstack/react-query";
import { onCreateRole } from "../../services/api";

const useCreateRole = () => {
  const mutation = useMutation({
    mutationFn: onCreateRole,
    onSuccess: () => {
      // Invalidate the roles query to refetch the created list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    createRole: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useCreateRole;
