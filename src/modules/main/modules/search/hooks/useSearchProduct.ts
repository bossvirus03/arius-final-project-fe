import { onSearchProduct } from "../../../../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useSearchProduct = ({
  queryTerm,
  page = 1,
  size = 16,
  minPrice,
  maxPrice,
}: {
  queryTerm: string;
  page?: number;
  size?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
}) => {
  const query = useQuery({
    queryKey: ["search-product", queryTerm, size, page, minPrice, maxPrice],
    queryFn: () =>
      onSearchProduct({
        query: queryTerm || "",
        page,
        size,
        minPrice,
        maxPrice,
      }),
  });
  const { data, isPending, isError, error } = query;
  return { data, isPending, isError, error };
};
