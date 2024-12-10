import axios from "axios";
import { onGetCartInfo } from "../services/api";
import { useCartStore } from "../store/cart.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CartInfoResponse } from "../types/backend";

export const useQueryCartInfo = () => {
  const setCartInfo = useCartStore((state: any) => state.setCartInfo);

  const mutation = useQuery({
    queryKey: ["cart-info"],
    queryFn: onGetCartInfo,
  });
  const { data, isPending, isError, error } = mutation;
  return { data, isPending, isError, error };
};
