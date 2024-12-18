import { useAppStore } from "./../../../../src/store/app.store";
import { useMutation } from "@tanstack/react-query";
import { onRegisterApi } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { setRefreshToken, setToken } from "./../../../../src/utils/token";
import { useNavigate } from "react-router";
import { IRegisterResponse } from "../../../types/backend";
import { TokenInfo } from "../interfaces/type";

export type RegisterCredentials = {
  username: string;
  password: string;
};

const useRegister = () => {
  const navigate = useNavigate();
  const { isPending, mutate: registerUser } = useMutation({
    mutationFn: onRegisterApi,
    onSuccess: (data: IRegisterResponse) => {
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
    registerUser,
  };
};

export default useRegister;
