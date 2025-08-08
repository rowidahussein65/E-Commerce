import React, { useEffect, useState } from "react";
import axios from "axios";

const NAVBAR_HEIGHT = 64; // نفس ارتفاع النافبار

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]); // قائمة منتجات الـ wishlist (مفصلة)
  const [allProducts, setAllProducts] = useState([]); // كل المنتجات من API
  const [loading, setLoading] = useState(true);

  // جلب كل المنتجات من الـ API مرة واحدة
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setAllProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchAllProducts();
  }, []);

  // بناء قائمة الـ wishlist المفصلة بناءً على الـ localStorage و allProducts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const detailedWishlist = storedWishlist
      .map((item) => allProducts.find((p) => p._id === item.id))
      .filter(Boolean);

    setWishlist(detailedWishlist);
    setLoading(false);
  }, [allProducts]);

  // إزالة منتج من الـ wishlist
  const removeFromWishlist = (id) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = storedWishlist.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(wishlist.filter((product) => product._id !== id));
  };

  if (loading)
    return (
      <div
        className="flex justify-center items-center"
        style={{
          paddingTop: NAVBAR_HEIGHT,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
      >
        <p className="text-gray-700 text-lg font-medium">Loading wishlist...</p>
      </div>
    );

  return (
    <div
      className="max-w-5xl mx-auto p-4"
      style={{
        paddingTop: NAVBAR_HEIGHT + 20,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT + 20}px)`,
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Wishlist
      </h1>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-yellow-50 border border-yellow-300 rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mb-4 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-yellow-700 text-xl font-semibold">
            Your wishlist is empty.
          </p>
          <p className="text-yellow-600 mt-2 text-center max-w-sm">
            Add your favorite products to the wishlist and find them here later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded p-4 flex flex-col"
            >
              <img
                src={
                  product.imageCover ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={product.name}
                className="object-contain h-48 w-full mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 flex-grow">
                {product.description
                  ? product.description.substring(0, 60) + "..."
                  : "No description"}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-green-600">
                  {product.price ? product.price + " EGP" : "Price N/A"}
                </span>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
