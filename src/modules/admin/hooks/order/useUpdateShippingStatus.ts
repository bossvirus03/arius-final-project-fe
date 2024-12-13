import { useMutation } from "@tanstack/react-query";
import { onUpdateShippingStatus } from "../../services/api";

export const useUpdateShippingStatus = () => {
  return useMutation({
    mutationFn: onUpdateShippingStatus,
  });
};
