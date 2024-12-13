import { onGetCartInfo } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export const useQueryCartInfo = () => {
  const query = useQuery({
    queryKey: ["cart-info"],
    queryFn: onGetCartInfo,
  });
  const { data, isPending, isError, error } = query;
  return { data, isPending, isError, error };
};
