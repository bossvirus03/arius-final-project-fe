import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useQueryProductDetail from "../hooks/useQueryProductDetail";
import Button from "../../../../../components/Button";
import useAddProductToCart from "../../cart/hooks/useAddproductToCart";
import { message } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProductDetail() {
  const { id } = useParams();
  const { data: product, isPending, error } = useQueryProductDetail(id!);
  const [quantity, setQuantity] = useState(1);
  const { mutate: addProduct, isPending: isAdding } = useAddProductToCart();

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (product?.thumbnail) setCurrentImage(product.thumbnail);
  }, [product]);

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
    <div className="container pt-8">
      {product && (
        <div className="flex gap-[82px] mx-auto ">
          {/* Image Section */}
          <div className="flex items-start">
            <div className="flex flex-col gap-4">
              {product.images.map((img, index) => (
                <LazyLoadImage
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-16 h-16 border cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(img)}
                />
              ))}
            </div>

            <div className="relative w-[500px] h-[500px]">
              <LazyLoadImage
                src={currentImage || ""}
                alt={product.name}
                className={`object-cover w-full h-full transition-opacity duration-300 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="my-2 text-xl text-gray-700">
              Rs. {product.price.toLocaleString()}
            </p>
            <p className="text-gray-600">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center mt-4">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="mx-4">{quantity}</span>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <div className="flex gap-4 mt-6 ">
              <Button
                className="bg-white border border-black hover:bg-gray-100"
                disabled={isAdding}
                onClick={() =>
                  addProduct(
                    { productId: product.id, quantity },
                    {
                      onSuccess: () => {
                        message.success("Product added successfully");
                      },
                    }
                  )
                }
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </Button>
              <Button className="bg-white border border-black hover:bg-gray-100">
                Compare
              </Button>
            </div>

            <div className="mt-8">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Tags:</strong> {product.tags.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
