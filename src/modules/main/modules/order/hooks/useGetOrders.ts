import { onGetOrders } from "../../../../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: onGetOrders,
  });
  const { data, isPending, isError, error, isFetched } = query;
  return { data, isPending, isError, error, isFetched };
};
