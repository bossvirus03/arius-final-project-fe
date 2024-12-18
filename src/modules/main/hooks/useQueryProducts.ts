import { useQuery } from "@tanstack/react-query";
import { onGetProducts } from "../services/api";

const useQueryProducts = ({
  page = 1,
  size = 16,
  minPrice,
  maxPrice,
  categories,
  tags,
}: {
  page?: number;
  size?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  categories?: string[];
  tags?: string[];
}) => {
  const query = useQuery({
    queryKey: ["products", page, size, minPrice, maxPrice, categories, tags],
    queryFn: () =>
      onGetProducts({ page, size, minPrice, maxPrice, categories, tags }),
  });

  return query; // Returns the entire query object for flexibility
};

export default useQueryProducts;
