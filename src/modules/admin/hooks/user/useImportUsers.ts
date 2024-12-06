import { useMutation } from "@tanstack/react-query";
import { onImportUsers } from "../../services/api";

function useImportUsers() {
  const mutation = useMutation({
    mutationFn: onImportUsers,
  });

  return {
    importUsers: mutation.mutate, // Call this to trigger the mutation
    isImporting: mutation.isPending, // React Query's loading state
    isImportUsersError: mutation.isError,
    isImportUsersSuccess: mutation.isSuccess,
    ImportUsersError: mutation.error, // Catch any errors
  };
}

export default useImportUsers;
