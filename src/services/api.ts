import { ApiUrls } from "../configs/url";
import { CartInfoResponse } from "../types/backend";
import api from "./axios";

export const onGetCartInfo = async (): Promise<CartInfoResponse> => {
  const data = await api.get(ApiUrls.user.cartInfo);
  return data?.data.data;
};
