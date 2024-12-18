import { useMutation } from "@tanstack/react-query";
import { onCreateUser } from "../../services/api";
import { message } from "antd";

const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: onCreateUser,
    onSuccess: () => {
      // Invalidate the users query to refetch the created list
    },
    // onError: (error: any) => {
    //   message.error(error.response.data.message || error.response);
    // },
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
