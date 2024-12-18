import { useCallback, useEffect, useState } from "react";
import FilterBar from "../../../../../components/FilterBar";
import Pagination from "../../../../../components/Pagination";
import ProductGrid from "../../../../../components/ProductGrid";
import { useLocation } from "react-router";
import { useSearchProduct } from "../hooks/useSearchProduct";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Fetch products whenever any of these dependencies change
  const {
    data: products,
    isPending,
    isError,
  } = useSearchProduct({
    queryTerm: query,
    size: pageSize,
    page: currentPage,
    minPrice,
    maxPrice,
  });

  // Update page number when price range changes or any filter is applied
  const handleSetPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setMinPrice(min);
      setMaxPrice(max);
      setCurrentPage(1); // Reset to page 1 on filter change
    },
    []
  );

  useEffect(() => {
    document.title = `Search Results - ${query}`;
    // If the query parameter changes (e.g., URL is updated), update the products
    if (query) {
      setCurrentPage(1); // Reset to page 1 on query change
    }
  }, [query]);

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Search Results for "{query}"</h1>
      <FilterBar
        isShowTags={false}
        isShowCategory={false}
        setPageSize={setPageSize}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
        setPriceRange={handleSetPriceRange}
        startIndex={(currentPage - 1) * pageSize + 1}
        endIndex={Math.min(currentPage * pageSize, products?.meta.total || 0)}
        total={products?.meta.total || 0}
        pageSize={pageSize}
      />
      {isPending && <p>Loading...</p>}
      {isError && (
        <p className="text-red-500">
          An error occurred while fetching search results.
        </p>
      )}
      {!isPending && products && products?.result.length > 0 && (
        <ProductGrid products={products?.result} />
      )}
      {products && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((products?.meta.total || 0) / pageSize)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Search;
