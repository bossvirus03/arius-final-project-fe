import React, { useRef, useState, useEffect, memo, useCallback } from "react";
import InputIcon from "./Icons/InputIcon";
import { useSearchProduct } from "../modules/main/modules/search/hooks/useSearchProduct";
import debounce from "lodash/debounce";
import LabelIcon from "./Icons/LabelIcon";

function SearchInput({
  value,
  onChange,
  isFocused,
  setIsFocused,
}: {
  value?: string;
  onChange?: (e: any) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useSearchProduct(searchTerm.trim() || "");

  // Debounce để giảm số lần gọi API
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchTerm(query.trim()); // Loại bỏ khoảng trắng dư thừa
    }, 800),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSearch(query);
    onChange && onChange(e);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  console.log("rerender");

  return (
    <div className="relative">
      <div className="border h-[60px] min-w-[60px] relative flex items-center bg-white dark:bg-dark rounded-[8px] p-2">
        <input
          ref={inputRef}
          type="text"
          value={value || ""}
          onChange={handleSearchChange}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200); // Thời gian delay để chọn kết quả
          }}
          placeholder="Search..."
          className={`border-none outline-none transition-all duration-300 ease-in-out ${
            value || isFocused ? "w-[400px] p-2" : "w-0 p-0"
          } h-8 rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden`}
          style={{
            transitionProperty: "width, padding",
            backgroundColor: "transparent",
          }}
          onFocus={() => setIsFocused(true)}
          autoFocus={isFocused}
          onKeyDown={(event) => {
            if (searchTerm && event.key === "Enter") {
              window.location.href = `/search?query=${value}`;
            }
          }}
        />
        {isFocused && (
          <button
            className="mx-[8.5px]"
            onClick={() => {
              setIsFocused(false);
              if (searchTerm) window.location.href = `/search?query=${value}`;
            }}
          >
            <InputIcon />
          </button>
        )}
        {!isFocused && (
          <button
            className="mx-[8.5px]"
            onClick={() => {
              setIsFocused(true);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            <InputIcon />
          </button>
        )}
      </div>
      {isFocused && searchTerm && data && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-[300px] overflow-y-auto mt-5 px-3">
          <div className="flex items-center gap-3 p-2">
            <LabelIcon />
            Search "{searchTerm}"
          </div>
          {isPending ? (
            <div className="p-2 text-center">Loading...</div>
          ) : data?.data?.length > 0 ? (
            data.data.map((item: any) => (
              <div
                key={item.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  window.location.href = `/search?query=${item.name}`;
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-600">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(SearchInput);
