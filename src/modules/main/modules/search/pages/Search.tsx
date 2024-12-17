import React, { useEffect, useState } from "react";
import { useSearchProduct } from "../hooks/useSearchProduct";
import { useLocation } from "react-router";
import ProductGrid from "../../../../../components/ProductGrid";
import imgSearchNotFound from "./../../../../../assets/images/searchnotfound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const { data, isPending, isError } = useSearchProduct(query);

  useEffect(() => {
    document.title = `Search Results - ${query}`;
  }, [query]);
  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Search Results for "{query}"</h1>
      {isPending && <p>Loading...</p>}
      {isError && (
        <p className="text-red-500">
          An error occurred while fetching search results.
        </p>
      )}
      {!isPending && data && (
        <div>
          {data.data.length > 0 ? (
            <ProductGrid products={data.data} />
          ) : (
            <div className="md:h-[500px] flex justify-center items-center flex-col">
              <div className="size-[150px]">
                <LazyLoadImage
                  className="size-full"
                  src={imgSearchNotFound}
                  alt="search not found"
                />
              </div>
              <p className="text-gray-600">No results found for "{query}".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
