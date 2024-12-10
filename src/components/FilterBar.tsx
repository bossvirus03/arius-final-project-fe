import React from "react";
import FilterIcon from "./Icons/FilterIcon";
import GridViewIcon from "./Icons/GridViewIcon";
import ViewListIcon from "./Icons/ViewListIcon";

function FilterBar({
  setPageSize,
  setSortField,
  setSortOrder,
  startIndex,
  endIndex,
  total,
  pageSize,
}: any) {
  return (
    <div className="bg-[#FBF4EC] border-gray-200 border-t border-b px-8 py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-4 font-semibold">
          <button className="flex items-center space-x-2 text-gray-700">
            <FilterIcon />
            <span>Filter</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded">
              <GridViewIcon />
            </button>
            <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded">
              <ViewListIcon />
            </button>
          </div>
          <div className="h-6 mx-2 border-l border-gray-300"></div>
          <span className="text-sm text-gray-600">
            Showing {startIndex}–{endIndex} of {total} results
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              defaultValue={pageSize}
              className="px-2 py-1 text-sm border border-gray-300 rounded"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Sort by</span>
            <select
              className="px-2 py-1 text-sm border border-gray-300 rounded"
              onChange={(e) => {
                const [field, order] = e.target.value.split("_");
                setSortField(field);
                setSortOrder(order);
              }}
            >
              <option value="default">Default</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
