import { ApiUrls } from "../configs/url";
import {
  CartInfoResponse,
  CategoryRecord,
  GetRandomTagWithProductsResponse,
  OrderRecord,
  SearchProductResponse,
  TagRecord,
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
  page,
  size,
  minPrice,
  maxPrice,
}: {
  query: string;
  page: number | null;
  size: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}): Promise<SearchProductResponse> => {
  const params: any = {
    query,
  };

  if (page !== null && page !== undefined) {
    params.page = page;
  }

  if (size !== null && size !== undefined) {
    params.size = size;
  }

  if (minPrice !== null && minPrice !== undefined) {
    params.minPrice = minPrice;
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    params.maxPrice = maxPrice;
  }

  console.log(params);

  // Perform the API request
  const response = await api.get(ApiUrls.user.searchProduct, {
    params,
  });

  return response?.data?.data;
};

export const onGetme = async (): Promise<UserRecord> => {
  const userData = await api.get(ApiUrls.user.getMe);
  return userData?.data?.data;
};

export const onGetRandomTagWithProducts = async ({
  tagLimit,
  productLimit,
}: {
  tagLimit: number;
  productLimit: number;
}): Promise<GetRandomTagWithProductsResponse> => {
  const response = await api.get(ApiUrls.user.getRandomTagWithProducts, {
    params: { tagLimit, productLimit },
  });
  return response?.data?.data;
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

export const onGetCategories = async (): Promise<CategoryRecord[]> => {
  const data = await api.get(ApiUrls.admin.category.getAll);
  return data?.data.data;
};

export const onGetTags = async (): Promise<TagRecord[]> => {
  const data = await api.get(ApiUrls.admin.tag.getAll);
  return data?.data.data;
};
