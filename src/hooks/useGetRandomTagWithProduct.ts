import { useQuery } from "@tanstack/react-query";
import { onGetRandomTagWithProducts } from "../services/api";

export const useGetRandomTagWithProduct = ({
  tagLimit,
  productLimit,
}: {
  tagLimit: number;
  productLimit: number;
}) => {
  return useQuery({
    queryKey: ["randomTagsWithProducts"],
    queryFn: () =>
      onGetRandomTagWithProducts({
        tagLimit,
        productLimit,
      }),
    staleTime: 5 * 60 * 1000, // Data sẽ stale sau 5 phút
    refetchOnWindowFocus: false,
  });
};
