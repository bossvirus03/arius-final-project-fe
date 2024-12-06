import { useQuery } from "@tanstack/react-query";
import { onGetUsers } from "../../services/api";

const useQueryUsers = (sortField: string = "id", sortOrder: string = "asc") => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["users", sortField, sortOrder],
    queryFn: () => onGetUsers(sortField, sortOrder),
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
