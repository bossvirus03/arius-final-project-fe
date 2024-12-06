import { useQuery } from "@tanstack/react-query";
import { onGetRoles } from "../../services/api";

const useQueryRoles = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["roles"],
    queryFn: onGetRoles,
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch,
  };
};

export default useQueryRoles;
