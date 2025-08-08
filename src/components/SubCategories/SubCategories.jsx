import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Constants
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 56;

/**
 * Component to display subcategories in a responsive grid layout
 */
const SubCategories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const initialSubcategories = location.state?.subcategories || [];
  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [loading, setLoading] = useState(initialSubcategories.length === 0);
  const [error, setError] = useState(null);
  const categoryName = location.state?.categoryName || "";

  // Calculate grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4; // desktop
  };

  // Fetch subcategories
  useEffect(() => {
    if (subcategories.length === 0) {
      const fetchSubcategories = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
            { timeout: 10000 }
          );
          setSubcategories(data.data);
        } catch (err) {
          console.error("Error fetching subcategories:", err);
          setError(
            err.response?.data?.message ||
              "Failed to load subcategories. Please check your connection and try again."
          );
        } finally {
          setLoading(false);
        }
      };

      const timer = setTimeout(fetchSubcategories, 300);
      return () => clearTimeout(timer);
    }
  }, [categoryId, subcategories.length]);

  // Handle subcategory navigation
  const handleSubcategoryClick = (subcategoryId, subcategoryName) => {
    navigate(`/products/subcategory/${subcategoryId}`, {
      state: { subcategoryName },
    });
  };

  if (loading) return <SubCategoriesSkeleton gridColumns={getGridColumns()} />;

  if (error)
    return (
      <ErrorState
        error={error}
        onRetry={() => window.location.reload()}
        onBack={() => navigate(-1)}
      />
    );

  if (subcategories.length === 0 && !loading)
    return (
      <EmptyState
        categoryName={categoryName}
        onBack={() => navigate("/categories")}
      />
    );

  return (
    <MainLayout
      categoryName={categoryName}
      onBack={() => navigate("/categories")}
    >
      <div
        className={`grid gap-6`}
        style={{
          gridTemplateColumns: `repeat(${getGridColumns()}, minmax(0, 1fr))`,
        }}
      >
        {subcategories.map((subcat) => (
          <SubCategoryCard
            key={subcat._id}
            subcat={subcat}
            onClick={handleSubcategoryClick}
          />
        ))}
      </div>
    </MainLayout>
  );
};

/**
 * Main layout container
 */
const MainLayout = ({ children, categoryName, onBack }) => (
  <section
    className="container mx-auto px-4 py-8 sm:py-12 md:py-16"
    style={{
      minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
      paddingTop: `${NAVBAR_HEIGHT + 16}px`,
    }}
  >
    <header className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {categoryName || "Subcategories"}
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto mb-6">
        Browse{" "}
        {categoryName ? (
          <span className="text-green-600 font-semibold">{categoryName}</span>
        ) : (
          "our"
        )}{" "}
        subcategories
      </p>

      {/* زرار تحت النص */}
      <button
        onClick={onBack}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition-colors cursor-pointer hover:scale-105 transform duration-300"
        aria-label="Back to categories"
      >
        Back to Categories
      </button>
    </header>

    {children}
  </section>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  categoryName: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

/**
 * Skeleton loader
 */
const SubCategoriesSkeleton = ({ gridColumns }) => (
  <MainLayout>
    <div
      className={`grid gap-6`}
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {[...Array(gridColumns * 2)].map((_, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded mt-4"></div>
          <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
        </div>
      ))}
    </div>
  </MainLayout>
);

SubCategoriesSkeleton.propTypes = {
  gridColumns: PropTypes.number.isRequired,
};

/**
 * Error state component
 */
const ErrorState = ({ error, onRetry, onBack }) => (
  <MainLayout>
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md text-center">
      <div className="text-red-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  </MainLayout>
);

ErrorState.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

/**
 * Empty state component
 */
const EmptyState = ({ categoryName, onBack }) => (
  <MainLayout categoryName={categoryName}>
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md text-center">
      <div className="text-gray-400 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No Subcategories Found
      </h3>
      <p className="text-gray-600 mb-6">
        {categoryName
          ? `There are currently no subcategories for ${categoryName}.`
          : "There are currently no subcategories available."}
      </p>
      <button
        onClick={onBack}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white transition-colors"
      >
        Browse Categories
      </button>
    </div>
  </MainLayout>
);

EmptyState.propTypes = {
  categoryName: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

/**
 * Subcategory card component
 */
const SubCategoryCard = ({ subcat, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onClick(subcat._id, subcat.name)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(subcat._id, subcat.name);
        }
      }}
      aria-label={`View ${subcat.name} products`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {subcat.name}
            </h3>
            <div
              className={`transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            >
              <FaArrowRight className="text-green-500" />
            </div>
          </div>
          {subcat.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mt-2">
              {subcat.description}
            </p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="inline-block bg-green-50 text-green-600 text-xs px-2 py-1 rounded">
            View Products
          </span>
        </div>
      </div>
    </article>
  );
};

SubCategoryCard.propTypes = {
  subcat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubCategories;
