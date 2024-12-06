import { useMutation } from "@tanstack/react-query";
import { onUpdateUser } from "../../services/api";

const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: onUpdateUser,
    onSuccess: () => {
      // Invalidate the users query to refetch the updated list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    updateUser: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useUpdateUser;
