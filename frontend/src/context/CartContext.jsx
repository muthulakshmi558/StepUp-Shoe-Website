// CartContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [allcartItems, setCartItems] = useState([]); // frontend cart
  const [allcartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/products/allcart/");
        setCartItems(res.data);
        setCartCount(res.data.reduce((sum, item) => sum + item.quantity, 0));
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const existing = allcartItems.find((item) => item.product.id === product.id);

      if (existing) {
        // Increment quantity in backend
        const res = await api.patch(`/products/allcart/${existing.id}/`, {
          quantity: existing.quantity + 1,
        });
        setCartItems((prev) =>
          prev.map((item) => (item.id === existing.id ? res.data : item))
        );
      } else {
        // Add new cart item in backend
        const res = await api.post("/products/allcart/", {
          product_id: product.id,
          quantity: 1,
        });
        setCartItems((prev) => [...prev, res.data]);
      }

      // Update count
      setCartCount((prev) => prev + 1);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  // Update quantity (+/-)
  const updateQuantity = async (id, newQuantity) => {
    try {
      const res = await api.patch(`/products/allcart/${id}/`, { quantity: newQuantity });
      const updatedCart = allcartItems.map((item) => (item.id === id ? res.data : item));
      setCartItems(updatedCart);

      // Recalculate total count
      const total = updatedCart.reduce((sum, i) => sum + i.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    try {
      await api.delete(`/products/allcart/${id}/`);
      const updatedCart = allcartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);

      // Recalculate total count
      const total = updatedCart.reduce((sum, i) => sum + i.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  // Clear entire cart (after order placed)
  const clearCart = async () => {
    try {
      await Promise.all(allcartItems.map((item) => api.delete(`/products/allcart/${item.id}/`)));
      setCartItems([]);
      setCartCount(0);
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        allcartItems,
        allcartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setCartItems,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
