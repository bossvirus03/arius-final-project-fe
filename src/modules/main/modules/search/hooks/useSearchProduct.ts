import { onSearchProduct } from "../../../../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useSearchProduct = (queryTerm: string) => {
  const query = useQuery({
    queryKey: ["search-product", queryTerm],
    queryFn: () => onSearchProduct({ query: queryTerm }),
  });
  const { data, isPending, isError, error } = query;
  return { data, isPending, isError, error };
};
