import { useAppStore } from "./../../../../src/store/app.store";
import { useMutation } from "@tanstack/react-query";
import { onLoginApi } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { setRefreshToken, setToken } from "./../../../../src/utils/token";
import { useNavigate } from "react-router";
import { ILoginResponse } from "../../../types/backend";
import { TokenInfo } from "../interfaces/type";

export type LoginCredentials = {
  username: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: onLoginApi,
    onSuccess: (data: ILoginResponse) => {
      setToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      const userData: TokenInfo = jwtDecode(data.data.access_token);
      if (userData.scope === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      // appState.setUserData({ data: userData });
    },
  });
  return {
    isPending,
    loginUser,
  };
};

export default useLogin;
