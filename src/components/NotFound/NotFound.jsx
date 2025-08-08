import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">
        No subcategories found for this product
      </h1>
      <p className="mb-6 text-gray-600">
        Unfortunately, there are no subcategories available for the selected
        product right now.
      </p>
      <button
        onClick={() => navigate("/categories")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
      >
        Back to Categories
      </button>
    </div>
  );
}
