import { ApiUrls } from "../../../../../configs/url";
import api from "../../../../../services/axios";
import { ProductRecord } from "../../../../../types/backend";

export const onGetProductDetail = async (
  productId: string
): Promise<ProductRecord> => {
  const response = await api.get(
    ApiUrls.user.getProductDetail + `/${productId}`
  );
  return response?.data?.data;
};
