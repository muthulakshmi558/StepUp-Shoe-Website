import React, { useState } from "react";
import { motion } from "framer-motion";

const WomenProductCard = ({ product, addToCart }) => {
  const [loading, setLoading] = useState(false);

  const productImage = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${product.image}`
    : "";

  const handleAdd = async () => {
    try {
      setLoading(true);
      await addToCart(product);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {/* Product Image */}
      {productImage && (
        <img
          src={productImage}
          alt={product.title || "Product"}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      {/* Product Info */}
      <h2 className="font-bold text-lg mt-2">{product.title || "Untitled Product"}</h2>
      <p className="text-gray-600">{product.subtitle || "No description"}</p>

      {/* Price */}
      <p className="text-lg font-semibold mt-1">
        ₹ {product.price != null ? product.price : "N/A"}
      </p>

      {/* Colors */}
      {Array.isArray(product.colors) && product.colors.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          {product.colors.map((color, idx) => (
            <span
              key={idx}
              className="inline-block w-5 h-5 rounded-full border"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center mt-2 text-yellow-500 text-sm">
        ★★★★☆ {/* static placeholder, replace with dynamic later */}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="border px-4 py-1 rounded-lg hover:bg-gray-200">
          Buy
        </button>
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`px-4 py-1 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-800 hover:bg-teal-600"
          }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
};

export default WomenProductCard;
