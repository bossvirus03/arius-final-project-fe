import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQueryProductDetail from "../hooks/useQueryProductDetail";
import Button from "../../../../../components/Button";
import useAddProductToCart from "../../../hooks/shop/useAddproductToCart";

function ProductDetail() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const { mutate: addProduct, isPending: isPendingAdd } = useAddProductToCart();

  const { data: product, isPending, error } = useQueryProductDetail(id!);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  useEffect(() => {
    setCurrentImage(product?.thumbnail!);
  }, [product]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMouseEnter = (newImage: string) => {
    if (currentImage === newImage) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(newImage);
      setIsTransitioning(false);
    }, 300);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading product details.</div>;

  return (
    <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 pt-[35px]">
      {product && (
        <>
          <div className="flex items-center">
            {/* Thumbnail Images */}
            <div className="flex flex-col items-center gap-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="object-cover w-16 h-16 border cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(img)}
                />
              ))}
            </div>

            {/* Main Image with Fade Effect */}
            <div className="relative w-full h-auto mb-4">
              <img
                src={currentImage || ""}
                alt={product.name}
                className={`object-cover w-full h-auto transition-opacity duration-300 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="my-2 text-xl text-gray-700">
              Rs. {product.price.toLocaleString()}
            </p>
            <div className="flex items-center my-2">
              <div className="flex space-x-1 text-yellow-500">
                {"★".repeat(4)}
                {"☆".repeat(5 - 4)}
              </div>
              <span className="ml-2 text-gray-500">(9 Customer Reviews)</span>
            </div>
            <p className="text-gray-600">{product.description}</p>

            {/* Size Selection */}
            <div className="mt-4">
              <span className="font-semibold">Size:</span>
              {/* <div className="flex mt-2 space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div> */}
            </div>

            {/* Color Selection */}
            <div className="mt-4">
              <span className="font-semibold">Color:</span>
              {/* <div className="flex mt-2 space-x-2">
              {["purple", "gold", "black"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color ? "ring-2 ring-gray-800" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div> */}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mt-4 font-semibold border w-[123px] h-[64px] justify-center rounded-[10px]">
              <div className="flex items-center justify-around w-full">
                <button
                  className="px-3 py-1 rounded"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="px-3 py-1 rounded"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 mt-4">
              <Button
                className="bg-white border-black border-[1.5px]"
                onClick={() => addProduct({ productId: product.id })}
              >
                Add To Cart
              </Button>
              <Button className="bg-white border-black border-[1.5px]">
                Compare
              </Button>
            </div>

            <div className="w-full h-[1px] bg-[#D9D9D9] mt-[60px]" />
            {/* Additional Details */}
            <ul className="mt-6 text-[#4A4A4A] text-sm">
              <li className="flex items-center py-2">
                <p className="w-[120px] font-medium text-[#333333]">Category</p>
                <p className="text-[#9F9F9F]">:</p>
                <p className="ml-2 text-[#333333]">{product.category}</p>
              </li>
              <li className="flex items-center py-2">
                <p className="w-[120px] font-medium text-[#333333]">Tags</p>
                <p className="text-[#9F9F9F]">:</p>
                <p className="ml-2 text-[#333333]">{product.tags.join(", ")}</p>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
