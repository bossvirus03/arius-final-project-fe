import { useQuery } from "@tanstack/react-query";
import { onAdminGetProducts } from "../../services/api";

const useQueryProducts = ({
  sortField = "id",
  sortOrder = "asc",
  page = 1,
  size = 16,
}: {
  sortField: string;
  sortOrder: string;
  page: number;
  size: number;
}) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["admin-products", sortField, sortOrder, page, size],
    queryFn: () => onAdminGetProducts({ sortField, sortOrder, page, size }),
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
