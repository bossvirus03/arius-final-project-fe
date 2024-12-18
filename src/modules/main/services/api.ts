import { ApiUrls } from "../../../configs/url";
import api from "../../../services/axios";
import { ProductsResponse } from "../../../types/backend";

export const onGetProducts = async ({
  page,
  size,
  minPrice,
  maxPrice,
  categories = [],
  tags = [],
}: {
  page: number;
  size: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  categories?: string[];
  tags?: string[];
}): Promise<ProductsResponse> => {
  const filters: string[] = [];

  // Append price range filters
  if (minPrice !== null) {
    filters.push(`price>=${minPrice}`);
  }
  if (maxPrice !== null) {
    filters.push(`price<=${maxPrice}`);
  }

  // Append category filters
  if (categories.length > 0) {
    const categoryFilter = categories
      .map((category) => `category.name='${category}'`)
      .join(" or ");
    filters.push(`(${categoryFilter})`);
  }

  // Append tag filters
  if (tags.length > 0) {
    const tagFilter = tags.map((tag) => `tags.name='${tag}'`).join(" or ");
    filters.push(`(${tagFilter})`);
  }

  // Combine all filters with "and"
  const filterQuery = filters.join(" or ");

  const params: any = {
    page,
    size,
    ...(filterQuery && { filter: filterQuery }), // Include filter only if it's not empty
  };

  console.log("Final Params for API:", params);

  const response = await api.get(ApiUrls.admin.product.getAll, { params });
  return response?.data?.data;
};
