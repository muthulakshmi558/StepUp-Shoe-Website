import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const TrackOrder = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/orders/");
        const foundOrder = res.data.find(o => o.order_number === orderNumber);
        setOrder(foundOrder);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [orderNumber]);

  if (!order) return <p>Loading order...</p>;

  const statusSteps = [
    { key: "placed", label: "Order Placed" },
    { key: "processing", label: "Expected Delivery" },
    { key: "in_transit", label: "Order in Transit" },
    { key: "delivered", label: "Delivered Successfully" },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>

      {/* Order Progress */}
      <div className="flex justify-between mb-8">
        {statusSteps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${index <= currentStepIndex ? "bg-green-600 text-white" : "bg-gray-300"}`}>
              {index + 1}
            </div>
            <span className="text-center">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Order Items */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        {order.items.map(item => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img src={item.product_image} alt={item.product_title} className="w-20 h-20 object-cover rounded" />
            <div>
              <h3 className="font-bold">{item.product_title}</h3>
              <p>Qty: {item.quantity}</p>
              <p>₹ {item.price}</p>
            </div>
            <p className="font-semibold">₹ {item.quantity * item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
