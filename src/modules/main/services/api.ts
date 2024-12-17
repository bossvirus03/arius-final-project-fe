import { ApiUrls } from "../../../configs/url";
import api from "../../../services/axios";
import { ProductsResponse } from "../../../types/backend";

export const onGetProducts = async ({
  sortField,
  sortOrder,
  page,
  size,
}: {
  sortField: string;
  sortOrder: string;
  page: number;
  size: number;
}): Promise<ProductsResponse> => {
  const data = await api.get(
    ApiUrls.admin.product.getAll +
      `?sort=${sortField},${sortOrder}&size=${size}&page=${page}`
  );
  return data?.data.data;
};
