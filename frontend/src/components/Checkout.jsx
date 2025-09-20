import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Checkout = () => {
  const { allcartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrderNow = async () => {
    if (allcartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const items = allcartItems.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    try {
      // Place order on backend
      const res = await api.post("/products/orders/", { ...formData, items });

      // Clear cart (frontend + backend) using context
      await clearCart();

      // Redirect to Order Confirmation page with order data
      navigate("/order-confirmation", { state: { order: res.data } });
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  const totalItems = allcartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = allcartItems.reduce(
    (sum, i) => sum + i.quantity * i.product.price,
    0
  );

  return (
    <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side: Cart Summary */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {allcartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3 className="font-bold">{item.product.title}</h3>
              <p>Qty: {item.quantity}</p>
              <p>₹ {item.product.price}</p>
            </div>
          </div>
        ))}
        <div className="font-bold mt-4">
          Total items: {totalItems} | Total price: ₹ {totalPrice}
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="text-xl font-bold mb-4">Your Details</h2>
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="postal_code"
          placeholder="Postal Code"
          value={formData.postal_code}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <h3 className="text-lg font-bold mt-4">Bank Details</h3>
        <input
          name="bank_name"
          placeholder="Bank Name"
          value={formData.bank_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="account_number"
          placeholder="Account Number"
          value={formData.account_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="ifsc_code"
          placeholder="IFSC Code"
          value={formData.ifsc_code}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleOrderNow}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Order Now
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
