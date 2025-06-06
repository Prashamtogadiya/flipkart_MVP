// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// ProductPage displays a list of products, optionally filtered by category
const ProductPage = () => {
  // State for all products and displayed (filtered) products
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  // Loading state for API call
  const [loading, setLoading] = useState(true);
  // Price range state for rc-slider
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Get current location and navigation helpers
  const location = useLocation();
  const navigate = useNavigate();
  // Get selected category from URL query params
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  // Fetch all products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by selected category and price range
  useEffect(() => {
    let filtered = allProducts;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setDisplayedProducts(filtered);
  }, [selectedCategory, allProducts, priceRange]);

  // Remove category filter and show all products
  const clearCategoryFilter = () => {
    navigate("/products");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Price Range Filter UI using rc-slider */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="w-full max-w-md">
          <label className="font-semibold mr-2">Price Range:</label>
          <div className="flex items-center gap-4">
            <span>${priceRange[0]}</span>
            <Slider
              range
              min={0}
              max={1000}
              step={1}
              value={priceRange}
              onChange={setPriceRange}
              allowCross={false}
              style={{ width: 200, margin: "0 16px" }}
            />
            <span>${priceRange[1]}</span>
          </div>
        </div>
        {/* Show category heading and clear filter button if category is selected */}
        {selectedCategory ? (
          <div className="flex items-center mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mr-4">
              {selectedCategory} ({displayedProducts.length} products)
            </h2>
            <button
              onClick={clearCategoryFilter}
              className="text-blue-600 hover:text-blue-800"
            >
              Show All Categories
            </button>
          </div>
        ) : (
          <h2 className="text-2xl font-bold mb-6 md:mb-0">All Products</h2>
        )}
      </div>

      {/* Show loading spinner, empty message, or product grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            No products found in {selectedCategory}
          </h3>
          <button
            onClick={clearCategoryFilter}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Render each product as a card */}
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

// ProductCard displays a single product in the grid
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Navigate to product detail page on click
  const handleClick = () => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <img
        src={product.imageUrl[0]}
        alt={product.name}
        className="w-full h-48 object-contain bg-white p-4"
      />
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 font-bold">${product.price}</p>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductPage;

