import { useMutation } from "@tanstack/react-query";
import { onUpdateOrderStatus } from "../../services/api";

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: onUpdateOrderStatus,
  });
};
