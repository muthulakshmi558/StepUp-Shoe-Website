import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { allcartItems, updateQuantity, removeFromCart, allcartCount, loading } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (loading) return <p>Loading cart...</p>;

  const total = allcartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
      {allcartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {allcartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-bold">{item.product.title}</h2>
                  <p className="text-gray-600">₹ {item.product.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>

              {/* Total Price for this item */}
              <p className="font-semibold">₹ {item.quantity * item.product.price}</p>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 ml-4"
              >
                🗑
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-6 flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>₹ {total}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-teal-700 text-white py-3 rounded-lg"
          >
            Checkout Securely
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
