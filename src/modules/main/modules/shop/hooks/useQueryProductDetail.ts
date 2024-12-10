import { useQuery } from "@tanstack/react-query";
import { onGetProductDetail } from "../services/api";

const useQueryProductDetail = (productId: string) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => onGetProductDetail(productId),
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryProductDetail;
