import React, { useEffect, useState } from "react";
import KidsProductCard from "../components/KidsProductCard";
import Filters from "../components/Filters";
import api from "../api/axios"; // your axios instance
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuLinks from "../components/MenuLinks";

const KidsProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    style: "",
    size: "",
    brand: "",
    color: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/kidsproducts"); // relative to API_BASE_URL
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    return (
      (!filters.style || p.style === filters.style) &&
      (!filters.size || p.size.includes(filters.size)) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.color || p.colors.includes(filters.color))
    );
  });

  return (
    <>
    <Navbar />
    <MenuLinks />
    <div className="p-8">
      <Filters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <KidsProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default KidsProductsPage;
