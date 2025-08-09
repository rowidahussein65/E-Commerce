import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Orderpage.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const updateOrderStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  return (
    <div className="container orders-page">
      <h1>My Orders</h1>
      <div className="filters">
        {["All", "In Progress", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? "active" : ""}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="orders-container">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`order-card ${order.status.toLowerCase().replace(" ", "-")}`}
          >
            <img src={order.image} alt={order.name} />
            <h3>{order.name}</h3>
            <p>
              <strong>${order.price.toFixed(2)}</strong>
            </p>
            <p>{order.description}</p>
            <p>
              <strong>Quantity:</strong> {order.quantity || 1}
            </p>
            <p>
              <strong>Date:</strong> {order.date}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <div className="btn-group">
              <Link to={`/order/${order.id}`} state={order} className="btn">
                More Info
              </Link>
              {order.status === "Cancelled" ? (
                <button className="btn" onClick={() => updateOrderStatus(order.id, "In Progress")}>
                  Re-order
                </button>
              ) : order.status === "In Progress" ? (
                <button className="btn" onClick={() => updateOrderStatus(order.id, "Cancelled")}>
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
