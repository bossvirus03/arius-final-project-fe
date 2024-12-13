import { onGetme } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetmeProfile = () => {
  const query = useQuery({
    queryKey: ["me-info"],
    queryFn: onGetme,
  });
  const { data, isPending, isError, error, isFetched } = query;
  return { data, isPending, isError, error, isFetched };
};
