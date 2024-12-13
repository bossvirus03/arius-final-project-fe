import { ApiUrls } from "../../../../../configs/url";
import api from "../../../../../services/axios";
import { OrderRecord } from "../../../../../types/backend";

export const onGetOrderDetail = async (
  orderId: string
): Promise<OrderRecord> => {
  const response = await api.get(ApiUrls.user.getOrderDetail + "/" + orderId);
  return response?.data?.data;
};
