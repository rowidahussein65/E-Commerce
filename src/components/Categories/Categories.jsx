import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaFire,
  FaMusic,
  FaBook,
  FaBaby,
  FaMale,
  FaFemale,
  FaShoppingBasket,
  FaMobile,
  FaSmile,
  FaHeartbeat,
  FaTshirt,
  FaLaptop,
  FaHome,
  FaGamepad,
} from "react-icons/fa";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );

        const apiCategories = data.data.map((cat) => {
          const categoryData = {
            _id: cat._id,
            name: cat.name,
            custom: false,
          };

          const lowerName = cat.name.toLowerCase();

          // Assign images and icons based on category name (old images restored)
          if (lowerName.includes("music") || lowerName.includes("موسيقى")) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaMusic className="mr-2" />,
            };
          } else if (
            lowerName.includes("kids") ||
            lowerName.includes("children") ||
            lowerName.includes("أطفال") ||
            lowerName.includes("toys") ||
            lowerName.includes("ألعاب")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              icon: <FaBaby className="mr-2" />,
              imageStyle: { objectPosition: "center" },
            };
          } else if (
            lowerName.includes("men") ||
            lowerName.includes("male") ||
            lowerName.includes("رجال") ||
            lowerName.includes("رجل")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaMale className="mr-2" />,
            };
          } else if (
            lowerName.includes("women") ||
            lowerName.includes("female") ||
            lowerName.includes("نساء") ||
            lowerName.includes("بنات")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              icon: <FaFemale className="mr-2" />,
              imageStyle: { objectPosition: "center" },
            };
          } else if (
            lowerName.includes("grocery") ||
            lowerName.includes("supermarket") ||
            lowerName.includes("بقالة")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaShoppingBasket className="mr-2" />,
            };
          } else if (
            lowerName.includes("mobile") ||
            lowerName.includes("phone") ||
            lowerName.includes("موبايل") ||
            lowerName.includes("جوال")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaMobile className="mr-2" />,
            };
          } else if (
            lowerName.includes("beauty") ||
            lowerName.includes("جمال")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaSmile className="mr-2" />,
            };
          } else if (
            lowerName.includes("health") ||
            lowerName.includes("صحة")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaHeartbeat className="mr-2" />,
            };
          } else if (
            lowerName.includes("clothing") ||
            lowerName.includes("ملابس")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaTshirt className="mr-2" />,
            };
          } else if (
            lowerName.includes("electronics") ||
            lowerName.includes("إلكترونيات")
          ) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaLaptop className="mr-2" />,
            };
          } else if (lowerName.includes("home") || lowerName.includes("منزل")) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaHome className="mr-2" />,
            };
          } else if (lowerName.includes("book") || lowerName.includes("كتاب")) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaBook className="mr-2" />,
            };
          } else if (lowerName.includes("game") || lowerName.includes("لعبة")) {
            return {
              ...categoryData,
              image:
                "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              icon: <FaGamepad className="mr-2" />,
            };
          }

          // Default category image and icon
          return {
            ...categoryData,
            image:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            icon: <FaStar className="mr-2" />,
          };
        });

        // Add two special categories with consistent icon placement
        const additionalCategories = [
          {
            _id: "featured",
            name: "Featured Products",
            image:
              "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            icon: <FaStar className="mr-2" />,
            custom: true,
          },
          {
            _id: "sale",
            name: "Hot Deals",
            image:
              "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            icon: <FaFire className="mr-2" />,
            custom: true,
          },
        ];

        setCategories([...additionalCategories, ...apiCategories]);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    const lowerName = category?.name.toLowerCase() || "";

    // If category is featured, sale, music or book go to notfound
    if (
      categoryId === "featured" ||
      categoryId === "sale" ||
      lowerName.includes("music") ||
      lowerName.includes("book")
    ) {
      navigate("/notfound");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );

      if (data.data.length > 0) {
        navigate(`/subcategories/${categoryId}`, {
          state: {
            subcategories: data.data,
            categoryName: category?.name,
          },
        });
      } else {
        navigate(`/products/category/${categoryId}`);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      navigate(`/products/category/${categoryId}`);
    }
  };

  if (loading) {
    return (
      <div className="container mt-24 pb-12">
        <h2 className="text-center mb-10 font-bold text-3xl bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-full">
              <div className="bg-gray-200 animate-pulse h-48 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-24 pb-12">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
        <button
          className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white border-none py-2 px-6 rounded-full hover:from-green-600 hover:to-green-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-green-50 pt-12 pb-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-bold text-4xl bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text mb-4">
            Explore Our Categories
          </h2>
          <p className="text-gray-500">
            Find what you need in our diverse collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="h-full">
              <div
                className="card h-full border border-green-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 bg-gradient-to-b from-white to-green-50 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => {
                  if (category.custom) {
                    navigate(`/products/${category._id}`);
                  } else {
                    handleCategoryClick(category._id);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (category.custom) {
                      navigate(`/products/${category._id}`);
                    } else {
                      handleCategoryClick(category._id);
                    }
                  }
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={category.image}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    alt={category.name}
                    loading="lazy"
                    style={category.imageStyle || {}}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Category+Image";
                    }}
                  />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        category._id === "featured"
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900"
                          : category._id === "sale"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                          : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      }`}
                    >
                      {category._id === "featured" && (
                        <FaStar className="mr-1" />
                      )}
                      {category._id === "sale" && <FaFire className="mr-1" />}
                      {category._id === "featured"
                        ? "Featured"
                        : category._id === "sale"
                        ? "Hot Deals"
                        : "Shop Now"}
                      <FaArrowRight className="ml-1" />
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-green-600 flex items-center justify-center">
                    {category.icon}
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {category._id === "featured"
                      ? "Top rated products"
                      : category._id === "sale"
                      ? "Limited time offers"
                      : "Browse products"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-10">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              No categories available at the moment.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
