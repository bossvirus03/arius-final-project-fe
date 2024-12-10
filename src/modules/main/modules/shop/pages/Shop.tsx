import React, { useState, useEffect } from "react";
import useQueryProducts from "../../../hooks/shop/useQueryProducts";
import FilterBar from "../../../../../components/FilterBar";
import ProductGrid from "../../../../../components/ProductGrid";
import Features from "../../../../../components/Features";
import Pagination from "../../../../../components/Pagination";
import Breadcrumb from "../../../../../components/Breadcumb";

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

  return (
    <>
      <FilterBar
        setPageSize={setPageSize}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      <Features />
    </>
  );
}

export default Shop;
