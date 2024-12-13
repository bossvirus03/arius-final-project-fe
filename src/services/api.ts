import { ApiUrls } from "../configs/url";
import {
  CartInfoResponse,
  OrderRecord,
  SearchProductResponse,
  UserRecord,
} from "../types/backend";
import api from "./axios";

export const onGetCartInfo = async (): Promise<CartInfoResponse> => {
  const data = await api.get(ApiUrls.user.cartInfo);
  return data?.data.data;
};

export const onLogout = async ({ token }: { token: string }): Promise<void> => {
  await api.post(ApiUrls.auth.logout, { token });
};

export const onSearchProduct = async ({
  query,
}: {
  query: string;
}): Promise<SearchProductResponse> => {
  const response = await api.get(ApiUrls.user.searchProduct, {
    params: { query },
  });
  return response?.data?.data;
};

export const onGetme = async (): Promise<UserRecord> => {
  const userData = await api.get(ApiUrls.user.getMe);
  return userData?.data?.data;
};

export const onCreateOrderFromCart = async ({
  productIds,
  shippingAddress,
  paymentMethod,
  shippingMethod,
}: {
  productIds: string[];
  shippingAddress: string;
  paymentMethod: string;
  shippingMethod: string;
}): Promise<any> => {
  const data = await api.post(ApiUrls.user.createOrderFromCart, {
    productIds,
    shippingAddress,
    paymentMethod,
    shippingMethod,
  });
  return data?.data.data;
};

export const onGetOrders = async (): Promise<OrderRecord[]> => {
  const data = await api.get(ApiUrls.user.getOrders);
  return data?.data.data;
};
