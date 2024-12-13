import React, { useState, useEffect } from "react";
import useQueryProducts from "../../../hooks/shop/useQueryProducts";
import FilterBar from "../../../../../components/FilterBar";
import ProductGrid from "../../../../../components/ProductGrid";
import Pagination from "../../../../../components/Pagination";

function Shop() {
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: products,
    isPending,
    refetch,
  } = useQueryProducts(sortField, sortOrder, currentPage, pageSize);

  useEffect(() => {
    refetch();
  }, [sortField, sortOrder, pageSize, currentPage, refetch]);

  const total = products?.meta.total || 0;
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, total);

  const handleSetSortField = (newSortField: string) => {
    setSortField(newSortField);
    setCurrentPage(1);
  };

  const handleSetSortOrder = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handleSetPageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleSetCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
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
        <>Loading...</>
      ) : (
        <ProductGrid products={products?.result} />
      )}
      {products && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / pageSize)}
          onPageChange={(page) => handleSetCurrentPage(page)}
        />
      )}
    </>
  );
}

export default Shop;
