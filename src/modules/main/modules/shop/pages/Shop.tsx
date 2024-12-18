import React, { useState, useCallback } from "react";
import useQueryProducts from "../../../hooks/useQueryProducts";
import FilterBar from "../../../../../components/FilterBar";
import ProductGrid from "../../../../../components/ProductGrid";
import Pagination from "../../../../../components/Pagination";
import ProductGridLoading from "../../../../admin/components/loading/ProductGridLoading";

function Shop() {
  const [pageSize, setPageSize] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const { data: products, isPending } = useQueryProducts({
    page: currentPage,
    size: pageSize,
    minPrice,
    maxPrice,
    categories: categories,
    tags: tags,
  });

  const total = products?.meta.total || 0;
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, total);

  const handleSetPageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleSetCurrentPage = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);
  const handleSetPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setMinPrice(min);
      setMaxPrice(max);
      setCurrentPage(1);
    },
    []
  );

  return (
    <div className="container">
      <FilterBar
        setPriceRange={handleSetPriceRange}
        isShowCategory={true}
        isShowTags={true}
        setPageSize={handleSetPageSize}
        startIndex={startIndex}
        endIndex={endIndex}
        total={total}
        pageSize={pageSize}
        setCategories={setCategories}
        setTags={setTags}
      />
      {isPending ? (
        <>
          <ProductGridLoading items={8} />
        </>
      ) : (
        <ProductGrid products={products?.result} />
      )}
      {products && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / pageSize)}
          onPageChange={handleSetCurrentPage}
        />
      )}
    </div>
  );
}

export default React.memo(Shop);
