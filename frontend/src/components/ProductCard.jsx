import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("products/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <div className="px-[5%] py-12 font-['Libre_Baskerville']">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="   p-4 text-center"
          >
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64  shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        console.log("Image load error for:", product.image);
                        e.target.src =
                        "https://via.placeholder.com/300x300?text=Image+Not+Found";
                    }}
                    />
            <h3 className="text-[#2F4F4F] font-semibold text-md">
              {product.name}
            </h3>
            <p className="text-[#2F4F4F] mt-1">
              MRP : ₹ {parseFloat(product.price).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {products.length > 8 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#2F4F4F] text-white px-6 py-2 rounded-md hover:bg-[#FFA0A0] transition"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;