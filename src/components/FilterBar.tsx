import { memo, useState } from "react";
import useQueryCategories from "../hooks/useQueryCategories";
import useQueryTags from "../hooks/useQueryTags";
import FilterIcon from "./Icons/FilterIcon";

interface FilterBarProps {
  setPageSize: (pageSize: number) => void;
  setSortField?: (field: string) => void;
  setSortOrder?: (order: string) => void;
  setCategories?: (categories: string[]) => void;
  setTags?: (tags: string[]) => void;
  setPriceRange: (minPrice: number | null, maxPrice: number | null) => void;
  isShowCategory: boolean;
  isShowTags: boolean;
  startIndex: number;
  endIndex: number;
  total: number;
  pageSize: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  setPageSize,
  setSortField,
  setSortOrder,
  setPriceRange,
  isShowTags,
  setCategories,
  setTags,
  isShowCategory,
  startIndex,
  endIndex,
  total,
  pageSize,
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: categories } = useQueryCategories();
  const { data: tags } = useQueryTags();

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove if already selected
          : [...prev, category] // Add if not already selected
    );
  };

  // Handle tag selection
  const handleTagChange = (tag: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // Remove if already selected
          : [...prev, tag] // Add if not already selected
    );
  };

  // Handle price input changes
  const handlePriceChange = () => {
    const min = priceFrom ? parseFloat(priceFrom) : null;
    const max = priceTo ? parseFloat(priceTo) : null;
    setPriceRange(min, max);
  };

  // Apply all filters
  const handleApplyFilters = () => {
    const min = priceFrom ? parseFloat(priceFrom) : null;
    const max = priceTo ? parseFloat(priceTo) : null;
    setPriceRange(min, max);
    setCategories?.(selectedCategories);
    setTags?.(selectedTags);

    console.log("Selected categories:", selectedCategories);
    console.log("Selected tags:", selectedTags);
  };

  return (
    <div className="bg-[#FBF4EC] border-gray-200 border-t border-b px-8 py-4">
      <div className="container flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 font-semibold">
            <button
              className="flex items-center space-x-2 text-gray-700 stroke-black hover:stroke-gray-600 hover:text-gray-600"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              <FilterIcon />
              <span>Filter</span>
            </button>
            <div className="h-6 mx-2 border-l border-gray-300"></div>
            <span className="text-sm text-gray-600">
              Showing {startIndex}–{endIndex} of {total} results
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={pageSize}
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
              <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                <option value="default">Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-500 overflow-hidden ${
            isFilterExpanded ? "opacity-100 max-h-[500px]" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex mt-4 border-t border-gray-300">
            <div className="flex justify-between w-full mt-5 space-x-4">
              <div>
                {/* Price Inputs */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Price:
                  </span>
                  <input
                    type="number"
                    placeholder="From"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    onBlur={handlePriceChange}
                    className="px-2 py-1 text-sm border border-gray-300 rounded w-28"
                  />
                  <input
                    type="number"
                    placeholder="To"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    onBlur={handlePriceChange}
                    className="px-2 py-1 text-sm border border-gray-300 rounded w-28"
                  />
                </div>
                <div className="flex gap-9">
                  {isShowCategory && (
                    <div className="flex flex-col mt-4">
                      <p className="text-sm font-semibold text-gray-700">
                        Categories:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-2">
                        {categories?.map((category) => (
                          <label
                            key={category.name}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(
                                category.name
                              )}
                              onChange={() =>
                                handleCategoryChange(category.name)
                              }
                            />
                            <span>{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {isShowTags && (
                    <div className="flex flex-col mt-4">
                      <p className="text-sm font-semibold text-gray-700">
                        Tags:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-2">
                        {tags?.map((tag) => (
                          <label
                            key={tag.name}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag.name)}
                              onChange={() => handleTagChange(tag.name)}
                            />
                            <span>{tag.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleApplyFilters}
                className="self-end px-4 py-2 ml-auto text-white rounded h-[45px] bg-gold-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FilterBar);
