import { useQuery } from "@tanstack/react-query";
import { onGetProducts } from "../services/api";

const useQueryProducts = (
  sortField: string = "id",
  sortOrder: string = "asc",
  page: number = 1,
  size: number = 16
) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["products", sortField, sortOrder, page, size],
    queryFn: () => onGetProducts({ sortField, sortOrder, page, size }),
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
