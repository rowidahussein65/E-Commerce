import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const NAVBAR_HEIGHT = 64;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // رسالة داخلية للنجاح أو التحذير

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products",
          { timeout: 10000 }
        );
        setProducts(res.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // دالة تظهر رسالة لفترة قصيرة (toast)
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const addToLocalCart = (product) => {
    if (!product?._id) return;

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = storedCart.findIndex(
      (item) => item.id === product._id
    );

    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push({ id: product._id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    showMessage(
      `Added "${product.name || product.title || "Product"}" to cart.`,
      "success"
    );
  };

  const addToWishlist = (product) => {
    if (!product?._id) return;

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = storedWishlist.find((item) => item.id === product._id);
    if (exists) {
      showMessage(
        `"${product.name || "Product"}" is already in your wishlist.`,
        "warning"
      );
      return;
    }

    storedWishlist.push({ id: product._id });
    localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
    showMessage(`Added "${product.name || "Product"}" to wishlist.`, "success");
  };

  return (
    <>
      {/* رسالة التنبيه أو النجاح */}
      {message && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold z-50
            ${
              message.type === "success"
                ? "bg-green-600"
                : message.type === "warning"
                ? "bg-yellow-500"
                : "bg-red-600"
            }
          `}
          role="alert"
          aria-live="assertive"
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{
            paddingTop: NAVBAR_HEIGHT,
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <svg
            className="animate-spin h-10 w-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div
          className="flex flex-col justify-center items-center px-4 text-center"
          style={{
            paddingTop: NAVBAR_HEIGHT,
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition-transform transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      ) : (
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: NAVBAR_HEIGHT + 20 }}
        >
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
            Products
          </h1>

          {products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No products available currently.
            </p>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                  if (!product) return null;

                  return (
                    <div
                      key={product._id}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          window.open(product.productUrl || "#", "_blank");
                        }
                      }}
                      role="button"
                      aria-label={`View details of ${
                        product.name || "product"
                      }`}
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer flex flex-col hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <img
                        src={
                          product.imageCover ||
                          "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={product.name || "Product Image"}
                        className="object-contain bg-gray-100 p-4 h-48 w-full"
                        onClick={() =>
                          window.open(product.productUrl || "#", "_blank")
                        }
                      />
                      <div
                        className="p-4 flex flex-col flex-grow"
                        onClick={() =>
                          window.open(product.productUrl || "#", "_blank")
                        }
                      >
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name || "Unnamed Product"}
                        </h2>
                        <p className="text-gray-500 text-sm flex-grow">
                          {product.description
                            ? product.description.substring(0, 60) + "..."
                            : "No description"}
                        </p>
                      </div>
                      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-green-600 font-bold text-lg">
                          {product.price ? product.price + " EGP" : "Price N/A"}
                        </span>
                        <div className="flex gap-2">
                          <button
                            aria-label="Add to favorites"
                            className="border border-red-500 text-red-500 p-2 rounded-md hover:bg-red-50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToWishlist(product);
                            }}
                          >
                            <FaHeart />
                          </button>
                          <button
                            aria-label="Add to Cart"
                            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToLocalCart(product);
                            }}
                          >
                            <FaShoppingCart />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* زر Shop on Amazon في الوسط مع مسافة تحت الزرار */}
              <div className="mt-10 mb-20 flex justify-center">
                <button
                  onClick={() =>
                    window.open("https://www.amazon.com", "_blank")
                  }
                  className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Shop on Amazon
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
