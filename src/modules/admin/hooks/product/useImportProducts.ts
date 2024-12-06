import { useMutation } from "@tanstack/react-query";
import { onImportProducts } from "../../services/api";

function useImportProducts() {
  const mutation = useMutation({
    mutationFn: onImportProducts,
  });

  return {
    importProducts: mutation.mutate, // Call this to trigger the mutation
    isImporting: mutation.isPending, // React Query's loading state
    isImportProductsError: mutation.isError,
    isImportProductsSuccess: mutation.isSuccess,
    ImportProductsError: mutation.error, // Catch any errors
  };
}

export default useImportProducts;
