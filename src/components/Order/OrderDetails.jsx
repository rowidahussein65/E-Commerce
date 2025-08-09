import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./OrderDetails.css";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const order = location.state;
  const [selectedPayment, setSelectedPayment] = useState(order.paymentMethod || "");
  const [status, setStatus] = useState(order.status);

  const handleConfirm = () => {
    const updatedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updated = updatedOrders.map((o) => {
      if (o.id === order.id) {
        return {
          ...o,
          status: "Delivered",
          paymentMethod: selectedPayment,
        };
      }
      return o;
    });
    localStorage.setItem("orders", JSON.stringify(updated));
    setStatus("Delivered");
  };

  return (
    <div className="order-details-container">
      <div className="order-details-card">
        <img src={order.image} alt={order.name} className="order-details-img" />
        <h2 className="order-details-title">{order.name}</h2>
        <p className="order-details-price">${order.price.toFixed(2)}</p>
        <p className="order-details-description">{order.description}</p>
        <p><strong>Ordered:</strong> {order.quantity || 1} item(s)</p>
        <p><strong>Quantity:</strong> {order.quantity || 1}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Status:</strong> {status}</p>

        {(status === "In Progress" || status === "Delivered") && (
          <div className={`payment-section ${status === "Delivered" ? "centered" : ""}`}>
            <strong>Payment Method:</strong>
            {status === "In Progress" ? (
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <option value="">Select a payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayPal">PayPal</option>
              </select>
            ) : (
              <span className="payment-method"> {order.paymentMethod} </span>
            )}
          </div>
        )}

        {status === "In Progress" && (
          <button className="confirm-btn" onClick={handleConfirm} disabled={!selectedPayment}>
            Confirm
          </button>
        )}

        
        <button className="back-btn" onClick={() => navigate("/Order")}>
          Back to Orders
        </button>
      </div>
    </div>
  );
}
