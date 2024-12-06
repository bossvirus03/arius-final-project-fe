import { useQuery } from "@tanstack/react-query";
import { onGetProducts } from "../../services/api";

const useQueryProducts = (
  sortField: string = "id",
  sortOrder: string = "asc"
) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["products", sortField, sortOrder],
    queryFn: () => onGetProducts(sortField, sortOrder),
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryProducts;
