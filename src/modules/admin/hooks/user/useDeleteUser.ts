import { useMutation } from "@tanstack/react-query";
import { onDeleteUser } from "../../services/api";

const useDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: onDeleteUser,
    onSuccess: () => {
      // Invalidate the users query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    deleteUser: mutate,
    isPending,
    isDeleteUserError: isError,
    DeleteUserError: error,
  };
};

export default useDeleteUser;
