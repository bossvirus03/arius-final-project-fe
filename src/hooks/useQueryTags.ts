import { useQuery } from "@tanstack/react-query";
import { onGetTags } from "../services/api";

const useQueryTags = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["tags"],
    queryFn: onGetTags,
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryTags;
