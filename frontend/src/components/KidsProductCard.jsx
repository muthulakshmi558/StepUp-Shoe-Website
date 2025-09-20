import React from "react";
import { motion } from "framer-motion";
import api from "../api/axios"; // Common Axios instance

const KidsProductCard = ({ product, addToCart }) => {
  // Full image path
  const productImage = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${product.image}`
    : "";

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access"); // JWT token key

    if (!token) {
      alert("⚠️ You must login to add products to cart!");
      return;
    }

    try {
      await api.post(
        "/cart/",
        { product: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      addToCart(product);
      alert("✅ Product added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("❌ Could not add product to cart.");
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {productImage && (
        <img
          src={productImage}
          alt={product.title || "Product Image"}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      <h2 className="font-bold text-lg mt-2">{product.title || "Untitled Product"}</h2>
      <p className="text-gray-600">{product.subtitle || ""}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">★★★★★</span>
      </div>
      <p className="text-lg font-semibold mt-1">
        MRP ₹ {product.price != null ? product.price : "N/A"}
      </p>

      {/* Colors */}
<div className="colors">
  {(Array.isArray(product.colors) ? product.colors : []).map((color) => (
    <span
      key={color}
      className="inline-block w-4 h-4 rounded-full mr-1"
      style={{ backgroundColor: color }}
    ></span>
  ))}
</div>

      <div className="flex gap-3 mt-4">
        <button className="border px-4 py-1 rounded-lg hover:bg-gray-200">
          Buy
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-teal-800 text-white px-4 py-1 rounded-lg hover:bg-teal-600"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default KidsProductCard;
