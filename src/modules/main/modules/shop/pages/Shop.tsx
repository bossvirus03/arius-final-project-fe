import React, { useState, useCallback } from "react";
import useQueryProducts from "../../../hooks/useQueryProducts";
import FilterBar from "../../../../../components/FilterBar";
import ProductGrid from "../../../../../components/ProductGrid";
import Pagination from "../../../../../components/Pagination";
import ProductGridLoading from "../../../../admin/components/loading/ProductGridLoading";

function Shop() {
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: products, isPending } = useQueryProducts(
    sortField,
    sortOrder,
    currentPage,
    pageSize
  );

  const total = products?.meta.total || 0;
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, total);

  const handleSetSortField = useCallback((newSortField: string) => {
    setSortField(newSortField);
    setCurrentPage(1);
  }, []);

  const handleSetSortOrder = useCallback((newSortOrder: string) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  }, []);

  const handleSetPageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleSetCurrentPage = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <div className="container">
      <FilterBar
        setPageSize={handleSetPageSize}
        setSortField={handleSetSortField}
        setSortOrder={handleSetSortOrder}
        startIndex={startIndex}
        endIndex={endIndex}
        total={total}
        pageSize={pageSize}
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
