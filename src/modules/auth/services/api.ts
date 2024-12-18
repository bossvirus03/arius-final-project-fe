import api from "./../../../../src/services/axios";
import { ApiUrls } from "./../../../../src/configs/url";
import { LoginInput, RegisterCredentials } from "../interfaces/type";

export const onLoginApi = async (payload: LoginInput) => {
  const data: any = await api.post(
    ApiUrls.auth.login,
    { ...payload },
    {
      headers: {},
    }
  );
  return data?.data;
};

export const onRegisterApi = async (payload: RegisterCredentials) => {
  const data: any = await api.post(
    ApiUrls.auth.register,
    { ...payload },
    {
      headers: {},
    }
  );
  return data?.data;
};
