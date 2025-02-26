import React from "react";
import ProductGridLoading from "../../admin/components/loading/ProductGridLoading";
import ProductGrid from "../../../components/ProductGrid";
import { useGetRandomTagWithProduct } from "../../../hooks/useGetRandomTagWithProduct";
import { useNavigate } from "react-router";

function OurProduct() {
  const { data, isLoading } = useGetRandomTagWithProduct({
    tagLimit: 3,
    productLimit: 4,
  });
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="mb-8 text-3xl font-bold text-center">Our Products</h2>

      {isLoading ? (
        <ProductGridLoading items={12} />
      ) : (
        Object.entries(data || {}).map(([tag, products]) => (
          <div key={tag} className="mb-12">
            <h3 className="mb-4 text-xl font-semibold">{tag}</h3>
            <ProductGrid products={products} />
            <div className="flex justify-center">
              <button
                onClick={() => navigate(`/search?query=${tag}`)}
                className="relative overflow-hidden font-semibold border text-gold-500 border-gold-500 h-[48px] w-[245px] group"
              >
                {/* Chữ: Đảm bảo luôn ở trên */}
                <span className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full transition-all duration-500 text-gold-500 group-hover:text-white">
                  Show More
                </span>

                {/* Nền trượt màu gold */}
                <div className="absolute top-0 left-0 w-0 h-full transition-all duration-500 bg-gold-500 group-hover:w-full"></div>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OurProduct;
