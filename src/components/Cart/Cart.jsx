import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await res.json();
        setAllProducts(data.data || []);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    }

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const detailedCart = storedCart
      .map((item) => {
        const fullProduct = allProducts.find((p) => p._id === item.id);
        if (!fullProduct) return null;
        return {
          id: item.id,
          name: fullProduct.title,
          image: fullProduct.imageCover,
          price: fullProduct.price,
          quantity: item.quantity,
        };
      })
      .filter(Boolean);

    setCart(detailedCart);
  }, [allProducts]);

  useEffect(() => {
    const sub = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxAmount = sub * 0.1;
    setSubtotal(sub);
    setTax(taxAmount);
    setTotal(sub + taxAmount);
  }, [cart]);

  const updateLocalStorage = (updated) => {
    const simplified = updated.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(simplified));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity++;
    setCart(updated);
    updateLocalStorage(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity--;
    } else {
      updated.splice(index, 1);
    }
    setCart(updated);
    updateLocalStorage(updated);
  };

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    updateLocalStorage(updated);
  };

  const handleCheckout = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = cart.map((item, i) => ({
      id: `order-${Date.now()}-${i}`,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      description: `Ordered ${item.quantity} item(s)`,
      date: new Date().toLocaleDateString(),
      status: "In Progress",
    }));
    const updatedOrders = [...existingOrders, ...newOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert(`Thank you! Total: $${total.toFixed(2)}`);
    setCart([]);
    localStorage.removeItem("cart");
    navigate("/Order");
  };

  return (
    <div className={styles["cart-container"]}>
      <h1 className={styles.cartTitle}>Your Shopping Cart</h1>

      <div className={styles["cart-content"]}>
        <div className={styles["cart-items"]}>
          {cart.length === 0 ? (
            <p className={styles["cart_p"]}>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className={styles["cart-item"]}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles["item-image"]}
                />
                <div className={styles["item-details"]}>
                  <h4>{item.name}</h4>
                  <p>{item.price.toFixed(2)} EGP</p>
                </div>
                <div className={styles["item-quantity"]}>
                  <button onClick={() => decreaseQty(index)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(index)}>+</button>
                </div>
                <div className={styles["item-price"]}>
                  {(item.price * item.quantity).toFixed(2)} EGP
                </div>
                <button
                  className={styles["remove-btn"]}
                  onClick={() => removeItem(index)}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        <div className={styles["cart-summary"]}>
          <h3>Summary</h3>
          <div className={styles["summary-details"]}>
            <div className={styles["summary-item"]}>
              <span>Subtotal:</span> <span>{subtotal.toFixed(2)} EGP</span>
            </div>
            <div className={styles["summary-item"]}>
              <span>Tax:</span> <span>{tax.toFixed(2)} EGP</span>
            </div>
            <div className={`${styles["summary-item"]} ${styles["total"]}`}>
              <span>Total:</span> <span>{total.toFixed(2)} EGP</span>
            </div>
          </div>
          <button className={styles["checkout-btn"]} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>

      <div className={styles["back-to-shop"]}>
        <a href="/">← Back to Shop</a>
      </div>
    </div>
  );
}
