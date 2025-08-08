import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar.jsx";
import {
  FaSearch,
  FaSpinner,
  FaShoppingCart,
  FaTrashAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./product.css";

export function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const navigate = useNavigate();

  async function getProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart.map((item) => item.id));
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedWishlist);
  }, []);

  function toggleCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product._id);

    let newCart;
    if (!existingItem) {
      newCart = [...cart, { id: product._id, quantity: 1 }];
    } else {
      newCart = cart.filter((item) => item.id !== product._id);
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart.map((item) => item.id));
  }

  function toggleWishlist(productId) {
    let newWishlist;
    if (wishlistItems.includes(productId)) {
      newWishlist = wishlistItems.filter((id) => id !== productId);
    } else {
      newWishlist = [...wishlistItems, productId];
    }
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlistItems(newWishlist);
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <header className="header">
          <h1>Beauty Products</h1>
          <p className="subtitle">
            Discover our premium collection of beauty products designed for
            professionals and enthusiasts.
          </p>

          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="container-product">
          {isLoading ? (
            <div className="loading">
              <FaSpinner className="fa-spin" size="3em" />
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={product.imageCover}
                  className="product-img"
                  alt={product.title}
                  onClick={() => navigate(`/product/${product._id}`)}
                  style={{ cursor: "pointer" }}
                />
                <div className="product-info">
                  <h2
                    onClick={() => navigate(`/product/${product._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.title}
                  </h2>
                  <p className="price">{product.price} EGP</p>
                  <p className="category">{product.category?.name}</p>
                  <div className="product-actions">
                    <button
                      className={
                        cartItems.includes(product._id) ? "in-cart" : ""
                      }
                      onClick={() => toggleCart(product)}
                    >
                      {cartItems.includes(product._id) ? (
                        <>
                          <FaTrashAlt />
                          Delete from Cart
                        </>
                      ) : (
                        <>
                          <FaShoppingCart />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <button
                      className={
                        wishlistItems.includes(product._id) ? "in-wishlist" : ""
                      }
                      onClick={() => toggleWishlist(product._id)}
                    >
                      {wishlistItems.includes(product._id) ? (
                        <>
                          <FaHeart />
                          Delete from Wishlist
                        </>
                      ) : (
                        <>
                          <FaRegHeart />
                          Add to Wishlist
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="container-dosent-search">
              No products found matching your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
