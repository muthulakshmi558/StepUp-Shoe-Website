import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) return <p className="text-center mt-10">No order found.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Thank You for Your Order!</h1>
      <p className="text-gray-700">
        We have received your order and it will be shipped in 5-7 business days.
      </p>
      <p className="font-semibold">Your Order Number is: {order.order_number}</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate("/orders")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate(`/track-order/${order.id}`)}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Track Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
