import { useQuery } from "@tanstack/react-query";
import { onGetOrders } from "../../services/api";

const useQueryOrders = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => onGetOrders(),
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryOrders;
