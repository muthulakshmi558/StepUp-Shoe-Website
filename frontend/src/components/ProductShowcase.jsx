import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products/products/');
        setProducts(response.data.results || response.data.slice(0, 8));  // First 8 products
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-4">Loading products...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate('/products')}
          className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default ProductShowcase;