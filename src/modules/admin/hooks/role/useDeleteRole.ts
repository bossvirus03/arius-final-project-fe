import { useMutation } from "@tanstack/react-query";
import { onDeleteRole } from "../../services/api";

const useDeleteRole = () => {
  const mutation = useMutation({
    mutationFn: onDeleteRole,
    onSuccess: () => {
      // Invalidate the roles query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    deleteRole: mutate,
    isPending,
    isDeleteRoleError: isError,
    DeleteRoleError: error,
  };
};

export default useDeleteRole;
