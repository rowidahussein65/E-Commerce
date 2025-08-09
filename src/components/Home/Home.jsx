import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";

import image4 from "../../assets/product/image4.png";
import image5 from "../../assets/product/image5.png";
import image1 from "../../assets/product/image1.jpg";

import shawl1 from "../../assets/product/shawl1.jpeg";
import shawl2 from "../../assets/product/shawl2.jpeg";
import shawl3 from "../../assets/product/shawl3.jpeg";
import shawl4 from "../../assets/product/shawl4.jpeg";
import shawl5 from "../../assets/product/shawl5.jpeg";

import tshirt6 from "../../assets/product/t-6.jpeg";
import tshirt7 from "../../assets/product/t-7.jpeg";
import tshirt8 from "../../assets/product/t-8.jpeg";
import fit from "../../assets/product/fit.jpeg";

import socks from "../../assets/product/socks.jpeg";
import socks2 from "../../assets/product/socks2.jpeg";
import tshirt9 from "../../assets/product/t-9.jpeg";
import shoes from "../../assets/product/shoes.jpeg";

export function Home() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // تحميل الكارت من localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // تحديث localStorage عند تغير الكارت
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const images = [image4, image5, image1, image4, image5, image1];

  const products = [
    {
      id: 1,
      title: "Women's Fashion",
      subtitle: "Woman Shawl",
      price: 10,
      image: shawl1,
    },
    {
      id: 2,
      title: "Women's Fashion",
      subtitle: "Woman Shawl",
      price: 100,
      image: shawl2,
    },
    {
      id: 3,
      title: "Women's Fashion",
      subtitle: "Woman Shawl",
      price: 20,
      image: shawl3,
    },
    {
      id: 4,
      title: "Women's Fashion",
      subtitle: "Woman Shawl",
      price: 30,
      image: shawl4,
    },
    {
      id: 5,
      title: "Women's Fashion",
      subtitle: "Woman Shawl",
      price: 40,
      image: shawl5,
    },
    {
      id: 6,
      title: "Women's Fashion",
      subtitle: "Woman T-shirt",
      price: 100,
      image: tshirt6,
    },
    {
      id: 7,
      title: "Women's Fashion",
      subtitle: "Woman T-shirt",
      price: 300,
      image: tshirt7,
    },
    {
      id: 8,
      title: "Men's Fashion",
      subtitle: "Man T-shirt",
      price: 200,
      image: tshirt8,
    },
    {
      id: 9,
      title: "Women's Fashion",
      subtitle: "Woman fit",
      price: 400,
      image: fit,
    },
    {
      id: 10,
      title: "Women's Fashion",
      subtitle: "Woman socks",
      price: 50,
      image: socks,
    },
    {
      id: 11,
      title: "Women's Fashion",
      subtitle: "Woman socks",
      price: 60,
      image: socks2,
    },
    {
      id: 12,
      title: "Men's Fashion",
      subtitle: "Man T-shirt",
      price: 49,
      image: tshirt9,
    },
    {
      id: 13,
      title: "Men's Fashion",
      subtitle: "Man shoes",
      price: 100,
      image: shoes,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(term) ||
      product.subtitle.toLowerCase().includes(term) ||
      product.price.toString().toLowerCase().includes(term)
    );
  });

  function handleAddToCart(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { id: product.id, quantity: 1 }];
      }

      setToast(`${product.subtitle || product.title} added to cart`);
      setTimeout(() => setToast(null), 2000);

      // التنقل لصفحة الكارت
      navigate("/cart");

      return updatedCart;
    });
  }

  return (
    <div className="space-y-20 p-4 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center h-64 shadow-lg rounded-xl"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1754321159253-8c9bd02cfb4c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-green-900/30 flex items-center justify-center rounded-xl">
          <Motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-4xl md:text-5xl font-bold"
          >
            Welcome to FreshCart!
          </Motion.h1>
        </div>
      </section>

      {/* Carousel */}
      <section>
        <Motion.div
          className="overflow-hidden rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`flex ${styles.animateslide} w-[160%]`}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Slide ${i}`}
                className="w-full h-70 object-contain p-4 img-fluid"
              />
            ))}
          </div>
        </Motion.div>
      </section>

      {/* Search */}
      <section className="flex flex-col items-center mt-10">
        <div className="rounded-xl p-1 border border-transparent shadow-lg focus-within:shadow-lg focus-within:shadow-green-500/50 focus-within:border-green-500 transition w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-xl focus:outline-none transition text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-4 text-red-600 font-semibold">
            No products match your search.
          </p>
        )}
      </section>

      {/* Products */}
      <section>
        <Motion.h2
          className="text-3xl font-bold text-center mt-20 mb-8 text-green-600"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Products
        </Motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg hover:shadow-green-500/50"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-70 object-contain p-4 img-fluid"
                />
                <div className="p-4">
                  <h3 className="text-sm text-green-600 font-medium">
                    {product.title}
                  </h3>
                  <p className="font-bold py-2">{product.subtitle}</p>
                  <p className="font-medium">${product.price}</p>
                </div>
              </Link>

              <div className="p-4 pt-0">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl flex items-center gap-2 mx-auto"
                >
                  Add To Cart
                </button>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
