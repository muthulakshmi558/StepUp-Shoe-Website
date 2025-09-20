import React, { useEffect, useState, useContext } from "react";
import WomenProductCard from "../components/WomenProductCard";
import Filters from "../components/Filters";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuLinks from "../components/MenuLinks";

const WomenProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ style: "", size: "", brand: "", color: "" });
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/womenproducts/");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => 
    (!filters.style || p.style === filters.style) &&
    (!filters.size || p.size.includes(filters.size)) &&
    (!filters.brand || p.brand === filters.brand) &&
    (!filters.color || (Array.isArray(p.colors) && p.colors.includes(filters.color)))
  );

  return (
    <>
    <Navbar />
    <MenuLinks />
    <div className="p-8">
      <Filters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <WomenProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default WomenProductsPage;
