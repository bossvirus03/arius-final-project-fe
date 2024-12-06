import { useQuery } from "@tanstack/react-query";
import { onGetCategories } from "../../services/api";

const useQueryCategories = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: onGetCategories,
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryCategories;
