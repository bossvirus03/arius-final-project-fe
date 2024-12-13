import { useQuery } from "@tanstack/react-query";
import { onGetOrderDetail } from "../services/api";

export const useGetOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => onGetOrderDetail(orderId),
    enabled: !!orderId, // Chỉ chạy query nếu có orderId
  });
};
