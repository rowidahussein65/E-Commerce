// src/components/ProductDetails/ProductDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p className="loading">Loading product details...</p>;
  }

  if (!product) {
    return <p className="error">Product not found.</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-card-details">
        <img src={product.imageCover} alt={product.title} className="product-image" />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="price">{product.price} EGP</p>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category?.name}</p>
          <p className="rating">Rating: {product.ratingsAverage} ⭐ ({product.ratingsQuantity} reviews)</p>
        </div>
      </div>
    </div>
  );
}