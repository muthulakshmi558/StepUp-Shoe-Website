import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from './ProductCard';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await api.get('products/products/');
        setProducts(response.data.results || response.data);  // All products
        setLoading(false);
      } catch (err) {
        console.error('Error fetching all products:', err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  if (loading) return <p className="text-center py-4">Loading products...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;