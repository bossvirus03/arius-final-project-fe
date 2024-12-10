import React from "react";
import ShareIcon from "./Icons/ShareIcon";
import CompareIcon from "./Icons/CompareIcon";
import FavoriteIcon from "./Icons/FavoriteIcon";
import { ProductRecord } from "../types/backend";
import { Link } from "react-router";

const ProductCard = ({ product }: { product: ProductRecord }) => (
  <div className="overflow-hidden transition-shadow duration-300 border rounded-lg shadow-md h-[446px] w-[285px] self-center relative">
    <div className="relative w-full h-64 group">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="object-cover w-full h-full group-hover:shadow-lg"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
        <button className="bg-white text-[#B88E2F] font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-100">
          Add to cart
        </button>
        <div className="flex mt-4 space-x-6 text-white">
          <button className="flex items-center space-x-1 text-sm">
            <ShareIcon />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-1 text-sm">
            <CompareIcon />
            <span>Compare</span>
          </button>
          <button className="flex items-center space-x-1 text-sm">
            <FavoriteIcon />
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>

    <Link to={`/shop/${product.id}`}>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="font-bold text-[#B88E2F]">
          {new Intl.NumberFormat("vi-VN").format(product.price)} VND
        </p>
      </div>
    </Link>
    {product.discount > 0 && (
      <div className="rounded-full size-12 bg-[#E97171] flex absolute justify-center items-center top-3 right-3 text-white">
        -{product.discount}%
      </div>
    )}
  </div>
);

export default ProductCard;
