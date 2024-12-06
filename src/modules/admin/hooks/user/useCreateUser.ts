import { useMutation } from "@tanstack/react-query";
import { onCreateUser } from "../../services/api";

const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: onCreateUser,
    onSuccess: () => {
      // Invalidate the users query to refetch the created list
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    createUser: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useCreateUser;
