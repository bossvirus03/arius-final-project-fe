import { useQuery } from "@tanstack/react-query";
import { onGetUsers } from "../../services/api";

const useQueryUsers = (
  sortField: string = "id",
  sortOrder: string = "asc",
  page = 1,
  size = 10
) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["users", sortField, sortOrder, page, size],
    queryFn: () => onGetUsers({ sortField, sortOrder, page, size }),
  });

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryUsers;
