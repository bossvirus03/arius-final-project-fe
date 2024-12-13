import { useMutation } from "@tanstack/react-query";
import { onLogout } from "../services/api";
import { removeRefreshToken, removeToken } from "../utils/token";

const useLogout = () => {
  const mutation = useMutation({
    mutationFn: onLogout,
    onSuccess: () => {
      removeToken();
      removeRefreshToken();
      window.location.href = "/login";
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;

  return {
    logoutUser: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export default useLogout;
